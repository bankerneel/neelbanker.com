import { getPillarBySlug } from '@/lib/pillars'
import { cn } from '@/lib/utils'
import type { PillarSlug } from '@/types/content'

/** Pillar as a ticket-stub chip in its accent colour. Tilt it via className. */
export function PillarBadge({ pillar, className }: { pillar: PillarSlug; className?: string }) {
  const p = getPillarBySlug(pillar)
  if (!p) return null
  return <span className={cn('ticket', p.toneClass, className)}>{p.label}</span>
}
