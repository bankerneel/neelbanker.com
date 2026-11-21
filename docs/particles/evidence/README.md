# Particle evidence

Measurement recipe: Playwright with `chromium.launch({ channel: 'msedge' })` from the repo root, dev server bound
to 127.0.0.1, CDP CPU throttling 4x, slow 4G network emulation, and injected PerformanceObservers for LCP,
longtask (TBT) and layout-shift (CLS). The script is `scripts/measure-particles.mjs`. Set `LABEL=before2` or
`LABEL=after2` to reproduce the two JSON files here. Each route is warmed before throttling so dev compilation
does not pollute the numbers.

## Route metrics, warm dev server, CPU 4x, slow 4G

| Route and viewport | Before LCP | After LCP | Before TBT | After TBT | Before CLS | After CLS |
|---|---:|---:|---:|---:|---:|---:|
| / desktop 1440 | 948 ms | 920 ms | 210 ms | 188 ms | 0 | 0 |
| /about desktop | 772 ms | 804 ms | 167 ms | 216 ms | 0 | 0 |
| article desktop | 752 ms | 744 ms | 260 ms | 263 ms | 0 | 0 |
| / mobile 390 | 792 ms | 820 ms | 225 ms | 213 ms | 0 | 0 |
| /about mobile | 752 ms | 756 ms | 186 ms | 164 ms | 0 | 0 |
| article mobile | 696 ms | 720 ms | 233 ms | 247 ms | 0 | 0 |

All deltas are within dev server noise. There is no visible regression. CLS is 0 everywhere because the slot
box is reserved in server HTML. The particle script reported zero console errors and zero page errors.

## Initial JS and chunk split

| Route | Before gzip | After gzip |
|---|---:|---:|
| / | 168 KB | 168 KB |
| /about | 168 KB | 168 KB |
| article | 168 KB | 168 KB |

Initial JS gain is 0 KB, well under the 2 KB loader budget. The marker `WebGLRenderer` appears in no route's
`polyfillFiles` or `rootMainFiles`. It appears only in two dynamic chunks, 49 KB gz and 85 KB gz, which are
fetched when the homepage night band comes within 200px of the viewport.

## Scene counts and DPR

| Viewport | Quality | Points | DPR cap | FPS |
|---|---|---:|---:|---:|
| 1440 desktop | high | 26000 | 2 | 61 |
| 1440 desktop | medium | 15600 | 1.25 | 61 |
| 1440 desktop | low | 8320 | 1 | 61 |
| 390 mobile | high | 10000 | 1.5 | 60 |
| 390 mobile | medium | 6000 | 1.25 | 61 |
| 390 mobile | low | 8000 floor | 1 | 61 |

FPS is counted from the runtime frame counter after the scene settles, with CPU 4x. The high tier is the target
for each device class. The adaptive tiers follow the source lab: 3 second warmup, 0.5 second wall clock FPS
window, step down after 3 seconds below 45 FPS, step up after 8 seconds above 57 FPS.

## Reduced motion

The reduced motion context shows `running: false`, `frames: 1`, `count: 26000` and no CSS animation on the slot.
The rendered frame is a static NEEL glyph.

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
 ✓ Compiled successfully in 6.0s
   Finished TypeScript in 10.5s ...
npx playwright test --workers=2
 64 passed (1.5m)
npx playwright test e2e/particles.spec.ts
 1 passed (18.9s)
```

Note on e2e: the full suite at the repo default worker count is flaky on this machine. Different pre-existing
tests time out on different runs (navigation filter, theme across reloads, contact form, layout overflow),
including in a baseline run without the particle spec. The complete suite passes consistently with two workers.
