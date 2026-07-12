# States

Last updated: 2026-07-12

## File Purpose

- `STATES.md`: current snapshot
- `MEMORY.md`: durable context and decisions
- `ROADMAP.md`: prioritized next work

## Status

The main site surfaces have gone through a broad UX/content refinement pass.
Core routes now feel substantially more consistent, lighter, and more editorial than the earlier baseline.

## Completed

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

## Current Hero State

- Desktop hero is intentionally interactive and layered.
- `HeroWord` / `span.block` heading treatment is intentionally preserved.
- Latest hero pass added more logos, wider spacing, stronger self-hover emphasis, improved eyebrow contrast, improved supporting copy, and a designed mobile fallback.
- The very last “neon ring” badge experiment was reverted because it degraded the look.

## Needs Review

- Real browser QA across:
  - mobile hero readability
  - small laptop header/hero balance
  - footer spacing and nav density
  - hover density on very wide screens
  - hero interaction feel on low-power devices
  - remaining route-by-route mobile QA in real browser, not just code-level pass
- End-to-end form/download behavior in browser:
  - newsletter subscribe
  - contact form
  - resource download flow

## Not Started / Still Open

- Dedicated browser QA checklist doc
- Final performance profiling pass on hero motion
- More long-form writing content expansion if desired
- Optional richer `/projects` proof layer (stats/outcomes/roles per case study)
