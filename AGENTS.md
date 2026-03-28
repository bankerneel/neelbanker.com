# Agent Rules — neelbanker.com

Personal brand website for **Neel Banker** (Senior Blockchain Architect, Ahmedabad).
Stack: Next.js 16 App Router · Tailwind v4 · shadcn/ui · MDX · Resend · Vercel.

---

## Critical: Next.js 16 patterns

- All request APIs are **async**: `await cookies()`, `await headers()`, `await params`, `await searchParams`
- Use `proxy.ts` not `middleware.ts` (Next.js 16 rename)
- Turbopack config is top-level in `next.config.ts`, not under `experimental`
- Default to **Server Components**. Add `'use client'` only when you need interactivity or browser APIs
- Server Actions (`'use server'`) for mutations, Route Handlers only for public APIs
- OG images use **Node.js runtime** (not Edge) — `getAllArticleMeta` requires `fs`

## Critical: Tailwind v4

- **No `tailwind.config.ts`** — this project uses CSS-first config
- All theme tokens are in `app/globals.css` under `@theme inline { ... }`
- Plugins use `@plugin "..."` directive (e.g. `@plugin "@tailwindcss/typography"`)
- Do NOT create `tailwind.config.ts` or reference `plugins:` array

## Critical: Server/Client boundary

- `lib/mdx.ts` uses Node.js `fs`/`path` — **never import in `'use client'` components**
- Pure client-safe utils live in `lib/utils-date.ts`
- Components that filter/display articles must import `parseDate` from `lib/utils-date.ts`, not `lib/mdx.ts`

## Content

- MDX files live in `content/articles/`, `content/resources/`, `content/projects/`
- Frontmatter parsed with `gray-matter`; body rendered with `next-mdx-remote/rsc`
- Pillar slugs: `blockchain` | `ai` | `leadership`
- ISO 8601 date sort (`a.date < b.date`) is correct — lexicographic = chronological for `YYYY-MM-DD`

## Email (Resend)

- Client singleton in `lib/resend.ts` — uses `?? 'placeholder'` guard, no module-level throw
- Newsletter opt-in is **explicit** — only subscribe when `optIn === true`
- Always guard on `NEWSLETTER_AUDIENCE_ID` being non-empty before calling Resend Audience API
- `FROM_EMAIL = 'Neel Banker <neel@neelbanker.com>'`

## Security

- Apply `escapeHtml()` to **all user-supplied fields** before HTML email interpolation
- Validate all API route inputs with **Zod**
- Never expose raw error messages to API responses — use generic user-facing messages

## Testing

- Unit tests: Vitest + React Testing Library (`npm run test`)
- E2E tests: Playwright (`npm run test:e2e`) — webServer config auto-starts dev server
- E2E specs live in `e2e/`

## Design

- Dark-only site (no light mode toggle) — `dark` class on `<html>`
- Indigo primary (`hsl(238 84% 67%)`), emerald AI, amber leadership
- Geist Sans for UI, Geist Mono for code/metrics/IDs
- Spacing and typography create hierarchy — avoid adding new colour variables without reason

## What NOT to do

- Do not add `tailwind.config.ts`
- Do not add `runtime = 'edge'` to OG image files
- Do not import `lib/mdx.ts` in client components
- Do not call Resend Audience API without checking `NEWSLETTER_AUDIENCE_ID`
- Do not interpolate user input into HTML without `escapeHtml()`
- Do not add `getProjectBySlug` — projects page is list-only (YAGNI)
