import type { Metadata } from 'next'
import type { Article } from '@/types/content'
import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { getAllArticleMeta, getArticleBySlug } from '@/lib/mdx'
import { parseDate } from '@/lib/utils-date'
import { PillarBadge } from '@/components/pillar-badge'

export async function generateStaticParams() {
  return getAllArticleMeta().map((a) => ({ slug: a.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const articles = getAllArticleMeta()
  const article = articles.find((a) => a.slug === slug)
  if (!article) return {}
  return { title: article.title, description: article.excerpt }
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  let article: Article | null = null
  try { article = getArticleBySlug(slug) } catch { notFound() }
  if (!article) notFound()

  return (
    <article className="mx-auto max-w-2xl px-6 py-16">
      <div className="mb-4 flex items-center gap-3">
        <PillarBadge pillar={article.pillar} />
        <span className="font-mono text-sm text-muted-foreground">{parseDate(article.date)}</span>
        <span className="text-sm text-muted-foreground">·</span>
        <span className="text-sm text-muted-foreground">{article.readingTime} min read</span>
      </div>
      <h1 className="mb-6 text-3xl font-bold leading-tight">{article.title}</h1>
      {/* MDXRemote from next-mdx-remote/rsc accepts raw MDX string in App Router */}
      <div className="prose prose-invert prose-zinc max-w-none">
        <MDXRemote source={article.content} />
      </div>
      <div className="mt-16 rounded-lg border border-border bg-muted/30 p-6 text-center">
        <p className="mb-1 text-sm font-semibold">Enjoyed this?</p>
        <p className="mb-4 text-sm text-muted-foreground">Get The Architect&apos;s Brief — weekly insights on blockchain, AI, and engineering.</p>
        <a href="/newsletter" className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">
          Subscribe free →
        </a>
      </div>
    </article>
  )
}
