import type { Metadata } from 'next'
import { CalBookingEmbed } from '@/components/cal-booking-embed'
import { ContactForm } from '@/components/contact-form'

export const metadata: Metadata = {
  title: 'Work With Me',
  description: 'Consulting services: Architecture Review, Smart Contract Audit, Fractional CTO, 1:1 Strategy Call.',
}

const services = [
  {
    title: '1:1 Strategy Call',
    description: '45 minutes focused on your specific challenge. I send an async prep doc beforehand so we use the time well. Best for: architecture questions, tech stack decisions, hiring advice.',
    includes: ['45 min video call', 'Async prep doc', 'Written notes after'],
  },
  {
    title: 'Smart Contract Audit',
    description: 'Security and logic review of your Solidity contracts before mainnet. I check for reentrancy, access control, upgradeability risks, oracle vulnerabilities, and missing events.',
    includes: ['Written audit report', '60 min debrief call', 'Remediation checklist'],
  },
  {
    title: 'Architecture Review',
    description: 'Deep review of your blockchain or backend stack. I read your codebase, map the architecture, and produce a written teardown with prioritised recommendations.',
    includes: ['Written architecture report', '90 min walkthrough call', 'Priority-ranked recommendations'],
  },
  {
    title: 'Fractional CTO / Technical Advisor',
    description: 'Monthly retainer for startups that need senior technical leadership without a full-time hire. Weekly calls, async Slack access, and architecture decisions when it matters.',
    includes: ['Weekly 60 min call', 'Async Slack access', 'Architecture + hiring decisions', 'Capped at 2–4 clients'],
  },
]

export default function WorkWithMePage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <h1 className="mb-2 text-3xl font-bold">Work With Me</h1>
      <p className="mb-12 max-w-xl text-muted-foreground">
        I work with a small number of clients at a time. If you&apos;re building something in blockchain, AI, or distributed systems,
        let&apos;s talk.
      </p>

      {/* Services */}
      <div className="mb-16 grid gap-6 sm:grid-cols-2">
        {services.map((s) => (
          <div key={s.title} className="rounded-lg border border-border p-6">
            <h2 className="mb-2 text-lg font-bold">{s.title}</h2>
            <p className="mb-4 text-sm text-muted-foreground">{s.description}</p>
            <ul className="space-y-1">
              {s.includes.map((i) => (
                <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span className="text-primary">✓</span> {i}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Cal.com embed for strategy call booking */}
      <div className="mb-16">
        <h2 className="mb-4 text-xl font-bold">Book a Strategy Call</h2>
        <p className="mb-4 text-sm text-muted-foreground">Ready to book a 1:1? Pick a time directly:</p>
        <CalBookingEmbed />
      </div>

      {/* Contact form */}
      <div>
        <h2 className="mb-2 text-xl font-bold">Get In Touch</h2>
        <p className="mb-6 text-sm text-muted-foreground">
          Prefer to describe your project first? Send a message and I&apos;ll respond within 2 business days.
        </p>
        <ContactForm />
      </div>
    </div>
  )
}
