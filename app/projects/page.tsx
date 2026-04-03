import type { Metadata } from 'next'
import Link from 'next/link'
import { getAllProjectMeta } from '@/lib/mdx'
import { ProjectCard } from '@/components/project-card'
import { FadeUp, StaggerContainer, StaggerItem } from '@/components/scroll-reveal'

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Real blockchain systems I have designed and shipped — with lessons learned.',
}

export default function ProjectsPage() {
  const projects = getAllProjectMeta()
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
              Proof of Work
            </p>
          </FadeUp>
          <FadeUp delay={0.25}>
            <h1 className="font-extrabold text-4xl sm:text-5xl md:text-6xl uppercase tracking-tighter leading-[0.9] mb-6">
              Projects
            </h1>
          </FadeUp>
          <FadeUp delay={0.4}>
            <p className="text-base text-muted-foreground leading-[1.7] max-w-xl">
              Systems designed and shipped. Every entry includes the problem, architecture decisions, and what I&apos;d do differently.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* ── Project cards ────────────────────────────────── */}
      <div className="mx-auto max-w-5xl xl:max-w-6xl 2xl:max-w-7xl 3xl:max-w-[1440px] px-6 sm:px-12 py-12 sm:py-16">
        <StaggerContainer className="grid gap-5 sm:grid-cols-2">
          {projects.map((p) => (
            <StaggerItem key={p.slug}>
              <ProjectCard project={p} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </>
  )
}
