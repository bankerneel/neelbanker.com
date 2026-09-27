import type { Metadata } from 'next'
import type { Article, ArticleMeta } from '@/types/content'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import remarkGfm from 'remark-gfm'
import { getAllArticleMeta, getArticleBySlug } from '@/lib/mdx'
import { getPillarBySlug } from '@/lib/pillars'
import { parseDate } from '@/lib/utils-date'
import { cn } from '@/lib/utils'
import { PillarBadge } from '@/components/pillar-badge'
import { Scrap } from '@/components/bazaar/scrap'
import { articleMdxComponents } from '@/components/mdx-components'
import { ReadingProgress } from '@/components/bazaar/reading-progress'
import { chipLink } from '@/components/bazaar/styles'

export async function generateStaticParams() {
  return getAllArticleMeta().map((a) => ({ slug: a.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const articles = getAllArticleMeta()
  const article = articles.find((a) => a.slug === slug)
  if (!article) return { title: 'Page not found' }
  return { title: article.title, description: article.excerpt }
}

/** The title's last word gets the outlined treatment — two words if the last is tiny ("You", "Them"). */
function splitTitle(title: string) {
  const words = title.split(' ')
  const take = words.length > 2 && words[words.length - 1].length <= 4 ? 2 : 1
  return { lead: words.slice(0, -take).join(' '), tail: words.slice(-take).join(' ') }
}

function readingNote(minutes: number) {
  if (minutes <= 5) return 'a quick one'
  if (minutes <= 10) return 'about one chai long'
  return 'settle in for this one'
}

const focusRing =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4 focus-visible:ring-offset-dm-panel'

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  let article: Article | null = null
  try { article = getArticleBySlug(slug) } catch { notFound() }
  if (!article) notFound()
  const allArticles = getAllArticleMeta()
  const currentIndex = allArticles.findIndex((entry) => entry.slug === article.slug)
  const nextArticle = currentIndex > 0 ? allArticles[currentIndex - 1] : null
  const previousArticle = currentIndex >= 0 && currentIndex < allArticles.length - 1 ? allArticles[currentIndex + 1] : null
  const neighbours = [
    nextArticle && { label: 'Newer ↑', tone: 'tone-butter', meta: nextArticle },
    previousArticle && { label: 'Earlier ↓', tone: 'tone-rose', meta: previousArticle },
  ].filter(Boolean) as { label: string; tone: string; meta: ArticleMeta }[]

  const pillar = getPillarBySlug(article.pillar)
  // Same-pillar pieces the reader hasn't just been offered as newer/earlier.
  const shown = new Set([article.slug, ...neighbours.map((n) => n.meta.slug)])
  const related = allArticles.filter((a) => a.pillar === article.pillar && !shown.has(a.slug)).slice(0, 3)
  const { lead, tail } = splitTitle(article.title)
  const month = new Date(article.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })

  return (
    <article>
      {/* ── The wall: title, standfirst scrap, polaroid, tickets ─────── */}
      <header className="page-wrap relative pt-10 sm:pt-14">
        {/* dream furniture — decorative only */}
        <div
          aria-hidden="true"
          className="surreal-arch dm-longshadow pointer-events-none absolute right-[5%] top-4 hidden h-72 w-44 bg-dm-lilac lg:block"
        />
        <div
          aria-hidden="true"
          className="dm-longshadow pointer-events-none absolute right-[3%] top-[24rem] hidden size-24 rounded-full bg-dm-butter lg:block"
        />

        <nav aria-label="Breadcrumb" className="relative z-20 flex flex-wrap items-center gap-3">
          <Link
            href="/writing"
            className={cn('ticket tone-panel min-h-10 -rotate-2 cursor-pointer transition-[rotate] duration-200 hover:rotate-0', focusRing)}
          >
            ← All writing
          </Link>
          <Link
            href="/"
            className={cn('ticket tone-panel min-h-10 rotate-[1.5deg] cursor-pointer transition-[rotate] duration-200 hover:rotate-0', focusRing)}
          >
            Home
          </Link>
        </nav>

        {article.draft && (
          <p className="ticket tone-ink relative z-20 mt-6 -rotate-1 shadow-hard">
            Draft — not published · visible only in local dev
          </p>
        )}
        <p className="hand relative z-20 mt-10 -rotate-2 text-[1.75rem] leading-none text-dm-accent-ink sm:text-[2.1rem]">
          from the notebook ✦
        </p>
        <h1 className="relative z-20 mt-3 max-w-[22ch] text-balance text-[clamp(1.95rem,5.2vw,4.6rem)] font-black uppercase leading-[0.92] tracking-[-0.035em]">
          {lead}{' '}
          <span className="max-outline">{tail}</span>
        </h1>

        <div className="relative z-10 mt-10 flex flex-col gap-10 lg:mt-12 lg:flex-row lg:items-start">
          <Scrap className="w-full max-w-[560px] -rotate-[1.2deg]" paperClassName="tone-panel px-7 py-9 sm:px-9">
            <p className="text-[1.06rem] font-medium leading-[1.7]">{article.excerpt}</p>
            <p className="hand mt-4 text-[1.5rem] leading-none text-dm-accent-ink">— Neel, {month}</p>
          </Scrap>

          <div className="flex items-start gap-6 lg:-ml-10 lg:mt-12">
            <div className="relative z-20 w-[148px] shrink-0 rotate-[4deg] bg-dm-panel p-3 pb-4 shadow-hard-lg">
              <div className={cn('flex h-[104px] flex-col items-center justify-center', pillar?.toneClass ?? 'tone-sage')}>
                <span className="text-[2.7rem] font-black leading-none">{article.readingTime}</span>
                <span className="mt-1 text-[10px] font-bold uppercase tracking-[0.2em]">min read</span>
              </div>
              <p className="hand mt-2 text-center text-[1.15rem] leading-tight text-dm-ink">{readingNote(article.readingTime)}</p>
            </div>
            <div className="flex min-w-0 flex-col items-start gap-3 pt-3">
              <PillarBadge pillar={article.pillar} className="-rotate-2 whitespace-normal leading-tight" />
              <span className="ticket tone-panel rotate-2">{parseDate(article.date)}</span>
            </div>
          </div>

          <div
            aria-hidden="true"
            className={cn(
              'hidden h-[170px] w-[128px] shrink-0 -rotate-[5deg] border-[3px] border-current shadow-hard lg:-ml-2 lg:mt-24 xl:block',
              pillar?.toneClass ?? 'tone-sage',
            )}
          >
            <div className="pat-dots h-full w-full opacity-30" />
          </div>
        </div>
      </header>

      <ReadingProgress targetId="article-body" />

      {/* ── The reading sheet — straight, so long text stays easy to read ── */}
      <div id="article-body" className="page-wrap mt-16 sm:mt-24">
        <Scrap tall tape className="mx-auto max-w-[800px]" paperClassName="tone-panel px-6 pb-14 pt-14 sm:px-14 sm:pb-20 sm:pt-20">
          <div className="prose prose-lg prose-bazaar max-w-none">
            <MDXRemote
              source={article.content}
              components={articleMdxComponents}
              options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
            />
          </div>
        </Scrap>
      </div>

      {/* ── Keep reading — neighbours pinned at angles ─────────────────── */}
      {neighbours.length > 0 && (
        <section aria-labelledby="keep-reading" className="page-wrap mt-24 sm:mt-28">
          <div>
            <h2 id="keep-reading" className="text-[clamp(2rem,5vw,3.4rem)] font-black uppercase leading-none tracking-tighter">
              Keep{' '}
              <span className="hand text-[1.15em] font-normal lowercase text-dm-accent-ink">reading</span>
            </h2>
            <div className="mt-10 flex flex-col gap-10 lg:flex-row lg:justify-center">
              {neighbours.map(({ label, tone, meta }, i) => (
                <Link
                  key={meta.slug}
                  href={`/writing/${meta.slug}`}
                  className={cn(
                    'group block w-full max-w-[500px] cursor-pointer transition-[rotate] duration-200 hover:rotate-0',
                    i === 0 ? '-rotate-[1.6deg]' : 'rotate-[1.4deg] lg:-ml-8 lg:mt-12',
                    focusRing,
                  )}
                >
                  <Scrap paperClassName={cn(tone, 'px-7 py-9 sm:px-8')}>
                    <span className="ticket">{label}</span>
                    <h3 className="mt-4 text-[1.2rem] font-black uppercase leading-[1.1] tracking-tight sm:text-[1.3rem]">
                      {meta.title}
                    </h3>
                    <p className="mt-3 text-sm font-medium leading-[1.65]">{meta.excerpt}</p>
                    <p className="mt-5 text-[11px] font-bold uppercase tracking-[0.16em]">
                      {getPillarBySlug(meta.pillar)?.short} · {meta.readingTime} min{' '}
                      <span aria-hidden="true" className="inline-block transition-[translate] duration-200 group-hover:translate-x-1">
                        →
                      </span>
                    </p>
                  </Scrap>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── More from the same pillar ───────────────────────────────────── */}
      {pillar && related.length > 0 && (
        <section aria-labelledby="more-on-pillar" className="page-wrap mt-20">
          <div>
            <div className="tone-panel mx-auto max-w-[800px] border-2 border-current px-7 py-9 shadow-hard sm:px-10">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <h2 id="more-on-pillar" className="text-[1.35rem] font-black uppercase leading-tight tracking-tight">
                  More on <span className="hand text-[1.3em] font-normal normal-case text-dm-accent-ink">{pillar.short}</span>
                </h2>
                <Link href={`/writing?pillar=${pillar.slug}`} className={cn(chipLink, pillar.toneClass, 'rotate-1')}>
                  All {pillar.short} →
                </Link>
              </div>
              <ol className="mt-6 space-y-4">
                {related.map((a, i) => (
                  <li key={a.slug} className="grid grid-cols-[2rem_1fr] gap-2">
                    <span aria-hidden="true" className="hand text-[1.6rem] leading-none text-dm-accent-ink">
                      {i + 1}.
                    </span>
                    <Link href={`/writing/${a.slug}`} className={cn('group block cursor-pointer', focusRing)}>
                      <span className="block font-bold leading-[1.45] underline decoration-dm-terra decoration-2 underline-offset-4 transition-colors duration-200 group-hover:text-dm-accent-ink">
                        {a.title}
                      </span>
                      <span className="mt-0.5 block text-[12px] font-bold uppercase tracking-[0.12em] text-dm-ink-soft">
                        {a.readingTime} min · {parseDate(a.date)}
                      </span>
                    </Link>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>
      )}

      {/* ── Newsletter portal ─────────────────────────────────────────── */}
      <section aria-labelledby="subscribe" className="page-wrap mt-24 sm:mt-28">
        <div>
          <div className="surreal-arch dm-longshadow tone-lilac mx-auto max-w-[880px] px-7 pb-12 pt-24 text-center sm:px-14 sm:pt-20">
            <p className="text-[11px] font-bold uppercase tracking-[0.24em]">Free · Weekly ✦</p>
            <h2 id="subscribe" className="mt-4 text-[clamp(1.8rem,4.6vw,3rem)] font-black uppercase leading-[1.02] tracking-tight">
              Enjoyed{' '}
              <span className="hand whitespace-nowrap text-[1.15em] font-normal lowercase">this one?</span>
            </h2>
            <p className="mx-auto mt-4 max-w-md text-[15px] font-medium leading-[1.7]">
              Get The Architect&apos;s Brief — weekly insights on blockchain architecture, AI × Web3, and engineering
              leadership.
            </p>
            <Link
              href="/newsletter"
              className={cn(
                'ticket tone-ink mt-8 min-h-12 cursor-pointer px-6 text-xs shadow-hard transition-[rotate,background-color,color] duration-200 hover:-rotate-2',
                focusRing,
              )}
            >
              Subscribe free →
            </Link>
          </div>
        </div>

        <div className="mt-14 flex flex-wrap justify-center gap-3">
          <Link
            href="/writing"
            className={cn('ticket tone-panel min-h-10 -rotate-1 cursor-pointer transition-[rotate] duration-200 hover:rotate-0', focusRing)}
          >
            ← All writing
          </Link>
          <Link
            href="/work-with-me"
            className={cn('ticket tone-terra min-h-10 rotate-1 cursor-pointer transition-[rotate] duration-200 hover:rotate-0', focusRing)}
          >
            Work with Neel →
          </Link>
        </div>
      </section>
    </article>
  )
}
