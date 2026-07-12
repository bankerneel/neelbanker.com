# Memory

## File Role

- Use this file for durable project memory, not turn-by-turn status updates.
- Use `STATES.md` for current progress and `ROADMAP.md` for prioritized next work.

## Product / Brand

- Personal brand site for Neel Banker.
- Dark editorial visual language is intentional.
- Syne and JetBrains Mono are part of the site voice and should stay coherent across new UI.
- The site is now aiming for “clean editorial with motion depth”, not “dense Web3 landing page”.

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
