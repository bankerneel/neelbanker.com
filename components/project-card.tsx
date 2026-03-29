import type { ProjectMeta } from '@/types/content'

export function ProjectCard({ project }: { project: ProjectMeta }) {
  return (
    <div className="border border-border p-6">
      <div className="mb-4 flex items-start justify-between gap-4">
        <h3 className="font-extrabold text-base uppercase tracking-tight leading-snug">{project.title}</h3>
        {project.chain && (
          <span className="shrink-0 font-mono text-[10px] uppercase tracking-widest text-muted-foreground border border-border px-2 py-0.5">
            {project.chain}
          </span>
        )}
      </div>
      <p className="mb-5 text-sm text-muted-foreground leading-relaxed">{project.excerpt}</p>
      <div className="flex flex-wrap gap-1.5">
        {project.stack.map((s) => (
          <span key={s} className="bg-muted px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            {s}
          </span>
        ))}
      </div>
    </div>
  )
}
