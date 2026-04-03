import { getPillarBySlug } from '@/lib/pillars'
import type { PillarSlug } from '@/types/content'

export function PillarBadge({ pillar }: { pillar: PillarSlug }) {
  const p = getPillarBySlug(pillar)
  if (!p) return null
  return (
    <span className={`inline-flex min-h-[28px] items-center gap-1 rounded-sm px-2 py-1 text-[11px] font-medium leading-none sm:text-xs ${p.bgClass} ${p.textClass}`}>
      {p.emoji} {p.label}
    </span>
  )
}
