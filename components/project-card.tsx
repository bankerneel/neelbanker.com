'use client'

import { motion } from 'framer-motion'
import type { ProjectMeta } from '@/types/content'

export function ProjectCard({ project }: { project: ProjectMeta }) {
  return (
    <motion.div
      className="group relative flex h-full cursor-default flex-col justify-between border border-border bg-background p-6"
      whileHover={{ y: -3, borderColor: 'hsl(var(--primary))' }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
    >
      <div className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-primary transition-transform duration-300 group-hover:scale-x-100" />
      <div className="mb-4 flex items-start justify-between gap-4">
        <div>
          <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
            {project.date}
          </p>
          <h3 className="font-bold text-base uppercase tracking-tight leading-snug transition-colors duration-200 group-hover:text-primary">
            {project.title}
          </h3>
        </div>
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
    </motion.div>
  )
}
