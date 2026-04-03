import type { Metadata } from 'next'
import Link from 'next/link'
import { NewsletterForm } from '@/components/newsletter-form'
import { FadeUp, StaggerContainer, StaggerItem } from '@/components/scroll-reveal'

export const metadata: Metadata = {
  title: "The Architect's Brief",
  description: 'Weekly newsletter on Blockchain Architecture, AI × Web3, and Engineering Leadership.',
}

const highlights = [
  {
    label: 'Blockchain Architecture',
    detail: 'ERC-4337, custody infrastructure, DeFi patterns, and real deployment decisions.',
  },
  {
    label: 'AI × Web3',
    detail: 'On-chain agents, LLM tooling, and practical workflow notes from production-facing builds.',
  },
  {
    label: 'Engineering Leadership',
    detail: 'Scaling teams, architecture decisions, and what senior technical judgment looks like in practice.',
  },
]

const signals = [
  'One strong idea each week',
  'No filler or growth-hack cadence',
  'Built for builders and technical leaders',
]

export default function NewsletterPage() {
  return (
    <>
      <section className="border-b border-border">
        <div className="mx-auto max-w-5xl xl:max-w-6xl 2xl:max-w-7xl 3xl:max-w-[1440px] px-6 sm:px-12 py-16 sm:py-20">
          <FadeUp delay={0.05}>
            <div className="mb-10 flex flex-wrap items-center gap-3">
              <Link
                href="/"
                className="cursor-pointer font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground transition-colors duration-200 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                ← Home
              </Link>
              <span className="text-xs text-muted-foreground">/</span>
              <Link
                href="/writing"
                className="cursor-pointer font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground transition-colors duration-200 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                Writing
              </Link>
            </div>
          </FadeUp>
          <FadeUp delay={0.15}>
            <p className="mb-4 font-mono text-xs uppercase tracking-[0.22em] text-primary">
              Free · Weekly
            </p>
          </FadeUp>
          <FadeUp delay={0.25}>
            <h1 className="mb-6 font-semibold text-4xl uppercase tracking-tighter leading-[0.9] sm:text-5xl md:text-6xl">
              The Architect&apos;s Brief
            </h1>
          </FadeUp>
          <FadeUp delay={0.4}>
            <p className="max-w-2xl text-base leading-[1.7] text-muted-foreground">
              One architectural insight per week. Rotating across blockchain, AI × Web3, and engineering leadership. No fluff, no filler, and no trend-chasing for its own sake.
            </p>
          </FadeUp>
        </div>
      </section>

      <div className="mx-auto max-w-5xl xl:max-w-6xl 2xl:max-w-7xl 3xl:max-w-[1440px] px-6 sm:px-12 py-12 sm:py-16">
        <div className="grid gap-14 xl:grid-cols-[0.82fr_1.18fr]">
          <div className="space-y-10">
            <FadeUp>
              <div>
                <p className="mb-4 font-mono text-xs uppercase tracking-[0.22em] text-muted-foreground">Editorial promise</p>
                <h2 className="font-semibold text-2xl uppercase tracking-tight sm:text-3xl">
                  Short, opinionated, and grounded in actual delivery
                </h2>
              </div>
            </FadeUp>

            <FadeUp delay={0.05}>
              <div className="space-y-4">
                <p className="text-sm leading-[1.8] text-muted-foreground">
                  Expect one strong idea at a time: architecture trade-offs, AI workflow patterns, or leadership notes grounded in shipped systems rather than generic hot takes.
                </p>
                <div className="flex flex-wrap gap-2">
                  {signals.map((item) => (
                    <span
                      key={item}
                      className="inline-flex min-h-11 items-center border border-border px-3 py-2 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground transition-colors duration-200 hover:border-primary/40 hover:text-foreground"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </FadeUp>

            <FadeUp delay={0.1}>
              <div className="border border-border bg-background px-6 py-6 sm:px-7 sm:py-7">
                <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.22em] text-primary">Good fit if</p>
                <p className="text-sm leading-[1.8] text-muted-foreground">
                  You build or lead technical systems, care about architecture quality, and prefer signal over content volume. If you only want news summaries, this is probably not for you.
                </p>
              </div>
            </FadeUp>
          </div>

          <div className="space-y-10">
            <FadeUp>
              <div className="border border-border bg-background px-6 py-6 sm:px-7 sm:py-7">
                <p className="mb-4 font-mono text-xs uppercase tracking-[0.22em] text-muted-foreground">Subscribe</p>
                <h2 className="mb-3 font-semibold text-2xl uppercase tracking-tight sm:text-3xl">
                  Join the list
                </h2>
                <p className="mb-6 max-w-xl text-sm leading-[1.8] text-muted-foreground">
                  Weekly delivery. Clear unsubscribe. No spam. The note lands in your inbox when there is something worth sending.
                </p>
                <NewsletterForm />
                <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                  Unsubscribe anytime. No spam, ever.
                </p>
              </div>
            </FadeUp>

            <FadeUp delay={0.08}>
              <div>
                <p className="mb-4 font-mono text-xs uppercase tracking-[0.22em] text-muted-foreground">What you get</p>
                <StaggerContainer className="grid gap-px bg-border">
                  {highlights.map(({ label, detail }) => (
                    <StaggerItem key={label} className="bg-background">
                      <div className="px-5 py-5 sm:px-6">
                        <p className="mb-3 font-semibold text-sm uppercase tracking-tight text-foreground">{label}</p>
                        <p className="text-sm leading-[1.8] text-muted-foreground">{detail}</p>
                      </div>
                    </StaggerItem>
                  ))}
                </StaggerContainer>
              </div>
            </FadeUp>
          </div>
        </div>
      </div>
    </>
  )
}
