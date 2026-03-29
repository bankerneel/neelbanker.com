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
```

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
