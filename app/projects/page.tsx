import type { Metadata } from 'next'
import Link from 'next/link'
import { getAllProjectMeta } from '@/lib/mdx'
import { ProjectCard } from '@/components/project-card'

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Real blockchain systems I have designed and shipped — with lessons learned.',
}

export default function ProjectsPage() {
  const projects = getAllProjectMeta()
  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <div className="mb-8 flex flex-wrap items-center gap-3 text-sm">
        <Link href="/" className="font-mono uppercase tracking-[0.14em] text-muted-foreground transition-colors hover:text-primary">
          ← Home
        </Link>
        <span className="text-muted-foreground">/</span>
        <Link href="/work-with-me" className="font-mono uppercase tracking-[0.14em] text-muted-foreground transition-colors hover:text-primary">
          Work With Me
        </Link>
      </div>
      <h1 className="mb-2 text-3xl font-bold">Projects</h1>
      <p className="mb-10 text-muted-foreground">
        Systems designed and shipped. Every entry includes the problem, architecture decisions, and what I&apos;d do differently.
      </p>
      <div className="grid gap-5 sm:grid-cols-2">
        {projects.map((p) => <ProjectCard key={p.slug} project={p} />)}
      </div>
    </div>
  )
}
