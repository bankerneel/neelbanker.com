import type { Metadata } from 'next'
import Link from 'next/link'
import { FadeUp, SlideIn, StaggerContainer, StaggerItem } from '@/components/scroll-reveal'
import { TALKS } from '@/lib/talks'

export const metadata: Metadata = {
  title: 'Speaking',
  description: 'Talks on blockchain fundamentals, NFTs, and practical engineering at GDG Ahmedabad, ICAI Centre of Excellence, and internal sessions.',
}

export default function SpeakingPage() {
  const speakingProfile = [
    {
      label: 'Event formats',
      value: 'Conference talks, workshops, internal engineering sessions, and founder or leadership roundtables.',
    },
    {
      label: 'Best topics',
      value: 'Blockchain architecture, wallet and custody systems, AI-augmented engineering, and technical leadership under delivery pressure.',
    },
    {
      label: 'Best audience fit',
      value: 'Engineering teams, Web3 builders, founder communities, developer groups, and product leaders navigating technical complexity.',
    },
  ]

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
              <Link href="/about" className="font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground transition-colors hover:text-primary">
                About
              </Link>
            </div>
          </FadeUp>
          <FadeUp delay={0.15}>
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-muted-foreground mb-4">
              Talks & Sessions
            </p>
          </FadeUp>
          <FadeUp delay={0.25}>
            <h1 className="font-extrabold text-4xl sm:text-5xl md:text-6xl uppercase tracking-tighter leading-[0.9] mb-6">
              Speaking
            </h1>
          </FadeUp>
          <FadeUp delay={0.4}>
            <p className="text-base text-muted-foreground leading-[1.7] max-w-xl">
              Sessions on blockchain fundamentals, NFTs, and developer tooling — at Google Developer Groups, ICAI, and internal engineering sessions.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* ── Talks ────────────────────────────────────────── */}
      <div className="mx-auto max-w-5xl xl:max-w-6xl 2xl:max-w-7xl 3xl:max-w-[1440px] px-6 sm:px-12 py-12 sm:py-16">
        <SlideIn from="left">
          <div className="mb-12 border border-border p-8 sm:p-10">
            <p className="mb-4 font-mono text-xs uppercase tracking-[0.22em] text-primary">What I speak about</p>
            <p className="max-w-2xl text-sm leading-[1.8] text-muted-foreground">
              I tend to speak where technical fundamentals meet practical decision-making: blockchain architecture, digital ownership systems, and the engineering habits that make complex platforms easier to ship and explain.
            </p>
          </div>
        </SlideIn>
        <StaggerContainer className="space-y-10">
          {TALKS.map((talk) => (
            <StaggerItem key={talk.title}>
              <article className="border border-border p-8 sm:p-10 group hover:border-primary transition-colors duration-200">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
                  <div>
                    <span className="font-mono text-[10px] uppercase tracking-widest text-primary mb-2 block">{talk.type}</span>
                    <h2 className="font-extrabold text-2xl sm:text-3xl uppercase tracking-tight leading-tight group-hover:text-primary transition-colors duration-200">
                      {talk.title}
                    </h2>
                    <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground mt-2">{talk.venue}</p>
                  </div>
                  <div className="flex gap-3 shrink-0">
                    <a
                      href={talk.youtubeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 border border-border px-4 py-2 font-mono text-xs uppercase tracking-widest text-muted-foreground hover:border-primary hover:text-primary transition-all duration-200 cursor-pointer"
                    >
                      <svg viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3" aria-hidden="true">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                      Watch
                    </a>
                    {talk.eventUrl && (
                      <a
                        href={talk.eventUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 border border-border px-4 py-2 font-mono text-xs uppercase tracking-widest text-muted-foreground hover:border-primary hover:text-primary transition-all duration-200 cursor-pointer"
                      >
                        Event ↗
                      </a>
                    )}
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-muted-foreground leading-[1.8] mb-6 max-w-2xl">
                  {talk.description}
                </p>

                {/* Topics */}
                <div className="flex flex-wrap gap-2">
                  {talk.topics.map((t) => (
                    <span key={t} className="bg-muted px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                      {t}
                    </span>
                  ))}
                </div>
              </article>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* CTA */}
        <FadeUp delay={0.2}>
          <div className="mt-16 border-t border-border pt-12">
            <div className="mb-12 grid gap-px bg-border lg:grid-cols-3">
              {speakingProfile.map((item) => (
                <div key={item.label} className="bg-background p-6">
                  <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.22em] text-primary">{item.label}</p>
                  <p className="text-sm leading-[1.8] text-muted-foreground">{item.value}</p>
                </div>
              ))}
            </div>
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-muted-foreground mb-4">Invite to Speak</p>
            <h2 className="font-extrabold text-2xl sm:text-3xl uppercase tracking-tighter mb-3">Want me at your event?</h2>
            <p className="text-sm text-muted-foreground leading-[1.7] max-w-md mb-8">
              I&apos;m open to speaking at conferences, developer groups, and company events on blockchain architecture, AI × Web3, custody infrastructure, and engineering leadership.
            </p>
            <Link
              href="/work-with-me"
              className="inline-block bg-primary text-primary-foreground px-8 py-4 font-mono font-bold uppercase text-xs tracking-widest hover:bg-foreground hover:text-background transition-colors duration-200"
            >
              Get in Touch →
            </Link>
          </div>
        </FadeUp>
      </div>
    </>
  )
}
