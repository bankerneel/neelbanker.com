import { cn } from '@/lib/utils'
import { pick, softTilts, tones } from '@/components/bazaar/styles'
import type { ProjectMeta } from '@/types/content'

function monthYear(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
}

/**
 * A project as a pinned index card. Projects are list-only (no detail pages),
 * so the card is not a link. `featured` (homepage grid) adds a handwritten
 * "no. 01" and more room; `index` sets the gentle tilt and chain-chip colour.
 */
export function ProjectCard({
  project,
  featured = false,
  index,
}: {
  project: ProjectMeta
  featured?: boolean
  index?: number
}) {
  const i = index ?? 0
  return (
    <article
      className={cn(
        'tone-panel relative flex h-full flex-col border-2 border-current shadow-hard transition-[rotate] duration-200 hover:rotate-0',
        typeof index === 'number' && pick(softTilts, index),
        featured ? 'p-7 sm:p-8' : 'p-6',
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-dm-ink-soft">{monthYear(project.date)}</p>
        {featured && typeof index === 'number' && (
          <span aria-hidden="true" className="hand -mt-1 text-[1.6rem] leading-none text-dm-accent-ink">
            no. {String(index + 1).padStart(2, '0')}
          </span>
        )}
      </div>
      <h3
        className={cn(
          'mt-3 font-black uppercase leading-[1.1] tracking-tight',
          featured ? 'text-[1.25rem] sm:text-[1.4rem]' : 'text-[1.12rem] sm:text-[1.2rem]',
        )}
      >
        {project.title}
      </h3>
      {project.chain && (
        <span className={cn('ticket mt-4 w-fit max-w-full whitespace-normal leading-tight', pick(tones, i))}>
          {project.chain}
        </span>
      )}
      <p className="mt-4 text-[15px] leading-[1.65] text-dm-ink-soft">{project.excerpt}</p>
      <ul aria-label="Stack" className="mt-auto flex flex-wrap gap-1.5 pt-5">
        {project.stack.map((s) => (
          <li key={s} className="border border-current/40 px-2 py-1 text-[10px] font-bold uppercase tracking-[0.1em]">
            {s}
          </li>
        ))}
      </ul>
    </article>
  )
}
