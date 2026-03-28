import type { Metadata } from 'next'
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
      <h1 className="mb-2 text-3xl font-bold">Projects</h1>
      <p className="mb-10 text-muted-foreground">
        Systems designed and shipped. Every entry includes the problem, architecture decisions, and what I'd do differently.
      </p>
      <div className="grid gap-5 sm:grid-cols-2">
        {projects.map((p) => <ProjectCard key={p.slug} project={p} />)}
      </div>
    </div>
  )
}
