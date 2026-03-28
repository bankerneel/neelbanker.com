import type { ProjectMeta } from '@/types/content'

export function ProjectCard({ project }: { project: ProjectMeta }) {
  return (
    <div className="rounded-lg border border-border p-5">
      <div className="mb-3 flex items-start justify-between gap-3">
        <h3 className="text-base font-semibold">{project.title}</h3>
        {project.chain && (
          <span className="shrink-0 font-mono text-xs text-muted-foreground">{project.chain}</span>
        )}
      </div>
      <p className="mb-4 text-sm text-muted-foreground">{project.excerpt}</p>
      <div className="flex flex-wrap gap-1.5">
        {project.stack.map((s) => (
          <span key={s} className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs text-muted-foreground">
            {s}
          </span>
        ))}
      </div>
    </div>
  )
}
