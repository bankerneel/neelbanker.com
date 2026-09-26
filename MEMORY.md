# Memory

## File Role

- Use this file for durable project memory, not turn-by-turn status updates.
- Use `STATES.md` for current progress and `ROADMAP.md` for prioritized next work.

## Product / Brand

- Personal brand site for Neel Banker.
- **2026-09: the whole site is being redesigned in Dream Bazaar (Direction P)** — muted pastel collage on a
  dream-sky gradient, light + dark. The old dark + lime editorial look and Syne/JetBrains Mono are retired;
  pages migrate one by one (ROADMAP §0). Rules live in AGENTS.md "Design".
- Neel's wife co-decides design direction. Muted, harmonious colour is a hard preference: a neon
  maximalism prototype was rejected as garish ("dhinchak") and the same layout in muted tones was approved.

## Technical

- Next.js 16 async request APIs must be respected.
- Tailwind v4 is CSS-first; do not create `tailwind.config.ts`.
- `lib/mdx.ts` is server-only because it uses `fs`.
- Use `apply_patch` for manual file edits.

## Content / NDA

- Several Tech Alchemy-specific project names were intentionally anonymized in public content.
- Preserve pseudo/codename references unless the user explicitly asks otherwise.
- Public-facing content should avoid directly exposing NDA-sensitive client/project names.
- Hindustan Ecolife should be described accurately: Neel built, developed, and hosts the site; the business is run by his uncle, who is the director.

## UI / UX Decisions Already Made

- Mobile side-scroll is handled at component level in the hero eyebrow row (`flex max-w-full` + `min-w-0`), rather than document-level overflow clipping.
- Homepage was intentionally de-cluttered after becoming too dense.
- Marquee was re-added because the user preferred it as a separator.
- Hero is intentionally animation-forward, but the text treatment should remain unchanged.
- Hero eyebrow line was strengthened with a better color treatment and a subtle signal marker.
- Hero supporting copy and meta cards were rewritten/refined to feel more intentional.
- `pretext` was evaluated and rejected for current motion/performance needs.
- Article body width stays narrow; only the article header was widened.
- Footer wordmark “Neel Banker” was intentionally restored to the original heavier styling.
- Some mobile touch-target and density cleanup has already been done on filters, hero fallback, and Cal embed height, but a true browser/device QA pass is still pending.
- Hero display headline uses `clamp(2.5rem, 9vw, 10rem)`. The `2.5rem` floor exists specifically so the longest word ("BUILDING") does not clip on narrow phones — do not raise it back to `3rem` without re-checking mobile at ~360–375px.
- `--muted-foreground` is intentionally `hsl(0 0% 54%)` (not 46%) for readable contrast on the `hsl(0 0% 3.5%)` background. Keep muted body/label text at or above this lightness for WCAG AA.
- `ProjectCard` has a `featured` variant (bigger title + faint monospace index watermark) reserved for the homepage featured grid; the `/projects` browser uses the plain variant. The faint corner numeral is a deliberate "number typography as brand device" cue — keep it subtle.
- Hero has a static film-grain layer (`mix-blend-overlay`, opacity `0.12`, inline SVG `feTurbulence`, `z-20`). It is intentionally static (no animation) so it does not add motion cost and is reduced-motion safe. On the near-black base, `overlay` reads where `soft-light` did not — do not switch back to soft-light.
- Global hover language was intentionally NOT unified: the pillar-card full-color fill is a deliberate accent (AGENTS.md wants it preserved), so a blanket hover refactor was declined rather than risk flattening it.
- `/resume` renders the resume as a hand-built white serif "document sheet" (in `app/resume/page.tsx`), NOT via `latex.js` and NOT as an embedded PDF. Reasons: `latex.js` cannot emulate `\hfill` or load `titlesec`/`tabularx`/`booktabs`/`enumitem`/`multicol` (per its own docs) so it would break this resume, and no LaTeX compiler is available locally to produce a PDF. If the sheet content changes, also update `resume/neel-banker-resume.tex` (source of truth) and the served copy `public/resume/neel-banker-resume.tex` — they must not drift.
- Resume "Download PDF" is browser print-to-PDF, driven by the `@media print` block in `app/globals.css` that isolates `.resume-sheet` (hides `header`/`footer`/`.no-print`, neutralizes `.resume-doc-wrap`). Keep those class names in sync if the page markup changes.
- `framer-motion` was intentionally REMOVED (uninstalled) for performance — do NOT reintroduce it. All reveal/hover motion is CSS. Reveal system: `components/scroll-reveal.tsx` (IntersectionObserver toggles `.is-visible`) + the `.reveal*`/`.stagger*`/`hero-*`/`fade-in` classes and keyframes in `app/globals.css`. Reduced-motion is handled by the CSS guard there.
- Hero architecture (perf-critical, don't collapse back): `hero-client.tsx` is a STATIC server component (no client JS) rendering the fold with CSS animations; `hero-constellation.tsx` is the CSS-only desktop background (12 curated nodes from `hero-logos.tsx`); `hero-constellation-lazy.tsx` gates it behind `matchMedia('(min-width:1024px)')` + `next/dynamic ssr:false` so it never loads on mobile and never blocks first paint. Keep the hero fold framer-motion-free and keep the constellation lazy/desktop-only.
- `/design-lab` holds 17 redesign prototypes (A–Q) and is kept **on purpose** as shareable reference work — Neel sends the link to people who ask him to build their site. Do not delete it, do not link it from site nav, and do not add it to `sitemap.ts`. It is `noindex` via the lab layout metadata; deliberately NOT disallowed in `robots.ts`, because blocking crawl would stop crawlers from ever seeing the `noindex`.
- **P · Dream Bazaar is the selected redesign direction** (Maximalism × Dream Collage — overlapping scraps, polaroids, pattern swatches on a dream sky, no grid). Marked `selected: true` in `app/design-lab/_content.ts`; the index page renders a badge from that flag.
- Design-lab conventions: all prototypes share content from `_content.ts`; palettes live in CSS custom properties in `app/design-lab/lab.css` so light/dark is one class swap; `_components/theme-shell.tsx` owns toggle state for O/P/Q. The lab is a **frozen reference**: since Archivo + Caveat moved to the root layout, the lab layout loads only the fonts the live site no longer has (Syne, JetBrains Mono, Instrument Serif, Playfair) so prototypes that inherited Syne/JetBrains still render as built. `--font-mono` falls back through `var(--font-jetbrains, ui-monospace)` for this reason. Don't restyle `lab.css` to match the live system.
- CSS gotcha learned in the lab: `clip-path` (the `.torn` edges) clips borders AND `box-shadow`. The live site draws torn shadows as a **separate clipped layer behind the paper** (`components/bazaar/scrap.tsx`) instead of `filter: drop-shadow` — no filter layer on a 6000px-tall article sheet, and it works with any content height. Percentage clip-path jags scale with height, so tall content uses `.torn-sheet` (fixed 14px tear). Related: a `mix-blend-mode` layer needs `isolation: isolate` on its parent.
- Homepage First Load JS is ~234 KB (down from ~292 KB) after removing framer-motion; the framework (React 19 + Next) is the irreducible bulk. Measure cold loads (first page after server start) — second-page numbers undercount shared cached chunks.
- Fonts (2026-09-27): Archivo variable 34.9 KB + Caveat **one static weight (500)** 51.0 KB = 85.9 KB, vs 65.9 KB for the old Syne + JetBrains pair. Caveat's variable file is 74.6 KB — don't switch back to it for a few handwritten words.
- Theme mechanism: inline script in `app/layout.tsx` sets `data-theme` on `<html>` before paint from `localStorage['nb-theme']` or the OS. Key is namespaced because a generic `theme` key collided with another localhost app during testing. `ThemeToggle` reads the attribute via `useSyncExternalStore` and swaps its icon in CSS, so SSR markup never mismatches.
- Palette contrast was measured and the lab values were corrected for the live site: terra as text is 2.7:1 (so `--dm-accent-ink` #9a4a2c / #e59a74 is the only coloured text); dark-mode sky/lilac/sage/rose were lifted so dark on-accent text clears 4.5:1; light terra nudged to #d68f73 (4.86:1); dark panel lifted #241d2b → #342b3f because it matched the sky and hid the torn edges.
- The Cal.com embed renders in an iframe and can't read `--dm-*`, so `components/cal-booking-embed.tsx` mirrors the palette hex values (`cal-brand`, `cal-bg`) and remounts the embed (keyed by theme via `lib/use-theme.ts`) when the site theme flips. Update those hexes if the palette changes.
- Articles render MDX with `remark-gfm`. Before 2026-09-27 the cross-chain article's comparison table rendered on production as one paragraph of pipe characters.

## Interaction Preferences Learned

- The user prefers:
  - distinctive typography for the `Neel Banker` wordmark
  - motion that feels premium, not gimmicky
  - iterative visual refinement with direct corrections
  - full-section/page passes instead of isolated micro-fixes
- When a section still feels visually “boxed” or heavy, reduce nested border-grid treatments first.

## Things That Already Went Wrong Once

- Hero badge neon-border experiment made logos look square and was reverted.
- Overly aggressive hero badge chrome tends to cheapen the constellation; keep hover emphasis elegant.
- Recognition section initially had too many nested grid/border wrappers and had to be flattened.
- Some `grid gap-px bg-border` wrappers showed as gray blocks when the child wrapper lacked `bg-background`.
- Direct-links pill state on `/writing?pillar=...` previously broke and was fixed via URL-driven state.

## Best Next Operational Step

- Browser QA/fix pass is the highest-value next move, especially for hero, forms, and responsive layouts.
