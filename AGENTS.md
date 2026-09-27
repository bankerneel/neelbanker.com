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
- Current top-level routes are `/`, `/about`, `/newsletter`, `/projects`, `/resources`, `/resume`, `/speaking`, `/work-with-me`, and `/writing` (plus the unlisted `/design-lab`)
- Content authoring instructions live in `docs/content-authoring.md` and are indexed from `docs/README.md`
- Article slugs are filename-based and resolve under `/writing/[slug]`
- Standalone pages and article pages include local navigation CTAs; preserve that flow when adding new pages
- **No real project or client names on the site** (Neel, 2026-09-27) until he approves each one: every project is `Project <Codename> — <description>`, and the codename, filename/slug, excerpt and Outcome bullets must not reveal the real name (slugs ship to the browser). `/resume` is exempt. SoluLab case-study chips use descriptive labels, not client names. See `docs/content-authoring.md`

## Project Tracking Docs

- `STATES.md` is the current snapshot: what has been improved, what is in progress, and what should be reviewed next
- `MEMORY.md` is the durable working memory for important decisions, constraints, and non-obvious context learned during the build
- `ROADMAP.md` is the prioritized forward plan; update it when major workstreams change
- After every user prompt that changes project state, update these docs in the same change so the repo state stays legible
- At minimum, refresh `STATES.md`; update `MEMORY.md` and `ROADMAP.md` whenever the prompt changes decisions, constraints, or priorities

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

- Unit tests: Vitest + React Testing Library (`npm run test`). Needs **Node ^20.19.0 || >=22.12.0** (Vite 8); `.nvmrc` says 24. A `pretest` guard (`scripts/check-node.mjs`) fails fast on older Node. Don't express this as `engines` in `package.json` — Vercel uses that field to pick the production Node version.
- E2E tests: Playwright (`npm run test:e2e`) — webServer config auto-starts the dev server (or reuses one on :3000). On Windows it runs on the system Edge (`channel: 'msedge'`), so no browser download is needed; `PW_CHANNEL` overrides. Run artifacts (`test-results/`, `playwright-report/`) are gitignored.
- E2E specs live in `e2e/` (routes, navigation, forms with mocked APIs, print, layout overflow guard); interact via `gotoHydrated()` from `e2e/helpers.ts`, never before hydration. They are excluded from Vitest (`vitest.config.ts`) — its default pattern also matches `*.spec.ts`
- Linting: `npm run lint`
- Type checking: `npm run typecheck`
- Git hooks: Husky pre-commit runs `npm run lint` and `npm run typecheck` before a commit is created
- Useful local scripts also include `npm run prepare`, `npm run test:watch`, and `npm run test:ui`

## Design — Dream Bazaar (Direction P)

Selected 2026-09-26 by Neel and his wife from the 17 prototypes in `/design-lab`: Maximalism × Dream Collage —
overlapping torn scraps, polaroids, pattern swatches and ticket-stub chips on a dream-sky gradient, no grid,
handwritten accents. The live system is `app/globals.css` + `components/bazaar/`; the frozen prototype is
`app/design-lab/dream-bazaar/page.tsx` (reference only — do not import from `app/design-lab/` into live pages).

Migration status: every page is on the new system (completed 2026-09-27 on `dev`; see `ROADMAP.md` §0).

### Theme: light + dark

- Default follows the visitor's OS (`prefers-color-scheme`). The nav toggle (`components/theme-toggle.tsx`)
  overrides it and persists the choice in `localStorage['nb-theme']`.
- A `next/script` (`strategy="beforeInteractive"`, id `theme-init`) in `app/layout.tsx` sets `data-theme` on `<html>`
  **before first paint**. Pages that call `notFound()` are rendered without it having run (dev and prod), so
  `ThemeToggle` re-applies the theme on mount when `data-theme` is unset — keep that fallback. `dark:` utilities
  key off `[data-theme="dark"]`, not a `.dark` class.
- Every colour is a `--dm-*` custom property with a light value on `:root` and a dark value on
  `:root[data-theme="dark"]`. A new colour needs both, or it breaks one theme.

### Colour

- Surfaces: the dream-sky gradient (`--dm-dream`, painted on a fixed `body::before`) and `dm-panel` paper.
- Accents: `dm-rose`, `dm-butter`, `dm-sky`, `dm-lilac`, `dm-sage`, `dm-terra` — muted and low-saturation on
  purpose. A neon version was rejected as garish; do not add saturated colours.
- **Filled surfaces use a `tone-*` class** (`tone-panel`, `tone-ink`, `tone-sage`, …). It pairs the fill with the
  text colour that passes contrast in both themes: text on accent fills is `dm-on-accent`; text on panels and
  the sky is `dm-ink` / `dm-ink-soft`.
- **`dm-accent-ink` is the only coloured text colour** (links, handwritten accents, drop caps). The accent fills
  fail as text (terra is 2.7:1 on panel) — never use `text-dm-terra`, `text-dm-rose`, etc.
- Borders use `currentColor` (`border-current`), so they always match the text of the surface they sit on.
- Pillars: blockchain = sage, ai = sky, leadership = rose (`lib/pillars.ts` → `toneClass`).
- shadcn tokens (`--background`, `--primary`, `--ring`, `--border`…) are mapped onto `--dm-*`, so `components/ui`
  primitives inherit the palette. `primary` / `ring` = `dm-accent-ink`.
- Measured contrast (keep it): ink on panel 12.2:1 light / 11.2:1 dark; on-accent on every fill ≥ 4.8:1 in both
  modes; accent-ink 5.96:1 on the light panel and 5.9:1 on the dark panel.

### Type

- **Archivo** (variable, one file) for everything. Headlines: `font-black uppercase`, tracking `-0.03em` to
  `-0.05em`, leading `0.85–0.95`. Body: 400–500.
- **Caveat** (`.hand`, one static weight) for short handwritten accents only: kickers, captions, one word in a
  headline, signatures. Never paragraphs, never UI labels, never smaller than ~1.1rem.
- `.max-outline` outlines a word; set `--stroke` if the ink colour isn't right. At most one outlined word or
  phrase per heading.
- Labels: Archivo bold uppercase, 10–12px, tracking `0.12–0.24em`. `font-mono` is a system stack for code only —
  no mono labels (that was the old system).

### Composition

- **Torn scraps** — `components/bazaar/scrap.tsx`. `clip-path` clips borders, box-shadow and focus rings on the
  element it is applied to, so `Scrap` draws its shadow as a separate layer behind the paper. Put rotation,
  links and focus rings on the scrap's wrapper (`className`), never on the paper (`paperClassName`). Use `tall`
  for long content (fixed 14px tear instead of a percentage jag).
- **Ticket chips** — `.ticket` + a `tone-*` class, tilted with `rotate-*` utilities (±1–3°).
- **Polaroids** — panel frame, accent "photo" box, handwritten caption, `shadow-hard-lg`.
- Shadows are hard offsets only (`shadow-hard`, `shadow-hard-lg`, `.dm-longshadow`) — no blur.
- Tilt decorative pieces ±1–6°. **Reading surfaces stay at 0°**: article sheets, forms, tables, code.
- Overlap with negative margins only from `lg:` up; below `lg` stack with normal gaps. Test the longest real
  title at 375px before calling a layout done (longest article title: 88 characters).
- Pattern swatches (`pat-dots` / `pat-stripes` / `pat-zig`) and arches (`surreal-arch`) are decoration:
  `aria-hidden`, `pointer-events-none`, hidden below `lg`.
- Shared pieces: `components/bazaar/page-intro.tsx` (breadcrumb tickets → kicker → h1 → wall), `components/bazaar/styles.ts`
  (`focusRing`, `tones`, `tilts`, `softTilts`, `chipLink`).
- Page container: the `page-wrap` utility (max 1400px, 20/32/48px gutters). Replaces the old 4-stop
  `max-w-5xl xl:max-w-6xl …` scale.
- `<main>` has `overflow-x-clip` as a safety net for tilted pieces; still check `scrollWidth` at 375px.
- Nav switches to the mobile menu below `lg` (1024px): the full chip row needs ~900px and overflowed at 800px.
- The header is `sticky top-0`; once the page scrolls (`useSyncExternalStore` on scroll, > 8px) a paper strip fades in
  behind it. Its height never changes (no padding animation). `html` has `scroll-padding-top: 6rem` so anchor targets
  clear it. The print rule `body > header` still hides it.

### Page header pattern

`.hand` kicker in `dm-accent-ink`, rotated −2° → h1 in Archivo 900 uppercase with a `clamp()` size and an
outlined last word → standfirst on a torn `Scrap`. See `app/writing/[slug]/page.tsx`. Replaces the old
mono-label + h1 pattern.

### Long-form (MDX)

- Wrap MDX in `prose prose-lg prose-bazaar max-w-none` on a `Scrap tall` sheet. `.prose-bazaar` (globals.css)
  maps typography colours to the palette and adds the h2 highlighter, drop cap, link underline, code and table
  styles.
- `articleMdxComponents` also provides `<Callout type="note|tip|warning">` for authors and wraps `<pre>` in
  `components/bazaar/code-block.tsx` (copy button + language label). Article pages show a reading-progress bar
  (`components/bazaar/reading-progress.tsx`, tracks `#article-body`) and a same-pillar "More on …" list.
- Pass `components={articleMdxComponents}` (`components/mdx-components.tsx`) and
  `options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}` — without `remark-gfm`, markdown tables render as a
  paragraph of pipes.

### Interactive elements (accessibility — unchanged)

- All clickable elements have `cursor-pointer`; disabled ones `disabled:cursor-not-allowed`.
- All interactive elements have `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary`
  (add `ring-offset-2 ring-offset-dm-panel` on coloured chips). Never `focus:ring-0`.
- Transitions: colours (`transition-colors`) or transforms only (`transition-[rotate]`, `translate`). Never
  `transition-all`; never animate padding, margin, width or height.
- Touch targets ≥ 40px on mobile (`min-h-10` / `min-h-12` on chips and menu rows).

### Motion

`app/globals.css` has a `prefers-reduced-motion: reduce` guard; new `@keyframes` must respect it. Motion is CSS +
IntersectionObserver (`components/scroll-reveal.tsx`); framer-motion was removed — don't reintroduce it. Don't
wrap above-the-fold content in `FadeUp`: it stays invisible until hydration and delays LCP.

### Homepage

- The hero (`components/home-hero.tsx`) is the approved lab prototype on real content: "Building / *what's* /
  Next." (solid / Caveat / outlined), copy scrap, stat polaroids, a straight subscribe strip, and the tech stack
  as a tilted "ticker tape" marquee (the marquee is a kept user preference; it stops under reduced motion).
- It is a static server component with no entrance animation — the h1 is the LCP element; keep it that way.
- The old dark hero, its lazy desktop constellation and `hero-logos` were removed in the redesign.
- Favicon source is `public/favicon.svg`; do not reintroduce `app/favicon.ico`.
- OG images (`app/opengraph-image.tsx`, `app/writing/[slug]/opengraph-image.tsx`) share `lib/og.tsx`: the light
  palette mirrored as hex (Satori can't read CSS variables — keep it in sync with `:root`), and Archivo 900 +
  Caveat fetched from Google Fonts subset to the drawn text, with a default-font fallback if the fetch fails.
  Avoid glyphs the fonts lack (e.g. ✦) — Satori has no fallback font configured.

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
- Do not describe the brand colours as lime/cyan/orange or dark-only — that was the pre-2026-09 system; the palette is the muted Dream Bazaar set in `app/globals.css`
- Do not hard-code hex colours in components — use `--dm-*` tokens via `tone-*` classes or `dm-*` utilities
- Do not put `box-shadow`, borders or focus rings on a `clip-path` element — use `Scrap` (shadow layer) and style its wrapper
- Do not add `app/favicon.ico` back unless you explicitly want Next.js to auto-inject an `.ico` favicon again
- Do not use `focus:ring-0` or `focus:outline-none` alone on inputs — always pair with `focus-visible:ring-2 focus-visible:ring-primary`
- Do not use accent fills (`text-dm-terra`, `text-dm-rose`, …) as text colours — they fail contrast; use `text-dm-accent-ink`
- Do not animate `padding`/`margin` on hover — causes layout reflow; use `transition-colors` or `transform` only
- Do not use `transition-all` on hover — always specify the property (e.g. `transition-colors duration-200`)
- Do not use `grid sm:grid-cols-2` for `ArticleCard` lists — ArticleCard is a full-width index card; stack it (`space-y-7`) and pass `index` for its tilt
- Do not add emoji as functional list-item bullets; use CSS/text markers (`→`, `—`) or styled `before:` content
