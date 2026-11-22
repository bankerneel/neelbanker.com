# States

Last updated: 2026-11-22

## File Purpose

- `STATES.md`: current snapshot
- `MEMORY.md`: durable context and decisions
- `ROADMAP.md`: prioritized next work

## Status

The main site surfaces have gone through a broad UX/content refinement pass.
Core routes now feel substantially more consistent, lighter, and more editorial than the earlier baseline.

## Completed

- **Folded Scrap brand refresh (2026-11-20):** A hand-cut N on butter paper now appears in the favicon, app icons, nav, footer, and both social cards. The [brand evidence](design/brand-refresh/README.md) includes the 16 px colour comparison and both site themes.

- **Homepage hero systems and 404 Glyph Drift (2026-11-22, PR 21 into `dev`, head `1f5feb7`):**
  - Burning paper loads through a tiny client slot at `components/hero-systems/hero-burn-slot.tsx`. The engine
    is a dynamic import gated by the ~1.2 s hook and intersection, so it never enters the homepage initial
    chunk list. The absolute overlay never shifts layout, and reduced motion leaves it empty. It reads the new
    `--dm-ember` and `--dm-glow` tokens plus the existing palette.
  - The pinned three era career map uses a server-rendered slot (`sub-hero-slot.tsx`) and a small gate
    (`sub-hero-gate.tsx`) that dynamic imports `sub-hero.tsx` and `engine.ts` on intersection. The engine is
    absent from the homepage initial chunk list. Scroll walks blockchain, web3 and AI agents. The era chip is
    a real link, all three links stay in the HTML, and reduced motion drops the pin for a still frame and
    open links.
  - Glyph Drift (`components/particles/slot.tsx`, `glyph-drift/`, `app/particles-404.css`) lives only on the
    404. three.js is dynamic imported after the reserved slot intersects, never in an initial bundle.
  - Evidence: 20 screenshots in `design/hero-systems/shots/` were rechecked against the lazy slots and kept,
    since only animation phase differs. Before and after production metrics use 5 interleaved runs. 76 e2e
    plus 9 unit tests pass.
  - Interleaved medians (CPU 4x, slow 4G on phone): LCP 1952 to 1752 ms desktop and 3012 to 3096 ms phone,
    TBT 677 to 680 ms desktop and 349 to 379 ms phone, CLS 0, host frame cadence flat at a 16.7 ms median.
    Initial JS gzip on `/` is 201.2 KB against 200.1 KB at dev, a +1152 B delta inside the +2 KB cap; the 404 is
    198.5 KB. A final trim of the two tiny lazy gates removed 1099 B gzip from the earlier 202.3 KB head.
    TBT is within noise on both widths, so the earlier regression is resolved without relaxing any
    budget. Ember Field and the rejected Particle Lab homepage placement are not shipped.

- **Bands + the homepage film (2026-09-27, local branch `feat/motion-film`, not pushed):**
  - Section breaks: full-bleed bands with torn / perforated / zig-zag / scalloped edges on `/`, `/about`, `/projects`, `/work-with-me`.
  - Homepage motion: CSS hook (paper strips rip off the headline), scroll-driven sequence (a different technique per section), footer finale at dusk, living WebGL sky (dawn → dusk). Rules and budgets in AGENTS.md "Motion".
  - Bake-off: GSAP hook and Three.js sky built, measured and rejected (TBT and weight); CSS hook + shader sky chosen by Neel.
  - `/about` polaroid uses Neel's photo (`public/images/neel-banker.webp`, 320px, 6.7 KB, from his GitHub avatar; a plain `img` — `next/image` cost more JS than it saved).
  - Every other page got the light version (Neel's do / don't in AGENTS.md "Motion"): `/about`, `/projects`, `/work-with-me`, `/writing`, `/resources`, `/speaking`, `/newsletter`. Articles, `/resume` and all forms stay still. The old `FadeUp` (content invisible until hydration) is deleted; article footers are now static.
  - Inner pages measured before → after (375px, CPU 4×, slow 4G): LCP within noise, TBT within +25 ms, JS +1.7–4.7 KB, CLS 0 everywhere (rolling counters reserve their width).
  - Measured (375px, CPU 4×, slow 4G): TBT 86 ms (unchanged), CLS 0, +2.5 KB JS, 3.5 KB gz motion CSS, 0 janky frames. 40 e2e + 9 unit tests pass.

- **Project naming by group + drafts published (2026-09-27, on `dev`, PR #13):**
  - SoluLab projects use real names; Tech Alchemy keeps codenames; personal projects get pseudonym product names (groups confirmed by Neel: 14 TA, 1 SoluLab, 5 Personal). `employer` now accepts `Personal`.
  - DocTrace restored (`doctrace-fabric-documents`), rewritten from Neel's notes + SoluLab's case study, pinned first on `/projects` and leading the homepage arch.
  - `/projects` case-study section: 16 SoluLab case studies by name (updated routes + new ones), all links checked (200).
  - Five drafts published to `content/writing` with dates spread 30 Apr → 27 Sep 2026 (Neel's choice); `skale-appchains` stays a local outline.

- **Backlog pass (2026-09-27, on `dev`):**
  - Writing: `<Callout>` MDX component, copyable code blocks with language labels, same-pillar "More on …" list, reading-progress bar.
  - Projects: "what shipped" outcome bullets on every card, parsed from each project's `## Outcome` section; homepage spotlight lists them too.
  - Homepage: "receipts, not adjectives" proof strip, recruiter lane, conversion-ordered sections ("Start here" removed).
  - Tests: 32 Playwright e2e tests (routes, nav, forms with mocked APIs, print, layout-overflow guard) + 9 Vitest unit tests; `npm run test:e2e` works on Windows (system Edge), run artifacts gitignored.
  - Fixed on the way: 320px overflow of homepage polaroids and of a featured project card with a long uppercase word.
  - Verified: `health-app.neelbanker.com` is live on its own Vercel project. DMARC was added by Neel on 2026-09-27 and verified on public DNS (`p=none`; tighten to `p=quarantine` after a few weeks of clean sending).

- **Dream Bazaar redesign — live in production** (PR #10 merged 2026-09-26 19:38 UTC, merge `273162a`; Vercel production deploy succeeded):
  - Foundation: `--dm-*` palette with light + dark values (contrast measured and corrected), `tone-*` surfaces, `.ticket`, `.torn` / `.torn-sheet`, `page-wrap`, `.prose-bazaar`, fixed dream-sky layer; shadcn tokens mapped onto the palette.
  - Fonts: Archivo (variable) + Caveat (static 500) site-wide; Syne + JetBrains Mono now load only inside `/design-lab`.
  - Light/dark follows the OS; the nav toggle overrides and persists (`nb-theme`); set before paint via `next/script`, with a toggle-side fallback for `notFound()` pages.
  - Shared building blocks: `components/bazaar/` (`Scrap`, `PageIntro`, `styles.ts`), `ThemeToggle`, `lib/use-theme.ts`, `components/mdx-components.tsx`, `lib/og.tsx`.
  - Every page rebuilt: homepage (the approved lab wall on real content), `/writing`, `/writing/[slug]`, `/projects`, `/work-with-me`, `/about`, `/resources`, `/newsletter`, `/speaking`, `/resume` (chrome only — the print sheet is unchanged), a new 404, nav, footer, and both OG images.
  - Bugs fixed on the way: markdown tables never rendered (added `remark-gfm`); five projects never appeared under a category filter; contact-form labels not linked to inputs; newsletter input unlabelled; resource download popup could be blocked with no fallback; Cal embed hard-coded dark; nav overflowed at 800px; missing articles titled with the site default.
  - Verified in the browser at 320/375/800/1024/1280px and a 2046px ultrawide, light and dark; `/resume` print verified with Playwright + system Edge; lint, typecheck and prod build pass. Perf table in ROADMAP §0 (JS at parity ~234 KB, homepage HTML 145 → 110 KB, CLS 0 everywhere).
  - Removed: the old dark hero, lazy constellation, `hero-logos`, and their CSS.
- Added `/design-lab` — 17 working redesign prototypes (A–Q), all rendering the same real content from `app/design-lab/_content.ts` so directions can be compared directly:
  - A Retro Duotone · B Maximalist Editorial · C Editorial Dark · D Editorial Duotone · E Bento · F Luxury · G Cybercore · H Scrapbook · I Surrealism · J Dream Collage · K Cut-Paper · L Desk of Dreams · M/N Maximalism light+dark · O Torn Maximalism · **P Dream Bazaar (selected)** · Q Pattern Dreamscape.
  - **P · Dream Bazaar is the chosen direction** for the eventual redesign (Maximalism × Dream Collage: overlapping scraps, polaroids and swatches on a dream sky, no grid).
  - O/P/Q ship a real light/dark toggle (`_components/theme-shell.tsx`) driven entirely by CSS custom properties, so a production toggle is a one-class swap.
  - Routes are intentionally **unlisted but publicly reachable** so they can be shared as reference work: `noindex` via the lab layout metadata, absent from `sitemap.ts`, and deliberately NOT disallowed in `robots.ts` (blocking crawl would prevent the `noindex` from being seen).
  - Verified the lab does not affect the live site: homepage still preloads 2 font files and ~145 KB HTML; the lab's 4 extra font families are scoped to the `/design-lab` segment only.
- Mobile homepage QA pass (375px): hero fits with no horizontal overflow, tech band/meta cards/sections all stack cleanly. Fixed featured `ProjectCard` header so the long chain badge stacks below the title on mobile (was clipping) and reduced featured mobile padding to `p-6 sm:p-8`.
- Performance + readability pass (verified with prod build + real browser):
  - Removed `framer-motion` entirely (uninstalled). All entrance/hover motion is now CSS + a small IntersectionObserver in `components/scroll-reveal.tsx`. Homepage First Load JS dropped ~292 KB → ~234 KB.
  - Converted `project-card` (now a server component), `project-browser`, and `about-tech-stack` off framer-motion to CSS transitions.
  - Hero calmed and split for speed: `hero-client.tsx` is now a static server component (CSS word/fade animations); the desktop constellation was reduced to 12 curated nodes and moved to `hero-constellation.tsx` (CSS-only float), lazy-loaded desktop-only via `hero-constellation-lazy.tsx` (`next/dynamic` + `matchMedia`). Shared icons/data live in `hero-logos.tsx`. framer-motion no longer loads on mobile or blocks first paint.
  - Readability: article prose bumped to `prose-lg`; hero lead to 17px; project-card and tech-stack body to 15px.
  - Kept video background OFF by decision (payload/perf/accessibility) — the calmer constellation + grain is the signature instead.
- Added `/resume` page (verified in real browser, local dev):
  - On-brand editorial page header + a white "document sheet" that renders the full `resume/neel-banker-resume.tex` content in a serif, LaTeX-like layout (ruled section headings, right-aligned dates/locations, two-column Selected Projects).
  - `Download PDF` button uses browser print-to-PDF via a dedicated `@media print` block that isolates the sheet (hides nav/footer/CTAs, strips chrome, A4 margins).
  - `LaTeX source` download served from `public/resume/neel-banker-resume.tex`.
  - Wired into footer nav and `sitemap.ts`; `.tex` source committed under `resume/`.
  - Chose the hand-built HTML sheet over `latex.js` (its docs confirm it can't emulate `\hfill` or load `titlesec`/`tabularx`/`booktabs`/`enumitem`, so it would render this resume broken) and over an embedded PDF (no LaTeX compiler available locally).
- Polish + bold-moment pass (verified in real browser, local dev):
  - Fixed mobile hero headline clip — lowered the display clamp floor from `3rem` to `2.5rem` (`clamp(2.5rem, 9vw, 10rem)`) so "BUILDING" fits inside narrow viewports; desktop sizing unchanged.
  - Raised `--muted-foreground` from `hsl(0 0% 46%)` to `hsl(0 0% 54%)` for readable body/label contrast on the near-black background (was below WCAG AA on normal text).
  - Added a bolder `featured` variant to `ProjectCard` (larger title, `p-8`, faint oversized monospace index watermark `01/02…`) used only on the homepage featured grid; `/projects` browser unchanged.
  - Added a static film-grain texture layer to the hero (`mix-blend-overlay`, opacity `0.12`, inline SVG `feTurbulence`) as a subtle premium signature — no added motion, so reduced-motion safe.
  - Contrast + reveal sweep verified on `/about`, `/projects`, and a writing article after the token change: all readable, no regression, no reveal flash (the earlier blank-on-load was production landing mid-scroll, not a bug).
- Fixed mobile horizontal scroll at the source by making the hero eyebrow row responsive (`flex max-w-full` + `min-w-0` on the label text) so the long copy can shrink/wrap instead of forcing viewport overflow.
- Homepage de-cluttered and rebuilt around a cleaner section rhythm.
- Hero upgraded into a motion-rich interactive surface with:
  - full-bleed background treatment
  - pointer-follow spotlight
  - layered logo constellation
  - expanded tech icon set with looser spacing
  - stronger per-logo hover emphasis
  - improved eyebrow/readability treatment
  - sharper supporting copy and cleaner meta cards
  - mobile signal-band fallback
- Targeted mobile pass completed on:
  - hero mobile signal-band density
  - Cal booking embed height
  - writing filter touch targets
  - project browser filter controls and count badge
- `/writing` archive optimized with stronger hierarchy and cleaner filtering.
- Article detail pages improved for readability and navigation flow.
- `/projects` upgraded from flat list to stronger taxonomy/case-study browser.
- `/about` widened, simplified, and rebuilt around stronger sections:
  - Capability Map
  - Recognition
  - cleaner profile pacing
- `/work-with-me` optimized with:
  - clearer service comparison
  - recruiter lane
  - improved contact form
  - live-resume framing
- `/speaking`, `/resources`, and `/newsletter` rebuilt into cleaner editorial pages.
- Shared shell consistency pass completed across nav, footer, and CTA patterns.
- NDA-sensitive project references anonymized in public-facing content.
- About page wording corrected to state that Hindustan Ecolife is run by Neel's uncle and that Neel built/hosts the website.

- **Who Ate My Tokens project card (2026-11-20):**
  - Added `content/projects/wamt-token-observability.mdx` with the public name (explicit exception to the Personal
    pseudonym rule), employer `Personal`, date `2026-11-18`, README-only facts, and `Repo` / `Live demo` links.
  - Added optional `links` (label and href chips), `cover`, `coverDark`, `coverWidth` and `coverHeight` frontmatter
    to the project type, the MDX parser and `docs/content-authoring.md`. The card renders wrapping link chips and a
    pre-sized plain `img` cover that follows the dark theme.
  - Optimized the banner and two overview screenshots into `public/images/wamt/` as WebP, each about 60 KB or smaller.
  - Registered the slug under `ai` and `infrastructure` in `components/project-browser.tsx`. Added e2e coverage for
    the card, link destinations, both filters and cover sizing at 320px.

## Current Homepage State

- Hero is the Dream Bazaar wall (`components/home-hero.tsx`): "Building / *what's* / Next.", copy scrap, stat polaroids, subscribe strip, ticker-tape marquee. Static server component, no entrance animation.
- It now also carries a lazy burning paper slot behind the copy and a server-rendered pinned three era slot before the marquee. Opening motion stays CSS only and both engines arrive after their gates open.

## Needs Review

- PR 21 (hero systems, open into `dev`): the TBT rise is no longer present at the new head (1f5feb7), with
  +3 ms desktop and +30 ms phone on 5 interleaved medians, both within run spread. No budget was relaxed.
- The two new AI-pillar articles cover the T3 Code kitchen brigade and Why I Built Who Ate My Tokens. Both publish on merge to `main`.
- The articles introduce optional static WebP covers at the top of the reading area. Older articles continue to render without covers.
- `skale-appchains` draft is an outline of questions for Neel; it stays in gitignored `content/drafts/`.
- Real-device QA: iOS Safari (fixed sky layer, `100lvh`, clip-path), a low-end Android (long article sheet), and the Cal embed on phones.
- End-to-end form/download behaviour against production Resend: newsletter subscribe, contact form, resource download.
- Category choice for Project Pulse (`fightout-move-to-earn` → infrastructure + leadership) was a judgement call from its excerpt.

## Not Started / Still Open

- Dedicated browser QA checklist doc
- Final performance profiling pass on hero motion
- More long-form writing content expansion if desired
- Optional richer `/projects` proof layer (stats/outcomes/roles per case study)
