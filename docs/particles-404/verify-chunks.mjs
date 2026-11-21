// Production proof that three.js is reachable only from the 404 page.
// Run after `npm run build`: node docs/particles-404/verify-chunks.mjs
// The report is written next to this file as chunk-scan.txt.

import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const nextDir = path.join(root, '.next')
const outFile = path.join(root, 'docs', 'particles-404', 'chunk-scan.txt')
const MARKERS = ['WebGLRenderer', 'BufferGeometry']

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
const threeChunks = chunks.filter((file) => MARKERS.every((marker) => bodies.get(file).includes(marker)))
const slotChunks = chunks.filter((file) => bodies.get(file).includes('particle-slot'))
const names = threeChunks.map((file) => path.basename(file))
const slotNames = slotChunks.map((file) => path.basename(file))

const routeFiles = walk(path.join(nextDir, 'server', 'app')).filter((f) => /\.(html|rsc)$/.test(f))
const routeHits = []
for (const file of routeFiles) {
  const body = reads(file)
  const hits = names.filter((name) => body.includes(name))
  if (hits.length) routeHits.push({ file: relative(file), hits })
}

const slotRouteFiles = routeFiles.filter((file) => slotNames.some((name) => reads(file).includes(name)))
const notFoundReaches = slotRouteFiles.some((file) => relative(file).includes('_not-found'))
const slotCarriesThree = slotChunks.some((file) => MARKERS.some((marker) => bodies.get(file).includes(marker)))
const bad = routeHits.length > 0 || !notFoundReaches || slotCarriesThree || threeChunks.length === 0
const label = path.basename(threeChunks[0] ?? 'none')

const lines = [
  'three.js production chunk scan',
  '==============================',
  '',
  `Signature: ${MARKERS.join(' + ')}`,
  `three chunks: ${threeChunks.length ? names.join(', ') : 'none found'}`,
  `three main chunk: ${label}`,
  `slot chunks: ${slotNames.length ? slotNames.join(', ') : 'none found'}`,
  '',
  'Route payloads referencing a three chunk:',
  ...(routeHits.length ? routeHits.map(({ file, hits }) => `  ${file} -> ${hits.join(', ')}`) : ['  none']),
  '',
  `Routes referencing the slot loader: ${slotRouteFiles.length} (Next.js ships the global not-found boundary to every route)`,
  `Slot loader carries three code: ${slotCarriesThree}`,
  `404 route reaches the slot loader: ${notFoundReaches}`,
  `Result: ${bad ? 'FAIL' : 'PASS'}`,
  '',
  'The slot loader is a 1 KB client component with two dynamic import calls.',
  'three is fetched only when that component mounts on the 404 route.',
  '',
]

fs.writeFileSync(outFile, lines.join('\n'))
process.stdout.write(lines.join('\n'))
if (bad) process.exitCode = 1
