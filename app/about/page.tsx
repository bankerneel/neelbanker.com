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

const contactFacts = [
  { label: 'Email', value: 'neelhbanker@gmail.com' },
  { label: 'Location', value: 'Ahmedabad, Gujarat, India' },
  { label: 'Open To', value: 'Global architecture leadership roles and long-term advisory work' },
]

const recognition = [
  {
    label: 'Leadership',
    title: 'Best Team Lead of the Year',
    meta: '2021 · SoluLab',
    detail: 'Recognized for delivery leadership, team mentoring, and execution quality across blockchain programs.',
  },
  {
    label: 'Leadership',
    title: 'Best Team Lead of the Year',
    meta: '2022 · SoluLab (consecutive)',
    detail: 'Repeated recognition for maintaining standards while scaling technical ownership and team execution.',
  },
  {
    label: 'Academic',
    title: 'MTech Gold Medalist',
    meta: 'Ranked 4th in University',
    detail: 'Academic recognition grounded in systems thinking, research discipline, and technical depth.',
  },
  {
    label: 'Team Building',
    title: 'Scaled blockchain engineering org',
    meta: '10 → 50+ engineers at SoluLab',
    detail: 'Expanded the delivery organization while keeping architecture, mentoring, and execution aligned.',
  },
  {
    label: 'Delivery',
    title: 'Led architecture across live platforms',
    meta: '15+ production systems in parallel',
    detail: 'Oversaw multiple high-stakes platforms across custody, L2, and Web3 infrastructure delivery.',
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
            <h1 className="font-bold text-4xl sm:text-5xl md:text-6xl uppercase tracking-tighter leading-[0.9] mb-6">
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
      <div className="mx-auto max-w-3xl xl:max-w-4xl px-6 sm:px-12 py-12 sm:py-16">
        <FadeUp>
          <div className="mb-10 border-l border-primary pl-5">
            <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.22em] text-primary">Summary</p>
            <p className="text-sm leading-[1.9] text-muted-foreground">
              I work at the overlap of distributed systems, blockchain infrastructure, AI-assisted engineering, and technical leadership. Most of the time that means helping teams make better decisions while delivery is already in motion.
            </p>
          </div>
        </FadeUp>

        <FadeUp>
          <div className="prose prose-invert prose-zinc prose-headings:font-bold prose-headings:tracking-tight prose-p:leading-[1.85] prose-li:leading-[1.8] max-w-none">
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
              I designed, developed, and host the website for <a href="https://hindustanecolife.com" target="_blank" rel="noopener noreferrer">Hindustan Ecolife</a>, a
              nature and eco product business run by my uncle, who is the company&apos;s director. It keeps me close to the full
              product stack: not just the backend, but the customer experience end to end.
            </p>

            <h2>Writing</h2>
            <p>
              I write <em>The Architect&apos;s Brief</em> — a weekly newsletter covering blockchain architecture, AI × Web3, and
              engineering leadership. If you build distributed systems or lead technical teams, it&apos;s for you.
            </p>
          </div>
        </FadeUp>

        <FadeUp delay={0.1}>
          <div className="mt-10 grid gap-px bg-border">
            {contactFacts.map((fact) => (
              <div key={fact.label} className="bg-background px-5 py-4">
                <p className="mb-1 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">{fact.label}</p>
                <p className="text-sm leading-[1.7] text-foreground">{fact.value}</p>
              </div>
            ))}
          </div>
        </FadeUp>
      </div>

      {/* ── Work Experience ──────────────────────────────── */}
      <div className="border-t border-border">
        <div className="mx-auto max-w-5xl xl:max-w-6xl 2xl:max-w-7xl 3xl:max-w-[1440px] px-6 sm:px-12 py-12 sm:py-16">
          <FadeUp>
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-muted-foreground mb-10">Work Experience</p>
          </FadeUp>

          <div className="space-y-14">
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
                    <h3 className="font-bold text-xl uppercase tracking-tight mb-1">{exp.company}</h3>
                    <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-4">{exp.role}</p>
                    <p className="text-sm text-muted-foreground leading-[1.8] mb-5 max-w-3xl">{exp.detail}</p>
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
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <FadeUp>
              <div>
                <p className="mb-4 font-mono text-xs uppercase tracking-[0.22em] text-muted-foreground">Education</p>
                <h2 className="mb-3 font-bold text-2xl uppercase tracking-tight">Academic grounding</h2>
                <p className="text-sm leading-[1.8] text-muted-foreground">
                  Formal training in information technology, backed by research work and a strong bias toward systems thinking.
                </p>
              </div>
            </FadeUp>
            <FadeUp delay={0.1}>
              <div className="grid gap-px bg-border">
                <div className="bg-background p-6">
                  <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.22em] text-primary">Master of Technology</p>
                  <p className="mb-2 font-bold text-lg uppercase tracking-tight">Information Technology</p>
                  <p className="text-sm leading-[1.8] text-muted-foreground">
                    Gold Medalist, ranked 4th in the university, with review work on <em>Blockchain &amp; Web3 in Carbon Credits</em>.
                  </p>
                </div>
                <div className="bg-background p-6">
                  <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">Research and skills</p>
                  <p className="text-sm leading-[1.8] text-muted-foreground">
                    Patent searching, research skills, and a habit of grounding technical decisions in underlying trade-offs rather than trend-driven claims.
                  </p>
                </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </div>

      {/* ── Speaking ─────────────────────────────────────── */}
      <div className="border-t border-border">
        <div className="mx-auto max-w-5xl xl:max-w-6xl 2xl:max-w-7xl 3xl:max-w-[1440px] px-6 sm:px-12 py-12 sm:py-16">
          <FadeUp>
            <div className="flex items-end justify-between mb-8">
              <p className="font-mono text-xs uppercase tracking-[0.22em] text-muted-foreground">Speaking</p>
              <Link href="/speaking" className="font-mono text-xs uppercase text-primary hover:underline underline-offset-8 transition-colors">
                All talks →
              </Link>
            </div>
          </FadeUp>
          <StaggerContainer className="grid gap-px bg-border">
            {talks.map((talk) => (
              <StaggerItem key={talk.title}>
                <a
                  href={talk.youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex cursor-pointer flex-col gap-3 bg-background p-6 transition-colors duration-200 hover:bg-muted/40 md:flex-row md:items-center md:gap-8"
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
      <div className="border-t border-border">
        <div className="mx-auto max-w-5xl xl:max-w-6xl 2xl:max-w-7xl 3xl:max-w-[1440px] px-6 sm:px-12 py-12 sm:py-16">
          <FadeUp>
            <div className="mb-8 grid gap-4 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
              <div>
                <p className="mb-4 font-mono text-xs uppercase tracking-[0.22em] text-muted-foreground">Capability Map</p>
                <h2 className="font-semibold text-2xl uppercase tracking-tight sm:text-3xl">
                  Systems, stacks, and delivery muscle
                </h2>
              </div>
              <p className="max-w-2xl text-sm leading-[1.8] text-muted-foreground">
                The work spans protocol architecture, custody systems, backend delivery, cloud operations, and AI-assisted engineering.
                This map is meant to show breadth without turning the page into a resume wall.
              </p>
            </div>
          </FadeUp>
        <AboutTechStack />
        </div>
      </div>

      {/* ── Awards & recognition ─────────────────────────── */}
      <div className="border-t border-border">
        <div className="mx-auto max-w-5xl xl:max-w-6xl 2xl:max-w-7xl 3xl:max-w-[1440px] px-6 sm:px-12 py-12 sm:py-16">
          <FadeUp>
            <div className="mb-8 grid gap-4 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
              <div>
                <p className="mb-4 font-mono text-xs uppercase tracking-[0.22em] text-muted-foreground">Recognition</p>
                <h2 className="font-semibold text-2xl uppercase tracking-tight sm:text-3xl">
                  Signals of trust and delivery range
                </h2>
              </div>
              <div className="space-y-4">
                <p className="max-w-2xl text-sm leading-[1.8] text-muted-foreground">
                  A few selected proof points that show the range of the work: leadership, academic rigor, and delivery across high-stakes systems.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="inline-flex min-h-11 items-center border border-border px-3 py-2 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                    5 selected recognition points
                  </span>
                  <span className="inline-flex min-h-11 items-center border border-border px-3 py-2 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                    Leadership + delivery + research
                  </span>
                </div>
              </div>
            </div>
          </FadeUp>
          <StaggerContainer className="grid gap-4 md:grid-cols-2">
            {recognition.map((item) => (
              <StaggerItem key={item.title + item.meta}>
                <div className="group relative flex h-full flex-col justify-between gap-6 border border-border bg-background px-5 py-5 transition-colors duration-200 hover:border-primary/30 sm:px-6 sm:py-6">
                  <div className="absolute left-0 top-0 h-full w-[3px] bg-primary/70 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
                  <div className="space-y-4">
                    <div className="flex items-start justify-between gap-4">
                      <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-primary">{item.label}</p>
                      <span className="shrink-0 border border-border px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground text-right transition-colors duration-200 group-hover:border-primary/40">
                        {item.meta}
                      </span>
                    </div>
                    <div className="space-y-3">
                      <h3 className="max-w-sm font-semibold text-base uppercase tracking-tight text-foreground">
                        {item.title}
                      </h3>
                      <p className="max-w-xl text-sm leading-[1.8] text-muted-foreground">{item.detail}</p>
                    </div>
                  </div>
                  <div className="border-t border-dashed border-border pt-4">
                    <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                      Selected proof point
                    </p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </div>
    </>
  )
}
