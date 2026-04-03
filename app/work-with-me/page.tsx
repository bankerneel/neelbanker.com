import type { Metadata } from 'next'
import Link from 'next/link'
import { CalBookingEmbed } from '@/components/cal-booking-embed'
import { ContactForm } from '@/components/contact-form'
import { FadeUp, StaggerContainer, StaggerItem } from '@/components/scroll-reveal'

export const metadata: Metadata = {
  title: 'Work With Me',
  description: 'Consulting services: Architecture Review, Smart Contract Audit, Fractional CTO, 1:1 Strategy Call.',
}

const services = [
  {
    index: '01',
    title: '1:1 Strategy Call',
    label: 'Fast clarity',
    description: '45 minutes focused on your specific challenge. I send an async prep doc beforehand so we use the time well. Best for architecture questions, tech stack decisions, and hiring advice.',
    includes: ['45 min video call', 'Async prep doc', 'Written notes after'],
  },
  {
    index: '02',
    title: 'Smart Contract Audit',
    label: 'Security review',
    description: 'Security and logic review of your Solidity contracts before mainnet. I check for reentrancy, access control, upgradeability risks, oracle vulnerabilities, and missing events.',
    includes: ['Written audit report', '60 min debrief call', 'Remediation checklist'],
  },
  {
    index: '03',
    title: 'Architecture Review',
    label: 'System teardown',
    description: 'Deep review of your blockchain or backend stack. I read your codebase, map the architecture, and produce a written teardown with prioritised recommendations.',
    includes: ['Written architecture report', '90 min walkthrough call', 'Priority-ranked recommendations'],
  },
  {
    index: '04',
    title: 'Fractional CTO / Technical Advisor',
    label: 'Ongoing support',
    description: 'Monthly retainer for startups that need senior technical leadership without a full-time hire. Weekly calls, async Slack access, and architecture decisions when it matters.',
    includes: ['Weekly 60 min call', 'Async Slack access', 'Architecture + hiring decisions', 'Capped at 2–4 clients'],
  },
]

export default function WorkWithMePage() {
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
              Small roster · Selective clients
            </p>
          </FadeUp>
          <FadeUp delay={0.25}>
            <h1 className="font-semibold text-4xl sm:text-5xl md:text-6xl uppercase tracking-tighter leading-[0.9] mb-6">
              Work With Me
            </h1>
          </FadeUp>
          <FadeUp delay={0.4}>
            <p className="text-base text-muted-foreground leading-[1.7] max-w-xl">
              I work with a small number of clients at a time. If you&apos;re building in blockchain, AI, or distributed systems, let&apos;s talk.
            </p>
          </FadeUp>
        </div>
      </section>

      <div className="mx-auto max-w-5xl xl:max-w-6xl 2xl:max-w-7xl 3xl:max-w-[1440px] px-6 sm:px-12 py-12 sm:py-16">
        <FadeUp>
          <div className="mb-12 grid gap-4 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <div>
              <p className="mb-4 font-mono text-xs uppercase tracking-[0.22em] text-muted-foreground">Engagement model</p>
              <h2 className="font-semibold text-2xl uppercase tracking-tight sm:text-3xl">
                Focused help at the point where mistakes get expensive
              </h2>
            </div>
            <div className="space-y-4">
              <p className="max-w-2xl text-sm leading-[1.8] text-muted-foreground">
                The work is designed for founders and teams who need sharper architecture, security, or technical decision-making without adding process theatre.
              </p>
              <div className="flex flex-wrap gap-2">
                {['Small roster', 'Blockchain + AI + distributed systems', 'Async + live advisory'].map((item) => (
                  <span
                    key={item}
                    className="inline-flex min-h-11 items-center border border-border px-3 py-2 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground transition-colors duration-200 hover:border-primary/40 hover:text-foreground"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </FadeUp>

        <FadeUp>
          <div className="mb-20 border border-border bg-background px-6 py-6 sm:px-7 sm:py-7">
            <div className="grid gap-8 xl:grid-cols-[0.85fr_1.15fr] xl:items-end">
              <div>
                <p className="mb-4 font-mono text-xs uppercase tracking-[0.22em] text-primary">Hire Me For Recruiters</p>
                <h2 className="font-semibold text-2xl uppercase tracking-tight sm:text-3xl">
                  Leadership roles, principal architecture, and long-horizon builds
                </h2>
              </div>
              <div className="space-y-4">
                <p className="max-w-2xl text-sm leading-[1.8] text-muted-foreground">
                  If you&apos;re hiring for principal architect, staff-plus blockchain leadership, CTO-track, or senior distributed systems roles, this is the right lane.
                  I&apos;m most relevant where architecture quality, delivery maturity, and cross-team technical judgment matter.
                </p>
                <div className="flex flex-wrap gap-2">
                  {['Open to global leadership roles', 'Blockchain + AI + distributed systems', 'Full-time or long-term strategic scope'].map((item) => (
                    <span
                      key={item}
                      className="inline-flex min-h-11 items-center border border-border px-3 py-2 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground transition-colors duration-200 hover:border-primary/40 hover:text-foreground"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="mt-8 border-t border-dashed border-border pt-6">
              <div className="grid gap-4 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
                <div>
                  <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">For recruiters</p>
                  <p className="max-w-md text-sm leading-[1.8] text-muted-foreground">
                    This site is the live resume: profile, case studies, writing, and working style in one place.
                  </p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <Link
                    href="/about"
                    className="cursor-pointer border border-border px-4 py-3 font-mono text-[10px] uppercase tracking-[0.18em] text-foreground transition-colors duration-200 hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  >
                    View profile
                  </Link>
                  <Link
                    href="/projects"
                    className="cursor-pointer border border-border px-4 py-3 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground transition-colors duration-200 hover:border-primary hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  >
                    Review case studies
                  </Link>
                  <Link
                    href="/writing"
                    className="cursor-pointer border border-border px-4 py-3 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground transition-colors duration-200 hover:border-primary hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  >
                    Read writing
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </FadeUp>

        {/* ── Services ─────────────────────────────────────── */}
        <div className="mb-20">
          <FadeUp>
            <div className="mb-8 grid gap-4 lg:grid-cols-[0.75fr_1.25fr] lg:items-end">
              <div>
                <p className="mb-4 font-mono text-xs uppercase tracking-[0.22em] text-muted-foreground">Services</p>
                <h2 className="font-semibold text-2xl uppercase tracking-tight sm:text-3xl">
                  Choose the depth of support
                </h2>
              </div>
              <p className="max-w-2xl text-sm leading-[1.8] text-muted-foreground">
                Some work is best handled as a sharp one-off review. Other situations need a longer operating relationship.
              </p>
            </div>
          </FadeUp>
          <StaggerContainer className="grid gap-4 xl:grid-cols-2">
            {services.map((s) => (
              <StaggerItem key={s.title} className="group border border-border bg-background px-6 py-6 transition-colors duration-200 hover:border-primary/30 sm:px-7 sm:py-7">
                <div className="mb-5 flex items-start justify-between gap-4">
                  <div>
                    <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.22em] text-primary">{s.label}</p>
                    <h2 className="text-lg font-semibold uppercase tracking-tight">{s.title}</h2>
                  </div>
                  <span className="shrink-0 border border-border px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground transition-colors duration-200 group-hover:border-primary/40">
                    {s.index}
                  </span>
                </div>
                <p className="mb-6 max-w-xl text-sm leading-[1.8] text-muted-foreground">{s.description}</p>
                <ul className="space-y-2">
                  {s.includes.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm">
                      <span className="mt-0.5 font-mono text-primary text-xs">→</span>
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>

        <div className="grid gap-12 border-t border-border pt-12 xl:grid-cols-[1.05fr_0.95fr]">
          {/* ── Cal.com booking ──────────────────────────────── */}
          <FadeUp>
            <div>
              <p className="mb-4 font-mono text-xs uppercase tracking-[0.22em] text-muted-foreground">Strategy Call</p>
              <h2 className="mb-3 font-semibold text-2xl uppercase tracking-tight sm:text-3xl">Book a 1:1</h2>
              <p className="mb-6 max-w-lg text-sm leading-[1.8] text-muted-foreground">
                Best when you already know you want a live working session. After booking, I send a prep doc so the call starts with context instead of backstory.
              </p>
              <div className="mb-6 flex flex-wrap gap-2">
                {['45 min working session', 'Prep doc sent after booking', 'Best for architecture and hiring decisions'].map((item) => (
                  <span
                    key={item}
                    className="inline-flex min-h-11 items-center border border-border px-3 py-2 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground transition-colors duration-200 hover:border-primary/40 hover:text-foreground"
                  >
                    {item}
                  </span>
                ))}
              </div>
              <CalBookingEmbed />
            </div>
          </FadeUp>

          {/* ── Contact form ─────────────────────────────────── */}
          <FadeUp>
            <div>
              <p className="mb-4 font-mono text-xs uppercase tracking-[0.22em] text-muted-foreground">Enquiries</p>
              <h2 className="mb-3 font-semibold text-2xl uppercase tracking-tight sm:text-3xl">Describe the project first</h2>
              <p className="mb-6 max-w-lg text-sm leading-[1.8] text-muted-foreground">
                Better for audits, architecture reviews, or longer advisory work where I need to understand your context before suggesting the right format.
              </p>
              <div className="mb-6 grid gap-px bg-border sm:grid-cols-2">
                <div className="bg-background px-5 py-4">
                  <p className="mb-1 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">Response</p>
                  <p className="text-sm leading-[1.7] text-foreground">Within 2 business days</p>
                </div>
                <div className="bg-background px-5 py-4">
                  <p className="mb-1 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">Best for</p>
                  <p className="text-sm leading-[1.7] text-muted-foreground">Audits, architecture reviews, advisory retainers, recruiter outreach</p>
                </div>
              </div>
              <ContactForm />
              <div className="mt-10 flex flex-wrap items-center gap-6 text-sm">
                <Link href="/projects" className="cursor-pointer font-mono text-xs uppercase tracking-widest text-foreground transition-colors duration-200 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
                  See project case studies →
                </Link>
                <Link href="/writing" className="cursor-pointer font-mono text-xs uppercase tracking-widest text-muted-foreground transition-colors duration-200 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
                  Read recent writing →
                </Link>
              </div>
            </div>
          </FadeUp>
        </div>

      </div>
    </>
  )
}
