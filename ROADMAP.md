# Roadmap

## File Role

- `ROADMAP.md` tracks prioritized forward work.
- `STATES.md` tracks what is currently true now.
- `MEMORY.md` tracks durable decisions and learned preferences.

## Now

### 0. Redesign — build out Dream Bazaar (Direction P)

The site was judged to have become generic (its near-black + lime palette and Syne/mono
pairing are a widely-copied preset). `/design-lab` explored 17 directions; **P · Dream
Bazaar** was selected by Neel and his wife.

**Decisions (2026-09-27):**

- **Scope: the full site**, homepage included (done last). The design rules in `AGENTS.md`
  were rewritten first and now govern every page.
- **Built live on `dev`**, directly in the real routes — no lab copies. Review happens on Vercel
  preview deployments (a draft PR is fine for the link). **Don't merge `dev` → `main` until
  every page below is done**, so production never shows a half-migrated site. Unrelated hotfixes during the
  redesign must branch from `main`, not `dev`.
- **Light/dark ships.** Default follows the OS; the nav toggle overrides and is remembered.
- **Fonts site-wide: Archivo + Caveat** (replaced Syne + JetBrains Mono).

| Page | Status / notes |
|---|---|
| Foundation: tokens, fonts, theme, `Scrap`, tickets | ✅ Done 2026-09-27 |
| Nav + Footer | ✅ Done — nav collapses to a menu below `lg` |
| `/writing/[slug]` | ✅ Done — wall header, torn reading sheet, GFM tables, keep-reading, arch CTA |
| `/writing` | ✅ Done — wall + stat polaroids, pinned latest three, reading lists, ticket filters (URL state kept), `ArticleCard` is now an index card |
| `/projects` | ✅ Done — signal notes, overlapping through-line scraps, ticket filters, tilted project cards, case-study chip wall. Fixed: 5 projects had no/misspelled category keys and never showed under a filter |
| `/work-with-me` | **Next.** Services, contact form (shared Zod schema), Cal.com embed (check it in dark mode) |
| `/about` | Experience, capability map, recognition; still uses `prose-invert` |
| `/resources`, `/newsletter` | Gated download + subscribe forms |
| `/speaking` | Talks list |
| `/resume` | The print-to-PDF sheet must keep working (`@media print` isolation; sky layer hidden in print) |
| `not-found` | None exists yet — add one |
| OG images | Root + article images still dark + lime (`next/og`) |
| Homepage | Last. Keep the lazy, desktop-only constellation architecture or beat its numbers |

Perf baseline (prod build, cold load, measured 2026-09-27):

| | Before (Syne + JetBrains) | After foundation |
|---|---|---|
| Homepage JS | ~234 KB | 237 KB (+3 KB: theme toggle) |
| Article JS | — | 234 KB |
| Font files | 2 · 65.9 KB | 2 · 85.9 KB (Archivo 34.9 + Caveat 500 static 51.0) |
| Homepage HTML | ~145 KB | 140 KB |

Caveat's variable file was 74.6 KB; one static weight saves 24 KB. If fonts must shrink
further, the lever is `preload: false` on Caveat (accents only, not the LCP element).

### 1. Browser QA and fix pass

- Verify homepage hero on:
  - mobile
  - small laptop
  - ultrawide desktop
- Verify the recent mobile-specific code pass in a real browser:
  - hero signal band
  - project filters
  - writing filters
  - Cal booking embed
- Verify form flows:
  - newsletter subscribe
  - contact form
  - resource download
- Verify nav/footer behavior on edge widths and sticky scroll behavior

### 2. Motion/performance tuning

> Largely done: framer-motion removed entirely (CSS + IntersectionObserver reveals), hero split + calmed + lazy-loaded desktop-only, homepage First Load JS ~292 KB → ~234 KB. Remaining: profile on real low-end devices if needed.


- Profile `components/hero-client.tsx` in browser DevTools
- Reduce expensive blur/glow layers only if profiling shows real cost
- Tune animation density by viewport size if needed
- Check hero hover behavior on real devices before adding more visual chrome

## Next

### 3. Homepage proof refinement

- Add or refine one stronger trust/proof strip near the fold
- Sharpen recruiter/employer proof messaging
- Reassess section ordering based on what should convert best

### 4. `/projects` depth upgrade

- Add stronger role/stack/outcome summaries per featured project
- Improve spotlight/category transitions if needed
- Consider richer featured-by-category interaction

### 5. Writing system polish

- Improve MDX treatment for:
  - tables
  - callouts
  - code blocks
- Add stronger related-reading behavior at article end
- Consider subtle reading progress indicator

## Later

### 6. Content expansion

- Add more curated case studies if the user wants broader proof-of-work coverage
- Add more writing from `profile-data/WEBSITE.md` backlog
- Resume page shipped as an HTML "document sheet" (`/resume`) with print-to-PDF + `.tex` download. If a compiled PDF or a LaTeX toolchain in CI becomes available, optionally swap to an embedded real PDF for exact fidelity.

### 7. QA / testing hardening

- Add targeted Playwright coverage for:
  - key routes
  - nav flow
  - form submission UX
  - resource download flow

## Ongoing Rules

- Preserve NDA-safe project naming in user-facing content
- Keep the homepage hero text treatment intact unless explicitly requested otherwise
- Favor complete section/page passes over piecemeal visual tweaks
