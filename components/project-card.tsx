import { cn } from '@/lib/utils'
import { chipLink, pick, softTilts, tones } from '@/components/bazaar/styles'
import type { ProjectMeta } from '@/types/content'

function monthYear(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
}

/**
 * A project as a pinned index card. Projects are list-only (no detail pages),
 * so the card is not a link. "What shipped" shows the first bullets of the
 * MDX body's `## Outcome` section (2 on /projects, 3 when featured).
 * `featured` (homepage grid) adds a handwritten "no. 01" and more room;
 * otherwise a `highlight` project gets a handwritten "a favourite" note.
 * `index` sets the gentle tilt and chain-chip colour.
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
        featured ? 'p-5 min-[360px]:p-7 sm:p-8' : 'p-6',
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-dm-ink-soft">{monthYear(project.date)}</p>
        {featured && typeof index === 'number' ? (
          <span aria-hidden="true" className="hand -mt-1 text-[1.6rem] leading-none text-dm-accent-ink">
            no. {String(index + 1).padStart(2, '0')}
          </span>
        ) : (
          project.highlight && <span className="hand -mt-1 text-[1.35rem] leading-none text-dm-accent-ink">a favourite ✦</span>
        )}
      </div>
      <h3
        className={cn(
          // long uppercase words ("RECOMMENDATION") must never widen the card; the
          // small-screen sizes below keep them whole, break-words is the backstop
          'mt-3 font-black uppercase leading-[1.1] tracking-tight hyphens-auto break-words',
          featured ? 'text-[1.1rem] min-[360px]:text-[1.25rem] sm:text-[1.4rem]' : 'text-[1.12rem] sm:text-[1.2rem]',
        )}
      >
        {project.title}
      </h3>
      {project.role && (
        <p className="mt-2 text-[12px] font-semibold leading-[1.45] text-dm-ink-soft">
          <span className="font-black uppercase tracking-[0.08em] text-dm-ink">{project.employer}</span> · {project.role}
        </p>
      )}
      {project.chain && (
        <span className={cn('ticket mt-4 w-fit max-w-full whitespace-normal leading-tight', pick(tones, i))}>
          {project.chain}
        </span>
      )}
      <p className="mt-4 text-[15px] leading-[1.65] text-dm-ink-soft">{project.excerpt}</p>
      {project.outcome.length > 0 && (
        <div className="mt-4 border-t-2 border-dashed border-current/25 pt-3">
          <p className="hand text-[1.25rem] leading-none text-dm-accent-ink">what shipped</p>
          <ul className="mt-2 space-y-1.5">
            {project.outcome.slice(0, featured ? 3 : 2).map((item) => (
              <li key={item} className="flex gap-2 text-[14px] leading-[1.5]">
                <span aria-hidden="true" className="font-black text-dm-accent-ink">
                  ✓
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      {project.caseStudy && (
        <a
          href={project.caseStudy}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(chipLink, 'tone-panel mt-5 w-fit')}
        >
          Case study<span className="sr-only">: {project.title}</span> ↗
        </a>
      )}
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
