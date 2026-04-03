import type { Metadata } from 'next'
import Link from 'next/link'
import { NewsletterForm } from '@/components/newsletter-form'
import { FadeUp, StaggerContainer, StaggerItem } from '@/components/scroll-reveal'

export const metadata: Metadata = {
  title: "The Architect's Brief",
  description: 'Weekly newsletter on Blockchain Architecture, AI × Web3, and Engineering Leadership.',
}

const highlights = [
  { label: 'Blockchain Architecture', detail: 'ERC-4337, custody infrastructure, DeFi patterns, and real deployment decisions.' },
  { label: 'AI × Web3', detail: 'On-chain agents, LLM tooling, practical guides from production builds.' },
  { label: 'Engineering Leadership', detail: 'Scaling teams, architecture decisions, and what senior engineers actually do.' },
  { label: 'Weekly reading list', detail: 'The most useful links from the space — curated, not algorithmically surfaced.' },
]

export default function NewsletterPage() {
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
              <span className="text-muted-foreground text-xs">/</span>
              <Link href="/writing" className="font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground transition-colors hover:text-primary">
                Writing
              </Link>
            </div>
          </FadeUp>
          <FadeUp delay={0.15}>
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-primary mb-4">
              Free · Weekly
            </p>
          </FadeUp>
          <FadeUp delay={0.25}>
            <h1 className="font-extrabold text-4xl sm:text-5xl md:text-6xl uppercase tracking-tighter leading-[0.9] mb-6">
              The Architect&apos;s Brief
            </h1>
          </FadeUp>
          <FadeUp delay={0.4}>
            <p className="text-base text-muted-foreground leading-[1.7] max-w-xl">
              One architectural insight per week. Rotating across blockchain, AI × Web3, and engineering leadership. No fluff, no filler.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* ── Subscribe + highlights ───────────────────────── */}
      <div className="mx-auto max-w-2xl px-6 sm:px-12 py-12 sm:py-16">
        <FadeUp>
          <div className="mb-10 border border-border px-6 py-5">
            <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.22em] text-primary">Editorial cadence</p>
            <p className="text-sm leading-[1.8] text-muted-foreground">
              Expect one strong idea at a time: architecture trade-offs, AI workflow patterns, or leadership notes grounded in delivery rather than generic hot takes.
            </p>
          </div>
        </FadeUp>

        {/* What you get */}
        <FadeUp>
          <div className="mb-10 border-l-2 border-primary pl-6">
            <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-5">What you get</p>
            <StaggerContainer className="space-y-5">
              {highlights.map(({ label, detail }) => (
                <StaggerItem key={label}>
                  <div>
                    <p className="font-semibold text-sm uppercase tracking-tight text-foreground mb-1">{label}</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">{detail}</p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </FadeUp>

        <FadeUp delay={0.1}>
          <NewsletterForm />
          <p className="mt-3 font-mono text-[10px] text-muted-foreground uppercase tracking-widest">
            Unsubscribe anytime. No spam, ever.
          </p>
        </FadeUp>
      </div>
    </>
  )
}
