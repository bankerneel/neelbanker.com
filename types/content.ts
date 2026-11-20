export type PillarSlug = 'blockchain' | 'ai' | 'leadership'

export interface Pillar {
  slug: PillarSlug
  label: string
  short: string        // one-word label for tight spots, e.g. 'Blockchain'
  emoji: string
  colour: string       // Dream Bazaar accent name, e.g. 'sage'
  toneClass: string    // filled surface: accent fill + on-accent text, e.g. 'tone-sage'
  bgClass: string      // accent fill only, e.g. 'bg-dm-sage'
  textClass: string    // text colour that is readable on panels
  borderClass: string  // e.g. 'border-dm-sage'
}

export interface ArticleMeta {
  slug: string
  title: string
  date: string          // ISO 8601 e.g. '2026-03-20'
  pillar: PillarSlug
  excerpt: string
  readingTime: number   // minutes, computed
  cover?: string        // optional local cover WebP, e.g. '/images/writing/your-slug.webp'
  draft?: boolean       // from content/drafts/ — only ever present under `next dev`
}

export interface Article extends ArticleMeta {
  content: string       // raw MDX string (passed directly to next-mdx-remote/rsc MDXRemote)
}

export interface ResourceMeta {
  slug: string
  title: string
  description: string
  fileUrl: string       // path to PDF in /public/resources/
  subscribeOptIn: boolean  // always true — just marks gating required
}

export interface ProjectMeta {
  slug: string
  title: string
  excerpt: string
  chain?: string        // e.g. 'Ethereum mainnet'
  stack: string[]       // e.g. ['Solidity', 'Fireblocks', 'Node.js']
  date: string
  outcome: string[]     // bullets from the MDX body's "## Outcome" section (may be empty)
  employer?: Employer   // frontmatter `employer`; sets `role`
  role?: string         // derived from employer (lib/roles.ts)
  caseStudy?: string    // frontmatter `caseStudy`: official external case-study URL
  highlight?: boolean   // frontmatter `highlight: true`: pinned first on /projects with a "favourite" note
  cover?: string        // frontmatter `cover`: optional local image shown on the card, e.g. '/images/wamt/banner.webp'
  coverDark?: string    // frontmatter `coverDark`: dark-theme variant of `cover`, shown via dark: utilities
  coverWidth?: number   // intrinsic width of the cover, for the plain <img> width attribute
  coverHeight?: number  // intrinsic height of the cover, for the plain <img> height attribute
  links?: ProjectLink[] // frontmatter `links`: extra labelled links rendered as chips on the card
}

export interface ProjectLink {
  label: string
  href: string
}

export type Employer = 'Tech Alchemy' | 'SoluLab' | 'Personal'

export interface Project extends ProjectMeta {
  content: string
}
