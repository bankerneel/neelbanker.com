import type { Metadata } from 'next'
import Link from 'next/link'
import { getAllArticleMeta } from '@/lib/mdx'
import { PillarFilter } from '@/components/pillar-filter'
import { FadeUp } from '@/components/scroll-reveal'
import { getPillarBySlug } from '@/lib/pillars'

export const metadata: Metadata = {
  title: 'Writing',
  description: 'Articles on Blockchain Architecture, AI × Web3, and Engineering Leadership.',
}

export default async function WritingPage({
  searchParams,
}: {
  searchParams: Promise<{ pillar?: string }>
}) {
  const articles = getAllArticleMeta()
  const { pillar } = await searchParams
  const initialActive = pillar === 'blockchain' || pillar === 'ai' || pillar === 'leadership' ? pillar : 'all'
  const visualFeatures = articles.slice(0, 3).map((article) => ({
    ...article,
    pillarMeta: getPillarBySlug(article.pillar),
  }))
  const editorialClusters = [
    {
      label: 'Operations Cluster',
      title: 'L2 operations, wallet flows, and smart-contract risk',
      items: [
        'l2-chains-after-deployment',
        'fireblocks-wallet-production-lessons',
        'why-i-audit-contracts-first',
        'designing-staking-contracts-that-wont-get-exploited',
      ],
    },
    {
      label: 'Sovereignty Cluster',
      title: 'Private-chain verification and regulated-system design',
      items: [
        'cross-chain-credential-verification',
        'data-sovereignty-blockchain-government',
        'erc-4337-wallet-architecture',
      ],
    },
  ].map((cluster) => ({
    ...cluster,
    items: cluster.items
      .map((slug) => articles.find((article) => article.slug === slug))
      .filter((article): article is NonNullable<typeof article> => Boolean(article)),
  }))

  return (
    <>
      {/* ── Page header ──────────────────────────────────── */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-5xl xl:max-w-6xl 2xl:max-w-7xl 3xl:max-w-[1440px] px-6 sm:px-12 py-16 sm:py-20">
          <FadeUp delay={0.05}>
            <div className="mb-10 flex flex-wrap items-center gap-3">
              <Link href="/" className="font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground transition-colors hover:text-primary">
                ← Home
              </Link>
            </div>
          </FadeUp>
          <FadeUp delay={0.15}>
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-muted-foreground mb-4">
              The Architect&apos;s Brief
            </p>
          </FadeUp>
          <FadeUp delay={0.25}>
            <h1 className="font-extrabold text-4xl sm:text-5xl md:text-6xl uppercase tracking-tighter leading-[0.9] mb-6">
              Writing
            </h1>
          </FadeUp>
          <FadeUp delay={0.4}>
            <p className="text-base text-muted-foreground leading-[1.7] max-w-xl">
              Weekly articles on Blockchain Architecture, AI × Web3, and Engineering Leadership.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* ── Articles ─────────────────────────────────────── */}
      <div className="mx-auto max-w-5xl xl:max-w-6xl 2xl:max-w-7xl 3xl:max-w-[1440px] px-6 sm:px-12 py-12">
        <FadeUp>
          <div className="mb-12 grid gap-px bg-border xl:grid-cols-3">
            {visualFeatures.map((article) => (
              <Link
                key={article.slug}
                href={`/writing/${article.slug}`}
                className="group relative min-h-[260px] cursor-pointer overflow-hidden bg-background p-8 transition-colors duration-200 hover:bg-muted/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <div
                  aria-hidden="true"
                  className="absolute inset-0 opacity-15 transition-opacity duration-300 group-hover:opacity-25"
                  style={{
                    background: `radial-gradient(circle at top right, ${article.pillarMeta?.colour === 'cyan' ? 'rgba(34,211,238,0.25)' : article.pillarMeta?.colour === 'orange' ? 'rgba(251,146,60,0.24)' : 'rgba(163,230,53,0.24)'} 0%, transparent 60%)`,
                  }}
                />
                <div className="relative z-10 flex h-full flex-col justify-between">
                  <div>
                    <p className={`mb-4 font-mono text-[10px] uppercase tracking-[0.22em] ${article.pillarMeta?.textClass ?? 'text-primary'}`}>
                      {article.pillarMeta?.label ?? 'Writing'}
                    </p>
                    <h2 className="mb-4 font-bold text-2xl uppercase tracking-tight leading-tight transition-colors duration-200 group-hover:text-primary">
                      {article.title}
                    </h2>
                    <p className="text-sm leading-[1.8] text-muted-foreground">{article.excerpt}</p>
                  </div>
                  <div className="mt-8 flex items-center justify-between">
                    <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">{article.readingTime} min read</span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">Read →</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </FadeUp>

        <FadeUp>
          <div className="mb-12 grid gap-px bg-border lg:grid-cols-2">
            {editorialClusters.map((cluster) => (
              <div key={cluster.label} className="bg-background p-8 sm:p-10">
                <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.22em] text-primary">{cluster.label}</p>
                <h2 className="mb-6 font-bold text-2xl uppercase tracking-tight">{cluster.title}</h2>
                <div className="space-y-4">
                  {cluster.items.map((article) => (
                    <Link
                      key={article.slug}
                      href={`/writing/${article.slug}`}
                      className="block cursor-pointer border-l border-border pl-4 transition-colors duration-200 hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                    >
                      <p className="font-semibold leading-[1.6]">{article.title}</p>
                      <p className="mt-1 text-sm leading-[1.7] text-muted-foreground">{article.excerpt}</p>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </FadeUp>
        <PillarFilter articles={articles} initialActive={initialActive} />
      </div>
    </>
  )
}
