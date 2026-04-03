import Link from 'next/link'
import { getAllArticleMeta, getAllProjectMeta, getAllResourceMeta } from '@/lib/mdx'
import { ArticleCard } from '@/components/article-card'
import { ServiceCard } from '@/components/service-card'
import { ProjectCard } from '@/components/project-card'
import { PILLARS } from '@/lib/pillars'
import { HeroClient } from '@/components/hero-client'
import { FadeUp, StaggerContainer, StaggerItem } from '@/components/scroll-reveal'

const PILLAR_HOVER_BG: Record<string, string> = {
  blockchain: 'hover:bg-primary',
  ai: 'hover:bg-cyan-400',
  leadership: 'hover:bg-orange-500',
}

export default function HomePage() {
  const articles = getAllArticleMeta().slice(0, 3)
  const projects = getAllProjectMeta()
  const resources = getAllResourceMeta()
  const featuredResource = resources[0]
  const featuredProjects = [
    'cryptsync-ncw',
    'pepe-unchained-l2',
    'verionce',
    'roomquery',
  ]
    .map((slug) => projects.find((project) => project.slug === slug))
    .filter((project): project is NonNullable<typeof project> => Boolean(project))

  const services = [
    {
      title: '1:1 Strategy Call',
      description: '45-min focused session on your architecture, stack decisions, or team challenges.',
      meta: '45 MIN / REMOTE',
    },
    {
      title: 'Smart Contract Audit',
      description: 'Security + logic review with written report and 60-min debrief.',
      meta: '2–4 WEEKS / PROJECT',
    },
    {
      title: 'Architecture Review',
      description: 'Deep review of your blockchain or backend stack with written recommendations.',
      meta: '1 WEEK / ASYNC',
    },
    {
      title: 'Fractional CTO',
      description: 'Monthly retainer with weekly calls, async Slack access, and architecture decisions.',
      meta: 'RETAINER / MONTHLY',
    },
  ]

  const stats = [
    { value: '7+', label: 'Years Building' },
    { value: '50+', label: 'Engineers Led' },
    { value: '15+', label: 'Production Platforms' },
  ]

  const summaryLinks = [
    { href: '/projects', label: 'Selected case studies', detail: 'Wallets, L2, Fabric, AI systems' },
    { href: '/writing', label: 'Latest writing', detail: 'Architecture, AI workflows, leadership' },
    { href: '/speaking', label: 'Talks and sessions', detail: 'Blockchain, Docker, technical decision-making' },
  ]
  const techStack = [
    'Hyperledger Fabric', 'OP Stack / L2', 'Solidity', 'ERC-4337', 'Fireblocks NCW',
    'BitGo', 'Node.js', 'NestJS', 'Go', 'Python', 'Claude API', 'Ethereum', 'Polygon',
    'Solana', 'Base', 'Arbitrum', 'Account Abstraction', 'Docker', 'AWS EKS', 'HSM',
    '7+ Years', '50+ Engineers Led', '15+ Platforms',
  ]

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────── */}
      <HeroClient />

      {/* ── Tech marquee ─────────────────────────────────── */}
      <div className="bg-primary overflow-hidden py-4 select-none">
        <div className="flex animate-marquee whitespace-nowrap">
          {[...techStack, ...techStack].map((item, i) => (
            <span key={i} className="mx-8 font-mono text-sm font-bold uppercase tracking-widest text-primary-foreground">
              {item}
            </span>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-5xl xl:max-w-6xl 2xl:max-w-7xl 3xl:max-w-[1440px] px-6 sm:px-12">

        {/* ── Stats ────────────────────────────────────────── */}
        <section className="border-b border-border py-16 sm:py-18">
          <StaggerContainer className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-0">
            {stats.map((stat, i) => (
              <StaggerItem
                key={i}
                className={`flex flex-col gap-3 ${i > 0 ? 'md:border-l md:border-border md:pl-12' : ''}`}
              >
                <span className="font-bold text-6xl sm:text-7xl text-primary leading-none tabular-nums">
                  {stat.value}
                </span>
                <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                  {stat.label}
                </span>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </section>

        <section className="border-b border-border py-14 sm:py-16">
          <FadeUp>
            <div className="mb-8 max-w-2xl">
              <p className="mb-4 font-mono text-xs uppercase tracking-[0.22em] text-muted-foreground">At A Glance</p>
              <h2 className="mb-4 font-bold text-2xl sm:text-3xl uppercase tracking-tighter">Architecture, writing, and selective advisory work</h2>
              <p className="text-base text-muted-foreground leading-[1.7]">
                This site works best as a guide to three things: representative systems shipped, practical writing on technical trade-offs, and ways to work together when complexity is already high.
              </p>
            </div>
          </FadeUp>
          <StaggerContainer className="grid gap-px bg-border md:grid-cols-3">
            {summaryLinks.map((item) => (
              <StaggerItem key={item.href} className="bg-background">
                <Link
                  href={item.href}
                  className="block cursor-pointer p-6 transition-colors duration-200 hover:bg-muted/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                >
                  <p className="mb-3 font-bold text-lg uppercase tracking-tight">{item.label}</p>
                  <p className="text-sm leading-[1.7] text-muted-foreground">{item.detail}</p>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </section>

        {/* ── Latest writing ───────────────────────────────── */}
        <section className="border-b border-border py-14 sm:py-16">
          <FadeUp>
            <div className="mb-10 flex items-end justify-between">
              <h2 className="font-bold text-2xl sm:text-3xl uppercase tracking-tighter">Latest Writing</h2>
              <Link href="/writing" className="cursor-pointer font-mono text-xs uppercase text-primary transition-colors duration-200 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
                All articles →
              </Link>
            </div>
          </FadeUp>
          <StaggerContainer>
            {articles.map((a) => (
              <StaggerItem key={a.slug}>
                <ArticleCard article={a} />
              </StaggerItem>
            ))}
          </StaggerContainer>
        </section>

        <section className="border-b border-border py-14 sm:py-16">
          <FadeUp>
            <div className="mb-10 flex items-end justify-between">
              <div>
                <p className="mb-4 font-mono text-xs uppercase tracking-[0.22em] text-muted-foreground">Featured Case Studies</p>
                <h2 className="font-bold text-2xl sm:text-3xl uppercase tracking-tighter">Representative systems, not a generic portfolio wall</h2>
              </div>
              <Link href="/projects" className="cursor-pointer font-mono text-xs uppercase text-primary transition-colors duration-200 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
                Browse all projects →
              </Link>
            </div>
          </FadeUp>
          <StaggerContainer className="grid gap-px bg-border lg:grid-cols-2">
            {featuredProjects.map((project) => (
              <StaggerItem key={project.slug} className="bg-background">
                <ProjectCard project={project} />
              </StaggerItem>
            ))}
          </StaggerContainer>
        </section>

        <section className="border-b border-border py-14 sm:py-16">
          <FadeUp>
            <div className="mb-8 max-w-2xl">
              <p className="mb-4 font-mono text-xs uppercase tracking-[0.22em] text-muted-foreground">Focus Areas</p>
              <h2 className="font-bold text-2xl sm:text-3xl uppercase tracking-tighter">Three recurring themes</h2>
            </div>
          </FadeUp>
          <FadeUp delay={0.05}>
          <div className="grid grid-cols-1 border border-border md:grid-cols-3">
            {PILLARS.map((p, i) => (
              <Link
                key={p.slug}
                href={`/writing?pillar=${p.slug}`}
                className={[
                  'group cursor-pointer p-6 transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary md:p-7',
                  PILLAR_HOVER_BG[p.slug] ?? 'hover:bg-primary',
                  i < PILLARS.length - 1
                    ? 'border-b md:border-b-0 md:border-r border-border'
                    : '',
                ].join(' ')}
              >
                <div className="mb-6 flex items-start justify-between">
                  <span className="text-2xl">{p.emoji}</span>
                  <span className="text-muted-foreground group-hover:text-background transition-colors duration-300">→</span>
                </div>
                <p className={`font-mono text-[10px] uppercase tracking-widest mb-3 ${p.textClass} group-hover:text-background transition-colors duration-300`}>
                  Focus 0{i + 1}
                </p>
                <h4 className="font-bold text-xl sm:text-2xl uppercase tracking-tight group-hover:text-background transition-colors duration-300">
                  {p.label}
                </h4>
              </Link>
            ))}
          </div>
          </FadeUp>
        </section>

        {/* ── Featured resource ────────────────────────────── */}
        {featuredResource && (
          <section className="border-b border-border py-14 sm:py-16">
            <FadeUp>
              <div className="flex flex-col gap-6 border border-primary/25 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
                <div className="max-w-xl">
                  <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.22em] text-primary">Free Resource</p>
                  <h2 className="mb-3 font-bold text-2xl uppercase tracking-tight">{featuredResource.title}</h2>
                  <p className="text-sm leading-[1.8] text-muted-foreground">{featuredResource.description}</p>
                </div>
                <Link
                  href="/resources"
                  className="inline-flex cursor-pointer items-center bg-primary px-6 py-3 font-mono text-xs font-bold uppercase tracking-widest text-primary-foreground transition-colors duration-200 hover:bg-foreground hover:text-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                >
                  Get It Free →
                </Link>
              </div>
            </FadeUp>
          </section>
        )}

        <section className="border-b border-border py-14 sm:py-16">
          <FadeUp>
            <div className="mb-10 flex items-end justify-between">
              <div>
                <p className="mb-4 font-mono text-xs uppercase tracking-[0.22em] text-muted-foreground">How I Work</p>
                <h2 className="font-bold text-2xl sm:text-3xl uppercase tracking-tighter">Technical direction with less noise</h2>
              </div>
              <Link href="/about" className="cursor-pointer font-mono text-xs uppercase text-primary transition-colors duration-200 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
                More context →
              </Link>
            </div>
          </FadeUp>
          <div className="grid gap-px bg-border lg:grid-cols-[1.1fr_0.9fr]">
            <div className="bg-background p-6 sm:p-8">
              <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.22em] text-primary">Field Notes</p>
              <p className="max-w-xl text-sm leading-[1.8] text-muted-foreground">
                I usually get pulled in where systems are already under stress: mid-flight architecture changes, multi-team delivery drift, or wallet and custody systems with hidden edge cases that need to survive production.
              </p>
            </div>
            <div className="grid gap-px bg-border">
              {[
                'Translate rough product ambition into systems that scale',
                'Bring security, delivery discipline, and architecture back into alignment',
                'Use AI tactically to improve execution quality, not to replace thinking',
              ].map((item) => (
                <div key={item} className="bg-background px-6 py-5 text-sm leading-[1.8] text-muted-foreground">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Services ─────────────────────────────────────── */}
        <section className="py-14 sm:py-16">
          <FadeUp>
            <div className="mb-10 flex items-end justify-between">
              <h2 className="font-bold text-2xl sm:text-3xl uppercase tracking-tighter">Work With Me</h2>
              <Link href="/work-with-me" className="cursor-pointer font-mono text-xs uppercase text-primary transition-colors duration-200 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
                All services →
              </Link>
            </div>
          </FadeUp>
          <StaggerContainer>
            {services.map((s, i) => (
              <StaggerItem key={s.title}>
                <ServiceCard title={s.title} description={s.description} index={i} meta={s.meta} />
              </StaggerItem>
            ))}
          </StaggerContainer>
        </section>

      </div>
    </>
  )
}
