# Agent Rules — neelbanker.com

Personal brand website for **Neel Banker** (Senior Blockchain Architect, Ahmedabad).
Current stack: Next.js 16 App Router · Tailwind v4 · shadcn/ui · MDX · Resend · Cal.com embed · Vercel.

---

## Critical: Next.js 16 patterns

- All request APIs are **async**: `await cookies()`, `await headers()`, `await params`, `await searchParams`
- Use `proxy.ts` not `middleware.ts` (Next.js 16 rename)
- Turbopack config is top-level in `next.config.ts`, not under `experimental`
- Default to **Server Components**. Add `'use client'` only when you need interactivity or browser APIs
- Server Actions (`'use server'`) for mutations, Route Handlers only for public APIs
- OG images use **Node.js runtime** (not Edge) — `getAllArticleMeta` requires `fs`
- Root layout currently uses `suppressHydrationWarning` on `<html>` and `<body>` to reduce noise from browser extensions that mutate the DOM before hydration
- Root OG image is `app/opengraph-image.tsx`
- Writing detail pages exist at `app/writing/[slug]/page.tsx` and article OG images at `app/writing/[slug]/opengraph-image.tsx`

## Critical: Tailwind v4

- **No `tailwind.config.ts`** — this project uses CSS-first config
- All theme tokens are in `app/globals.css` under `@theme inline { ... }`
- Plugins use `@plugin "..."` directive (e.g. `@plugin "@tailwindcss/typography"`)
- Do NOT create `tailwind.config.ts` or reference `plugins:` array

## Critical: Server/Client boundary

- `lib/mdx.ts` uses Node.js `fs`/`path` — **never import in `'use client'` components**
- Pure client-safe utils live in `lib/utils-date.ts`
- Shared client-safe contact validation lives in `lib/contact-schema.ts`
- Components that filter/display articles must import `parseDate` from `lib/utils-date.ts`, not `lib/mdx.ts`
- Cal.com embed code belongs in a dedicated client component (`components/cal-booking-embed.tsx`), not directly in a server route

## Content

- MDX files live in `content/writing/`, `content/resources/`, `content/projects/`
- Frontmatter parsed with `gray-matter`; body rendered with `next-mdx-remote/rsc`
- Pillar slugs: `blockchain` | `ai` | `leadership`
- ISO 8601 date sort (`a.date < b.date`) is correct — lexicographic = chronological for `YYYY-MM-DD`
- Current top-level routes are `/`, `/about`, `/newsletter`, `/projects`, `/resources`, `/work-with-me`, and `/writing`
- Content authoring instructions live in `docs/content-authoring.md` and are indexed from `docs/README.md`
- Article slugs are filename-based and resolve under `/writing/[slug]`
- Standalone pages and article pages include local navigation CTAs; preserve that flow when adding new pages

## Email (Resend)

- Client singleton in `lib/resend.ts` — uses `?? 'placeholder'` guard, no module-level throw
- Newsletter opt-in is **explicit** — only subscribe when `optIn === true`
- Always guard on `NEWSLETTER_AUDIENCE_ID` being non-empty before calling Resend Audience API
- Newsletter and gated-download emails use `NEWSLETTER_FROM_EMAIL` (current default: `Neel Banker <insights@neelbanker.com>`)
- Contact form notifications and auto-replies use `ENQUIRY_FROM_EMAIL` (current default: `Neel Banker <inquiry@neelbanker.com>`)
- Contact form submissions are delivered to `CONTACT_EMAIL`
- Env vars in use are `RESEND_API_KEY`, `RESEND_AUDIENCE_ID`, `NEWSLETTER_FROM_EMAIL`, `ENQUIRY_FROM_EMAIL`, and `CONTACT_EMAIL`
- Contacts are stored in Resend Audience; weekly campaign sending and unsubscribe-link handling are expected to be managed via Resend or a future custom sender

## Security

- Apply `escapeHtml()` to **all user-supplied fields** before HTML email interpolation
- Validate all API route inputs with **Zod**
- Keep contact form validation logic shared between client and server; do not let UI and API rules drift apart
- Never expose raw error messages to API responses — use generic user-facing messages

## Testing

- Unit tests: Vitest + React Testing Library (`npm run test`)
- E2E tests: Playwright (`npm run test:e2e`) — webServer config auto-starts dev server
- E2E specs live in `e2e/`
- Linting: `npm run lint`
- Type checking: `npm run typecheck`
- Git hooks: Husky pre-commit runs `npm run lint` and `npm run typecheck` before a commit is created
- Useful local scripts also include `npm run prepare`, `npm run test:watch`, and `npm run test:ui`

## Design

- Dark-only site (no light mode toggle) — `dark` class on `<html>`
- Current palette in `app/globals.css`: lime primary/blockchain (`hsl(72 100% 49%)`), cyan AI (`hsl(190 100% 52%)`), orange leadership (`hsl(25 100% 60%)`)
- Background is near-black editorial dark (`hsl(0 0% 3.5%)`) with warm foreground text (`hsl(36 15% 91%)`)
- Syne for display/UI voice, JetBrains Mono for code/metrics/IDs
- Spacing and typography create hierarchy — avoid adding new colour variables without reason
- Favicon source is `public/favicon.svg`; do not reintroduce `app/favicon.ico` unless intentionally switching back to file-based icons
- OG images should match the live editorial brand: dark background, warm text, and lime/cyan/orange accents

## Design: Responsive container scale

Every wide container (nav, footer, hero, page headers, content sections) must use the full 4-stop responsive max-width:

```
max-w-5xl xl:max-w-6xl 2xl:max-w-7xl 3xl:max-w-[1440px]
```

| Breakpoint | Value | Target |
|---|---|---|
| default | `max-w-5xl` = 1024px | Mobile / small tablet |
| `xl` (1280px+) | `max-w-6xl` = 1152px | Laptop / desktop 1080p |
| `2xl` (1536px+) | `max-w-7xl` = 1280px | Large desktop / 1440p |
| `3xl` (1920px+) | `1440px` | 2K native / 4K at 200% DPI |

The `3xl` breakpoint (`--breakpoint-3xl: 1920px`) is registered in `app/globals.css`.

**Prose containers** (`max-w-2xl`) stay narrow for readability and do NOT follow this scale.
**Hero font clamp**: `clamp(3rem, 9vw, 10rem)` — vw-based so it scales with viewport, capped at 160px.

## Design: Inner page header pattern

Every inner page (about, writing, newsletter, resources, projects, work-with-me, article detail) must use the editorial heading system:

```tsx
{/* Section label */}
<p className="font-mono text-xs uppercase tracking-[0.22em] text-muted-foreground mb-4">
  Section Label
</p>
{/* Display heading */}
<h1 className="font-extrabold text-4xl sm:text-5xl md:text-6xl uppercase tracking-tighter leading-[0.9] mb-6">
  Page Title
</h1>
```

- Page header section uses `max-w-5xl xl:max-w-6xl px-6 sm:px-12 py-16 sm:py-20 border-b border-border`
- Content section uses an appropriate narrower container (`max-w-2xl` for prose, `max-w-5xl` for lists)
- Breadcrumbs use `font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground`
- Sub-headings within content use `font-extrabold text-2xl sm:text-3xl uppercase tracking-tighter`
- Section labels inside content use `font-mono text-xs uppercase tracking-[0.22em] text-muted-foreground mb-8`

## Design: Editorial grid dividers

Prefer `grid gap-px bg-border` + `bg-background` on cells for hairline dividers between grid cards (avoids border math):

```tsx
<div className="grid gap-px bg-border sm:grid-cols-2">
  <div className="bg-background p-8">…</div>
</div>
```

## Design: Interactive elements

- All clickable elements (buttons, links styled as buttons) must have `cursor-pointer`
- Disabled buttons must have `disabled:cursor-not-allowed`
- All interactive elements must have `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary` — do NOT use `focus:ring-0`
- Hover transitions: use `transition-colors duration-200`, not `transition-all` (avoid layout reflow)
- Never animate `padding`, `margin`, or `width`/`height` on hover — use `transform` only

## Design: Motion preferences

`app/globals.css` includes `@media (prefers-reduced-motion: reduce)` that disables all animations/transitions for users who opt out. The marquee on the homepage pauses automatically. Do not add new `@keyframes` without respecting this rule.

## What NOT to do

- Do not add `tailwind.config.ts`
- Do not add `runtime = 'edge'` to OG image files
- Do not import `lib/mdx.ts` in client components
- Do not duplicate contact validation rules separately in the form and API when `lib/contact-schema.ts` can be shared
- Do not call Resend Audience API without checking `NEWSLETTER_AUDIENCE_ID`
- Do not interpolate user input into HTML without `escapeHtml()`
- Do not add `getProjectBySlug` — projects page is list-only (YAGNI)
- Do not put Cal.com embed bootstrapping directly inside `app/work-with-me/page.tsx`; keep it inside the client component
- Do not remove or bypass the Husky pre-commit lint hook without a strong reason
- Do not remove or bypass the Husky pre-commit typecheck without a strong reason
- Do not document content under `content/articles`; the live article directory is `content/writing`
- Do not describe the brand colors as indigo/emerald/amber unless the theme tokens are actually changed in `app/globals.css`
- Do not add `app/favicon.ico` back unless you explicitly want Next.js to auto-inject an `.ico` favicon again
- Do not use `focus:ring-0` or `focus:outline-none` alone on inputs — always pair with `focus-visible:ring-2 focus-visible:ring-primary`
- Do not animate `padding`/`margin` on hover — causes layout reflow; use `transition-colors` or `transform` only
- Do not use `transition-all` on hover — always specify the property (e.g. `transition-colors duration-200`)
- Do not use `grid sm:grid-cols-2` for `ArticleCard` lists — ArticleCard is a full-width row component; use a plain `div` (stacked list)
- Do not add emoji as functional list-item bullets; use CSS/text markers (`→`, `—`) or styled `before:` content
