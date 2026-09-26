import type { Metadata } from 'next'
import Link from 'next/link'
import { CalBookingEmbed } from '@/components/cal-booking-embed'
import { ContactForm } from '@/components/contact-form'
import { FadeUp } from '@/components/scroll-reveal'
import { PageIntro } from '@/components/bazaar/page-intro'
import { Scrap } from '@/components/bazaar/scrap'
import { chipLink, pick, tilts, tones } from '@/components/bazaar/styles'
import { cn } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Work With Me',
  description: 'Consulting services: Architecture Review, Smart Contract Audit, Fractional CTO, 1:1 Strategy Call.',
}

const services = [
  {
    index: '01',
    title: '1:1 Strategy Call',
    label: 'Fast clarity',
    tone: 'tone-butter',
    description: '45 minutes focused on your specific challenge. I send an async prep doc beforehand so we use the time well. Best for architecture questions, tech stack decisions, and hiring advice.',
    includes: ['45 min video call', 'Async prep doc', 'Written notes after'],
  },
  {
    index: '02',
    title: 'Smart Contract Audit',
    label: 'Security review',
    tone: 'tone-sage',
    description: 'Security and logic review of your Solidity contracts before mainnet. I check for reentrancy, access control, upgradeability risks, oracle vulnerabilities, and missing events.',
    includes: ['Written audit report', '60 min debrief call', 'Remediation checklist'],
  },
  {
    index: '03',
    title: 'Architecture Review',
    label: 'System teardown',
    tone: 'tone-sky',
    description: 'Deep review of your blockchain or backend stack. I read your codebase, map the architecture, and produce a written teardown with prioritised recommendations.',
    includes: ['Written architecture report', '90 min walkthrough call', 'Priority-ranked recommendations'],
  },
  {
    index: '04',
    title: 'Fractional CTO / Technical Advisor',
    label: 'Ongoing support',
    tone: 'tone-rose',
    description: 'Monthly retainer for startups that need senior technical leadership without a full-time hire. Weekly calls, async Slack access, and architecture decisions when it matters.',
    includes: ['Weekly 60 min call', 'Async Slack access', 'Architecture + hiring decisions', 'Capped at 2–4 clients'],
  },
]

const sectionTitle = 'text-[clamp(2rem,5vw,3.4rem)] font-black uppercase leading-none tracking-tighter'
const handWord = 'hand text-[1.15em] font-normal lowercase text-dm-accent-ink'

export default function WorkWithMePage() {
  return (
    <>
      <PageIntro
        crumbs={[
          { href: '/', label: '← Home' },
          { href: '/about', label: 'About' },
        ]}
        kicker="Small roster · selective clients ✦"
        title={
          <>
            Work with <span className="max-outline">me</span>
          </>
        }
      >
        <div className="relative z-10 mt-10 flex flex-col gap-10 lg:mt-12 lg:flex-row lg:items-start">
          <Scrap className="w-full max-w-[540px] -rotate-[1.2deg]" paperClassName="tone-panel px-7 py-9 sm:px-9">
            <p className="text-[1.06rem] font-medium leading-[1.7]">
              I work with a small number of clients at a time. If you&apos;re building in blockchain, AI, or distributed
              systems, let&apos;s talk.
            </p>
            <p className="mt-4 text-[15px] leading-[1.7] text-dm-ink-soft">
              Focused help at the point where mistakes get expensive — for founders and teams who need sharper
              architecture, security, or technical decision-making without adding process theatre.
            </p>
            <p className="hand mt-4 text-[1.5rem] leading-none text-dm-accent-ink">replies within 2 business days</p>
          </Scrap>
          <ul className="flex flex-wrap gap-3 lg:-ml-4 lg:mt-12 lg:max-w-[300px] lg:flex-col lg:items-start">
            {['Small roster', 'Blockchain + AI + distributed systems', 'Async + live advisory'].map((item, i) => (
              <li key={item} className={cn('ticket shadow-hard', pick(tones, i + 1), pick(tilts, i))}>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </PageIntro>

      {/* ── Services ────────────────────────────────────────────────── */}
      <section aria-labelledby="services" className="page-wrap mt-24">
        <div className="max-w-3xl">
          <h2 id="services" className={sectionTitle}>
            Choose the <span className={handWord}>depth</span>
          </h2>
          <p className="mt-4 text-[15px] leading-[1.75] text-dm-ink-soft">
            Some work is best handled as a sharp one-off review. Other situations need a longer operating relationship.
          </p>
        </div>
        <ul className="mt-12 grid gap-10 md:grid-cols-2 md:gap-12">
          {services.map((s, i) => (
            <li key={s.title} className={cn(i % 2 === 1 && 'md:mt-10')}>
              <Scrap
                className={['-rotate-[1.2deg]', 'rotate-1', 'rotate-[0.8deg]', '-rotate-[1.4deg]'][i]}
                paperClassName={cn(s.tone, 'px-7 py-10 sm:px-9')}
              >
                <div className="flex items-start justify-between gap-4">
                  <span className="ticket">{s.label}</span>
                  <span aria-hidden="true" className="hand text-[2rem] leading-none">
                    {s.index}
                  </span>
                </div>
                <h3 className="mt-5 text-[1.45rem] font-black uppercase leading-[1.05] tracking-tight">{s.title}</h3>
                <p className="mt-4 text-[15px] font-medium leading-[1.7]">{s.description}</p>
                <ul className="mt-6 space-y-2">
                  {s.includes.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-[15px] font-semibold">
                      <span aria-hidden="true">✦</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </Scrap>
            </li>
          ))}
        </ul>
      </section>

      {/* ── Recruiter lane ─────────────────────────────────────────── */}
      <section aria-labelledby="recruiters" className="page-wrap mt-24 sm:mt-28">
        <FadeUp>
          <div className="surreal-arch dm-longshadow tone-lilac mx-auto max-w-[980px] px-7 pb-12 pt-24 text-center sm:px-14 sm:pt-20">
            <p className="text-[11px] font-bold uppercase tracking-[0.24em]">Hiring? ✦ For recruiters</p>
            <h2 id="recruiters" className="mx-auto mt-4 max-w-2xl text-[clamp(1.6rem,4vw,2.6rem)] font-black uppercase leading-[1.04] tracking-tight">
              Leadership roles, principal architecture, and long-horizon builds
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-[15px] font-medium leading-[1.75]">
              If you&apos;re hiring for principal architect, staff-plus blockchain leadership, CTO-track, or senior
              distributed systems roles, this is the right lane. I&apos;m most relevant where architecture quality,
              delivery maturity, and cross-team technical judgment matter.
            </p>
            <ul className="mt-6 flex flex-wrap justify-center gap-2.5">
              {['Open to global leadership roles', 'Blockchain + AI + distributed systems', 'Full-time or long-term strategic scope'].map((item) => (
                <li key={item} className="ticket">
                  {item}
                </li>
              ))}
            </ul>
            <p className="hand mt-8 text-[1.5rem] leading-none">this site is the live resume —</p>
            <div className="mt-5 flex flex-wrap justify-center gap-3">
              {[
                { href: '/about', label: 'View profile' },
                { href: '/resume', label: 'Resume' },
                { href: '/projects', label: 'Case studies' },
                { href: '/writing', label: 'Writing' },
              ].map((link, i) => (
                <Link key={link.href} href={link.href} className={cn(chipLink, i === 0 ? 'tone-ink' : 'tone-panel', pick(tilts, i))}>
                  {link.label} →
                </Link>
              ))}
            </div>
          </div>
        </FadeUp>
      </section>

      {/* ── Book or write ──────────────────────────────────────────── */}
      <div className="page-wrap mt-24 grid gap-16 sm:mt-28 xl:grid-cols-[1.05fr_0.95fr] xl:gap-14">
        <section aria-labelledby="book">
          <h2 id="book" className={sectionTitle}>
            Book a <span className={handWord}>1:1</span>
          </h2>
          <p className="mt-4 max-w-lg text-[15px] leading-[1.75] text-dm-ink-soft">
            Best when you already know you want a live working session. After booking, I send a prep doc so the call
            starts with context instead of backstory.
          </p>
          <ul className="mb-8 mt-6 flex flex-wrap gap-2.5">
            {['45 min working session', 'Prep doc sent after booking', 'Best for architecture and hiring decisions'].map((item, i) => (
              <li key={item} className={cn('ticket', pick(tones, i), pick(tilts, i))}>
                {item}
              </li>
            ))}
          </ul>
          <CalBookingEmbed />
        </section>

        <section aria-labelledby="enquire">
          <h2 id="enquire" className={sectionTitle}>
            Or write <span className={handWord}>first</span>
          </h2>
          <p className="mt-4 max-w-lg text-[15px] leading-[1.75] text-dm-ink-soft">
            Better for audits, architecture reviews, or longer advisory work where I need to understand your context
            before suggesting the right format.
          </p>
          <dl className="mb-8 mt-6 grid gap-4 sm:grid-cols-2">
            <div className="tone-butter -rotate-1 border-2 border-current px-5 py-4 shadow-hard">
              <dt className="text-[10px] font-bold uppercase tracking-[0.2em]">Response</dt>
              <dd className="mt-1 text-[15px] font-semibold">Within 2 business days</dd>
            </div>
            <div className="tone-sky rotate-1 border-2 border-current px-5 py-4 shadow-hard">
              <dt className="text-[10px] font-bold uppercase tracking-[0.2em]">Best for</dt>
              <dd className="mt-1 text-[15px] font-semibold leading-[1.5]">Audits, architecture reviews, advisory retainers, recruiter outreach</dd>
            </div>
          </dl>
          <ContactForm />
          <div className="mt-10 flex flex-wrap gap-3">
            <Link href="/projects" className={cn(chipLink, 'tone-panel -rotate-1')}>
              See project case studies →
            </Link>
            <Link href="/writing" className={cn(chipLink, 'tone-panel rotate-1')}>
              Read recent writing →
            </Link>
          </div>
        </section>
      </div>
    </>
  )
}
