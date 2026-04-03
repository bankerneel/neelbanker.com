import type { Metadata } from 'next'
import Link from 'next/link'
import { FadeUp, StaggerContainer, StaggerItem } from '@/components/scroll-reveal'
import { TALKS } from '@/lib/talks'

export const metadata: Metadata = {
  title: 'Speaking',
  description: 'Talks on blockchain fundamentals, NFTs, and practical engineering at GDG Ahmedabad, ICAI Centre of Excellence, and internal sessions.',
}

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
    label: 'Audience fit',
    value: 'Engineering teams, Web3 builders, founder communities, developer groups, and product leaders navigating technical complexity.',
  },
]

const invitationSignals = [
  'Available for conferences and internal sessions',
  'Best for technical and operator audiences',
  'Remote or in-person depending on fit',
]

export default function SpeakingPage() {
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
                href="/about"
                className="cursor-pointer font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground transition-colors duration-200 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                About
              </Link>
            </div>
          </FadeUp>
          <FadeUp delay={0.15}>
            <p className="mb-4 font-mono text-xs uppercase tracking-[0.22em] text-muted-foreground">
              Talks & Sessions
            </p>
          </FadeUp>
          <FadeUp delay={0.25}>
            <h1 className="mb-6 font-semibold text-4xl uppercase tracking-tighter leading-[0.9] sm:text-5xl md:text-6xl">
              Speaking
            </h1>
          </FadeUp>
          <FadeUp delay={0.4}>
            <p className="max-w-2xl text-base leading-[1.7] text-muted-foreground">
              I speak where technical fundamentals meet practical decision-making: blockchain architecture, digital ownership systems, developer tooling, and engineering judgment under delivery pressure.
            </p>
          </FadeUp>
        </div>
      </section>

      <div className="mx-auto max-w-5xl xl:max-w-6xl 2xl:max-w-7xl 3xl:max-w-[1440px] px-6 sm:px-12 py-12 sm:py-16">
        <FadeUp>
          <div className="mb-16 grid gap-6 xl:grid-cols-[0.78fr_1.22fr] xl:items-end">
            <div>
              <p className="mb-4 font-mono text-xs uppercase tracking-[0.22em] text-muted-foreground">Speaking profile</p>
              <h2 className="font-semibold text-2xl uppercase tracking-tight sm:text-3xl">
                Technical sessions with operator context
              </h2>
            </div>
            <p className="max-w-2xl text-sm leading-[1.8] text-muted-foreground">
              The best sessions are the ones that make complicated systems easier to understand without flattening the trade-offs. That usually means speaking to practitioners, founders, and technical teams rather than staying at surface-level trend commentary.
            </p>
          </div>
        </FadeUp>

        <StaggerContainer className="mb-20 grid gap-px bg-border lg:grid-cols-3">
          {speakingProfile.map((item) => (
            <StaggerItem key={item.label} className="bg-background">
              <div className="h-full px-5 py-5 sm:px-6">
                <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.22em] text-primary">{item.label}</p>
                <p className="text-sm leading-[1.8] text-muted-foreground">{item.value}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <div className="mb-20">
          <FadeUp>
            <div className="mb-8 grid gap-4 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
              <div>
                <p className="mb-4 font-mono text-xs uppercase tracking-[0.22em] text-muted-foreground">Selected talks</p>
                <h2 className="font-semibold text-2xl uppercase tracking-tight sm:text-3xl">
                  Sessions, workshops, and recorded talks
                </h2>
              </div>
              <p className="max-w-2xl text-sm leading-[1.8] text-muted-foreground">
                A small archive of public sessions across developer communities, professional audiences, and internal engineering environments.
              </p>
            </div>
          </FadeUp>

          <StaggerContainer className="grid gap-4">
            {TALKS.map((talk) => (
              <StaggerItem key={talk.title}>
                <article className="group border border-border bg-background px-6 py-6 transition-colors duration-200 hover:border-primary/30 sm:px-7 sm:py-7">
                  <div className="grid gap-8 xl:grid-cols-[1fr_auto] xl:items-start">
                    <div>
                      <div className="mb-4 flex flex-wrap items-center gap-3">
                        <span className="inline-flex min-h-9 items-center border border-primary/30 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-primary">
                          {talk.type}
                        </span>
                        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                          {talk.venue}
                        </span>
                      </div>
                      <h3 className="mb-3 max-w-3xl text-xl font-semibold uppercase tracking-tight text-foreground transition-colors duration-200 group-hover:text-primary sm:text-2xl">
                        {talk.title}
                      </h3>
                      <p className="max-w-3xl text-sm leading-[1.8] text-muted-foreground">
                        {talk.description}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-3 xl:flex-col xl:items-stretch">
                      <a
                        href={talk.youtubeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="cursor-pointer border border-border px-4 py-3 font-mono text-[10px] uppercase tracking-[0.18em] text-foreground transition-colors duration-200 hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                      >
                        Watch talk →
                      </a>
                      {talk.eventUrl && (
                        <a
                          href={talk.eventUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="cursor-pointer border border-border px-4 py-3 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground transition-colors duration-200 hover:border-primary hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                        >
                          Event page ↗
                        </a>
                      )}
                    </div>
                  </div>

                  <div className="mt-6 flex flex-wrap gap-2 border-t border-dashed border-border pt-5">
                    {talk.topics.map((topic) => (
                      <span
                        key={topic}
                        className="inline-flex min-h-11 items-center border border-border px-3 py-2 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground transition-colors duration-200 hover:border-primary/40 hover:text-foreground"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                </article>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>

        <FadeUp delay={0.15}>
          <div className="border-t border-border pt-12">
            <div className="grid gap-8 xl:grid-cols-[0.82fr_1.18fr] xl:items-end">
              <div>
                <p className="mb-4 font-mono text-xs uppercase tracking-[0.22em] text-muted-foreground">Invite to speak</p>
                <h2 className="mb-3 font-semibold text-2xl uppercase tracking-tight sm:text-3xl">
                  Bring me in for a session that helps people think better
                </h2>
                <p className="max-w-lg text-sm leading-[1.8] text-muted-foreground">
                  I’m open to conferences, developer communities, and company sessions on blockchain architecture, AI × Web3, custody infrastructure, and engineering leadership.
                </p>
              </div>
              <div className="space-y-5">
                <div className="flex flex-wrap gap-2">
                  {invitationSignals.map((item) => (
                    <span
                      key={item}
                      className="inline-flex min-h-11 items-center border border-border px-3 py-2 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground transition-colors duration-200 hover:border-primary/40 hover:text-foreground"
                    >
                      {item}
                    </span>
                  ))}
                </div>
                <div className="flex flex-wrap gap-3">
                  <Link
                    href="/work-with-me"
                    className="cursor-pointer bg-primary px-5 py-3 font-mono text-[10px] uppercase tracking-[0.18em] text-primary-foreground transition-colors duration-200 hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  >
                    Start the conversation →
                  </Link>
                  <Link
                    href="/about"
                    className="cursor-pointer border border-border px-5 py-3 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground transition-colors duration-200 hover:border-primary hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  >
                    View profile
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </FadeUp>
      </div>
    </>
  )
}
