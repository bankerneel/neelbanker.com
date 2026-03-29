import Link from 'next/link'
import { getAllArticleMeta, getAllResourceMeta } from '@/lib/mdx'
import { ArticleCard } from '@/components/article-card'
import { NewsletterForm } from '@/components/newsletter-form'
import { ServiceCard } from '@/components/service-card'
import { PILLARS } from '@/lib/pillars'

export default function HomePage() {
  const articles = getAllArticleMeta().slice(0, 3)
  const resources = getAllResourceMeta()
  const featuredResource = resources[0]

  const techStack = [
    'Solidity', 'ERC-4337', 'Fireblocks', 'BitGo', 'Node.js',
    'Nest.js', 'AI SDK', 'Ethereum', 'Polygon', 'Base', 'Arbitrum',
    'Account Abstraction', '6+ Years', '20+ Contracts Deployed',
  ]

  const services = [
    { title: '1:1 Strategy Call', description: '45-min focused session on your architecture, stack decisions, or team challenges.' },
    { title: 'Smart Contract Audit', description: 'Security + logic review with written report and 60-min debrief.' },
    { title: 'Architecture Review', description: 'Deep review of your blockchain or backend stack with written recommendations.' },
    { title: 'Fractional CTO', description: 'Monthly retainer with weekly calls, async Slack access, and architecture decisions.' },
  ]

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="mx-auto max-w-5xl xl:max-w-6xl px-4 sm:px-6 pt-14 sm:pt-20 md:pt-24 pb-12 sm:pb-16 border-b border-border">
        <p className="font-mono text-xs tracking-[0.22em] uppercase text-muted-foreground mb-8 sm:mb-10">
          Senior Blockchain Architect · Ahmedabad, India
        </p>
        <h1
          className="font-extrabold uppercase leading-[0.88] tracking-tighter mb-8 sm:mb-10"
          style={{ fontSize: 'clamp(2.8rem, 9vw, 8rem)' }}
        >
          Building<br />
          <span className="text-primary">What&apos;s</span><br />
          Next.
        </h1>
        <div className="max-w-lg">
          <p className="text-sm sm:text-base text-muted-foreground mb-6 sm:mb-8 leading-relaxed">
            6+ years designing smart contracts, custody infrastructure, and AI-native Web3 systems.
            Writing weekly on the future of decentralised tech.
          </p>
          <NewsletterForm />
          <p className="mt-3 text-xs text-muted-foreground font-mono">Free · Weekly · No spam</p>
        </div>
      </section>

      {/* ── Tech marquee ─────────────────────────────────── */}
      <div className="bg-primary overflow-hidden py-3 select-none">
        <div className="flex animate-marquee whitespace-nowrap">
          {[...techStack, ...techStack].map((item, i) => (
            <span key={i} className="font-mono text-xs font-bold tracking-widest uppercase text-primary-foreground mx-5">
              {item}
              <span className="text-primary-foreground/40 ml-5">·</span>
            </span>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-5xl xl:max-w-6xl px-4 sm:px-6">

        {/* ── Stats ────────────────────────────────────────── */}
        <section className="flex flex-wrap gap-8 sm:gap-12 md:gap-16 py-10 sm:py-12 border-b border-border">
          <div>
            <p className="text-4xl sm:text-5xl font-extrabold text-primary leading-none">6+</p>
            <p className="mt-2 text-xs uppercase tracking-[0.18em] text-muted-foreground font-mono">Years building</p>
          </div>
          <div>
            <p className="text-4xl sm:text-5xl font-extrabold leading-none">20+</p>
            <p className="mt-2 text-xs uppercase tracking-[0.18em] text-muted-foreground font-mono">Contracts deployed</p>
          </div>
          <div>
            <p className="text-4xl sm:text-5xl font-extrabold leading-none">3</p>
            <p className="mt-2 text-xs uppercase tracking-[0.18em] text-muted-foreground font-mono">Focus pillars</p>
          </div>
        </section>

        {/* ── Latest writing ───────────────────────────────── */}
        <section className="py-8 sm:py-10 border-b border-border">
          <div className="flex items-baseline justify-between mb-1">
            <h2 className="font-mono text-xs uppercase tracking-[0.22em] text-muted-foreground">Latest Writing</h2>
            <Link href="/writing" className="font-mono text-xs text-muted-foreground hover:text-primary transition-colors">
              All articles →
            </Link>
          </div>
          <div>
            {articles.map((a) => <ArticleCard key={a.slug} article={a} />)}
          </div>
        </section>

        {/* ── Pillars ──────────────────────────────────────── */}
        <section className="py-8 sm:py-10 border-b border-border">
          <h2 className="font-mono text-xs uppercase tracking-[0.22em] text-muted-foreground mb-1">Focus Areas</h2>
          <div>
            {PILLARS.map((p) => (
              <Link
                key={p.slug}
                href={`/writing?pillar=${p.slug}`}
                className="group flex items-center justify-between py-4 sm:py-5 border-b border-border last:border-0 hover:pl-3 transition-all duration-200"
              >
                <div className="flex items-center gap-3 sm:gap-4">
                  <span className="text-lg sm:text-xl">{p.emoji}</span>
                  <span className={`text-base sm:text-lg font-bold uppercase tracking-wide ${p.textClass}`}>
                    {p.label}
                  </span>
                </div>
                <span className="text-muted-foreground group-hover:text-foreground group-hover:translate-x-1 transition-all duration-200">→</span>
              </Link>
            ))}
          </div>
        </section>

        {/* ── Featured resource ────────────────────────────── */}
        {featuredResource && (
          <section className="py-8 sm:py-10 border-b border-border">
            <h2 className="font-mono text-xs uppercase tracking-[0.22em] text-muted-foreground mb-6">Free Resource</h2>
            <div className="group flex flex-col sm:flex-row sm:items-center justify-between gap-5 sm:gap-6 p-5 sm:p-6 border border-border hover:border-primary/40 transition-colors duration-200">
              <div>
                <p className="font-mono text-xs tracking-widest uppercase text-primary mb-2">Download Free</p>
                <h3 className="font-bold text-base group-hover:text-primary transition-colors duration-200">{featuredResource.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{featuredResource.description}</p>
              </div>
              <Link
                href="/resources"
                className="shrink-0 border border-primary/40 px-5 py-2.5 text-sm font-semibold text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-200 whitespace-nowrap text-center sm:text-left"
              >
                Get It Free →
              </Link>
            </div>
          </section>
        )}

        {/* ── Services ─────────────────────────────────────── */}
        <section className="py-8 sm:py-10">
          <div className="flex items-baseline justify-between mb-1">
            <h2 className="font-mono text-xs uppercase tracking-[0.22em] text-muted-foreground">Work With Me</h2>
            <Link href="/work-with-me" className="font-mono text-xs text-muted-foreground hover:text-primary transition-colors">
              All services →
            </Link>
          </div>
          <div>
            {services.map((s, i) => (
              <ServiceCard key={s.title} title={s.title} description={s.description} index={i} />
            ))}
          </div>
        </section>

      </div>
    </>
  )
}
