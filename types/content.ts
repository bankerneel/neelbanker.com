export type PillarSlug = 'blockchain' | 'ai' | 'leadership'

export interface Pillar {
  slug: PillarSlug
  label: string
  emoji: string
  colour: string       // tailwind class prefix e.g. 'indigo'
  bgClass: string      // e.g. 'bg-indigo-500/10'
  textClass: string    // e.g. 'text-indigo-400'
  borderClass: string  // e.g. 'border-indigo-500/30'
}

export interface ArticleMeta {
  slug: string
  title: string
  date: string          // ISO 8601 e.g. '2026-03-20'
  pillar: PillarSlug
  excerpt: string
  readingTime: number   // minutes, computed
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
}

export interface Project extends ProjectMeta {
  content: string
}
