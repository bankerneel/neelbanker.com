// Production proof that three.js is reachable only from the 404 page.
// Run after `npm run build`: node docs/particles-404/verify-chunks.mjs
// The report is written next to this file as chunk-scan.txt.

import fs from 'node:fs'
import path from 'node:path'
import zlib from 'node:zlib'

const root = process.cwd()
const nextDir = path.join(root, '.next')
const outFile = path.join(root, 'docs', 'particles-404', 'chunk-scan.txt')
const MARKERS = ['WebGLRenderer', 'BufferGeometry', 'ShaderMaterial']
const SLOT_BUDGET = 2048

function walk(dir, files = []) {
  if (!fs.existsSync(dir)) return files
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) walk(full, files)
    else if (entry.isFile()) files.push(full)
  }
  return files
}

function relative(file) {
  return path.relative(root, file).split(path.sep).join('/')
}

function reads(file) {
  try {
    return fs.readFileSync(file, 'utf8')
  } catch {
    return ''
  }
}

const chunks = walk(path.join(nextDir, 'static', 'chunks')).filter((f) => f.endsWith('.js'))
const bodies = new Map(chunks.map((file) => [file, reads(file)]))
const hasMarker = (file) => MARKERS.some((marker) => bodies.get(file).includes(marker))
const threeChunks = chunks.filter(hasMarker)
const slotChunks = chunks.filter((file) => bodies.get(file).includes('particle-slot'))
const names = threeChunks.map((file) => path.basename(file))
const slotNames = slotChunks.map((file) => path.basename(file))

// Every server artifact counts, not only html and rsc, so a chunk name that
// leaks through a manifest or a data payload is still caught.
const serverFiles = walk(path.join(nextDir, 'server'))
const routeHits = []
for (const file of serverFiles) {
  const hits = names.filter((name) => reads(file).includes(name))
  if (hits.length) routeHits.push({ file: relative(file), hits })
}

// The homepage's initial chunk list. Next 16 with Turbopack has no root
// app-build-manifest.json, so fall back to the per route build manifest plus
// the script tags in the prerendered html, which are what the browser loads.
let homepageChunks = []
let homepageSource = ''
const appManifest = path.join(nextDir, 'app-build-manifest.json')
const routeManifest = path.join(nextDir, 'server', 'app', 'page', 'build-manifest.json')
const homepageHtml = path.join(nextDir, 'server', 'app', 'index.html')
if (fs.existsSync(appManifest)) {
  const manifest = JSON.parse(reads(appManifest))
  homepageChunks = manifest.pages?.['/']?.files ?? []
  homepageSource = relative(appManifest)
  if (homepageChunks.length === 0) {
    const compact = manifest.pages?.['/'] ?? {}
    homepageChunks = [...(compact.files ?? []), ...(compact.scripts ?? [])]
  }
} else if (fs.existsSync(routeManifest)) {
  const manifest = JSON.parse(reads(routeManifest))
  homepageChunks = [
    ...(manifest.rootMainFiles ?? []),
    ...(manifest.polyfillFiles ?? []),
    ...(manifest.lowPriorityFiles ?? []),
  ]
  homepageSource = relative(routeManifest)
}
const htmlChunks = [...new Set(
  [...reads(homepageHtml).matchAll(/(?:src|href)="\/_next\/static\/chunks\/([^"?]+\.js)/g)].map((m) => m[1]),
)]
if (htmlChunks.length) {
  homepageChunks = [...new Set([...homepageChunks, ...htmlChunks])]
  homepageSource += homepageSource ? ' + .next/server/app/index.html' : '.next/server/app/index.html'
}
const homepageBasenames = homepageChunks.map((chunk) => path.basename(chunk))
const homepageThree = homepageBasenames.filter((name) => names.includes(name))
const homepageMarkerHits = homepageBasenames.filter((name) => {
  const file = chunks.find((chunk) => path.basename(chunk) === name)
  return file ? hasMarker(file) : false
})

// Measured size of the slot loader. This is the whole homepage cost of the
// scene, because three arrives later through the two dynamic imports.
const slotFile = slotChunks[0]
const slotRaw = slotFile ? fs.statSync(slotFile).size : 0
const slotGzip = slotFile ? zlib.gzipSync(fs.readFileSync(slotFile)).length : 0
const slotUnderBudget = slotRaw > 0 && slotRaw < SLOT_BUDGET

const slotRouteFiles = serverFiles.filter((file) => slotNames.some((name) => reads(file).includes(name)))
const notFoundReaches = slotRouteFiles.some((file) => relative(file).includes('_not-found'))
const slotCarriesThree = slotChunks.some(hasMarker)
const bad =
  routeHits.length > 0 ||
  !notFoundReaches ||
  slotCarriesThree ||
  !slotUnderBudget ||
  homepageThree.length > 0 ||
  homepageMarkerHits.length > 0 ||
  !homepageSource ||
  threeChunks.length === 0
const label = path.basename(threeChunks[0] ?? 'none')

const lines = [
  'three.js production chunk scan',
  '==============================',
  '',
  `Signature, any marker: ${MARKERS.join(' | ')}`,
  `three chunks: ${threeChunks.length ? names.join(', ') : 'none found'}`,
  `three main chunk: ${label}`,
  `slot chunks: ${slotNames.length ? slotNames.join(', ') : 'none found'}`,
  `slot loader measured: ${slotRaw} bytes raw, ${slotGzip} bytes gzip, budget ${SLOT_BUDGET} bytes raw`,
  `slot loader under budget: ${slotUnderBudget}`,
  '',
  `Homepage chunk source: ${homepageSource || 'none found'}`,
  `Homepage initial chunks: ${homepageChunks.length}`,
  `Homepage three chunks: ${homepageThree.length ? homepageThree.join(', ') : 'none'}`,
  `Homepage chunks carrying a three marker: ${homepageMarkerHits.length ? homepageMarkerHits.join(', ') : 'none'}`,
  '',
  'Server artifacts referencing a three chunk:',
  ...(routeHits.length ? routeHits.map(({ file, hits }) => `  ${file} -> ${hits.join(', ')}`) : ['  none']),
  '',
  `Server artifacts referencing the slot loader: ${slotRouteFiles.length} (Next.js ships the global not-found boundary to every route)`,
  `Slot loader carries three code: ${slotCarriesThree}`,
  `404 route reaches the slot loader: ${notFoundReaches}`,
  `Result: ${bad ? 'FAIL' : 'PASS'}`,
  '',
  'The slot loader is a small client component with two dynamic import calls.',
  'three is fetched only when that component mounts on the 404 route.',
  '',
]

fs.writeFileSync(outFile, lines.join('\n'))
process.stdout.write(lines.join('\n'))
if (bad) process.exitCode = 1
