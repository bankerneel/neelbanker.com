# States

Last updated: 2026-04-03

## File Purpose

- `STATES.md`: current snapshot
- `MEMORY.md`: durable context and decisions
- `ROADMAP.md`: prioritized next work

## Status

The main site surfaces have gone through a broad UX/content refinement pass.
Core routes now feel substantially more consistent, lighter, and more editorial than the earlier baseline.

## Completed

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
