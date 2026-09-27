# Content Authoring

This project stores editorial content as MDX files inside `content/`.

Current directories:

- `content/writing/` for articles
- `content/resources/` for gated resources
- `content/projects/` for project case studies

Pillar slugs:

- `blockchain`
- `ai`
- `leadership`

Date format:

- Use ISO `YYYY-MM-DD`
- Example: `2026-04-01`

## Add An Article

Create a new file in `content/writing/your-slug.mdx`.

Required frontmatter:

```mdx
---
title: "Your Article Title"
date: "2026-04-01"
pillar: "blockchain"
excerpt: "One sentence summary shown on the writing page."
---
```

Example body:

```mdx
---
title: "How I Think About Wallet Architecture"
date: "2026-04-01"
pillar: "blockchain"
excerpt: "A practical framework for choosing between EOAs, MPC, and account abstraction."
---

## Start With The Constraint

Write your article in MDX below the frontmatter.
```

Notes:

- The slug comes from the filename.
- Reading time is computed automatically from the body content.
- Articles are sorted by `date` descending.

## Add A Resource

Create a new file in `content/resources/your-slug.mdx`.

Required frontmatter:

```mdx
---
title: "Your Resource Title"
description: "What the resource covers and why it is useful."
fileUrl: "/resources/your-file.pdf"
---
```

Example:

```mdx
---
title: "Smart Contract Launch Checklist"
description: "A practical pre-mainnet checklist for Solidity teams."
fileUrl: "/resources/smart-contract-launch-checklist.pdf"
---

# Smart Contract Launch Checklist

Add the resource overview here.
```

Also add the downloadable file to `public/resources/`.

Notes:

- The slug comes from the filename.
- Resources are email-gated through `/api/download`.
- `subscribeOptIn` is not written in frontmatter; it is derived in code.

## Add A Project

Create a new file in `content/projects/your-slug.mdx`.

Required frontmatter:

```mdx
---
title: "Your Project Title"
excerpt: "Short summary used on the projects page."
stack: ["Solidity", "Node.js"]
date: "2026-04-01"
---
```

Optional frontmatter:

```mdx
chain: "Ethereum mainnet"
employer: "Tech Alchemy"   # or "SoluLab" or "Personal" — the group; shows Neel's role for it (lib/roles.ts)
caseStudy: "https://www.solulab.com/case-study/…"   # official external case study, shown as a link
highlight: true   # pins the project first on /projects with a handwritten "a favourite" note
```

**Naming rule (2026-09-27): the name depends on the group** (`employer`).
- **SoluLab:** the real product name (Neel is not under NDA with SoluLab), e.g. "DocTrace — File-less Records on
  Hyperledger Fabric".
- **Tech Alchemy** (and any project not yet mapped): `Project <Codename> — <what it is>`, with a codename that fits
  the description. Never derive the codename from the real name. The filename is the slug, and slugs are sent to the
  browser (page data and the client JS on `/projects`), so **the filename must not contain the real name either**
  (`atlas-multichain-wallet.mdx`, not the product's name).
- **Personal:** a pseudonym product name, never the original (in the title or the filename), e.g. "CredSeal —
  Blockchain Credential Verification".
- For Tech Alchemy and Personal projects, keep real names out of the excerpt and the `## Outcome` bullets too — both render on the card.
- `/resume` is exempt: it is Neel's CV and stays as written.

Example:

```mdx
---
title: "Custody Platform Evaluation"
excerpt: "A side-by-side architecture and cost review of two custody providers."
chain: "Ethereum, Bitcoin, Polygon"
stack: ["Fireblocks SDK", "BitGo SDK", "Node.js", "PostgreSQL"]
date: "2026-04-01"
---

## Problem

Describe the problem space.

## Approach

Explain the architecture and decisions.
```

Notes:

- The slug comes from the filename.
- Projects are list-only right now; there is no individual project page helper.
- Projects are sorted by `date` descending.
- Write a `## Outcome` section as a bullet list of concrete results (numbers beat adjectives). The first two
  bullets show on the project card as "what shipped" (three on the homepage). Projects without one simply
  show no outcome block.
- Add the new slug to `PROJECT_CATEGORIES` in `components/project-browser.tsx`, or it only appears under "All work".

## Drafts

Put unreviewed articles in `content/drafts/` (same frontmatter as `content/writing/`). The folder is gitignored
and only `next dev` reads it: drafts appear in the archive and at `/writing/<slug>` with a "Draft — not published"
marker, and never reach a production build. To publish, move the file to `content/writing/`, set the real
`date`, and delete the review-notes callout at the top.

## Callouts And Code In Articles

Articles can pin a note with the `<Callout>` component — no import needed:

```mdx
<Callout type="warning" title="Oracle keys">
  Treat the oracle as your highest-risk component.
</Callout>
```

- `type`: `note` (sky), `tip` (sage) or `warning` (rose). `title` is optional.
- Keep callouts to one or two sentences; they are for the thing a reader must not miss.
- Fenced code blocks get a copy button automatically. Add a language (```` ```solidity ````) to show a label.
- GitHub-style tables work (`remark-gfm`); wide tables scroll inside the article instead of overflowing.

## Writing Tips

- Keep excerpts tight and specific.
- Use real dates, not placeholders.
- Keep filenames lowercase and kebab-case.
- Prefer concise, practical titles over vague thought-leadership phrasing.

## Validation Checklist

Before committing content:

1. Confirm the frontmatter keys match the examples above.
2. Confirm the pillar is one of `blockchain`, `ai`, or `leadership` when required.
3. Confirm any `fileUrl` points to a file that exists in `public/resources/`.
4. Run `npm run lint`.

## UI notes for future components

If you add new article/resource/project cards or list components, follow these conventions:

- `ArticleCard` is a **full-width row** component. Never place it inside a multi-column grid (`sm:grid-cols-2`). Wrap a list of `ArticleCard`s in a plain `<div>` with no grid classes.
- `ResourceCard` and `ProjectCard` are grid-safe (designed for `sm:grid-cols-2`).
- All interactive elements (buttons, form inputs) must have visible focus indicators: `focus-visible:ring-2 focus-visible:ring-primary`. Never use `focus:ring-0`.
- New animations must be wrapped in `@media (prefers-reduced-motion: no-preference)` or guarded by the reduce block in `app/globals.css`.
