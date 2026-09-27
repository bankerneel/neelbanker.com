# Claude Guidance

Primary project instructions live in [AGENTS.md](./AGENTS.md) and should be treated as the source of truth.

Current setup highlights:

- Next.js 16 App Router with Server Components by default
- Tailwind CSS v4 with CSS-first configuration in `app/globals.css`
- Archivo (variable) + Caveat (handwritten accents) via `next/font/google`
- MDX content in `content/writing`, `content/resources`, and `content/projects`; articles render with `remark-gfm`
- Resend for email flows
- Newsletter emails use `insights@neelbanker.com`; contact emails use `inquiry@neelbanker.com`
- Contact form validation is shared in `lib/contact-schema.ts` and the UI highlights invalid fields before submit
- Cal.com React embed for booking on `/work-with-me`
- Root and article OG image routes live in `app/opengraph-image.tsx` and `app/writing/[slug]/opengraph-image.tsx`
- SVG-only favicon lives at `public/favicon.svg`
- Husky pre-commit hook runs `npm run lint` and `npm run typecheck`
- Standalone pages include in-page navigation CTAs to avoid dead-end flows

Design conventions — **Dream Bazaar** (live since 2026-09-26; full rules in AGENTS.md "Design"):
- Light + dark: follows the OS, nav toggle overrides (`localStorage['nb-theme']`); `data-theme` on `<html>` is set before paint
- Colours are `--dm-*` tokens; filled surfaces use `tone-*` classes; the only coloured text is `text-dm-accent-ink`
- Torn paper = `components/bazaar/scrap.tsx` (never shadow/border/ring a `clip-path` element directly)
- Headlines Archivo 900 uppercase; Caveat (`.hand`) for short accents only; reading surfaces stay unrotated
- All interactive elements need `cursor-pointer` and `focus-visible:ring-2 focus-visible:ring-primary` — never `focus:ring-0`
- Hover animations use colour or transform transitions only — no `transition-all`, no padding/margin animation
- `app/globals.css` includes a `prefers-reduced-motion: reduce` guard — all new keyframes must respect it

When in doubt, follow `AGENTS.md` over this file.
