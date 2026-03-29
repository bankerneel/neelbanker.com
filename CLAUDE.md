# Claude Guidance

Primary project instructions live in [AGENTS.md](./AGENTS.md) and should be treated as the source of truth.

Current setup highlights:

- Next.js 16 App Router with Server Components by default
- Tailwind CSS v4 with CSS-first configuration in `app/globals.css`
- Syne + JetBrains Mono via `next/font/google`
- MDX content in `content/writing`, `content/resources`, and `content/projects`
- Resend for email flows
- Cal.com React embed for booking on `/work-with-me`
- Husky pre-commit hook runs `npm run lint`

When in doubt, follow `AGENTS.md` over this file.
