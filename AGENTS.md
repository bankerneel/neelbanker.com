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
- Writing detail pages exist at `app/writing/[slug]/page.tsx` and article OG images at `app/writing/[slug]/opengraph-image.tsx`

## Critical: Tailwind v4

- **No `tailwind.config.ts`** — this project uses CSS-first config
- All theme tokens are in `app/globals.css` under `@theme inline { ... }`
- Plugins use `@plugin "..."` directive (e.g. `@plugin "@tailwindcss/typography"`)
- Do NOT create `tailwind.config.ts` or reference `plugins:` array

## Critical: Server/Client boundary

- `lib/mdx.ts` uses Node.js `fs`/`path` — **never import in `'use client'` components**
- Pure client-safe utils live in `lib/utils-date.ts`
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

## Email (Resend)

- Client singleton in `lib/resend.ts` — uses `?? 'placeholder'` guard, no module-level throw
- Newsletter opt-in is **explicit** — only subscribe when `optIn === true`
- Always guard on `NEWSLETTER_AUDIENCE_ID` being non-empty before calling Resend Audience API
- `FROM_EMAIL = 'Neel Banker <neel@neelbanker.com>'`
- Env vars in use are `RESEND_API_KEY`, `RESEND_AUDIENCE_ID`, and optional `CONTACT_EMAIL`

## Security

- Apply `escapeHtml()` to **all user-supplied fields** before HTML email interpolation
- Validate all API route inputs with **Zod**
- Never expose raw error messages to API responses — use generic user-facing messages

## Testing

- Unit tests: Vitest + React Testing Library (`npm run test`)
- E2E tests: Playwright (`npm run test:e2e`) — webServer config auto-starts dev server
- E2E specs live in `e2e/`
- Linting: `npm run lint`
- Git hooks: Husky pre-commit runs `npm run lint` before a commit is created
- Useful local scripts also include `npm run prepare`, `npm run test:watch`, and `npm run test:ui`

## Design

- Dark-only site (no light mode toggle) — `dark` class on `<html>`
- Current palette in `app/globals.css`: lime primary/blockchain (`hsl(72 100% 49%)`), cyan AI (`hsl(190 100% 52%)`), orange leadership (`hsl(25 100% 60%)`)
- Background is near-black editorial dark (`hsl(0 0% 3.5%)`) with warm foreground text (`hsl(36 15% 91%)`)
- Syne for display/UI voice, JetBrains Mono for code/metrics/IDs
- Spacing and typography create hierarchy — avoid adding new colour variables without reason

## What NOT to do

- Do not add `tailwind.config.ts`
- Do not add `runtime = 'edge'` to OG image files
- Do not import `lib/mdx.ts` in client components
- Do not call Resend Audience API without checking `NEWSLETTER_AUDIENCE_ID`
- Do not interpolate user input into HTML without `escapeHtml()`
- Do not add `getProjectBySlug` — projects page is list-only (YAGNI)
- Do not put Cal.com embed bootstrapping directly inside `app/work-with-me/page.tsx`; keep it inside the client component
- Do not remove or bypass the Husky pre-commit lint hook without a strong reason
- Do not document content under `content/articles`; the live article directory is `content/writing`
- Do not describe the brand colors as indigo/emerald/amber unless the theme tokens are actually changed in `app/globals.css`
