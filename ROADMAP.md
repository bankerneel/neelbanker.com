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
| `/work-with-me` | ✅ Done — service scraps, recruiter arch (+ resume link), Cal embed follows the site theme and palette, contact form restyled. Fixed: form labels weren't linked to inputs; errors now `aria-describedby` |
| `/about` | ✅ Done — NB monogram + stat polaroids, bio on a torn sheet with sticky contact notes, experience scraps, recognition cards, capability index cards, talk polaroids |
| `/resources`, `/newsletter` | ✅ Done — form cards (unrotated), subscribe form in a lilac arch, pillar scraps. Fixed: unlabelled newsletter input, unlinked resource label, and a fallback link when the post-fetch `window.open` is popup-blocked |
| `/speaking` | ✅ Done — profile notes, talk scraps with coloured "poster" watch links, invite arch |
| `/resume` | ✅ Done — screen chrome only (wall header, action tickets, taped sheet); the white document sheet is unchanged. Print verified with Playwright + system Edge in light and dark: nav, footer, `.no-print`, sky layer hidden; sheet header prints |
| `not-found` | ✅ Done — 404 with outlined 0, scrap + destination tickets; missing articles now titled "Page not found" |
| OG images | ✅ Done — dream sky, name tag, Caveat kicker, Archivo 900 title (steps down for long titles), pillar ticket; shared `lib/og.tsx` |
| Homepage | ✅ Done — the approved lab wall on real content, ticker-tape marquee, notebook scraps, arch portal around the lead case study, pillar scraps, field notes + free resource, service price tags. Old hero + constellation removed |

**All pages done and live** — PR #10 merged 2026-09-26 19:38 UTC. Follow-ups: real-device QA and production form checks (§1).

Perf after the full redesign (prod build, fresh Edge context per page, 1280px, measured 2026-09-27):

| Page | JS (gz) | Fonts | HTML | LCP (local) | CLS |
|---|---|---|---|---|---|
| `/` | 234 KB | 2 · 84 KB | 110 KB | 380 ms | 0 |
| `/writing` | 237 KB | 2 · 84 KB | 85 KB | 224 ms | 0 |
| article | 234 KB | 2 · 84 KB | 66 KB | 144 ms | 0 |
| other pages | 234 KB | 2 · 84 KB | 67–116 KB | 108–148 ms | 0 |

Baseline at the start of the redesign:

| | Before (Syne + JetBrains) | After foundation |
|---|---|---|
| Homepage JS | ~234 KB | 237 KB (+3 KB: theme toggle) |
| Article JS | — | 234 KB |
| Font files | 2 · 65.9 KB | 2 · 85.9 KB (Archivo 34.9 + Caveat 500 static 51.0) |
| Homepage HTML | ~145 KB | 140 KB |

Caveat's variable file was 74.6 KB; one static weight saves 24 KB. If fonts must shrink
further, the lever is `preload: false` on Caveat (accents only, not the LCP element).

### 1. Browser QA and fix pass — automated part ✅, real devices still open

- Automated: the §7 suite now covers routes, nav, forms UX, print and horizontal overflow at 320–1024px.
- **Still needs Neel:** real iPhone Safari + low-end Android pass, and the three forms against production
  Resend (they send real email).

_Original checklist:_

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

### 2. Motion/performance tuning ✅

> Done. The old hero and its constellation were removed in the redesign; the only motion left is CSS reveals and
> the marquee (both reduced-motion safe). Profile on a real low-end phone only if it feels slow. History: framer-motion removed entirely (CSS + IntersectionObserver reveals), hero split + calmed + lazy-loaded desktop-only, homepage First Load JS ~292 KB → ~234 KB. Remaining: profile on real low-end devices if needed.


- Profile `components/hero-client.tsx` in browser DevTools
- Reduce expensive blur/glow layers only if profiling shows real cost
- Tune animation density by viewport size if needed
- Check hero hover behavior on real devices before adding more visual chrome

## Next

### 3. Homepage proof refinement ✅ (2026-09-27)

- "Receipts, not adjectives" strip right after the hero: current role, SoluLab lead path (10 → 50+), Best Team
  Lead 2021 + 2022, talks. Facts only from /about and /resume.
- Recruiter lane: resume, the /work-with-me recruiter section, LinkedIn.
- Order: hero → receipts → selected work → writing → themes → hiring → how I work → services. "Start here" was
  dropped (it repeated the nav and the sections below it).
- **To confirm:** `profile-data/WEBSITE.md` says the SoluLab team grew 10 → **40+**; the site and resume say
  **50+**. The site keeps 50+.

### 4. `/projects` depth upgrade ✅ (2026-09-27, partly)

- Outcome: "what shipped" bullets on every card, parsed from each project's `## Outcome` section (17 of 20 have
  one; Projects Scales, Ember and Enclave don't). Stack was already shown.
- Role: `employer` frontmatter → role via `lib/roles.ts` (2026-09-27): 12 Tech Alchemy, 1 SoluLab, 5 Personal;
  Scales / Coffer have no group until Neel confirms.
- Case-study links ✅: `caseStudy` frontmatter renders an external link on the card (DocTrace). The SoluLab section lists
  16 official case studies by name (Neel's list, 2026-09-27).
- Category transitions / richer interaction: current fade-in filter is fine; not pursued.

### 5. Writing system polish ✅ (2026-09-27)

- Tables: `remark-gfm` + scroll box (redesign). Callouts: `<Callout>` MDX component. Code blocks: copy button + language label.
- Related reading: same-pillar "More on …" list after the newer/earlier cards.
- Reading progress: thin accent-ink bar tracking the article sheet.

## Later

### 6. Content expansion

- Add more curated case studies if the user wants broader proof-of-work coverage
- Add more writing from `profile-data/WEBSITE.md` backlog
- Resume page shipped as an HTML "document sheet" (`/resume`) with print-to-PDF + `.tex` download. If a compiled PDF or a LaTeX toolchain in CI becomes available, optionally swap to an embedded real PDF for exact fidelity.

### 7. QA / testing hardening ✅ (2026-09-27)

`npm run test:e2e` — 32 tests, stable across repeated full runs:
- `routes` — every page 200, one h1, no uncaught errors, no same-origin 4xx/5xx; 404s for unknown URLs/articles
- `navigation` — desktop nav + aria-current, sticky strip, mobile menu (open / Escape / navigate), theme toggle
  persistence, theme on notFound() pages, writing pillar filter + URL state
- `forms` — contact validation, success and failure; newsletter success and failure; resource download + fallback
  link. API routes are mocked with `page.route()` — no real email is sent
- `print` — /resume under print media shows only the sheet (with its header)
- `layout` — no element past the viewport at 320 / 375 / 768 / 1024px on seven key routes. It caught two real
  bugs on the way in (homepage polaroids and a long uppercase project title at 320px)
- `e2e/helpers.ts` `gotoHydrated()` waits for React hydration before interacting

## Ongoing Rules

- Preserve NDA-safe project naming in user-facing content
- Keep the homepage hero text treatment intact unless explicitly requested otherwise
- Favor complete section/page passes over piecemeal visual tweaks
