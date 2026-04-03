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
    description: '45 minutes focused on your specific challenge. I send an async prep doc beforehand so we use the time well. Best for architecture questions, tech stack decisions, and hiring advice.',
    includes: ['45 min video call', 'Async prep doc', 'Written notes after'],
  },
  {
    index: '02',
    title: 'Smart Contract Audit',
    description: 'Security and logic review of your Solidity contracts before mainnet. I check for reentrancy, access control, upgradeability risks, oracle vulnerabilities, and missing events.',
    includes: ['Written audit report', '60 min debrief call', 'Remediation checklist'],
  },
  {
    index: '03',
    title: 'Architecture Review',
    description: 'Deep review of your blockchain or backend stack. I read your codebase, map the architecture, and produce a written teardown with prioritised recommendations.',
    includes: ['Written architecture report', '90 min walkthrough call', 'Priority-ranked recommendations'],
  },
  {
    index: '04',
    title: 'Fractional CTO / Technical Advisor',
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
            <h1 className="font-extrabold text-4xl sm:text-5xl md:text-6xl uppercase tracking-tighter leading-[0.9] mb-6">
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
          <div className="mb-12 grid gap-px bg-border lg:grid-cols-3">
            {[
              'Architecture reviews for blockchain and backend systems under delivery pressure',
              'Audits and technical advisory for teams that need sharper security and execution discipline',
              'Fractional leadership where founders need a technical sounding board before mistakes compound',
            ].map((item, index) => (
              <div key={index} className="bg-background p-6 text-sm leading-[1.8] text-muted-foreground">
                {item}
              </div>
            ))}
          </div>
        </FadeUp>

        {/* ── Services ─────────────────────────────────────── */}
        <div className="mb-20">
          <FadeUp>
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-muted-foreground mb-8">Services</p>
          </FadeUp>
          <StaggerContainer className="grid gap-px bg-border sm:grid-cols-2">
            {services.map((s) => (
              <StaggerItem key={s.title} className="bg-background p-8">
                <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-4">{s.index}</p>
                <h2 className="font-extrabold text-lg uppercase tracking-tight mb-3">{s.title}</h2>
                <p className="text-sm text-muted-foreground leading-relaxed mb-5">{s.description}</p>
                <ul className="space-y-1.5">
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

        {/* ── Cal.com booking ──────────────────────────────── */}
        <FadeUp>
          <div className="mb-20 border-t border-border pt-12">
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-muted-foreground mb-4">Strategy Call</p>
            <h2 className="font-extrabold text-2xl sm:text-3xl uppercase tracking-tighter mb-2">Book a 1:1</h2>
            <p className="text-sm text-muted-foreground mb-8 max-w-md">
              Ready to book? Pick a time directly — I&apos;ll send a prep doc after you book.
            </p>
            <CalBookingEmbed />
          </div>
        </FadeUp>

        {/* ── Contact form ─────────────────────────────────── */}
        <FadeUp>
          <div className="border-t border-border pt-12">
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-muted-foreground mb-4">Enquiries</p>
            <h2 className="font-extrabold text-2xl sm:text-3xl uppercase tracking-tighter mb-2">Get In Touch</h2>
            <p className="text-sm text-muted-foreground mb-8 max-w-md">
              Prefer to describe your project first? Send a message and I&apos;ll respond within 2 business days.
            </p>
            <ContactForm />
            <div className="mt-10 flex flex-wrap items-center gap-6 text-sm">
              <Link href="/projects" className="font-mono text-xs uppercase tracking-widest text-foreground transition-colors hover:text-primary">
                See project case studies →
              </Link>
              <Link href="/writing" className="font-mono text-xs uppercase tracking-widest text-muted-foreground transition-colors hover:text-primary">
                Read recent writing →
              </Link>
            </div>
          </div>
        </FadeUp>

      </div>
    </>
  )
}
