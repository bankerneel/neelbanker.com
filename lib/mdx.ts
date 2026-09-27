import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import type { ArticleMeta, Article, ResourceMeta, ProjectMeta } from '@/types/content'
import { isEmployer, ROLE_BY_EMPLOYER } from '@/lib/roles'
export { parseDate } from '@/lib/utils-date'

const CONTENT_DIR = path.join(process.cwd(), 'content')

// ─── Utilities ───────────────────────────────────────────────────────────────

export function computeReadingTime(content: string): number {
  const words = content.trim().split(/\s+/).length
  return Math.max(1, Math.round(words / 200))
}

function readMdxDir(type: 'writing' | 'drafts' | 'resources' | 'projects') {
  const dir = path.join(CONTENT_DIR, type)
  if (!fs.existsSync(dir)) return []
  return fs.readdirSync(dir).filter((f) => f.endsWith('.mdx'))
}

// ─── Articles ────────────────────────────────────────────────────────────────

// Unreviewed drafts live in content/drafts/, which is gitignored. They are read
// only under `next dev`, flagged `draft: true`, so Neel can review them in the
// real design; `next build` (NODE_ENV=production) never sees them.
const SHOW_DRAFTS = process.env.NODE_ENV === 'development'

function articleSources(): { dir: 'writing' | 'drafts'; file: string }[] {
  const published = readMdxDir('writing').map((file) => ({ dir: 'writing' as const, file }))
  const drafts = SHOW_DRAFTS ? readMdxDir('drafts').map((file) => ({ dir: 'drafts' as const, file })) : []
  return [...published, ...drafts]
}

function readArticle(dir: 'writing' | 'drafts', file: string): Article {
  const raw = fs.readFileSync(path.join(CONTENT_DIR, dir, file), 'utf-8')
  const { data, content } = matter(raw)
  return {
    slug: file.replace(/\.mdx$/, ''),
    title: data.title,
    date: data.date,
    pillar: data.pillar,
    excerpt: data.excerpt,
    readingTime: computeReadingTime(content),
    ...(dir === 'drafts' ? { draft: true } : {}),
    content, // raw MDX string — next-mdx-remote/rsc accepts this directly
  }
}

export function getAllArticleMeta(): ArticleMeta[] {
  return articleSources()
    .map(({ dir, file }) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { content, ...meta } = readArticle(dir, file)
      return meta satisfies ArticleMeta
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1))
}

export function getArticleBySlug(slug: string): Article {
  const source = articleSources().find(({ file }) => file === `${slug}.mdx`)
  if (!source) throw new Error(`Article not found: ${slug}`)
  return readArticle(source.dir, source.file)
}

// ─── Resources ───────────────────────────────────────────────────────────────

export function getAllResourceMeta(): ResourceMeta[] {
  return readMdxDir('resources').map((file) => {
    const slug = file.replace(/\.mdx$/, '')
    const raw = fs.readFileSync(path.join(CONTENT_DIR, 'resources', file), 'utf-8')
    const { data } = matter(raw)
    return {
      slug,
      title: data.title,
      description: data.description,
      fileUrl: data.fileUrl,
      subscribeOptIn: true,
    } satisfies ResourceMeta
  })
}

// ─── Projects ────────────────────────────────────────────────────────────────

/**
 * The bullet list under a project's `## Outcome` heading, as plain text
 * (inline code, bold and links unwrapped). Empty when the section is missing.
 */
export function extractOutcome(content: string): string[] {
  const section = content.split(/^## Outcome\s*$/m)[1]?.split(/^## /m)[0] ?? ''
  return section
    .split('\n')
    .filter((line) => /^\s*[-*] /.test(line))
    .map((line) =>
      line
        .replace(/^\s*[-*] /, '')
        .replace(/`([^`]+)`/g, '$1')
        .replace(/\*\*([^*]+)\*\*/g, '$1')
        .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
        .trim(),
    )
    .filter(Boolean)
}

export function getAllProjectMeta(): ProjectMeta[] {
  return readMdxDir('projects').map((file) => {
    const slug = file.replace(/\.mdx$/, '')
    const raw = fs.readFileSync(path.join(CONTENT_DIR, 'projects', file), 'utf-8')
    const { data, content } = matter(raw)
    return {
      slug,
      title: data.title,
      excerpt: data.excerpt,
      chain: data.chain,
      stack: data.stack ?? [],
      date: data.date,
      outcome: extractOutcome(content),
      ...(isEmployer(data.employer) ? { employer: data.employer, role: ROLE_BY_EMPLOYER[data.employer] } : {}),
      ...(typeof data.caseStudy === 'string' && data.caseStudy ? { caseStudy: data.caseStudy } : {}),
    } satisfies ProjectMeta
  }).sort((a, b) => (a.date < b.date ? 1 : -1))
}

// getProjectBySlug omitted — individual project pages are not in v1 scope (YAGNI)
