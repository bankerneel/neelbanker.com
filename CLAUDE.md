# Claude Guidance

Primary project instructions live in [AGENTS.md](./AGENTS.md) and should be treated as the source of truth.

Current setup highlights:

- Next.js 16 App Router with Server Components by default
- Tailwind CSS v4 with CSS-first configuration in `app/globals.css`
- Syne + JetBrains Mono via `next/font/google`
- MDX content in `content/writing`, `content/resources`, and `content/projects`
- Resend for email flows
- Newsletter emails use `insights@neelbanker.com`; contact emails use `inquiry@neelbanker.com`
- Cal.com React embed for booking on `/work-with-me`
- Root and article OG image routes live in `app/opengraph-image.tsx` and `app/writing/[slug]/opengraph-image.tsx`
- SVG-only favicon lives at `public/favicon.svg`
- Husky pre-commit hook runs `npm run lint` and `npm run typecheck`
- Standalone pages include in-page navigation CTAs to avoid dead-end flows

When in doubt, follow `AGENTS.md` over this file.
