import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

const VARIANTS = {
  note: { tone: 'tone-sky', label: 'note' },
  tip: { tone: 'tone-sage', label: 'tip' },
  warning: { tone: 'tone-rose', label: 'watch out' },
} as const

/**
 * A pinned note inside an article. Usage in MDX:
 *
 *   <Callout type="warning" title="Oracle keys">
 *     Treat the oracle as your highest-risk component.
 *   </Callout>
 *
 * Straight (unrotated), like every reading surface.
 */
export function Callout({
  type = 'note',
  title,
  children,
}: {
  type?: keyof typeof VARIANTS
  title?: string
  children: ReactNode
}) {
  const variant = VARIANTS[type] ?? VARIANTS.note
  return (
    <aside className={cn('callout not-prose my-8 border-2 border-current px-5 py-4 shadow-hard', variant.tone)}>
      <p className="flex items-baseline gap-2">
        <span className="hand text-[1.35rem] leading-none">{variant.label}</span>
        {title && <span className="text-[13px] font-black uppercase tracking-[0.06em]">{title}</span>}
      </p>
      <div className="callout-body mt-2 text-[16px] leading-[1.7]">{children}</div>
    </aside>
  )
}
