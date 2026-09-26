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

- Homepage was intentionally de-cluttered after becoming too dense.
- Marquee was re-added because the user preferred it as a separator — kept in the redesign as a tilted butter "ticker tape" strip.
- `pretext` was evaluated and rejected for current motion/performance needs.
- Article body width stays narrow; only the article header was widened.
- Footer wordmark “Neel Banker” was intentionally restored to the original heavier styling.
- Horizontal overflow: `<main>` has `overflow-x-clip` as a safety net for tilted pieces, which also hides overflow from `scrollWidth` checks — measure glyph extents with a Range or element rects instead.
- Homepage headline uses `clamp(2.8rem, 16vw, 10rem)`: "BUILDING" measures 5.07em, so 16vw fits inside the gutters at 320/375/640/1024px (measured with a Range at 375px: right edge 324px of 355). Re-measure before raising it.
- `ProjectCard` has a `featured` variant (bigger title + handwritten "no. 01") reserved for the homepage; the `/projects` browser uses the plain variant.
- `/resume` renders the resume as a hand-built white serif "document sheet" (in `app/resume/page.tsx`), NOT via `latex.js` and NOT as an embedded PDF. Reasons: `latex.js` cannot emulate `\hfill` or load `titlesec`/`tabularx`/`booktabs`/`enumitem`/`multicol` (per its own docs) so it would break this resume, and no LaTeX compiler is available locally to produce a PDF. If the sheet content changes, also update `resume/neel-banker-resume.tex` (source of truth) and the served copy `public/resume/neel-banker-resume.tex` — they must not drift.
- Resume "Download PDF" is browser print-to-PDF, driven by the `@media print` block in `app/globals.css` that isolates `.resume-sheet` (hides `header`/`footer`/`.no-print`, neutralizes `.resume-doc-wrap`). Keep those class names in sync if the page markup changes.
- `framer-motion` was intentionally REMOVED (uninstalled) for performance — do NOT reintroduce it. All reveal/hover motion is CSS. Reveal system: `components/scroll-reveal.tsx` (IntersectionObserver toggles `.is-visible`) + the `.reveal*`/`.stagger*`/`fade-in` classes and keyframes in `app/globals.css`. Reduced-motion is handled by the CSS guard there.
- Homepage hero (2026-09-27): the old dark hero, its lazy desktop constellation (`hero-constellation*`) and `hero-logos` were removed — the Dream Bazaar wall (`components/home-hero.tsx`) is a static server component with no entrance animation, so the h1 (LCP) paints immediately. Homepage JS stayed at ~234 KB and HTML fell ~145 → 110 KB.
- `/design-lab` holds 17 redesign prototypes (A–Q) and is kept **on purpose** as shareable reference work — Neel sends the link to people who ask him to build their site. Do not delete it, do not link it from site nav, and do not add it to `sitemap.ts`. It is `noindex` via the lab layout metadata; deliberately NOT disallowed in `robots.ts`, because blocking crawl would stop crawlers from ever seeing the `noindex`.
- **P · Dream Bazaar is the selected redesign direction** (Maximalism × Dream Collage — overlapping scraps, polaroids, pattern swatches on a dream sky, no grid). Marked `selected: true` in `app/design-lab/_content.ts`; the index page renders a badge from that flag.
- Design-lab conventions: all prototypes share content from `_content.ts`; palettes live in CSS custom properties in `app/design-lab/lab.css` so light/dark is one class swap; `_components/theme-shell.tsx` owns toggle state for O/P/Q. The lab is a **frozen reference**: since Archivo + Caveat moved to the root layout, the lab layout loads only the fonts the live site no longer has (Syne, JetBrains Mono, Instrument Serif, Playfair) so prototypes that inherited Syne/JetBrains still render as built. `--font-mono` falls back through `var(--font-jetbrains, ui-monospace)` for this reason. Don't restyle `lab.css` to match the live system.
- CSS gotcha learned in the lab: `clip-path` (the `.torn` edges) clips borders AND `box-shadow`. The live site draws torn shadows as a **separate clipped layer behind the paper** (`components/bazaar/scrap.tsx`) instead of `filter: drop-shadow` — no filter layer on a 6000px-tall article sheet, and it works with any content height. Percentage clip-path jags scale with height, so tall content uses `.torn-sheet` (fixed 14px tear). Related: a `mix-blend-mode` layer needs `isolation: isolate` on its parent.
- Homepage First Load JS is ~234 KB (down from ~292 KB) after removing framer-motion; the framework (React 19 + Next) is the irreducible bulk. Measure cold loads (first page after server start) — second-page numbers undercount shared cached chunks.
- Fonts (2026-09-27): Archivo variable 34.9 KB + Caveat **one static weight (500)** 51.0 KB = 85.9 KB, vs 65.9 KB for the old Syne + JetBrains pair. Caveat's variable file is 74.6 KB — don't switch back to it for a few handwritten words.
- Theme mechanism: a `next/script` (`beforeInteractive`, id `theme-init`) in `app/layout.tsx` sets `data-theme` on `<html>` before paint from `localStorage['nb-theme']` or the OS. Key is namespaced because a generic `theme` key collided with another localhost app during testing. `ThemeToggle` reads the attribute via `useSyncExternalStore` and swaps its icon in CSS, so SSR markup never mismatches.
- Palette contrast was measured and the lab values were corrected for the live site: terra as text is 2.7:1 (so `--dm-accent-ink` #9a4a2c / #e59a74 is the only coloured text); dark-mode sky/lilac/sage/rose were lifted so dark on-accent text clears 4.5:1; light terra nudged to #d68f73 (4.86:1); dark panel lifted #241d2b → #342b3f because it matched the sky and hid the torn edges.
- The Cal.com embed renders in an iframe and can't read `--dm-*`, so `components/cal-booking-embed.tsx` mirrors the palette hex values (`cal-brand`, `cal-bg`) and remounts the embed (keyed by theme via `lib/use-theme.ts`) when the site theme flips. Update those hexes if the palette changes.
- Theme script on `notFound()` pages (checked 2026-09-27, dev + prod): a raw `<script>` in the layout `<head>` is present but never executes there, and `next/script beforeInteractive` is absent entirely — so `ThemeToggle` applies the theme on mount when `data-theme` is unset. In dev only, that path also logs React's "Encountered a script tag" warning and a React perf-track `measure … negative time stamp` error; both are framework dev noise, absent in prod. Unmatched URLs (root `not-found.tsx`) are fine.
- **Verifying print without a print dialog:** Playwright is a devDependency but has no bundled browser; launch the system Edge instead (`chromium.launch({ channel: 'msedge' })`), then `page.pdf()` and `page.emulateMedia({ media: 'print' })` + screenshot. No download needed. Used 2026-09-27 to verify `/resume` prints clean in both themes.
- Articles render MDX with `remark-gfm`. Before 2026-09-27 the cross-chain article's comparison table rendered on production as one paragraph of pipe characters.

## Interaction Preferences Learned

- The user prefers:
  - distinctive typography for the `Neel Banker` wordmark
  - motion that feels premium, not gimmicky
  - iterative visual refinement with direct corrections
  - full-section/page passes instead of isolated micro-fixes
- When a section still feels visually “boxed” or heavy, reduce nested border-grid treatments first.

## Things That Already Went Wrong Once

- Recognition section initially had too many nested grid/border wrappers and had to be flattened.
- Direct-links pill state on `/writing?pillar=...` previously broke and was fixed via URL-driven state.

## Best Next Operational Step

- The Dream Bazaar redesign is complete on `dev`; next is Neel's review of the preview and a `dev` → `main` PR. After that, a real-device QA pass (iOS Safari, low-end Android) and end-to-end form checks against production Resend.
