// Initial route JS audit. Run from the repo root after npm run build.
// Sums the gzip size of every file listed in each route's Turbopack
// build-manifest.json (polyfillFiles, rootMainFiles, lowPriorityFiles, pages).
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

const payload = {
  method: 'gzip size of every file in each route production build-manifest.json',
  generatedAt: new Date().toISOString(),
  routes,
}
fs.writeFileSync(
  path.join('docs/particles/evidence', 'initial-js-ember.json'),
  JSON.stringify(payload, null, 2) + '\n',
)
console.log(JSON.stringify(Object.fromEntries(Object.entries(routes).map(([k, v]) => [k, v.totalGzipKB])), null, 2))
