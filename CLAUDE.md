# Claude Guidance

Primary project instructions live in [AGENTS.md](./AGENTS.md) and should be treated as the source of truth.

Current setup highlights:

- Next.js 16 App Router with Server Components by default
- Tailwind CSS v4 with CSS-first configuration in `app/globals.css`
- Syne + JetBrains Mono via `next/font/google`
- MDX content in `content/writing`, `content/resources`, and `content/projects`
- Resend for email flows
- Newsletter emails use `insights@neelbanker.com`; contact emails use `inquiry@neelbanker.com`
- Contact form validation is shared in `lib/contact-schema.ts` and the UI highlights invalid fields before submit
- Cal.com React embed for booking on `/work-with-me`
- Root and article OG image routes live in `app/opengraph-image.tsx` and `app/writing/[slug]/opengraph-image.tsx`
- SVG-only favicon lives at `public/favicon.svg`
- Husky pre-commit hook runs `npm run lint` and `npm run typecheck`
- Standalone pages include in-page navigation CTAs to avoid dead-end flows

Design conventions (enforced, see AGENTS.md for full rules):
- Inner pages use a two-layer header: `font-mono text-xs uppercase tracking-[0.22em]` label + `font-extrabold text-4xl+ uppercase tracking-tighter` h1
- All interactive elements need `cursor-pointer` and `focus-visible:ring-2 focus-visible:ring-primary` — never `focus:ring-0`
- Hover animations use `transition-colors duration-200` only — no `transition-all`, no padding/margin animation
- `app/globals.css` includes `prefers-reduced-motion: reduce` guard — all new keyframes must respect it
- `ArticleCard` is a full-width row component — never put it in a `sm:grid-cols-2` grid

When in doubt, follow `AGENTS.md` over this file.
