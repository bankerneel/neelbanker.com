import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import type { ArticleMeta, Article, ResourceMeta, ProjectMeta } from '@/types/content'
export { parseDate } from '@/lib/utils-date'

const CONTENT_DIR = path.join(process.cwd(), 'content')

// ─── Utilities ───────────────────────────────────────────────────────────────

export function computeReadingTime(content: string): number {
  const words = content.trim().split(/\s+/).length
  return Math.max(1, Math.round(words / 200))
}

function readMdxDir(type: 'writing' | 'resources' | 'projects') {
  const dir = path.join(CONTENT_DIR, type)
  if (!fs.existsSync(dir)) return []
  return fs.readdirSync(dir).filter((f) => f.endsWith('.mdx'))
}

// ─── Articles ────────────────────────────────────────────────────────────────

export function getAllArticleMeta(): ArticleMeta[] {
  return readMdxDir('writing').map((file) => {
    const slug = file.replace(/\.mdx$/, '')
    const raw = fs.readFileSync(path.join(CONTENT_DIR, 'writing', file), 'utf-8')
    const { data, content } = matter(raw)
    return {
      slug,
      title: data.title,
      date: data.date,
      pillar: data.pillar,
      excerpt: data.excerpt,
      readingTime: computeReadingTime(content),
    } satisfies ArticleMeta
  }).sort((a, b) => (a.date < b.date ? 1 : -1))
}

export function getArticleBySlug(slug: string): Article {
  const raw = fs.readFileSync(path.join(CONTENT_DIR, 'writing', `${slug}.mdx`), 'utf-8')
  const { data, content } = matter(raw)
  return {
    slug,
    title: data.title,
    date: data.date,
    pillar: data.pillar,
    excerpt: data.excerpt,
    readingTime: computeReadingTime(content),
    content, // raw MDX string — next-mdx-remote/rsc accepts this directly
  }
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
    } satisfies ProjectMeta
  }).sort((a, b) => (a.date < b.date ? 1 : -1))
}

// getProjectBySlug omitted — individual project pages are not in v1 scope (YAGNI)
