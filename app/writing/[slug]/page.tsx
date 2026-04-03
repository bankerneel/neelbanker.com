import type { Metadata } from 'next'
import type { Article } from '@/types/content'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { getAllArticleMeta, getArticleBySlug } from '@/lib/mdx'
import { parseDate } from '@/lib/utils-date'
import { PillarBadge } from '@/components/pillar-badge'
import { FadeUp } from '@/components/scroll-reveal'

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
  const allArticles = getAllArticleMeta()
  const currentIndex = allArticles.findIndex((entry) => entry.slug === article.slug)
  const nextArticle = currentIndex > 0 ? allArticles[currentIndex - 1] : null
  const previousArticle = currentIndex >= 0 && currentIndex < allArticles.length - 1 ? allArticles[currentIndex + 1] : null

  return (
    <article className="py-14 sm:py-18">
      <div className="mx-auto max-w-5xl xl:max-w-6xl 2xl:max-w-7xl 3xl:max-w-[1440px] px-6 sm:px-12">
        <FadeUp>
          <div className="mb-8 flex flex-wrap items-center gap-3">
            <Link href="/writing" className="font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground transition-colors hover:text-primary">
              ← All Articles
            </Link>
            <span className="text-muted-foreground text-xs">/</span>
            <Link href="/" className="font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground transition-colors hover:text-primary">
              Home
            </Link>
          </div>
        </FadeUp>

        <FadeUp delay={0.05}>
          <div className="mb-5 flex flex-wrap items-center gap-3">
            <PillarBadge pillar={article.pillar} />
            <span className="font-mono text-xs text-muted-foreground">{parseDate(article.date)}</span>
            <span className="text-muted-foreground text-xs">·</span>
            <span className="font-mono text-xs text-muted-foreground">{article.readingTime} min read</span>
          </div>
        </FadeUp>

        <FadeUp delay={0.1}>
          <div className="mb-12 border-b border-border pb-8">
            <h1 className="max-w-[18ch] text-3xl font-bold leading-[1] tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
              {article.title}
            </h1>
          </div>
        </FadeUp>
      </div>

      <div className="mx-auto max-w-2xl px-6 sm:px-12">
        <FadeUp delay={0.15}>
          <div className="prose prose-invert prose-zinc prose-headings:font-bold prose-headings:tracking-tight prose-p:leading-[1.85] prose-p:text-foreground/92 prose-li:leading-[1.8] prose-strong:text-foreground prose-a:text-primary prose-a:no-underline hover:prose-a:text-foreground prose-pre:border prose-pre:border-border prose-pre:bg-muted/30 prose-code:text-foreground max-w-none">
            <MDXRemote source={article.content} />
          </div>
        </FadeUp>

        <FadeUp delay={0.2}>
          <div className="mt-16 border-t border-border pt-10">
            <div className="mb-10 grid gap-px bg-border sm:grid-cols-2">
              {nextArticle && (
                <Link
                  href={`/writing/${nextArticle.slug}`}
                  className="group bg-background p-5 transition-colors duration-200 hover:bg-muted/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                >
                  <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">Newer article</p>
                  <p className="font-semibold leading-[1.6] transition-colors duration-200 group-hover:text-primary">{nextArticle.title}</p>
                </Link>
              )}
              {previousArticle && (
                <Link
                  href={`/writing/${previousArticle.slug}`}
                  className="group bg-background p-5 transition-colors duration-200 hover:bg-muted/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                >
                  <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">Earlier article</p>
                  <p className="font-semibold leading-[1.6] transition-colors duration-200 group-hover:text-primary">{previousArticle.title}</p>
                </Link>
              )}
            </div>

            <p className="mb-3 font-mono text-xs uppercase tracking-[0.22em] text-primary">Free · Weekly</p>
            <p className="mb-2 text-xl font-bold uppercase tracking-tighter sm:text-2xl">Enjoyed This?</p>
            <p className="mb-6 max-w-md text-sm leading-relaxed text-muted-foreground">
              Get The Architect&apos;s Brief — weekly insights on blockchain architecture, AI × Web3, and engineering leadership.
            </p>
            <Link
              href="/newsletter"
              className="inline-flex items-center bg-primary px-5 py-2.5 font-mono text-xs font-bold uppercase tracking-widest text-primary-foreground transition-colors hover:bg-foreground hover:text-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              Subscribe Free →
            </Link>
            <div className="mt-8 flex flex-wrap items-center gap-6 border-t border-border pt-6">
              <Link href="/writing" className="font-mono text-xs uppercase tracking-widest text-muted-foreground transition-colors hover:text-primary">
                ← Back to all articles
              </Link>
              <Link href="/work-with-me" className="font-mono text-xs uppercase tracking-widest text-muted-foreground transition-colors hover:text-primary">
                Work with Neel →
              </Link>
            </div>
          </div>
        </FadeUp>
      </div>
    </article>
  )
}
