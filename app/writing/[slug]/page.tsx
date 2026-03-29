import type { Metadata } from 'next'
import type { Article } from '@/types/content'
import Link from 'next/link'
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
    <article className="mx-auto max-w-2xl px-6 sm:px-12 py-16 sm:py-20">

      {/* ── Breadcrumb ───────────────────────────────────── */}
      <div className="mb-10 flex flex-wrap items-center gap-3">
        <Link href="/writing" className="font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground transition-colors hover:text-primary">
          ← All Articles
        </Link>
        <span className="text-muted-foreground text-xs">/</span>
        <Link href="/" className="font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground transition-colors hover:text-primary">
          Home
        </Link>
      </div>

      {/* ── Article meta ─────────────────────────────────── */}
      <div className="mb-5 flex flex-wrap items-center gap-3">
        <PillarBadge pillar={article.pillar} />
        <span className="font-mono text-xs text-muted-foreground">{parseDate(article.date)}</span>
        <span className="text-muted-foreground text-xs">·</span>
        <span className="font-mono text-xs text-muted-foreground">{article.readingTime} min read</span>
      </div>

      {/* ── Title ────────────────────────────────────────── */}
      <h1 className="mb-8 text-2xl sm:text-3xl font-bold leading-snug tracking-tight">{article.title}</h1>

      {/* ── Body ─────────────────────────────────────────── */}
      <div className="prose prose-invert prose-zinc max-w-none">
        <MDXRemote source={article.content} />
      </div>

      {/* ── Newsletter CTA ───────────────────────────────── */}
      <div className="mt-16 border-t border-border pt-10">
        <p className="font-mono text-xs uppercase tracking-[0.22em] text-primary mb-3">Free · Weekly</p>
        <p className="font-extrabold text-xl sm:text-2xl uppercase tracking-tighter mb-2">Enjoyed This?</p>
        <p className="text-sm text-muted-foreground leading-relaxed mb-6 max-w-md">
          Get The Architect&apos;s Brief — weekly insights on blockchain architecture, AI × Web3, and engineering leadership.
        </p>
        <Link
          href="/newsletter"
          className="inline-flex items-center bg-primary px-5 py-2.5 font-mono text-xs font-bold uppercase tracking-widest text-primary-foreground transition-colors hover:bg-foreground hover:text-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          Subscribe Free →
        </Link>
        <div className="mt-8 flex flex-wrap items-center gap-6">
          <Link href="/writing" className="font-mono text-xs uppercase tracking-widest text-muted-foreground transition-colors hover:text-primary">
            ← Back to all articles
          </Link>
          <Link href="/work-with-me" className="font-mono text-xs uppercase tracking-widest text-muted-foreground transition-colors hover:text-primary">
            Work with Neel →
          </Link>
        </div>
      </div>

    </article>
  )
}
