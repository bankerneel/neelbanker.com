import { getPillarBySlug } from '@/lib/pillars'
import type { PillarSlug } from '@/types/content'

export function PillarBadge({ pillar }: { pillar: PillarSlug }) {
  const p = getPillarBySlug(pillar)
  if (!p) return null
  return (
    <span className={`inline-flex items-center gap-1 rounded-sm px-1.5 py-0.5 text-xs font-medium ${p.bgClass} ${p.textClass}`}>
      {p.emoji} {p.label}
    </span>
  )
}
