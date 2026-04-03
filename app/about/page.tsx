import type { Metadata } from 'next'
import Link from 'next/link'
import { FadeUp, StaggerContainer, StaggerItem } from '@/components/scroll-reveal'
import { AboutTechStack } from '@/components/about-tech-stack'

export const metadata: Metadata = {
  title: 'About',
  description: 'Distributed Systems & Blockchain Architect with 7+ years building Web3 infrastructure, custody platforms, and AI-native systems.',
}

const experience = [
  {
    company: 'Tech Alchemy',
    role: 'Principal Blockchain Architect / Engineering Lead',
    period: 'May 2024 – Present',
    duration: '2+ years',
    contributions: [
      'Taken key architecture decisions across several live blockchain platforms running in parallel',
      'Delivered large-scale L2 deployments, custody integrations, and multi-chain systems',
      'Helped formalize engineering practices around security, compliance, and operational reliability',
      'Mentored engineers and been directly involved in senior-level hiring',
      'Owned technical delivery across distributed internal teams and external vendors',
      'Brought in AI-assisted engineering workflows to help teams move faster while keeping architectural discipline',
    ],
    detail: 'I lead the architecture and delivery of production blockchain platforms across Ethereum L2 ecosystems, custody infrastructure, cross-chain integrations, and payments. After the acquisition, a big part of my role has been navigating complexity, aligning multiple teams, and making sure critical platforms continue to scale without compromising security or user experience.',
  },
  {
    company: 'SoluLab Inc',
    role: 'Blockchain Team Lead → Engineering Lead',
    period: 'Jul 2019 – May 2024',
    duration: '4 yrs 11 mos',
    contributions: [
      'Designed blockchain platforms across DeFi, enterprise, and Web3 infrastructure use cases',
      'Built and scaled a blockchain engineering team from 10 → 50+ engineers',
      'Acted as CTO-level advisor on product architecture and delivery strategy',
      'Introduced engineering standards around security, documentation, and code quality',
      'Mentored engineers across different blockchain stacks and frameworks',
      'Built long-term client relationships with companies across North America',
    ],
    detail: 'I worked closely with startups and mid-market companies as a solution architect and technical advisor, helping them design and ship custom blockchain platforms and distributed systems. A lot of the work involved stepping in early, when ideas were still rough, and helping founders translate ambition into systems that could actually scale.',
    awards: ['Best Team Lead of the Year — 2021', 'Best Team Lead of the Year — 2022 (consecutive)'],
  },
]

const talks = [
  {
    title: 'Getting Started with Docker',
    venue: 'Internal Session · SoluLab',
    description: 'Demonstrated how to Dockerise a React.js application for dev, staging & production with Docker & Docker Compose.',
    youtubeUrl: 'https://www.youtube.com/watch?v=rvjnvZ6utpM',
  },
  {
    title: 'Blockchain and Decentralisation',
    venue: 'Centre of Excellence of ICAI · Jaipur',
    description: 'Session covering blockchain fundamentals and real-world use cases; positioned around the technology behind cryptocurrency.',
    youtubeUrl: 'https://www.youtube.com/watch?v=ONUzNrt9plc',
  },
  {
    title: 'NFT: A New Gold Rush',
    venue: 'GDG Ahmedabad',
    description: 'Covered NFTs as a new asset class on blockchain for a Google Developer Group audience.',
    youtubeUrl: 'https://www.youtube.com/watch?v=KYRgwRG-LF8',
  },
]

export default function AboutPage() {
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
              <Link href="/work-with-me" className="font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground transition-colors hover:text-primary">
                Work With Me
              </Link>
            </div>
          </FadeUp>
          <FadeUp delay={0.15}>
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-muted-foreground mb-4">
              Distributed Systems & Blockchain Architect · Ahmedabad, India
            </p>
          </FadeUp>
          <FadeUp delay={0.25}>
            <h1 className="font-extrabold text-4xl sm:text-5xl md:text-6xl uppercase tracking-tighter leading-[0.9] mb-6">
              About Neel
            </h1>
          </FadeUp>
          <FadeUp delay={0.4}>
            <p className="text-base text-muted-foreground leading-[1.7] max-w-xl">
              7+ years designing custody infrastructure, cross-chain systems, and AI-augmented engineering workflows at the intersection of blockchain and product.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* ── Bio ──────────────────────────────────────────── */}
      <div className="mx-auto max-w-2xl px-6 sm:px-12 py-12 sm:py-16">
        <FadeUp>
          <div className="prose prose-invert prose-zinc max-w-none">
            <p>
              For the past 7+ years, I&apos;ve been deep in production environments across Web3 infrastructure, custody platforms,
              cross-chain integrations, and payments. Much of my work involves working with founders and product leaders early on
              to determine what needs to be built, then shaping it into something that won&apos;t fall apart at scale.
            </p>
            <p>
              More recently, I&apos;ve been spending significant time exploring AI-augmented engineering — not in a hype-driven way,
              but in a practical &ldquo;how do teams ship faster without creating long-term mess&rdquo; sense. I experiment with multi-model
              workflows, vector databases, and system design patterns that improve both delivery speed and architectural clarity.
            </p>
            <p>
              I also care a lot about the environment teams work in. Mentoring engineers, tightening delivery frameworks, defining
              security expectations, and keeping technical direction aligned with business goals are big parts of what I do day-to-day.
            </p>
            <p>
              In earlier roles, I led blockchain engineering teams of 50+ people and worked closely with startup founders and
              enterprise stakeholders as a technical sounding board when decisions really mattered.
            </p>

            <h2>Interests</h2>
            <ul>
              <li>Distributed platform architecture</li>
              <li>AI-driven product engineering</li>
              <li>Payments, custody, and financial infrastructure</li>
              <li>Scaling engineering organizations</li>
              <li>Founder and CTO advisory</li>
            </ul>
            <p className="text-muted-foreground text-sm">
              Open to global architecture leadership roles, CTO-track paths, and meaningful long-term collaborations.
            </p>

            <h2>Beyond Work</h2>
            <p>
              I run <a href="https://hindustanecolife.com" target="_blank" rel="noopener noreferrer">Hindustan Ecolife</a> — a
              nature and eco product business — as a side project. It keeps me honest about the full product stack: not just the
              backend, but the customer experience end to end.
            </p>

            <h2>Writing</h2>
            <p>
              I write <em>The Architect&apos;s Brief</em> — a weekly newsletter covering blockchain architecture, AI × Web3, and
              engineering leadership. If you build distributed systems or lead technical teams, it&apos;s for you.
            </p>
          </div>
        </FadeUp>
      </div>

      {/* ── Work Experience ──────────────────────────────── */}
      <div className="border-t border-border">
        <div className="mx-auto max-w-5xl xl:max-w-6xl 2xl:max-w-7xl 3xl:max-w-[1440px] px-6 sm:px-12 py-12 sm:py-16">
          <FadeUp>
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-muted-foreground mb-12">Work Experience</p>
          </FadeUp>

          <div className="space-y-16">
            {experience.map((exp, i) => (
              <FadeUp key={exp.company} delay={i * 0.1}>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-10">
                  {/* Left: meta */}
                  <div className="md:col-span-1">
                    <p className="font-mono text-[10px] uppercase tracking-widest text-primary mb-1">{exp.period}</p>
                    <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{exp.duration}</p>
                  </div>
                  {/* Right: content */}
                  <div className="md:col-span-3">
                    <h3 className="font-extrabold text-xl uppercase tracking-tight mb-1">{exp.company}</h3>
                    <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-4">{exp.role}</p>
                    <p className="text-sm text-muted-foreground leading-[1.7] mb-5">{exp.detail}</p>
                    <ul className="space-y-2">
                      {exp.contributions.map((c) => (
                        <li key={c} className="flex items-start gap-2.5 text-sm">
                          <span className="mt-1 font-mono text-primary text-xs shrink-0">→</span>
                          <span className="text-muted-foreground">{c}</span>
                        </li>
                      ))}
                    </ul>
                    {exp.awards && (
                      <div className="mt-5 flex flex-wrap gap-2">
                        {exp.awards.map((a) => (
                          <span key={a} className="border border-primary/30 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-primary">
                            {a}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </div>

      {/* ── Education ────────────────────────────────────── */}
      <div className="border-t border-border">
        <div className="mx-auto max-w-5xl xl:max-w-6xl 2xl:max-w-7xl 3xl:max-w-[1440px] px-6 sm:px-12 py-12 sm:py-16">
          <FadeUp>
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-muted-foreground mb-8">Education</p>
          </FadeUp>
          <FadeUp delay={0.1}>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-10">
              <div className="md:col-span-1">
                <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">MTech</p>
              </div>
              <div className="md:col-span-3">
                <h3 className="font-extrabold text-xl uppercase tracking-tight mb-1">Master of Technology</h3>
                <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-4">Information Technology</p>
                <div className="flex flex-wrap gap-3 mb-4">
                  <span className="border border-primary/30 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-primary">
                    Gold Medalist
                  </span>
                  <span className="border border-border px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                    Ranked 4th in University
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Review paper published: <em>Blockchain &amp; Web3 in Carbon Credits</em>
                </p>
              </div>
            </div>
          </FadeUp>
        </div>
      </div>

      {/* ── Speaking ─────────────────────────────────────── */}
      <div className="border-t border-border">
        <div className="mx-auto max-w-5xl xl:max-w-6xl 2xl:max-w-7xl 3xl:max-w-[1440px] px-6 sm:px-12 py-12 sm:py-16">
          <FadeUp>
            <div className="flex items-end justify-between mb-10">
              <p className="font-mono text-xs uppercase tracking-[0.22em] text-muted-foreground">Speaking</p>
              <Link href="/speaking" className="font-mono text-xs uppercase text-primary hover:underline underline-offset-8 transition-colors">
                All talks →
              </Link>
            </div>
          </FadeUp>
          <StaggerContainer className="space-y-0">
            {talks.map((talk) => (
              <StaggerItem key={talk.title}>
                <a
                  href={talk.youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col md:flex-row md:items-center gap-3 md:gap-8 py-6 border-t border-border hover:bg-white/[0.015] transition-colors duration-200 cursor-pointer"
                >
                  <div className="shrink-0 w-8 h-8 flex items-center justify-center border border-border group-hover:border-primary group-hover:bg-primary transition-all duration-200">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5 group-hover:text-primary-foreground transition-colors duration-200">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-base uppercase tracking-tight group-hover:text-primary transition-colors duration-200 mb-1">{talk.title}</p>
                    <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-1">{talk.venue}</p>
                    <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">{talk.description}</p>
                  </div>
                  <span className="hidden md:block text-muted-foreground group-hover:text-primary transition-colors duration-200 shrink-0">↗</span>
                </a>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </div>

      {/* ── Full tech stack visual ───────────────────────── */}
      <div className="mx-auto max-w-5xl xl:max-w-6xl 2xl:max-w-7xl 3xl:max-w-[1440px] px-6 sm:px-12 pb-16 sm:pb-20 border-t border-border pt-12">
        <FadeUp>
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-muted-foreground mb-8">Full Stack</p>
        </FadeUp>
        <AboutTechStack />
      </div>

      {/* ── Awards & recognition ─────────────────────────── */}
      <div className="border-t border-border">
        <div className="mx-auto max-w-5xl xl:max-w-6xl 2xl:max-w-7xl 3xl:max-w-[1440px] px-6 sm:px-12 py-12 sm:py-16">
          <FadeUp>
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-muted-foreground mb-8">Recognition</p>
          </FadeUp>
          <StaggerContainer className="space-y-0">
            {[
              { label: 'Best Team Lead of the Year', meta: '2021 · SoluLab' },
              { label: 'Best Team Lead of the Year', meta: '2022 · SoluLab (consecutive)' },
              { label: 'MTech Gold Medalist', meta: 'Ranked 4th in University' },
              { label: 'Built & scaled blockchain team', meta: '10 → 50+ engineers at SoluLab' },
              { label: 'Led architecture', meta: '15+ live production blockchain platforms simultaneously' },
            ].map((item) => (
              <StaggerItem key={item.label + item.meta}>
                <div className="flex items-start justify-between gap-4 py-4 border-b border-border last:border-0">
                  <span className="font-semibold text-sm uppercase tracking-tight">{item.label}</span>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground shrink-0 text-right">{item.meta}</span>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </div>
    </>
  )
}
