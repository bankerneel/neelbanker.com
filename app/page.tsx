import Link from 'next/link'
import { getAllArticleMeta, getAllResourceMeta } from '@/lib/mdx'
import { ArticleCard } from '@/components/article-card'
import { ServiceCard } from '@/components/service-card'
import { PILLARS } from '@/lib/pillars'
import { HeroClient } from '@/components/hero-client'
import { FadeUp, StaggerContainer, StaggerItem } from '@/components/scroll-reveal'

const PILLAR_HOVER_BG: Record<string, string> = {
  blockchain: 'hover:bg-primary',
  ai: 'hover:bg-cyan-400',
  leadership: 'hover:bg-orange-500',
}

export default function HomePage() {
  const articles = getAllArticleMeta().slice(0, 3)
  const resources = getAllResourceMeta()
  const featuredResource = resources[0]

  const techStack = [
    'Hyperledger Fabric', 'OP Stack / L2', 'Solidity', 'ERC-4337', 'Fireblocks NCW',
    'BitGo', 'Node.js', 'NestJS', 'Go', 'Python', 'Claude API', 'Ethereum', 'Polygon',
    'Solana', 'Base', 'Arbitrum', 'Account Abstraction', 'Docker', 'AWS EKS', 'HSM',
    '7+ Years', '50+ Engineers Led', '15+ Platforms',
  ]

  const services = [
    {
      title: '1:1 Strategy Call',
      description: '45-min focused session on your architecture, stack decisions, or team challenges.',
      meta: '45 MIN / REMOTE',
    },
    {
      title: 'Smart Contract Audit',
      description: 'Security + logic review with written report and 60-min debrief.',
      meta: '2–4 WEEKS / PROJECT',
    },
    {
      title: 'Architecture Review',
      description: 'Deep review of your blockchain or backend stack with written recommendations.',
      meta: '1 WEEK / ASYNC',
    },
    {
      title: 'Fractional CTO',
      description: 'Monthly retainer with weekly calls, async Slack access, and architecture decisions.',
      meta: 'RETAINER / MONTHLY',
    },
  ]

  const stats = [
    { value: '7+', label: 'Years Building' },
    { value: '50+', label: 'Engineers Led' },
    { value: '15+', label: 'Production Platforms' },
  ]

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────── */}
      <HeroClient />

      {/* ── Tech marquee ─────────────────────────────────── */}
      <div className="bg-primary overflow-hidden py-4 select-none">
        <div className="flex animate-marquee whitespace-nowrap">
          {[...techStack, ...techStack].map((item, i) => (
            <span key={i} className="font-mono text-sm font-bold tracking-widest uppercase text-primary-foreground mx-8">
              {item}
            </span>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-5xl xl:max-w-6xl 2xl:max-w-7xl 3xl:max-w-[1440px] px-6 sm:px-12">

        {/* ── Stats ────────────────────────────────────────── */}
        <section className="py-20 sm:py-24 border-b border-border">
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-0">
            {stats.map((stat, i) => (
              <StaggerItem
                key={i}
                className={`flex flex-col gap-3 ${i > 0 ? 'md:border-l md:border-border md:pl-12' : ''}`}
              >
                <span className="font-extrabold text-7xl sm:text-8xl text-primary leading-none tabular-nums">
                  {stat.value}
                </span>
                <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                  {stat.label}
                </span>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </section>

        {/* ── Latest writing ───────────────────────────────── */}
        <section className="py-16 sm:py-20 border-b border-border">
          <FadeUp>
            <div className="flex items-end justify-between mb-12 sm:mb-16">
              <h2 className="font-extrabold text-3xl sm:text-4xl uppercase tracking-tighter">Latest Writing</h2>
              <Link href="/writing" className="font-mono text-xs uppercase text-primary hover:underline underline-offset-8 transition-colors">
                All articles →
              </Link>
            </div>
          </FadeUp>
          <StaggerContainer>
            {articles.map((a) => (
              <StaggerItem key={a.slug}>
                <ArticleCard article={a} />
              </StaggerItem>
            ))}
          </StaggerContainer>
        </section>

        {/* ── Pillars ──────────────────────────────────────── */}
        <section className="py-16 sm:py-20 border-b border-border">
          <FadeUp>
            <h2 className="font-mono text-xs uppercase tracking-[0.22em] text-muted-foreground mb-8">Focus Areas</h2>
          </FadeUp>
          <FadeUp delay={0.1}>
          <div className="grid grid-cols-1 md:grid-cols-3 border border-border">
            {PILLARS.map((p, i) => (
              <Link
                key={p.slug}
                href={`/writing?pillar=${p.slug}`}
                className={[
                  'group p-8 md:p-10 transition-colors duration-300',
                  PILLAR_HOVER_BG[p.slug] ?? 'hover:bg-primary',
                  i < PILLARS.length - 1
                    ? 'border-b md:border-b-0 md:border-r border-border'
                    : '',
                ].join(' ')}
              >
                <div className="flex justify-between items-start mb-10">
                  <span className="text-3xl">{p.emoji}</span>
                  <span className="text-muted-foreground group-hover:text-background transition-colors duration-300">→</span>
                </div>
                <p className={`font-mono text-[10px] uppercase tracking-widest mb-3 ${p.textClass} group-hover:text-background transition-colors duration-300`}>
                  Focus 0{i + 1}
                </p>
                <h4 className="font-bold text-2xl sm:text-3xl uppercase tracking-tight group-hover:text-background transition-colors duration-300">
                  {p.label}
                </h4>
              </Link>
            ))}
          </div>
          </FadeUp>
        </section>

        {/* ── Featured resource ────────────────────────────── */}
        {featuredResource && (
          <section className="py-16 sm:py-20 border-b border-border">
            <FadeUp>
              <h2 className="font-mono text-xs uppercase tracking-[0.22em] text-muted-foreground mb-8">Free Resource</h2>
            </FadeUp>
            <FadeUp delay={0.1}>
              <div className="relative border-2 border-primary p-8 sm:p-14 overflow-hidden flex flex-col sm:flex-row items-start sm:items-center gap-10">
                {/* Decorative rotated square */}
                <div
                  aria-hidden="true"
                  className="absolute -right-16 -top-16 w-56 h-56 border border-primary/20 rotate-45 pointer-events-none"
                />
                <div className="flex-1 relative z-10">
                  <p className="font-mono text-xs uppercase tracking-[0.3em] text-primary mb-4">Download Free</p>
                  <h3 className="font-bold text-3xl sm:text-4xl uppercase tracking-tight mb-4 leading-tight">
                    {featuredResource.title}
                  </h3>
                  <p className="text-muted-foreground leading-[1.7] max-w-md mb-8 text-sm sm:text-base">
                    {featuredResource.description}
                  </p>
                  <Link
                    href="/resources"
                    className="inline-block bg-primary text-primary-foreground px-8 py-4 font-mono font-bold uppercase text-xs tracking-widest hover:bg-foreground hover:text-background transition-colors duration-200"
                  >
                    Get It Free →
                  </Link>
                </div>
              </div>
            </FadeUp>
          </section>
        )}

        {/* ── Services ─────────────────────────────────────── */}
        <section className="py-16 sm:py-20">
          <FadeUp>
            <div className="flex items-end justify-between mb-12 sm:mb-16">
              <h2 className="font-extrabold text-3xl sm:text-4xl uppercase tracking-tighter">Work With Me</h2>
              <Link href="/work-with-me" className="font-mono text-xs uppercase text-primary hover:underline underline-offset-8 transition-colors">
                All services →
              </Link>
            </div>
          </FadeUp>
          <StaggerContainer>
            {services.map((s, i) => (
              <StaggerItem key={s.title}>
                <ServiceCard title={s.title} description={s.description} index={i} meta={s.meta} />
              </StaggerItem>
            ))}
          </StaggerContainer>
        </section>

      </div>
    </>
  )
}
