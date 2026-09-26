import { cn } from '@/lib/utils'
import { pick, softTilts, tones } from '@/components/bazaar/styles'

/** A service as a price-tag row: handwritten number, title and summary, meta ticket. */
export function ServiceCard({
  title,
  description,
  index,
  meta,
}: {
  title: string
  description: string
  index?: number
  meta?: string
}) {
  const num = index !== undefined ? String(index + 1).padStart(2, '0') : null
  const i = index ?? 0

  return (
    <div
      className={cn(
        'tone-panel grid grid-cols-1 gap-3 border-2 border-current p-6 shadow-hard transition-[rotate] duration-200 hover:rotate-0 sm:p-7 md:grid-cols-[64px_minmax(0,1fr)_auto] md:items-center md:gap-7',
        pick(softTilts, i),
      )}
    >
      {num && (
        <span aria-hidden="true" className="hand text-[2.2rem] leading-none text-dm-accent-ink">
          {num}
        </span>
      )}
      <div className={num ? '' : 'md:col-span-2'}>
        <h3 className="text-[1.3rem] font-black uppercase leading-[1.1] tracking-tight sm:text-[1.45rem]">{title}</h3>
        <p className="mt-1.5 text-[15px] leading-[1.65] text-dm-ink-soft">{description}</p>
      </div>
      {meta && <span className={cn('ticket w-fit', pick(tones, i), i % 2 ? 'rotate-2' : '-rotate-2')}>{meta}</span>}
    </div>
  )
}
