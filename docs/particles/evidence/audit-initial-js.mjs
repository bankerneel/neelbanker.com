// Initial route JS audit. Run from the repo root after npm run build.
// Sums the gzip size of every file listed in each route's Turbopack
// build-manifest.json (polyfillFiles, rootMainFiles, lowPriorityFiles, pages).
// Also scans every emitted client chunk for the literal WebGLRenderer and
// checks that none of the matching chunks are in a route's initial file list.
// Writes docs/particles/evidence/initial-js-ember.json.

import fs from 'node:fs'
import path from 'node:path'
import zlib from 'node:zlib'

const ROUTES = {
  '/': '.next/server/app/page/build-manifest.json',
  '/about': '.next/server/app/about/page/build-manifest.json',
  article: '.next/server/app/writing/[slug]/page/build-manifest.json',
}

const routes = {}
for (const [name, manifestPath] of Object.entries(ROUTES)) {
  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'))
  const files = []
  const add = (source, file) => {
    const full = path.join('.next', file)
    const bytes = zlib.gzipSync(fs.readFileSync(full)).length
    files.push({ source, file, gzipKB: Math.round(bytes / 1024) })
  }
  manifest.polyfillFiles.forEach((file) => add('polyfillFiles', file))
  manifest.rootMainFiles.forEach((file) => add('rootMainFiles', file))
  manifest.lowPriorityFiles.forEach((file) => add('lowPriorityFiles', file))
  for (const list of Object.values(manifest.pages || {})) list.forEach((file) => add('pages', file))
  routes[name] = { files, totalGzipKB: files.reduce((sum, item) => sum + item.gzipKB, 0) }
}

// Content scan: WebGLRenderer must live only in dynamic chunks.
const initialFiles = new Set(Object.values(routes).flatMap((route) => route.files.map((item) => item.file)))
const chunksWithWebGLRenderer = []
function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) walk(full)
    else if (entry.name.endsWith('.js') && fs.readFileSync(full, 'utf8').includes('WebGLRenderer')) {
      const relative = path.relative('.next', full).replaceAll('\\', '/')
      chunksWithWebGLRenderer.push({
        file: relative,
        gzipKB: Math.round(zlib.gzipSync(fs.readFileSync(full)).length / 1024),
        inInitialList: initialFiles.has(relative),
      })
    }
  }
}
walk(path.join('.next', 'static', 'chunks'))
chunksWithWebGLRenderer.sort((a, b) => a.file.localeCompare(b.file))
const initialMatches = chunksWithWebGLRenderer.filter((chunk) => chunk.inInitialList)
if (initialMatches.length) {
  throw new Error(`WebGLRenderer found in initial chunks: ${initialMatches.map((chunk) => chunk.file).join(', ')}`)
}

const payload = {
  method: 'gzip size of every file in each route production build-manifest.json, plus a content scan of emitted client chunks',
  generatedAt: new Date().toISOString(),
  routes,
  contentScan: {
    needle: 'WebGLRenderer',
    scannedDirectory: '.next/static/chunks',
    chunksWithWebGLRenderer,
    initialChunksWithWebGLRenderer: initialMatches.map((chunk) => chunk.file),
  },
}
fs.writeFileSync(
  path.join('docs/particles/evidence', 'initial-js-ember.json'),
  JSON.stringify(payload, null, 2) + '\n',
)
console.log(JSON.stringify({
  totals: Object.fromEntries(Object.entries(routes).map(([k, v]) => [k, v.totalGzipKB])),
  chunksWithWebGLRenderer: chunksWithWebGLRenderer.map((chunk) => chunk.file),
  initialChunksWithWebGLRenderer: payload.contentScan.initialChunksWithWebGLRenderer,
}, null, 2))
