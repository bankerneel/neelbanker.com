# neelbanker.com

Personal brand website for Neel Banker, a Senior Blockchain Architect. The site is built around a simple funnel: writing and resources feed newsletter growth and consulting enquiries.

Live: https://neelbanker.com

## Stack

| Layer | Technology |
| --- | --- |
| Framework | Next.js 16 App Router |
| Styling | Tailwind CSS v4 + shadcn/ui |
| Fonts | Syne + JetBrains Mono via `next/font/google` |
| Content | MDX via `next-mdx-remote/rsc` + `gray-matter` |
| Email | Resend |
| Validation | Zod |
| Testing | Vitest + React Testing Library, Playwright |
| Scheduling | Cal.com React embed |
| Analytics | Vercel Analytics + Speed Insights |
| Deployment | Vercel |

## Current Structure

```text
app/
  about/page.tsx
  newsletter/page.tsx
  projects/page.tsx
  resources/page.tsx
  work-with-me/page.tsx
  writing/page.tsx
  api/
    contact/route.ts
    download/route.ts
    subscribe/route.ts
  layout.tsx
  opengraph-image.tsx
  robots.ts
  sitemap.ts
components/
  cal-booking-embed.tsx
  contact-form.tsx
  newsletter-form.tsx
  nav.tsx
  footer.tsx
  article-card.tsx
  resource-card.tsx
  project-card.tsx
  pillar-badge.tsx
  pillar-filter.tsx
content/
  writing/
  resources/
  projects/
docs/
  content-authoring.md
public/
  favicon.svg
lib/
  mdx.ts
  pillars.ts
  resend.ts
  utils-date.ts
e2e/
__tests__/
.husky/pre-commit
```

## Local Development

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open `http://localhost:3000`.

## Environment Variables

| Variable | Required | Description |
| --- | --- | --- |
| `RESEND_API_KEY` | Yes | Resend API key |
| `RESEND_AUDIENCE_ID` | Yes for newsletter/download opt-in | Audience/list ID used for newsletter subscriptions |
| `CONTACT_EMAIL` | No | Destination for contact form submissions, defaults to `neel@neelbanker.com` |

Example:

```bash
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxx
RESEND_AUDIENCE_ID=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
CONTACT_EMAIL=neel@neelbanker.com
```

## Scripts

```bash
npm run dev         # Start local dev server
npm run build       # Production build
npm run start       # Run built app
npm run lint        # ESLint
npm run typecheck   # TypeScript checking
npm run test        # Vitest unit tests
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

If lint fails, the commit is blocked before it is created.

## Content Model

All content lives in `content/` as MDX files with frontmatter.

- Articles: `content/writing/*.mdx`
- Resources: `content/resources/*.mdx`
- Projects: `content/projects/*.mdx`

Pillar slugs are:

- `blockchain`
- `ai`
- `leadership`

Dates use ISO `YYYY-MM-DD` format, which means lexicographic string sort is chronological.

Detailed authoring instructions live in [docs/content-authoring.md](/home/dexter/projects/neelbanker.com/docs/content-authoring.md).

## Key Implementation Notes

- Default to Server Components; only use `'use client'` for interactive UI.
- Do not import `lib/mdx.ts` into client components because it uses Node `fs` and `path`.
- Client-safe date helpers live in `lib/utils-date.ts`.
- OG image generation stays on the Node.js runtime.
- Root OG image lives at `app/opengraph-image.tsx`; article OG images live at `app/writing/[slug]/opengraph-image.tsx`.
- Tailwind v4 is CSS-first in `app/globals.css`; there is no `tailwind.config.ts`.
- The booking widget on `/work-with-me` uses `@calcom/embed-react` via `components/cal-booking-embed.tsx`.
- The site uses `public/favicon.svg` as the favicon source; `app/favicon.ico` is intentionally absent.
- Standalone pages and article pages include in-page navigation CTAs so users do not rely only on browser back buttons.

## Testing

```bash
npm run lint
npm run typecheck
npm run test
npm run test:e2e
```

Playwright starts the dev server automatically using the `webServer` config in [playwright.config.ts](/home/dexter/projects/neelbanker.com/playwright.config.ts).

## Deployment

The site is intended for Vercel deployment.

Typical flow:

```bash
vercel link
vercel env add RESEND_API_KEY production
vercel env add RESEND_AUDIENCE_ID production
vercel env add CONTACT_EMAIL production
vercel --prod
```

## Maintenance Notes

- Replace placeholder PDFs in `public/resources/` with production assets.
- Keep Cal.com link/namespace in sync with the real booking setup.
- Validate all route inputs with Zod and avoid exposing raw error details in API responses.
- Escape user input before interpolating into HTML emails.
