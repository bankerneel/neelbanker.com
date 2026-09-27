import type { Metadata } from 'next'
import Link from 'next/link'
import { MotionStage } from '@/components/motion/motion-stage'
import { FilmProgress, Scribbled } from '@/components/motion/scribbled'
import { AboutTechStack } from '@/components/about-tech-stack'
import { PageIntro } from '@/components/bazaar/page-intro'
import { Scrap } from '@/components/bazaar/scrap'
import { Band } from '@/components/bazaar/band'
import { chipLink, focusRing, pick, softTilts, tilts, tones } from '@/components/bazaar/styles'
import { cn } from '@/lib/utils'

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
  { label: 'Email', value: 'neelhbanker@gmail.com', href: 'mailto:neelhbanker@gmail.com', tone: 'tone-butter' },
  { label: 'Location', value: 'Ahmedabad, Gujarat, India', tone: 'tone-sage' },
  { label: 'Open to', value: 'Global architecture leadership roles and long-term advisory work', tone: 'tone-sky' },
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
    label: 'Team building',
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

const stats = [
  { value: '7+', label: 'years in production', tone: 'tone-terra' },
  { value: '50+', label: 'engineers led', tone: 'tone-sage' },
  { value: '15+', label: 'live platforms', tone: 'tone-sky' },
]

const sectionTitle = 'text-[clamp(2rem,5vw,3.4rem)] font-black uppercase leading-none tracking-tighter'

export default function AboutPage() {
  return (
    <>
      <FilmProgress />
      <PageIntro
        motion
        crumbs={[
          { href: '/', label: '← Home' },
          { href: '/work-with-me', label: 'Work with me' },
        ]}
        kicker="Distributed systems & blockchain architect ✦"
        title={
          <>
            About <span className="max-outline">Neel</span>
          </>
        }
      >
        <div className="relative z-10 mt-10 flex flex-col gap-10 lg:mt-12 lg:flex-row lg:items-start">
          <Scrap className="w-full max-w-[540px] -rotate-[1.2deg]" paperClassName="tone-panel px-7 py-9 sm:px-9">
            <p className="text-[1.06rem] font-medium leading-[1.7]">
              7+ years designing custody infrastructure, cross-chain systems, and AI-augmented engineering workflows at
              the intersection of blockchain and product.
            </p>
            <p className="mt-4 text-[15px] leading-[1.7] text-dm-ink-soft">
              I work at the overlap of distributed systems, blockchain infrastructure, AI-assisted engineering, and
              technical leadership. Most of the time that means helping teams make better decisions while delivery is
              already in motion.
            </p>
            <p className="hand mt-4 text-[1.5rem] leading-none text-dm-accent-ink">— Ahmedabad, India</p>
          </Scrap>

          <div className="hook-deal-any flex items-start pl-1 lg:-ml-8 lg:mt-6">
            <div className="relative z-30 w-[136px] -rotate-6 bg-dm-panel p-2.5 pb-3 shadow-hard-lg sm:w-[172px] sm:p-3">
              <div className="tone-lilac relative h-[124px] overflow-hidden sm:h-[156px]">
                {/* A pre-sized 320px WebP (6.7 KB) as a plain img: next/image's client JS
                    (~6 KB gz) would outweigh what it saves on one small photo. */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/neel-banker.webp"
                  alt="Neel Banker"
                  width={320}
                  height={320}
                  decoding="async"
                  className="absolute inset-0 size-full object-cover object-[50%_28%]"
                />
              </div>
              <p className="hand mt-1.5 text-center text-[1.1rem] leading-tight text-dm-ink">hi, I&apos;m Neel</p>
            </div>
            {stats.map((s, i) => (
              <div
                key={s.label}
                className={cn(
                  'relative -ml-4 hidden w-[118px] bg-dm-panel p-2.5 pb-3 shadow-hard sm:block',
                  ['rotate-[5deg]', '-rotate-3', 'rotate-[4deg]'][i],
                )}
                style={{ zIndex: 20 - i, marginTop: `${18 + i * 16}px` }}
              >
                <div className={cn('flex h-[82px] items-center justify-center', s.tone)}>
                  <span className="text-[1.9rem] font-black leading-none">{s.value}</span>
                </div>
                <p className="hand mt-1.5 text-center text-[1.02rem] leading-tight text-dm-ink">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* stats as tickets on phones, where three more polaroids won't fit */}
        <ul className="mt-8 flex flex-wrap gap-2.5 sm:hidden">
          {stats.map((s, i) => (
            <li key={s.label} className={cn('ticket', s.tone, pick(tilts, i))}>
              {s.value} {s.label}
            </li>
          ))}
        </ul>
      </PageIntro>

      {/* ── The long version ─────────────────────────────────────────── */}
      <section aria-labelledby="long-version" className="page-wrap mt-24" data-sky-window>
        <h2 id="long-version" data-sd className={cn(sectionTitle, 'sd-slam')}>
          The long <Scribbled>version</Scribbled>
        </h2>
        <div className="mt-10 grid gap-12 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-14">
          <Scrap tall tape paperClassName="tone-panel px-6 pb-12 pt-14 sm:px-12 sm:pb-16 sm:pt-16">
            <div className="prose prose-lg prose-bazaar max-w-none">
              <p>
                For the past 7+ years, I&apos;ve been deep in production environments across Web3 infrastructure, custody
                platforms, cross-chain integrations, and payments. Much of my work involves working with founders and
                product leaders early on to determine what needs to be built, then shaping it into something that
                won&apos;t fall apart at scale.
              </p>
              <p>
                More recently, I&apos;ve been spending significant time exploring AI-augmented engineering — not in a
                hype-driven way, but in a practical &ldquo;how do teams ship faster without creating long-term mess&rdquo;
                sense. I experiment with multi-model workflows, vector databases, and system design patterns that improve
                both delivery speed and architectural clarity.
              </p>
              <p>
                I also care a lot about the environment teams work in. Mentoring engineers, tightening delivery
                frameworks, defining security expectations, and keeping technical direction aligned with business goals
                are big parts of what I do day-to-day.
              </p>
              <p>
                In earlier roles, I led blockchain engineering teams of 50+ people and worked closely with startup
                founders and enterprise stakeholders as a technical sounding board when decisions really mattered.
              </p>

              <h2>
                <span className="marker">Interests</span>
              </h2>
              <ul>
                <li>Distributed platform architecture</li>
                <li>AI-driven product engineering</li>
                <li>Payments, custody, and financial infrastructure</li>
                <li>Scaling engineering organizations</li>
                <li>Founder and CTO advisory</li>
              </ul>
              <p>Open to global architecture leadership roles, CTO-track paths, and meaningful long-term collaborations.</p>

              <h2>
                <span className="marker">Beyond work</span>
              </h2>
              <p>
                I designed, developed, and host the website for{' '}
                <a href="https://hindustanecolife.com" target="_blank" rel="noopener noreferrer">
                  Hindustan Ecolife
                </a>
                , a nature and eco product business run by my uncle, who is the company&apos;s director. It keeps me close
                to the full product stack: not just the backend, but the customer experience end to end.
              </p>

              <h2>
                <span className="marker">Writing</span>
              </h2>
              <p>
                I write <em>The Architect&apos;s Brief</em> — a weekly newsletter covering blockchain architecture, AI ×
                Web3, and engineering leadership. If you build distributed systems or lead technical teams, it&apos;s for
                you.
              </p>
            </div>
          </Scrap>

          <aside aria-label="Contact details" className="flex flex-col gap-6 lg:sticky lg:top-8 lg:self-start">
            <dl className="flex flex-col gap-5">
              {contactFacts.map((fact, i) => (
                <div
                  key={fact.label}
                  className={cn('border-2 border-current px-5 py-4 shadow-hard', fact.tone, i % 2 ? 'rotate-[1.2deg]' : '-rotate-1')}
                >
                  <dt className="text-[10px] font-bold uppercase tracking-[0.2em]">{fact.label}</dt>
                  <dd className="mt-1 break-words text-[15px] font-semibold leading-[1.5]">
                    {fact.href ? (
                      <a href={fact.href} className={cn('underline decoration-2 underline-offset-4', focusRing)}>
                        {fact.value}
                      </a>
                    ) : (
                      fact.value
                    )}
                  </dd>
                </div>
              ))}
            </dl>
            <div className="flex flex-wrap gap-3">
              <Link href="/resume" className={cn(chipLink, 'tone-ink -rotate-1')}>
                Resume →
              </Link>
              <Link href="/newsletter" className={cn(chipLink, 'tone-panel rotate-1')}>
                The Brief →
              </Link>
            </div>
          </aside>
        </div>
      </section>

      {/* ── Experience ───────────────────────────────────────────────── */}
      <Band tone="night" edge="torn" pattern="stars" spotlight className="mt-24 sm:mt-28">
      <section aria-labelledby="experience" className="page-wrap py-24 sm:py-28">
        <h2 id="experience" data-sd className={cn(sectionTitle, 'sd-slam')}>
          Where I&apos;ve <Scribbled>worked</Scribbled>
        </h2>
        <ol className="mt-10 space-y-12">
          {experience.map((exp, i) => (
            <li key={exp.company} data-reveal className="rv-rise">
                <Scrap
                  className={i % 2 ? 'rotate-[0.5deg]' : '-rotate-[0.5deg]'}
                  paperClassName="tone-panel grid gap-6 px-7 py-10 sm:px-10 md:grid-cols-[220px_minmax(0,1fr)] md:gap-10"
                >
                  <div className="flex flex-wrap items-start gap-2.5 md:flex-col">
                    <span className={cn('ticket', pick(tones, i + 1), '-rotate-2')}>{exp.period}</span>
                    <span className="hand text-[1.4rem] leading-none text-dm-accent-ink">{exp.duration}</span>
                  </div>
                  <div>
                    <h3 className="text-[1.6rem] font-black uppercase leading-none tracking-tight">{exp.company}</h3>
                    <p className="mt-2 text-[12px] font-bold uppercase tracking-[0.14em] text-dm-ink-soft">{exp.role}</p>
                    <p className="mt-5 max-w-3xl text-[15px] leading-[1.8]">{exp.detail}</p>
                    <ul className="mt-5 space-y-2">
                      {exp.contributions.map((c) => (
                        <li key={c} className="flex items-start gap-2.5 text-[15px] leading-[1.6]">
                          <span aria-hidden="true" className="text-dm-accent-ink">✦</span>
                          <span>{c}</span>
                        </li>
                      ))}
                    </ul>
                    {exp.awards && (
                      <ul className="mt-6 flex flex-wrap gap-2.5">
                        {exp.awards.map((a, ai) => (
                          <li key={a} className={cn('ticket tone-butter shadow-hard', pick(tilts, ai))}>
                            ★ {a}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </Scrap>
            </li>
          ))}
        </ol>
      </section>
      </Band>

      {/* ── Recognition ──────────────────────────────────────────────── */}
      <Band tone="butter" edge="zig">
      <section aria-labelledby="recognition" className="page-wrap py-24 sm:py-28">
        <div className="max-w-3xl">
          <h2 id="recognition" data-sd className={cn(sectionTitle, 'sd-slam')}>
            Signals of <Scribbled>trust</Scribbled>
          </h2>
          <p className="mt-4 text-[15px] leading-[1.75]">
            A few selected proof points that show the range of the work: leadership, academic rigor, and delivery across
            high-stakes systems.
          </p>
        </div>
        <ul className="mt-10 grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
          {recognition.map((item, i) => (
            <li
              key={item.title + item.meta}
              data-reveal
              className={cn('rv-stamp flex flex-col border-2 border-current p-6 shadow-hard', pick(tones, i), pick(softTilts, i))}
            >
              <span className="ticket w-fit">{item.label}</span>
              <h3 className="mt-4 text-[1.2rem] font-black uppercase leading-[1.1] tracking-tight">{item.title}</h3>
              <p className="mt-1.5 text-[12px] font-bold uppercase tracking-[0.12em]">{item.meta}</p>
              <p className="mt-3 text-[15px] font-medium leading-[1.65]">{item.detail}</p>
            </li>
          ))}
          <li data-reveal className="rv-stamp tone-panel flex flex-col justify-center border-2 border-dashed border-current p-6 rotate-[0.6deg]">
            <p className="hand text-[1.7rem] leading-tight text-dm-accent-ink">Academic grounding</p>
            <p className="mt-2 text-[15px] leading-[1.65]">
              <strong>MTech, Information Technology</strong> — review work on{' '}
              <em>Blockchain &amp; Web3 in Carbon Credits</em>. Patent searching, research skills, and a habit of grounding
              technical decisions in trade-offs rather than trend-driven claims.
            </p>
          </li>
        </ul>
      </section>
      </Band>

      {/* ── Capability map ───────────────────────────────────────────── */}
      <Band tone="sky" edge="scallop" bottomEdge="torn" pattern="blueprint">
      <section aria-labelledby="capabilities" className="page-wrap py-24 sm:py-28">
        <div className="max-w-3xl">
          <h2 id="capabilities" data-sd className={cn(sectionTitle, 'sd-slam')}>
            Capability <Scribbled>map</Scribbled>
          </h2>
          <p className="mt-4 text-[15px] leading-[1.75]">
            The work spans protocol architecture, custody systems, backend delivery, cloud operations, and AI-assisted
            engineering — grouped so it shows breadth without turning into a resume wall.
          </p>
        </div>
        <div className="mt-8">
          <AboutTechStack />
        </div>
      </section>
      </Band>

      {/* ── Speaking ─────────────────────────────────────────────────── */}
      <section aria-labelledby="talks" className="page-wrap mt-24 sm:mt-28" data-sky-window>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 id="talks" data-sd className={cn(sectionTitle, 'sd-slam')}>
            On <Scribbled>stage</Scribbled>
          </h2>
          <Link href="/speaking" className={cn(chipLink, 'tone-panel rotate-1')}>
            All talks →
          </Link>
        </div>
        <ul className="mt-10 grid gap-8 md:grid-cols-3">
          {talks.map((talk, i) => (
            <li key={talk.title} data-reveal className="rv-pin">
              <a
                href={talk.youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  'group block h-full cursor-pointer transition-[rotate] duration-200 hover:rotate-0',
                  pick(softTilts, i + 1),
                  focusRing,
                )}
              >
                <div className="tone-panel flex h-full flex-col border-2 border-current p-3 pb-5 shadow-hard">
                  <div className={cn('flex h-28 items-center justify-center', pick(tones, i + 2))}>
                    <span className="flex size-12 items-center justify-center rounded-full border-2 border-current bg-dm-panel text-dm-ink transition-[scale] duration-200 group-hover:scale-110">
                      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="ml-0.5 size-5">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </span>
                  </div>
                  <div className="px-2 pt-4">
                    <p className="text-[1.05rem] font-black uppercase leading-[1.15] tracking-tight transition-colors duration-200 group-hover:text-dm-accent-ink">
                      {talk.title} <span aria-hidden="true">↗</span>
                    </p>
                    <p className="mt-1.5 text-[11px] font-bold uppercase tracking-[0.12em] text-dm-ink-soft">{talk.venue}</p>
                    <p className="mt-2 line-clamp-3 text-sm leading-[1.6] text-dm-ink-soft">{talk.description}</p>
                  </div>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </section>
      <MotionStage />
    </>
  )
}
