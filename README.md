# neelbanker.com

Personal brand website for Neel Banker, a Senior Blockchain Architect. The site is built around a simple funnel: writing and resources feed newsletter growth and consulting enquiries.

Live: https://neelbanker.com

## Stack

| Layer | Technology |
| --- | --- |
| Framework | Next.js 16 App Router |
| Styling | Tailwind CSS v4 (CSS-first) + shadcn/ui primitives mapped onto the Dream Bazaar tokens |
| Fonts | Archivo (variable) + Caveat (handwritten accents) via `next/font/google` |
| Motion | CSS scroll-driven animations, one small client script, one WebGL sky shader |
| Content | MDX via `next-mdx-remote/rsc` + `gray-matter` + `remark-gfm` |
| Email | Resend |
| Validation | Zod |
| Testing | Vitest + React Testing Library, Playwright |
| Scheduling | Cal.com React embed |
| Analytics | Vercel Analytics + Speed Insights |
| Deployment | Vercel |

## Routes

`/`, `/about`, `/newsletter`, `/projects`, `/resources`, `/resume`, `/speaking`, `/work-with-me`, `/writing`, `/writing/[slug]`, plus the unlisted (`noindex`) `/design-lab` prototypes.

API routes: `/api/contact`, `/api/download`, `/api/subscribe`.

## Current Structure

```text
app/
  page.tsx                     # homepage
  about/ newsletter/ projects/ resources/ resume/ speaking/ work-with-me/
  writing/
    page.tsx
    [slug]/page.tsx
    [slug]/opengraph-image.tsx
  api/
    contact/route.ts
    download/route.ts
    subscribe/route.ts
  design-lab/                  # frozen redesign prototypes (reference only)
  globals.css                  # Tailwind v4 theme + Dream Bazaar tokens
  motion.css                   # homepage film (imported from layout.tsx)
  layout.tsx
  not-found.tsx
  opengraph-image.tsx
  robots.ts
  sitemap.ts
components/
  bazaar/                      # band, scrap, page-intro, callout, code-block, reading-progress, styles
  motion/                      # motion-stage, scribbled, sky-shader
  ui/                          # shadcn/ui primitives
  home-hero.tsx
  nav.tsx
  footer.tsx
  theme-toggle.tsx
  mdx-components.tsx
  cal-booking-embed.tsx
  contact-form.tsx
  newsletter-form.tsx
  article-card.tsx
  resource-card.tsx
  project-card.tsx
  project-browser.tsx
  ...
content/
  writing/
  resources/
  projects/
docs/
  README.md
  content-authoring.md
lib/
  contact-schema.ts
  mdx.ts
  og.tsx
  pillars.ts
  resend.ts
  use-theme.ts
  utils-date.ts
  ...
public/
  favicon.svg
  images/
  resources/                   # gated-download PDFs
  resume/
resume/
  neel-banker-resume.tex
scripts/
  check-node.mjs
e2e/
__tests__/
.husky/pre-commit
```

## Local Development

```bash
nvm use            # .nvmrc pins Node 24
npm install
cp .env.example .env.local
npm run dev
```

Open `http://localhost:3000`.

The unit-test toolchain (Vitest 4 / Vite 8) needs Node `^20.19.0 || >=22.12.0`; a `pretest` guard (`scripts/check-node.mjs`) fails fast on older versions.

## Environment Variables

| Variable | Required | Description |
| --- | --- | --- |
| `RESEND_API_KEY` | Yes | Resend API key |
| `RESEND_AUDIENCE_ID` | Yes for newsletter/download opt-in | Audience/list ID used for newsletter subscriptions |
| `NEWSLETTER_FROM_EMAIL` | Recommended | Sender used for newsletter, subscription, and gated download emails |
| `ENQUIRY_FROM_EMAIL` | Recommended | Sender used for website enquiries and contact-form auto-replies |
| `CONTACT_EMAIL` | Recommended | Destination inbox for contact form submissions |

Example:

```bash
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxx
RESEND_AUDIENCE_ID=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
NEWSLETTER_FROM_EMAIL="Neel Banker <insights@neelbanker.com>"
ENQUIRY_FROM_EMAIL="Neel Banker <inquiry@neelbanker.com>"
CONTACT_EMAIL=inquiry@neelbanker.com
```

## Scripts

```bash
npm run dev         # Start local dev server
npm run build       # Production build
npm run start       # Run built app
npm run lint        # ESLint
npm run typecheck   # TypeScript checking
npm run test        # Vitest unit tests
npm run test:watch  # Vitest in watch mode
npm run test:ui     # Vitest UI
npm run test:e2e    # Playwright end-to-end tests
npm run prepare     # Install Husky Git hooks
```

## Git Hooks

Husky is configured with a pre-commit hook:

```text
.husky/pre-commit
```

That hook runs:

```bash
npm run lint
npm run typecheck
```

If either fails, the commit is blocked before it is created.

## Content Model

All content lives in `content/` as MDX files with frontmatter.

- Articles: `content/writing/*.mdx` (served at `/writing/[slug]`, slug = filename)
- Resources: `content/resources/*.mdx`
- Projects: `content/projects/*.mdx` (grouped by the `employer` frontmatter: `Tech Alchemy` | `SoluLab` | `Personal`)

Pillar slugs are:

- `blockchain`
- `ai`
- `leadership`

Dates use ISO `YYYY-MM-DD` format, which means lexicographic string sort is chronological.

Detailed authoring instructions, including the project naming rules, live in [docs/content-authoring.md](./docs/content-authoring.md).

## Key Implementation Notes

- Default to Server Components; only use `'use client'` for interactive UI.
- Do not import `lib/mdx.ts` into client components because it uses Node `fs` and `path`.
- Client-safe date helpers live in `lib/utils-date.ts`.
- Contact form validation is shared between client and server via `lib/contact-schema.ts`.
- Article MDX renders with `remark-gfm` (without it, markdown tables render as plain pipes).
- OG image generation stays on the Node.js runtime.
- Root OG image lives at `app/opengraph-image.tsx`; article OG images live at `app/writing/[slug]/opengraph-image.tsx`. Both share `lib/og.tsx`.
- Tailwind v4 is CSS-first in `app/globals.css`; there is no `tailwind.config.ts`.
- `app/motion.css` is imported from `app/layout.tsx`, not from `globals.css` (Turbopack drops that `@import` in dev).
- The booking widget on `/work-with-me` uses `@calcom/embed-react` via `components/cal-booking-embed.tsx`.
- The site uses `public/favicon.svg` as the favicon source; `app/favicon.ico` is intentionally absent.
- Standalone pages and article pages include in-page navigation CTAs so users do not rely only on browser back buttons.
- Newsletter emails use `NEWSLETTER_FROM_EMAIL`; contact emails and auto-replies use `ENQUIRY_FROM_EMAIL`.
- Contacts are stored in Resend Audience, but a custom weekly send/unsubscribe flow has not been built in this repo yet.
- The contact form performs client-side validation and highlights invalid fields before submitting to `/api/contact`.

## Design System — Dream Bazaar

The site uses **Dream Bazaar**: a muted pastel collage of torn paper scraps, ticket chips and polaroids on a dream-sky gradient, in light and dark. The full rules live in [AGENTS.md → Design](./AGENTS.md); the essentials:

- **Theme** — follows the OS; the nav toggle overrides it (`localStorage['nb-theme']`). `data-theme` is set on `<html>` before first paint.
- **Colour** — every colour is a `--dm-*` token with light and dark values. Filled surfaces use `tone-*` classes; the only coloured text is `text-dm-accent-ink`. No hard-coded hex in components.
- **Type** — Archivo 900 uppercase for headlines; Caveat (`.hand`) for short accents only. `font-mono` is for code, not labels.
- **Composition** — torn paper is `components/bazaar/scrap.tsx` (never put a shadow, border or ring directly on a `clip-path` element). Sections sit on full-bleed bands (`components/bazaar/band.tsx`). Reading surfaces (articles, forms, tables, code) stay unrotated.
- **Interactive elements** — `cursor-pointer`, `disabled:cursor-not-allowed`, and `focus-visible:ring-2 focus-visible:ring-primary` — **never** `focus:ring-0`. Touch targets ≥ 40px on mobile.
- **Transitions** — colour or transform only; no `transition-all`, never animate padding, margin, width or height.
- **Motion** — the homepage "film" lives in `app/motion.css` + `components/motion/`; inner pages get a lighter set. Articles, `/resume` and anything next to a form stay still. `app/globals.css` and `app/motion.css` both have `prefers-reduced-motion: reduce` guards, and every new `@keyframes` must be added to them.

## Testing

```bash
npm run lint
npm run typecheck
npm run test
npm run test:e2e
```

Playwright starts the dev server automatically (or reuses one on `:3000`) using the `webServer` config in [playwright.config.ts](./playwright.config.ts). E2E specs live in `e2e/` and are excluded from Vitest.

## Deployment

The site is intended for Vercel deployment.

Typical flow:

```bash
vercel link
vercel env add RESEND_API_KEY production
vercel env add RESEND_AUDIENCE_ID production
vercel env add NEWSLETTER_FROM_EMAIL production
vercel env add ENQUIRY_FROM_EMAIL production
vercel env add CONTACT_EMAIL production
vercel --prod
```

## Project Docs

- [AGENTS.md](./AGENTS.md) — engineering and design rules (source of truth for contributors and agents)
- [STATES.md](./STATES.md) — current snapshot
- [MEMORY.md](./MEMORY.md) — durable decisions and context
- [ROADMAP.md](./ROADMAP.md) — prioritized forward plan
- [docs/](./docs/README.md) — content authoring and other guides

## Maintenance Notes

- The PDFs in `public/resources/` are still empty placeholders (0 bytes) — replace them with the real assets, since `/api/download` emails links to them.
- Keep Cal.com link/namespace in sync with the real booking setup.
- Validate all route inputs with Zod and avoid exposing raw error details in API responses.
- Escape user input before interpolating into HTML emails.
