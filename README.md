# neelbanker.com

Personal brand website for Neel Banker — Senior Blockchain Architect. Built on The Operator's Platform model: free resources → newsletter → consulting.

**Live:** https://neelbanker.com

## Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Styling | Tailwind CSS v4 + shadcn/ui (base-nova) |
| Fonts | Geist Sans + Geist Mono (`next/font/google`) |
| Content | MDX via `next-mdx-remote/rsc` + `gray-matter` |
| Email | Resend (newsletter, download gating, contact) |
| Validation | Zod |
| Tests | Vitest (unit) + Playwright (E2E) |
| Analytics | Vercel Analytics + Speed Insights |
| Deployment | Vercel |

## Project Structure

```
app/
  (routes)/           # page.tsx per route
  api/
    contact/          # Contact form → Resend notification + auto-reply
    download/         # Email-gated resource download
    subscribe/        # Newsletter subscription
  opengraph-image.tsx # Root OG image (next/og)
  sitemap.ts
  robots.ts
components/
  nav.tsx             # Sticky header with active-path highlighting
  footer.tsx
  article-card.tsx
  pillar-badge.tsx
  pillar-filter.tsx   # Client-side filtering ('use client')
  resource-card.tsx
  project-card.tsx
  newsletter-form.tsx
  service-card.tsx
content/
  articles/           # MDX articles (blockchain, ai, leadership pillars)
  resources/          # MDX resource metadata
  projects/           # MDX project case studies
lib/
  mdx.ts              # Server-only: fs-based MDX parsing + metadata
  utils-date.ts       # Client-safe: parseDate() pure util
  pillars.ts          # Pillar definitions + colour map
  resend.ts           # Resend client singleton
types/
  content.ts          # PillarSlug, ArticleMeta, ResourceMeta, ProjectMeta
e2e/                  # Playwright E2E specs
public/
  resources/          # Placeholder PDFs (replace before launch)
```

## Local Development

```bash
npm install
cp .env.example .env.local   # fill in your keys (see Environment Variables)
npm run dev
```

Open http://localhost:3000.

## Environment Variables

| Variable | Required | Description |
|---|---|---|
| `RESEND_API_KEY` | Yes | Resend API key from resend.com/api-keys |
| `RESEND_AUDIENCE_ID` | Yes | Resend Audience ID for newsletter list |
| `CONTACT_EMAIL` | No | Where contact form submissions arrive (default: `neel@neelbanker.com`) |

Create `.env.local` (never commit this file):

```bash
RESEND_API_KEY=re_xxxxxxxxxxxx
RESEND_AUDIENCE_ID=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
CONTACT_EMAIL=neel@neelbanker.com
```

## Scripts

```bash
npm run dev          # Start dev server (http://localhost:3000)
npm run build        # Production build
npm run start        # Serve production build
npm run lint         # ESLint
npm run test         # Vitest unit tests
npm run test:e2e     # Playwright E2E tests (starts dev server automatically)
```

## Deploy to Vercel

### First deploy

```bash
# 1. Install Vercel CLI
npm i -g vercel

# 2. Link to a Vercel project (creates project if it doesn't exist)
vercel link

# 3. Set production environment variables
vercel env add RESEND_API_KEY production
vercel env add RESEND_AUDIENCE_ID production
vercel env add CONTACT_EMAIL production   # optional, has default

# 4. Deploy to production
vercel --prod
```

### Subsequent deploys

```bash
vercel --prod
```

Or push to the `main` branch — Vercel auto-deploys on every push if the GitHub integration is connected.

### Environment variables via dashboard

Alternatively set them in **Vercel Dashboard → Project → Settings → Environment Variables**.

## Post-Deploy Checklist

- [ ] Add custom domain in Vercel Dashboard → Domains → `neelbanker.com`
- [ ] Update registrar DNS: point A/CNAME records to Vercel's nameservers
- [ ] Replace `public/resources/*.pdf` with real downloadable files
- [ ] Set up Cal.com account and update the embed URL in `app/work-with-me/page.tsx`
- [ ] Verify domain in Resend (Domains tab) so emails send from `neel@neelbanker.com`
- [ ] Submit sitemap to Google Search Console: `https://neelbanker.com/sitemap.xml`
- [ ] Check OG images: `https://neelbanker.com/opengraph-image`

## Content

All content lives in `content/` as MDX files with YAML frontmatter.

### Adding an article

Create `content/articles/your-slug.mdx`:

```mdx
---
title: "Your Article Title"
date: "2026-04-01"
pillar: "blockchain"   # blockchain | ai | leadership
excerpt: "One sentence summary shown on the writing hub."
---

Article body in MDX here.
```

### Adding a resource

Create `content/resources/your-slug.mdx`, add a PDF to `public/resources/`, and set `fileUrl: "/resources/your-file.pdf"` in the frontmatter.

### Adding a project

Create `content/projects/your-slug.mdx` with `title`, `date`, `pillar`, `excerpt`, `outcome` frontmatter fields.

## Design Tokens

The site uses a dark-only navy design system. Key CSS variables in `app/globals.css`:

| Token | Value | Usage |
|---|---|---|
| `--background` | `hsl(222 47% 7%)` | Page background |
| `--primary` | `hsl(238 84% 67%)` | Indigo accent (blockchain) |
| `--pillar-blockchain` | `hsl(238 84% 67%)` | Indigo |
| `--pillar-ai` | `hsl(160 84% 39%)` | Emerald |
| `--pillar-leadership` | `hsl(38 92% 50%)` | Amber |
