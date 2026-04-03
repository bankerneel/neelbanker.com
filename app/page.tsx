import Link from 'next/link'
import { getAllArticleMeta, getAllProjectMeta, getAllResourceMeta } from '@/lib/mdx'
import { ArticleCard } from '@/components/article-card'
import { ServiceCard } from '@/components/service-card'
import { ProjectCard } from '@/components/project-card'
import { PILLARS } from '@/lib/pillars'
import { HeroClient } from '@/components/hero-client'
import { FadeUp, SlideIn, StaggerContainer, StaggerItem } from '@/components/scroll-reveal'
import { TALKS } from '@/lib/talks'

const PILLAR_HOVER_BG: Record<string, string> = {
  blockchain: 'hover:bg-primary',
  ai: 'hover:bg-cyan-400',
  leadership: 'hover:bg-orange-500',
}

export default function HomePage() {
  const articles = getAllArticleMeta().slice(0, 4)
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

  const writingCluster = [
    'l2-chains-after-deployment',
    'fireblocks-wallet-production-lessons',
    'why-i-audit-contracts-first',
    'designing-staking-contracts-that-wont-get-exploited',
  ]
    .map((slug) => articles.find((article) => article.slug === slug) ?? getAllArticleMeta().find((article) => article.slug === slug))
    .filter((article): article is NonNullable<typeof article> => Boolean(article))

  const techStack = [
    'Hyperledger Fabric', 'OP Stack / L2', 'Solidity', 'ERC-4337', 'Fireblocks NCW',
    'BitGo', 'Node.js', 'NestJS', 'Go', 'Python', 'Claude API', 'Ethereum', 'Polygon',
    'Solana', 'Base', 'Arbitrum', 'Account Abstraction', 'Docker', 'AWS EKS', 'HSM',
    '7+ Years', '50+ Engineers Led', '15+ Platforms',
  ]

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

  const operatingLenses = [
    {
      label: 'Architecture',
      title: 'Distributed systems with operational realism',
      body: 'L2 chains, custody backends, Fabric networks, wallet orchestration, and the edges where product pressure meets infrastructure truth.',
    },
    {
      label: 'AI Workflows',
      title: 'AI used for leverage, not theatre',
      body: 'I care about shorter feedback loops, better debugging, cleaner handoffs, and practical AI-assisted engineering that does not create long-term mess.',
    },
    {
      label: 'Leadership',
      title: 'Technical direction that survives scale',
      body: 'Hiring, mentoring, delivery systems, and keeping teams moving without letting architecture drift every time urgency spikes.',
    },
  ]

  const homeTalks = TALKS.slice(0, 3)

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────── */}
      <HeroClient />

      {/* ── Tech marquee ─────────────────────────────────── */}
      <div className="bg-primary overflow-hidden py-4 select-none">
        <div className="flex animate-marquee whitespace-nowrap">
          {[...techStack, ...techStack].map((item, i) => (
            <span key={i} className="font-mono text-sm font-bold tracking-widest uppercase text-primary-foreground mx-8">
              {item}
            </span>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-5xl xl:max-w-6xl 2xl:max-w-7xl 3xl:max-w-[1440px] px-6 sm:px-12">

        {/* ── Stats ────────────────────────────────────────── */}
        <section className="py-20 sm:py-24 border-b border-border">
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-0">
            {stats.map((stat, i) => (
              <StaggerItem
                key={i}
                className={`flex flex-col gap-3 ${i > 0 ? 'md:border-l md:border-border md:pl-12' : ''}`}
              >
                <span className="font-extrabold text-7xl sm:text-8xl text-primary leading-none tabular-nums">
                  {stat.value}
                </span>
                <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                  {stat.label}
                </span>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </section>

        <section className="py-16 sm:py-20 border-b border-border">
          <FadeUp>
            <div className="mb-10 max-w-2xl">
              <p className="mb-4 font-mono text-xs uppercase tracking-[0.22em] text-muted-foreground">Operating Lens</p>
              <h2 className="font-bold text-3xl sm:text-4xl uppercase tracking-tighter mb-4">What this site is really about</h2>
              <p className="text-base text-muted-foreground leading-[1.7]">
                Not just blockchain work. It&apos;s the overlap between distributed systems, AI-assisted engineering, and the decisions required to ship under real constraints.
              </p>
            </div>
          </FadeUp>
          <StaggerContainer className="grid gap-px bg-border lg:grid-cols-3">
            {operatingLenses.map((lens) => (
              <StaggerItem key={lens.label} className="bg-background p-8 sm:p-10">
                <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.22em] text-primary">{lens.label}</p>
                <h3 className="mb-4 font-bold text-xl sm:text-2xl uppercase tracking-tight">{lens.title}</h3>
                <p className="text-sm leading-[1.8] text-muted-foreground">{lens.body}</p>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </section>

        {/* ── Latest writing ───────────────────────────────── */}
        <section className="py-16 sm:py-20 border-b border-border">
          <FadeUp>
            <div className="flex items-end justify-between mb-12 sm:mb-16">
              <h2 className="font-bold text-3xl sm:text-4xl uppercase tracking-tighter">Latest Writing</h2>
              <Link href="/writing" className="font-mono text-xs uppercase text-primary hover:underline underline-offset-8 transition-colors">
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

        <section className="py-16 sm:py-20 border-b border-border">
          <FadeUp>
            <div className="mb-12 flex items-end justify-between">
              <div>
                <p className="mb-4 font-mono text-xs uppercase tracking-[0.22em] text-muted-foreground">Featured Case Studies</p>
                <h2 className="font-bold text-3xl sm:text-4xl uppercase tracking-tighter">Representative systems, not a generic portfolio wall</h2>
              </div>
              <Link href="/projects" className="font-mono text-xs uppercase text-primary hover:underline underline-offset-8 transition-colors">
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

        <section className="py-16 sm:py-20 border-b border-border">
          <FadeUp>
            <div className="mb-12 max-w-2xl">
              <p className="mb-4 font-mono text-xs uppercase tracking-[0.22em] text-muted-foreground">Connected Reading</p>
              <h2 className="mb-4 font-bold text-3xl sm:text-4xl uppercase tracking-tighter">A practical series on L2 operations, wallet systems, and contract risk</h2>
              <p className="text-base leading-[1.7] text-muted-foreground">
                If you want the strongest technical thread on this site, start here: post-deployment L2 realities, Fireblocks wallet lessons, audit-driven contract design, and staking-specific failure modes.
              </p>
            </div>
          </FadeUp>
          <div className="grid gap-px bg-border lg:grid-cols-2">
            {writingCluster.map((article) => (
              <Link
                key={article.slug}
                href={`/writing/${article.slug}`}
                className="group bg-background p-8 transition-colors duration-200 hover:bg-muted/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.22em] text-primary">
                  {article.readingTime} min read
                </p>
                <h3 className="mb-4 font-bold text-xl uppercase tracking-tight transition-colors duration-200 group-hover:text-primary">
                  {article.title}
                </h3>
                <p className="text-sm leading-[1.8] text-muted-foreground">{article.excerpt}</p>
              </Link>
            ))}
          </div>
        </section>

        <section className="py-16 sm:py-20 border-b border-border">
          <FadeUp>
            <div className="mb-12 flex items-end justify-between">
              <div>
                <p className="mb-4 font-mono text-xs uppercase tracking-[0.22em] text-muted-foreground">Selected Talks</p>
                <h2 className="font-bold text-3xl sm:text-4xl uppercase tracking-tighter">Speaking themes that complement the written work</h2>
              </div>
              <Link href="/speaking" className="font-mono text-xs uppercase text-primary hover:underline underline-offset-8 transition-colors">
                View speaking →
              </Link>
            </div>
          </FadeUp>
          <StaggerContainer className="grid gap-px bg-border lg:grid-cols-3">
            {homeTalks.map((talk) => (
              <StaggerItem key={talk.title} className="bg-background">
                <a
                  href={talk.youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block cursor-pointer p-8 transition-colors duration-200 hover:bg-muted/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                >
                  <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.22em] text-primary">{talk.type}</p>
                  <h3 className="mb-3 font-bold text-xl uppercase tracking-tight transition-colors duration-200 group-hover:text-primary">
                    {talk.title}
                  </h3>
                  <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">{talk.venue}</p>
                  <p className="mb-5 text-sm leading-[1.8] text-muted-foreground">{talk.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {talk.topics.slice(0, 2).map((topic) => (
                      <span key={topic} className="bg-muted px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                        {topic}
                      </span>
                    ))}
                  </div>
                </a>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </section>

        {/* ── Pillars ──────────────────────────────────────── */}
        <section className="py-16 sm:py-20 border-b border-border">
          <FadeUp>
            <h2 className="font-mono text-xs uppercase tracking-[0.22em] text-muted-foreground mb-8">Focus Areas</h2>
          </FadeUp>
          <FadeUp delay={0.1}>
          <div className="grid grid-cols-1 md:grid-cols-3 border border-border">
            {PILLARS.map((p, i) => (
              <Link
                key={p.slug}
                href={`/writing?pillar=${p.slug}`}
                className={[
                  'group cursor-pointer p-8 transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary md:p-10',
                  PILLAR_HOVER_BG[p.slug] ?? 'hover:bg-primary',
                  i < PILLARS.length - 1
                    ? 'border-b md:border-b-0 md:border-r border-border'
                    : '',
                ].join(' ')}
              >
                <div className="flex justify-between items-start mb-10">
                  <span className="text-3xl">{p.emoji}</span>
                  <span className="text-muted-foreground group-hover:text-background transition-colors duration-300">→</span>
                </div>
                <p className={`font-mono text-[10px] uppercase tracking-widest mb-3 ${p.textClass} group-hover:text-background transition-colors duration-300`}>
                  Focus 0{i + 1}
                </p>
                <h4 className="font-bold text-2xl sm:text-3xl uppercase tracking-tight group-hover:text-background transition-colors duration-300">
                  {p.label}
                </h4>
              </Link>
            ))}
          </div>
          </FadeUp>
        </section>

        {/* ── Featured resource ────────────────────────────── */}
        {featuredResource && (
          <section className="py-16 sm:py-20 border-b border-border">
            <FadeUp>
              <h2 className="font-mono text-xs uppercase tracking-[0.22em] text-muted-foreground mb-8">Free Resource</h2>
            </FadeUp>
            <FadeUp delay={0.1}>
              <div className="relative border-2 border-primary p-8 sm:p-14 overflow-hidden flex flex-col sm:flex-row items-start sm:items-center gap-10">
                {/* Decorative rotated square */}
                <div
                  aria-hidden="true"
                  className="absolute -right-16 -top-16 w-56 h-56 border border-primary/20 rotate-45 pointer-events-none"
                />
                <div className="flex-1 relative z-10">
                  <p className="font-mono text-xs uppercase tracking-[0.3em] text-primary mb-4">Download Free</p>
                  <h3 className="font-bold text-3xl sm:text-4xl uppercase tracking-tight mb-4 leading-tight">
                    {featuredResource.title}
                  </h3>
                  <p className="text-muted-foreground leading-[1.7] max-w-md mb-8 text-sm sm:text-base">
                    {featuredResource.description}
                  </p>
                  <Link
                    href="/resources"
                    className="inline-block bg-primary text-primary-foreground px-8 py-4 font-mono font-bold uppercase text-xs tracking-widest hover:bg-foreground hover:text-background transition-colors duration-200"
                  >
                    Get It Free →
                  </Link>
                </div>
              </div>
            </FadeUp>
          </section>
        )}

        <section className="py-16 sm:py-20 border-b border-border">
          <FadeUp>
            <div className="mb-12 flex items-end justify-between">
              <div>
                <p className="mb-4 font-mono text-xs uppercase tracking-[0.22em] text-muted-foreground">Signals</p>
                <h2 className="font-bold text-3xl sm:text-4xl uppercase tracking-tighter">How I tend to work</h2>
              </div>
              <Link href="/about" className="font-mono text-xs uppercase text-primary hover:underline underline-offset-8 transition-colors">
                More context →
              </Link>
            </div>
          </FadeUp>
          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
            <SlideIn from="left">
              <div className="border border-border p-8 sm:p-10">
                <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.22em] text-primary">Field Notes</p>
                <h3 className="mb-5 font-bold text-2xl sm:text-3xl uppercase tracking-tight">I usually get pulled in where systems are already under stress</h3>
                <p className="max-w-xl text-sm leading-[1.8] text-muted-foreground">
                  Mid-flight architecture changes, multi-team delivery drift, custody and wallet systems with hidden edge cases, or platform decisions that were made quickly and now need to survive production. That tends to be the operating environment.
                </p>
              </div>
            </SlideIn>
            <SlideIn from="right">
              <div className="grid gap-px bg-border">
                {[
                  'Translate rough product ambition into systems that scale',
                  'Bring security, delivery discipline, and architecture back into alignment',
                  'Use AI tactically to improve execution quality, not to replace thinking',
                ].map((item) => (
                  <div key={item} className="bg-background px-6 py-6 text-sm leading-[1.8] text-muted-foreground">
                    {item}
                  </div>
                ))}
              </div>
            </SlideIn>
          </div>
        </section>

        {/* ── Services ─────────────────────────────────────── */}
        <section className="py-16 sm:py-20">
          <FadeUp>
            <div className="flex items-end justify-between mb-12 sm:mb-16">
              <h2 className="font-bold text-3xl sm:text-4xl uppercase tracking-tighter">Work With Me</h2>
              <Link href="/work-with-me" className="font-mono text-xs uppercase text-primary hover:underline underline-offset-8 transition-colors">
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
