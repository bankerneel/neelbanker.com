import type { Metadata } from 'next'
import Link from 'next/link'
import type { CSSProperties } from 'react'
import { getAllArticleMeta } from '@/lib/mdx'
import { getPillarBySlug, PILLARS } from '@/lib/pillars'
import { cn } from '@/lib/utils'
import { PillarFilter } from '@/components/pillar-filter'
import { Band } from '@/components/bazaar/band'
import { MotionStage } from '@/components/motion/motion-stage'
import { FilmProgress, Scribbled } from '@/components/motion/scribbled'
import { PageIntro } from '@/components/bazaar/page-intro'
import { Scrap } from '@/components/bazaar/scrap'
import { focusRing } from '@/components/bazaar/styles'
import type { ArticleMeta } from '@/types/content'

export const metadata: Metadata = {
  title: 'Writing',
  description: 'Articles on Blockchain Architecture, AI × Web3, and Engineering Leadership.',
}

const readingLists = [
  {
    label: 'L2 & smart-contract risk',
    tone: 'tone-sage',
    title: 'L2 operations, wallet flows, and smart-contract risk',
    items: [
      'l2-chains-after-deployment',
      'fireblocks-wallet-production-lessons',
      'why-i-audit-contracts-first',
      'designing-staking-contracts-that-wont-get-exploited',
    ],
  },
  {
    label: 'Private chains & regulated systems',
    tone: 'tone-sky',
    title: 'Private-chain verification and regulated-system design',
    items: [
      'cross-chain-credential-verification',
      'data-sovereignty-blockchain-government',
      'erc-4337-wallet-architecture',
    ],
  },
]

function PinnedArticle({
  article,
  tone,
  tilt,
  size,
  className,
}: {
  article: ArticleMeta
  tone: string
  tilt: string
  size: 'lead' | 'side'
  className?: string
}) {
  const pillar = getPillarBySlug(article.pillar)
  return (
    <Link
      href={`/writing/${article.slug}`}
      className={cn('group block cursor-pointer transition-[rotate] duration-200 hover:rotate-0', tilt, focusRing, className)}
    >
      <Scrap paperClassName={cn(tone, size === 'lead' ? 'px-8 py-11 sm:px-11 sm:py-14' : 'px-7 py-9')}>
        <span className="ticket">{article.draft ? 'Draft — not published' : size === 'lead' ? 'Latest ✦' : pillar?.short}</span>
        <h3
          className={cn(
            'mt-5 font-black uppercase tracking-tight',
            size === 'lead' ? 'text-[clamp(1.6rem,3.2vw,2.5rem)] leading-[1.02]' : 'text-[1.2rem] leading-[1.1]',
          )}
        >
          {article.title}
        </h3>
        <p className={cn('mt-4 font-medium leading-[1.7]', size === 'lead' ? 'max-w-xl text-[16px]' : 'text-sm')}>
          {article.excerpt}
        </p>
        <p className="mt-6 text-[11px] font-bold uppercase tracking-[0.16em]">
          {size === 'lead' && `${pillar?.label} · `}
          {article.readingTime} min read{' '}
          <span aria-hidden="true" className="inline-block transition-[translate] duration-200 group-hover:translate-x-1">
            →
          </span>
        </p>
      </Scrap>
    </Link>
  )
}

export default async function WritingPage({
  searchParams,
}: {
  searchParams: Promise<{ pillar?: string }>
}) {
  const articles = getAllArticleMeta()
  const { pillar } = await searchParams
  const initialActive = pillar === 'blockchain' || pillar === 'ai' || pillar === 'leadership' ? pillar : 'all'
  const [lead, ...rest] = articles
  const sideHighlights = rest.slice(0, 2)
  const totalMinutes = articles.reduce((sum, a) => sum + a.readingTime, 0)
  const stats = [
    { value: articles.length, label: 'essays so far', tone: 'tone-terra' },
    { value: PILLARS.length, label: 'pillars', tone: 'tone-rose' },
    { value: totalMinutes, label: 'minutes of reading', tone: 'tone-sage' },
  ]
  const lists = readingLists.map((list) => ({
    ...list,
    items: list.items
      .map((slug) => articles.find((article) => article.slug === slug))
      .filter((article): article is ArticleMeta => Boolean(article)),
  }))

  return (
    <>
      <FilmProgress />
      <PageIntro motion kicker="The Architect's Brief ✦" title="Writing">
        <div className="relative z-10 mt-10 flex flex-col gap-10 lg:mt-12 lg:flex-row lg:items-start">
          <Scrap className="w-full max-w-[520px] -rotate-[1.2deg]" paperClassName="tone-panel px-7 py-9 sm:px-9">
            <p className="text-[1.06rem] font-medium leading-[1.7]">
              Articles on Blockchain Architecture, AI × Web3, and Engineering Leadership — what holds up in
              production, and what I&apos;d do differently.
            </p>
            <p className="hand mt-4 text-[1.5rem] leading-none text-dm-accent-ink">start anywhere — they stand alone</p>
          </Scrap>

          <div className="hook-deal-any flex items-start pl-1 lg:-ml-8 lg:mt-10">
            {stats.map((s, i) => (
              <div
                key={s.label}
                className={cn(
                  'relative w-[104px] bg-dm-panel p-2.5 pb-3 shadow-hard sm:w-[132px] sm:p-3',
                  ['-rotate-6', 'rotate-[5deg]', '-rotate-3'][i],
                  i > 0 && '-ml-2 sm:-ml-4',
                )}
                style={{ zIndex: 20 - i, marginTop: `${i * 18}px` }}
              >
                <div className={cn('flex h-[78px] items-center justify-center sm:h-[96px]', s.tone)}>
                  <span
                    aria-hidden="true"
                    className="count text-[2rem] font-black leading-none sm:text-[2.4rem]"
                    style={{ '--to': s.value, '--w': String(s.value).length } as CSSProperties}
                  />
                  <span className="sr-only">{s.value}</span>
                </div>
                <p className="hand mt-1.5 text-center text-[1rem] leading-tight text-dm-ink sm:text-[1.1rem]">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </PageIntro>

      {/* ── Pinned: the newest pieces ─────────────────────────────── */}
      {lead && (
        <section aria-labelledby="latest" className="page-wrap mt-24" data-sky-window>
          <h2 id="latest" data-sd className="sd-slam text-[clamp(2rem,5vw,3.4rem)] font-black uppercase leading-none tracking-tighter">
            Fresh off <Scribbled>the desk</Scribbled>
          </h2>
          <div className="mt-10 flex flex-col gap-10 lg:flex-row lg:items-start">
            <PinnedArticle article={lead} tone="tone-butter" tilt="-rotate-[1.2deg]" size="lead" className="sd-scroll sd-rise relative z-10 w-full lg:max-w-[640px]" />
            <div className="flex w-full flex-col gap-10 lg:-ml-10 lg:mt-14 lg:max-w-[440px] lg:gap-0">
              {sideHighlights.map((article, i) => (
                <PinnedArticle
                  key={article.slug}
                  article={article}
                  tone={i === 0 ? 'tone-rose' : 'tone-lilac'}
                  tilt={i === 0 ? 'rotate-[1.6deg]' : '-rotate-1'}
                  size="side"
                  className={cn('sd-scroll sd-rise relative', i === 0 ? 'z-20' : 'z-30 lg:-mt-4 lg:ml-12')}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Reading lists ─────────────────────────────────────────── */}
      <Band tone="butter" edge="zig" className="mt-24 sm:mt-28">
      <section aria-labelledby="reading-lists" className="page-wrap py-24 sm:py-28">
          <h2 id="reading-lists" data-sd className="sd-slam text-[clamp(2rem,5vw,3.4rem)] font-black uppercase leading-none tracking-tighter">
            Reading <Scribbled>lists</Scribbled>
          </h2>
          <div className="mt-10 grid gap-10 lg:grid-cols-2 lg:gap-12">
            {lists.map((list, li) => (
              <Scrap
                key={list.label}
                className={cn('sd-scroll sd-rise', li === 0 ? '-rotate-[0.6deg]' : 'rotate-[0.6deg] lg:mt-10')}
                paperClassName="tone-panel px-7 py-10 sm:px-9"
              >
                <span className={cn('ticket', list.tone)}>{list.label}</span>
                <h3 className="mt-5 text-[1.35rem] font-black uppercase leading-[1.1] tracking-tight">{list.title}</h3>
                <ol className="mt-6 space-y-5">
                  {list.items.map((article, i) => (
                    <li key={article.slug} className="grid grid-cols-[2rem_1fr] gap-2">
                      <span aria-hidden="true" className="hand text-[1.7rem] leading-none text-dm-accent-ink">
                        {i + 1}.
                      </span>
                      <Link
                        href={`/writing/${article.slug}`}
                        className={cn('group block cursor-pointer', focusRing)}
                      >
                        <span className="block font-bold leading-[1.45] underline decoration-dm-terra decoration-2 underline-offset-4 transition-colors duration-200 group-hover:text-dm-accent-ink">
                          {article.title}
                        </span>
                        <span className="mt-1 block text-sm leading-[1.65] text-dm-ink-soft">{article.excerpt}</span>
                      </Link>
                    </li>
                  ))}
                </ol>
              </Scrap>
            ))}
          </div>
      </section>
      </Band>

      {/* ── Archive with pillar filters (URL-driven): the night set ── */}
      <Band tone="night" edge="scallop" bottomEdge="torn" pattern="stars" spotlight>
        <section aria-labelledby="archive" className="page-wrap py-24 sm:py-28">
          <PillarFilter articles={articles} initialActive={initialActive} />
        </section>
      </Band>
      <MotionStage />
    </>
  )
}
