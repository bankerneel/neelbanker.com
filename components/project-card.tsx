'use client'

import { motion } from 'framer-motion'
import type { ProjectMeta } from '@/types/content'

export function ProjectCard({
  project,
  featured = false,
  index,
}: {
  project: ProjectMeta
  featured?: boolean
  index?: number
}) {
  return (
    <motion.div
      className={`group relative flex h-full cursor-default flex-col justify-between overflow-hidden border border-border bg-background ${featured ? 'p-8' : 'p-6'}`}
      whileHover={{ y: -3, borderColor: 'hsl(var(--primary))' }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
    >
      <div className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-primary transition-transform duration-300 group-hover:scale-x-100" />
      {featured && typeof index === 'number' && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-6 -right-2 select-none font-mono text-[6.5rem] font-bold leading-none tracking-tighter text-foreground/[0.045] transition-colors duration-300 group-hover:text-primary/10"
        >
          {String(index + 1).padStart(2, '0')}
        </span>
      )}
      <div className="relative z-10 mb-4 flex items-start justify-between gap-4">
        <div>
          <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
            {project.date}
          </p>
          <h3 className={`font-bold uppercase tracking-tight leading-snug transition-colors duration-200 group-hover:text-primary ${featured ? 'text-lg sm:text-xl' : 'text-base'}`}>
            {project.title}
          </h3>
        </div>
        {project.chain && (
          <span className="shrink-0 font-mono text-[10px] uppercase tracking-widest text-muted-foreground border border-border px-2 py-0.5">
            {project.chain}
          </span>
        )}
      </div>
      <p className={`relative z-10 mb-5 text-muted-foreground leading-relaxed ${featured ? 'text-[15px]' : 'text-sm'}`}>{project.excerpt}</p>
      <div className="relative z-10 flex flex-wrap gap-1.5">
        {project.stack.map((s) => (
          <span key={s} className="bg-muted px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            {s}
          </span>
        ))}
      </div>
    </motion.div>
  )
}
