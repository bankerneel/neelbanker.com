# Particle evidence

Measurement recipe: Playwright with `chromium.launch({ channel: 'msedge' })` from the repo root, dev server bound
to 127.0.0.1, CDP CPU throttling 4x, slow 4G network emulation, and injected PerformanceObservers for LCP,
longtask (TBT) and layout-shift (CLS). The script is `scripts/measure-particles.mjs`. Set `LABEL=before2` or
`LABEL=after2` to reproduce the two JSON files here. Each route is warmed before throttling so dev compilation
does not pollute the numbers.

## Route metrics, warm dev server, CPU 4x, slow 4G

| Route and viewport | Before LCP | After LCP | Before TBT | After TBT | Before CLS | After CLS |
|---|---:|---:|---:|---:|---:|---:|
| / desktop 1440 | 948 ms | 888 ms | 210 ms | 401 ms | 0 | 0 |
| /about desktop | 772 ms | 788 ms | 167 ms | 171 ms | 0 | 0 |
| article desktop | 752 ms | 728 ms | 260 ms | 245 ms | 0 | 0 |
| / mobile 390 | 792 ms | 904 ms | 225 ms | 209 ms | 0 | 0 |
| /about mobile | 752 ms | 780 ms | 186 ms | 269 ms | 0 | 0 |
| article mobile | 696 ms | 728 ms | 233 ms | 261 ms | 0 | 0 |

The homepage desktop TBT is the one large looking delta. An earlier AFTER run of the same code measured 188 ms,
so the dev server swings between 188 ms and 401 ms against a 210 ms baseline. This harness cannot resolve a
production TBT regression at that spread, and the production chunk audit shows no extra initial JS. CLS is 0
everywhere because the slot box is reserved in server HTML. The particle script reported zero console errors and
zero page errors.

## Initial JS and chunk split

The committed artifacts are `initial-js-before.json` (totals measured on clean origin/dev), `initial-js-after.json`
(summary) and `initial-js-audit.json` (the full per-route chunk table and a scan of every emitted client chunk).
Both totals were produced with the same manifest-sum method: gzip size of every file listed in a route's
`polyfillFiles`, `rootMainFiles`, `lowPriorityFiles` and `pages` entries.

| Route | Before gzip | After gzip |
|---|---:|---:|
| / | 168 KB | 168 KB |
| /about | 168 KB | 168 KB |
| article | 168 KB | 168 KB |

The measured gain is 0 KB, but the before `.next` manifests are gitignored, so the zero delta is a measurement
and not independently auditable from the committed after-state manifests. The claim is stated that way on
purpose. What the committed after-state artifacts do prove is that `WebGLRenderer` appears in no route's initial
chunk lists. It appears only in two dynamic chunks, 49 KB gz and 86 KB gz, fetched when the homepage night band
comes within 200px of the viewport.

## Scene counts and DPR

| Viewport | Quality | Points | DPR cap | FPS |
|---|---|---:|---:|---:|
| 1440 desktop | high | 26000 | 2 | 61 |
| 1440 desktop | medium | 15600 | 1.25 | 61 |
| 1440 desktop | low | 8320 | 1 | 61 |
| 390 mobile | high | 10000 | 1.5 | 60 |
| 390 mobile | medium | 8000 floor | 1.25 | 61 |
| 390 mobile | low | 8000 floor | 1 | 61 |

The 8000 floor makes count stepping flat on phones below high: medium and low both render 8000 points, and only
DPR changes between them. FPS is counted from the runtime frame counter after the scene settles, with CPU 4x.
The high tier is the target for each device class. The adaptive tiers follow the source lab: 3 second warmup,
0.5 second wall clock FPS window, step down after 3 seconds below 45 FPS, step up after 8 seconds above 57 FPS.

## Reduced motion

The reduced motion context shows `running: false`, `frames: 1`, `count: 26000`, a painted canvas and no CSS
animation on the slot. The rendered frame is a static NEEL glyph. A theme flip while reduced clears the cached
frame, rebuilds the palette colours and repaints exactly one more frame without starting a loop. A late Archivo
re-sample also invalidates the cached frame.

## Screenshots

- `glyph-desktop-light.png`: 1440px slot, light theme
- `glyph-desktop-dark.png`: 1440px slot, dark theme
- `glyph-mobile-light.png`: 390px slot, light theme
- `glyph-mobile-dark.png`: 390px slot, dark theme
- `glyph-reduced-motion.png`: static NEEL frame
- `glyph-cycle-banker.png`: the second word after about 7 seconds

## Verification lines

```
npm.cmd run lint        exit=0
npm.cmd run typecheck   exit=0
npm.cmd test
 Test Files  2 passed (2)
      Tests  9 passed (9)
npm.cmd run build       exit=0
 ✓ Compiled successfully in 6.1s
   Finished TypeScript in 9.2s ...
npm.cmd run test:e2e
 61 passed (2.1m)
npx playwright test e2e/particles.spec.ts
 1 passed (27.2s)
```

Playwright is now pinned to two workers in `playwright.config.ts`, so the plain `npm run test:e2e` command passes.
The earlier flake at the default worker count came from the dev server and system Edge being starved on this
Windows box; unrelated navigation, form and layout tests timed out on different runs.
