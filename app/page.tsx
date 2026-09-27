import Link from 'next/link'
import { getAllArticleMeta, getAllProjectMeta, getAllResourceMeta } from '@/lib/mdx'
import { ServiceCard } from '@/components/service-card'
import { ProjectCard } from '@/components/project-card'
import { PILLARS, getPillarBySlug } from '@/lib/pillars'
import { HomeHero } from '@/components/home-hero'
import { FadeUp } from '@/components/scroll-reveal'
import { Scrap } from '@/components/bazaar/scrap'
import { chipLink, focusRing, pick, tilts } from '@/components/bazaar/styles'
import { cn } from '@/lib/utils'

const services = [
  {
    title: '1:1 Strategy Call',
    description: '45-min focused session on your architecture, stack decisions, or team challenges.',
    meta: '45 min / remote',
  },
  {
    title: 'Smart Contract Audit',
    description: 'Security + logic review with written report and 60-min debrief.',
    meta: '2–4 weeks / project',
  },
  {
    title: 'Architecture Review',
    description: 'Deep review of your blockchain or backend stack with written recommendations.',
    meta: '1 week / async',
  },
  {
    title: 'Fractional CTO',
    description: 'Monthly retainer with weekly calls, async Slack access, and architecture decisions.',
    meta: 'Retainer / monthly',
  },
]

// Only facts already stated on /about and /resume.
const receipts = [
  { label: 'Now', title: 'Principal blockchain architect', detail: 'Tech Alchemy · 2024 – present', tone: 'tone-butter' },
  { label: 'Before', title: 'Team lead → engineering lead', detail: 'SoluLab · 2019 – 2024 · grew the team 10 → 50+', tone: 'tone-sage' },
  { label: 'Recognition', title: 'Best Team Lead of the Year', detail: 'SoluLab · 2021 and 2022, back to back', tone: 'tone-rose' },
  { label: 'On stage', title: 'GDG Ahmedabad · ICAI CoE', detail: 'Talks on NFTs, blockchain fundamentals, Docker', tone: 'tone-sky' },
]

const principles = [
  'Translate rough product ambition into systems that scale',
  'Bring security, delivery discipline, and architecture back into alignment',
  'Use AI tactically to improve execution quality, not to replace thinking',
]

const sectionTitle = 'text-[clamp(2rem,6vw,4rem)] font-black uppercase leading-none tracking-tighter'
const handWord = 'hand text-[1.15em] font-normal lowercase text-dm-accent-ink'
const noteTilts = ['-rotate-[2.4deg]', 'rotate-[1.6deg]', '-rotate-[1.2deg]']
const noteTones = ['tone-butter', 'tone-panel', 'tone-rose']

export default function HomePage() {
  const articles = getAllArticleMeta().slice(0, 3)
  const projects = getAllProjectMeta()
  const featuredResource = getAllResourceMeta()[0]
  const [spotlight, ...featuredProjects] = ['doctrace-fabric-documents', 'atlas-multichain-wallet', 'ember-op-stack-l2', 'staywise-hotel-recommendations']
    .map((slug) => projects.find((project) => project.slug === slug))
    .filter((project): project is NonNullable<typeof project> => Boolean(project))

  return (
    <>
      <HomeHero />

      {/* ── Receipts — proof near the fold ─────────────────────────── */}
      <section aria-labelledby="receipts" className="page-wrap mt-20 sm:mt-24">
        <h2 id="receipts" className="hand -rotate-2 text-[1.9rem] leading-none text-dm-accent-ink sm:text-[2.2rem]">
          receipts, not adjectives
        </h2>
        <ul className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {receipts.map((r, i) => (
            <li
              key={r.title}
              className={cn('flex flex-col border-2 border-current p-5 shadow-hard', r.tone, pick(tilts, i))}
            >
              <span className="text-[10px] font-bold uppercase tracking-[0.2em]">{r.label}</span>
              <span className="mt-2 text-[1.1rem] font-black uppercase leading-[1.1] tracking-tight">{r.title}</span>
              <span className="mt-1.5 text-[13px] font-semibold leading-[1.45]">{r.detail}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* ── Work — an arch portal around the lead case study ──────── */}
      {spotlight && (
        <section aria-labelledby="selected-work" className="page-wrap mt-24 sm:mt-28">
          <FadeUp>
            <div className="surreal-arch dm-longshadow tone-lilac px-4 pb-12 pt-24 min-[360px]:px-7 sm:px-12 sm:pt-20">
              <p className="text-center text-[11px] font-bold uppercase tracking-[0.24em]">Selected work ✦</p>
              <h2 id="selected-work" className="mx-auto mt-4 max-w-2xl text-center text-[clamp(1.5rem,3.6vw,2.4rem)] font-black uppercase leading-[1.1]">
                {spotlight.title}
              </h2>
              {spotlight.role && (
                <p className="mt-3 text-center text-[12px] font-semibold leading-[1.45]">
                  <span className="font-black uppercase tracking-[0.08em]">{spotlight.employer}</span> · {spotlight.role}
                </p>
              )}
              <p className="mx-auto mt-5 max-w-xl text-center text-[15px] font-medium leading-[1.75]">{spotlight.excerpt}</p>
              <dl className="mx-auto mt-8 grid max-w-xl grid-cols-2 gap-5 sm:grid-cols-3">
                <div className="text-center">
                  <dt className="text-[10px] font-bold uppercase tracking-[0.16em]">Year</dt>
                  <dd className="hand mt-1 text-[1.4rem] leading-none">{new Date(spotlight.date).getFullYear()}</dd>
                </div>
                {spotlight.chain && (
                  <div className="text-center">
                    <dt className="text-[10px] font-bold uppercase tracking-[0.16em]">Chains</dt>
                    <dd className="hand mt-1 text-[1.4rem] leading-none">{spotlight.chain}</dd>
                  </div>
                )}
                <div className="col-span-2 text-center sm:col-span-1">
                  <dt className="text-[10px] font-bold uppercase tracking-[0.16em]">Stack</dt>
                  <dd className="hand mt-1 text-[1.4rem] leading-none">{spotlight.stack.slice(0, 3).join(' · ')}</dd>
                </div>
              </dl>
              {spotlight.outcome.length > 0 && (
                <ul aria-label="What shipped" className="mx-auto mt-8 flex max-w-3xl flex-wrap justify-center gap-2.5">
                  {spotlight.outcome.slice(0, 3).map((item) => (
                    <li key={item} className="ticket tone-panel text-[12.5px] font-semibold normal-case tracking-normal">
                      ✓ {item}
                    </li>
                  ))}
                </ul>
              )}

              <ul className="mt-12 grid gap-8 md:grid-cols-3">
                {featuredProjects.map((project, i) => (
                  <li key={project.slug} className="min-w-0">
                    <ProjectCard project={project} featured index={i + 1} />
                  </li>
                ))}
              </ul>
              <div className="mt-10 flex flex-wrap justify-center gap-4">
                <Link href="/projects" className={cn(chipLink, 'tone-ink min-h-11 px-6 shadow-hard -rotate-1')}>
                  Browse all projects →
                </Link>
                {spotlight.caseStudy && (
                  <a
                    href={spotlight.caseStudy}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(chipLink, 'tone-panel min-h-11 px-6 rotate-1')}
                  >
                    {spotlight.title.split(' — ')[0]} case study ↗
                  </a>
                )}
              </div>
            </div>
          </FadeUp>
        </section>
      )}

      {/* ── From the notebook — pinned at angles, overlapping ──────── */}
      <section aria-labelledby="notebook" className="page-wrap mt-24 sm:mt-28">
        <FadeUp>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 id="notebook" className={sectionTitle}>
              From the <span className={handWord}>notebook</span>
            </h2>
            <Link href="/writing" className={cn(chipLink, 'tone-panel rotate-1')}>
              All articles →
            </Link>
          </div>
          <div className="mt-10 flex flex-col gap-10 lg:flex-row lg:justify-center">
            {articles.map((a, i) => (
              <Link
                key={a.slug}
                href={`/writing/${a.slug}`}
                className={cn(
                  'group relative block w-full cursor-pointer transition-[rotate] duration-200 hover:rotate-0 lg:max-w-[400px]',
                  noteTilts[i],
                  i > 0 && 'lg:-ml-8',
                  focusRing,
                )}
                style={{ zIndex: 10 + i }}
              >
                <Scrap className={cn(i === 1 && 'lg:mt-7', i === 2 && 'lg:mt-14')} paperClassName={cn(noteTones[i], 'px-6 py-8')}>
                  <span className="ticket">
                    {a.draft ? 'Draft' : `${getPillarBySlug(a.pillar)?.short} · ${a.readingTime} min`}
                  </span>
                  <h3 className="mt-4 text-[1.15rem] font-black uppercase leading-tight tracking-tight">{a.title}</h3>
                  <p className="mt-2 text-[14px] font-medium leading-[1.65]">{a.excerpt}</p>
                </Scrap>
              </Link>
            ))}
          </div>
        </FadeUp>
      </section>

      {/* ── Focus areas ────────────────────────────────────────────── */}
      <section aria-labelledby="focus" className="page-wrap mt-24 sm:mt-28">
        <FadeUp>
          <h2 id="focus" className={sectionTitle}>
            Three recurring <span className={handWord}>themes</span>
          </h2>
          <div className="mt-10 flex flex-col gap-10 lg:flex-row lg:items-start">
            {PILLARS.map((p, i) => (
              <Link
                key={p.slug}
                href={`/writing?pillar=${p.slug}`}
                className={cn(
                  'group relative block w-full cursor-pointer transition-[rotate] duration-200 hover:rotate-0 lg:flex-1',
                  ['-rotate-[1.4deg]', 'rotate-[1.2deg] lg:-ml-6 lg:mt-10', '-rotate-[0.8deg] lg:-ml-6 lg:mt-3'][i],
                  focusRing,
                )}
              >
                <Scrap paperClassName={cn(p.toneClass, 'px-7 py-9')}>
                  <div className="flex items-start justify-between">
                    <span className="ticket">Focus 0{i + 1}</span>
                    <span aria-hidden="true" className="text-2xl font-black transition-[translate] duration-200 group-hover:translate-x-1">
                      →
                    </span>
                  </div>
                  <h3 className="mt-5 text-[1.5rem] font-black uppercase leading-[1.05] tracking-tight">{p.label}</h3>
                  <p className="hand mt-2 text-[1.3rem] leading-none">read the pillar</p>
                </Scrap>
              </Link>
            ))}
          </div>
        </FadeUp>
      </section>

      {/* ── Hiring lane ─────────────────────────────────────────────── */}
      <section aria-labelledby="hiring" className="page-wrap mt-24 sm:mt-28">
        <FadeUp>
          <div className="tone-panel mx-auto flex max-w-4xl -rotate-[0.6deg] flex-col gap-6 border-2 border-dashed border-current px-7 py-9 sm:px-10 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-xl">
              <span className="ticket tone-terra -rotate-2">For recruiters</span>
              <h2 id="hiring" className="mt-4 text-[clamp(1.4rem,3vw,1.9rem)] font-black uppercase leading-[1.08] tracking-tight">
                Hiring for principal architecture or a <span className="hand text-[1.2em] font-normal normal-case text-dm-accent-ink">CTO-track</span> role?
              </h2>
              <p className="mt-3 text-[15px] leading-[1.7] text-dm-ink-soft">
                Open to global leadership roles in blockchain, AI and distributed systems — full-time or long-term strategic
                scope. This site is the live resume.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 lg:flex-col lg:items-stretch">
              <Link href="/resume" className={cn(chipLink, 'tone-ink min-h-11 justify-center px-5 shadow-hard')}>
                Resume →
              </Link>
              <Link href="/work-with-me#recruiters" className={cn(chipLink, 'tone-panel min-h-11 justify-center px-5')}>
                The recruiter lane →
              </Link>
              <a
                href="https://linkedin.com/in/neelbanker"
                target="_blank"
                rel="noopener noreferrer"
                className={cn(chipLink, 'tone-sky min-h-11 justify-center px-5')}
              >
                LinkedIn ↗
              </a>
            </div>
          </div>
        </FadeUp>
      </section>

      {/* ── How I work + free resource ─────────────────────────────── */}
      <section aria-labelledby="how-i-work" className="page-wrap mt-24 sm:mt-28">
        <FadeUp>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 id="how-i-work" className={sectionTitle}>
              How I <span className={handWord}>work</span>
            </h2>
            <Link href="/about" className={cn(chipLink, 'tone-panel -rotate-1')}>
              More context →
            </Link>
          </div>
          <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-12">
            <Scrap className="-rotate-[0.6deg]" paperClassName="tone-panel px-7 py-10 sm:px-10">
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-dm-ink-soft">Field notes</p>
              <p className="mt-3 text-[1.08rem] font-medium leading-[1.75]">
                I usually get pulled in where systems are already under stress: mid-flight architecture changes,
                multi-team delivery drift, or wallet and custody systems with hidden edge cases that need to survive
                production.
              </p>
              <ol className="mt-6 space-y-4">
                {principles.map((item, i) => (
                  <li key={item} className="grid grid-cols-[2rem_1fr] gap-2">
                    <span aria-hidden="true" className="hand text-[1.7rem] leading-none text-dm-accent-ink">
                      {i + 1}.
                    </span>
                    <span className="text-[15px] font-semibold leading-[1.6]">{item}</span>
                  </li>
                ))}
              </ol>
            </Scrap>

            {featuredResource && (
              <div className="tone-butter flex rotate-[1.2deg] flex-col justify-between gap-6 self-start border-2 border-current p-7 shadow-hard-lg">
                <div>
                  <span className="ticket tone-panel">Free resource</span>
                  <h3 className="mt-4 text-[1.4rem] font-black uppercase leading-[1.1] tracking-tight">{featuredResource.title}</h3>
                  <p className="mt-3 text-[15px] font-medium leading-[1.7]">{featuredResource.description}</p>
                </div>
                <Link href="/resources" className={cn(chipLink, 'tone-ink min-h-11 w-fit px-6 shadow-hard')}>
                  Get it free →
                </Link>
              </div>
            )}
          </div>
        </FadeUp>
      </section>

      {/* ── Services ───────────────────────────────────────────────── */}
      <section aria-labelledby="services" className="page-wrap mt-24 sm:mt-28">
        <FadeUp>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 id="services" className={sectionTitle}>
              Work <span className={handWord}>with</span> me
            </h2>
            <Link href="/work-with-me" className={cn(chipLink, 'tone-panel rotate-1')}>
              All services →
            </Link>
          </div>
          <div className="mt-10 space-y-7">
            {services.map((s, i) => (
              <ServiceCard key={s.title} title={s.title} description={s.description} index={i} meta={s.meta} />
            ))}
          </div>
          <div className="mt-12">
            <Link href="/work-with-me" className={cn(chipLink, 'tone-terra min-h-12 px-7 text-xs shadow-hard -rotate-1')}>
              Book a strategy call →
            </Link>
          </div>
        </FadeUp>
      </section>
    </>
  )
}
