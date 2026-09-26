// Guard for the Vitest toolchain (vitest 4 → vite 8 → rolldown).
//
// Vite 8 needs Node ^20.19.0 || >=22.12.0: it loads ES modules through
// require(), which older Node versions reject. On an older Node, npm also
// silently skips rolldown's native binding (its `engines` field doesn't
// match), so the failure surfaces as a baffling
// "Cannot find module './rolldown-binding.<platform>.node'".
// This check fails early and says what to do instead.
//
// Deliberately NOT expressed as `engines` in package.json: Vercel reads that
// field to choose the production Node version.

const [major, minor] = process.versions.node.split('.').map(Number)
const supported = (major === 20 && minor >= 19) || (major === 22 && minor >= 12) || major > 22

if (!supported) {
  console.error(
    [
      '',
      `  Node ${process.versions.node} is too old for the test toolchain (Vite 8 needs ^20.19.0 || >=22.12.0).`,
      '  Install Node 22 or 24 LTS (see .nvmrc), then reinstall packages so rolldown gets its native binding:',
      '',
      '    npm install',
      '    npm test',
      '',
    ].join('\n'),
  )
  process.exit(1)
}
