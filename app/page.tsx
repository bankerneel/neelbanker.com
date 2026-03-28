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

  return (
    <div className="mx-auto max-w-4xl px-6">

      {/* Hero */}
      <section className="border-b border-border py-20">
        <p className="mb-3 font-mono text-sm font-semibold text-primary">
          Blockchain · AI · Engineering
        </p>
        <h1 className="mb-4 text-5xl font-extrabold leading-tight tracking-tight">
          I'm Neel Banker.<br />
          <span className="text-primary">I architect what's next.</span>
        </h1>
        <p className="mb-8 max-w-xl text-lg text-muted-foreground">
          Senior Blockchain Architect with 6+ years building smart contracts, custody infrastructure, and AI-native Web3 systems. Writing weekly on the future of decentralised tech.
        </p>
        <NewsletterForm />
        <p className="mt-3 text-xs text-muted-foreground">Free · Weekly · No spam</p>
      </section>

      {/* Credibility bar */}
      <section className="flex flex-wrap items-center gap-6 border-b border-border py-6">
        <div className="text-center">
          <p className="text-2xl font-extrabold">6+</p>
          <p className="text-xs text-muted-foreground">Years</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-extrabold">20+</p>
          <p className="text-xs text-muted-foreground">Contracts deployed</p>
        </div>
        <div className="hidden h-8 w-px bg-border sm:block" />
        <div className="flex flex-wrap gap-1.5">
          {['Solidity', 'Fireblocks', 'ERC-4337', 'Node.js', 'AI SDK'].map((t) => (
            <span key={t} className="rounded bg-muted px-2 py-0.5 font-mono text-xs text-muted-foreground">{t}</span>
          ))}
        </div>
      </section>

      {/* Featured resource */}
      {featuredResource && (
        <section className="border-b border-border py-10">
          <p className="mb-3 text-xs font-bold uppercase tracking-wider text-emerald-400">🎁 Free Resource</p>
          <div className="flex flex-col justify-between gap-4 rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-5 sm:flex-row sm:items-center">
            <div>
              <h2 className="font-semibold">{featuredResource.title}</h2>
              <p className="mt-1 text-sm text-muted-foreground">{featuredResource.description}</p>
            </div>
            <Link href="/resources" className="shrink-0 rounded-md border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-sm font-medium text-emerald-400 transition-colors hover:bg-emerald-500/20">
              Download Free →
            </Link>
          </div>
        </section>
      )}

      {/* Latest writing */}
      <section className="border-b border-border py-10">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-bold">Latest Writing</h2>
          <Link href="/writing" className="text-sm text-muted-foreground hover:text-foreground">All articles →</Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((a) => <ArticleCard key={a.slug} article={a} />)}
        </div>
      </section>

      {/* Pillars */}
      <section className="border-b border-border py-10">
        <h2 className="mb-6 text-xl font-bold">What I Write About</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {PILLARS.map((p) => (
            <div key={p.slug} className={`rounded-lg border p-4 ${p.borderClass} ${p.bgClass}`}>
              <p className="text-2xl">{p.emoji}</p>
              <p className={`mt-2 font-semibold ${p.textClass}`}>{p.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Work with me teaser */}
      <section className="py-10">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-bold">Work With Me</h2>
          <Link href="/work-with-me" className="text-sm text-muted-foreground hover:text-foreground">See all services →</Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <ServiceCard title="1:1 Strategy Call" description="45-min focused session on your architecture, stack decisions, or team challenges." />
          <ServiceCard title="Smart Contract Audit" description="Security + logic review with written report and 60-min debrief." />
          <ServiceCard title="Architecture Review" description="Deep review of your blockchain or backend stack with written recommendations." />
          <ServiceCard title="Fractional CTO" description="Monthly retainer with weekly calls, async Slack access, and architecture decisions." />
        </div>
      </section>

    </div>
  )
}
