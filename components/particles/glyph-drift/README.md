# Glyph Drift

Port of the particle text study into the shared particle runtime.

Words cycle in one order only: NEEL then BANKER. Each word holds for about
three seconds, dissolves into a noise cloud for about 1.1 seconds and reforms
for about 1.4 seconds. Reduced motion shows one static NEEL frame, with no
frame loop and no cycling.

Points are sampled from the filled pixels of text rasterised into an offscreen
canvas. The sampler waits for `document.fonts.load('900 236px "Archivo"')` and
`document.fonts.ready`, then uses Archivo 900 when that face is available and
falls back to Arial only when it is not. The first frame uses the fallback so
the box is never blank while the promise settles.

Colours are read from `--dm-sky`, `--dm-lilac`, `--dm-butter` and the other
`--dm-*` tokens at runtime and rebuilt on every theme flip. The gradient runs
cool to warm across the glyph and sits on the dark night band in both themes.
There is no bloom pass.

Counts are chosen for this site rather than copied from the lab. Desktop tiers
are 26000 at high, 15600 at medium and 8320 at low. Phone tiers are 10000 at
high, 8000 at medium and 8000 at low. The 8000 floor means count stepping is
flat on phones below high; only the DPR and point size change there. DPR caps
are 2 on desktop, 1.5 on phones, then 1.25 at medium and 1 at low.

Pointer repulsion uses a passive `pointermove` listener on the wrapper. The
wrapper sets `touch-action: pan-y` so vertical page scrolling is not captured.
