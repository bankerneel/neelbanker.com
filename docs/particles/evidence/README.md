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

`glyph-cycle-banker.png` is unchanged from the previous commit (b737097), while the other five were regenerated
there. The two follow-up runtime fixes cover mount re-election and the reduced-motion static frame; neither changes
the animated NEEL to BANKER cycle this still captures, so it remains an accurate record of the final scene.

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

---

## Ember Field evidence (stacked PR on PR 19)

Before means clean `2b9373e` (PR 19) on a second dev server bound to 127.0.0.1:3001. After means this branch on
127.0.0.1:3000. Both were measured with the same standalone harness
(`tools/particle-proof/measure.mjs` in the particle proof worktree), msedge, CPU 4x on phone, CPU 1 on desktop,
slow 4G, warm route, 6 second observation. Raw files are `before-*.json` and `proof-*.json` here.

| Route and viewport | Before LCP | After LCP | Before TBT | After TBT | Before CLS | After CLS |
|---|---:|---:|---:|---:|---:|---:|
| / desktop 1440 | 1556 ms | 1596 ms | 260 ms | 258 ms | 0 | 0 |
| /about desktop | 1484 ms | 1488 ms | 102 ms | 93 ms | 0 | 0 |
| article desktop | 1492 ms | 1508 ms | 94 ms | 92 ms | 0 | 0 |
| / mobile 390 | 3140 ms | 3248 ms | 2000 ms | 1344 ms | 0 | 0 |
| /about mobile | 2436 ms | 2376 ms | 971 ms | 969 ms | 0 | 0 |
| article mobile | 2368 ms | 2440 ms | 913 ms | 923 ms | 0 (see note) | 0.07 (see note) |

The dev route comparison is inconclusive, not an improvement. `proof-mobile-home.json` records a long task at
t=5025.7 ms with duration 895 ms and FCP at 3248 ms. That task is just outside the harness 5000 ms TBT window,
while the before run's 876 ms task at t=4972.9 ms landed inside it with FCP at 3140 ms. Both runs have a roughly
900 ms long task after FCP, so the lower after TBT is a window boundary artifact, not evidence of a regression
fixed or a performance gain. The LCP difference of 108 ms is within dev server noise. A quiet production pass
is planned separately after this PR is clean.

The article CLS is not caused by Ember. Three repeated runs of the same article route measured 0.07 on this
branch and 0.07 on the clean base, while the first single pass on both measured 0; the repeat files
`proof-mobile-article-repeat*.json` and `before-mobile-article-repeat*.json` record that. The article has no
Ember slot, and the slot emits no DOM on any non-homepage route.

## Initial JS and chunk split

`node docs/particles/evidence/audit-initial-js.mjs` produced `initial-js-ember.json` after `npm run build`:

| Route | PR 19 gzip | Ember gzip |
|---|---:|---:|
| / | 168 KB | 168 KB |
| /about | 168 KB | 168 KB |
| article | 168 KB | 168 KB |

Zero gain. The audit also scans the contents of every emitted client chunk for the literal `WebGLRenderer`.
The committed output records the two matching dynamic chunks and an empty `initialChunksWithWebGLRenderer`
list, so no route's initial manifest includes the renderer.

## Scene counts, DPR and host frame cadence

`node docs/particles/evidence/measure-ember.mjs` produced `metrics-ember.json`. Tiers were pinned through the
existing debug hook after scrolling the footer slot into view. Phone runs used CPU 4x and desktop runs CPU 1,
both with slow 4G.

The cadence value comes from `window.__NB_PARTICLES__.getState().frames`, which the shared runtime increments
once per host requestAnimationFrame render while the simulation shader runs. WebGL work is asynchronous, so
this is a host frame cadence figure, not a GPU timer query and not a measurement of shader execution time.
It is labelled `hostFrameCadence` in the JSON.

| Viewport | Tier | Points | DPR cap | Host frame cadence per second | Console errors |
|---|---|---:|---:|---:|---:|
| 1440 desktop | high | 57600 | 2 | 60.11 | 0 |
| 1440 desktop | medium | 36864 | 1.25 | 59.91 | 0 |
| 1440 desktop | low | 12544 | 1 | 59.78 | 0 |
| 390 phone | high | 57600 | 1.5 | 59.97 | 0 |
| 390 phone | medium | 36864 | 1.25 | 60.07 | 0 |
| 390 phone | low | 12544 | 1 | 59.97 | 0 |

The host keeps its cadence at the auto selected high tier, so no reduction or fallback was needed. Because
this is a host cadence measurement with no GPU timing, the claim is limited to the host keeping a steady
cadence while Ember runs.

## Still and fallback

Under reduced motion the footer shows one settled plume, `running: false` and `frames: 1`; a theme flip repaints
exactly one more frame. Save-Data follows the same path through the director. With `getContext('webgl')` and
`getContext('webgl2')` overridden to return null, the slot renders the `tone-*` still with no canvas and no
console error. A synthetic `webglcontextlost` on the live canvas switches to the same still.

## Ember screenshots

These are element crops of the footer end card, not full viewport screenshots. The desktop crops are about
1400 by 559 pixels taken from a 1440 wide viewport; the phone crops are the full 390 width of the end card.

- `ember-desktop-light.png`: 1440px footer end card, light theme
- `ember-desktop-dark.png`: 1440px footer end card, dark theme
- `ember-mobile-light.png`: 390px footer end card, light theme
- `ember-mobile-dark.png`: 390px footer end card, dark theme
- `ember-reduced-motion.png`: settled plume, no loop
- `ember-fallback.png`: static on-theme still with no WebGL

## Verification lines

```
npm.cmd run lint        exit=0
npm.cmd run typecheck   exit=0
npm.cmd test
  Test Files  2 passed (2)
       Tests  9 passed (9)
npm.cmd run build       exit=0
  ✓ Compiled successfully in 6.0s
    Finished TypeScript in 9.8s ...
npm.cmd run test:e2e
  62 passed (1.3m)
node node_modules/@playwright/test/cli.js test e2e/particles.spec.ts --workers=1
  2 passed (18.9s)
```

`e2e-pinned.log` is the full suite output captured from this head and records 62 passed.
