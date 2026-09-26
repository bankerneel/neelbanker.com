import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

/**
 * A torn paper scrap with a hard offset shadow.
 *
 * clip-path clips everything on the element it is applied to — borders,
 * box-shadow, focus rings — so the shadow is a separate layer behind the
 * paper, cut with the same edge. Put rotation, focus rings and links on the
 * scrap's wrapper (className), never on the clipped paper (paperClassName).
 *
 * `tall` uses a fixed-size tear so long content (an article) is not eaten by
 * a percentage-sized jag.
 */
export function Scrap({
  children,
  className,
  paperClassName,
  tall = false,
  tape = false,
  as: Tag = 'div',
}: {
  children: ReactNode
  className?: string
  paperClassName?: string
  tall?: boolean
  tape?: boolean
  as?: 'div' | 'section' | 'aside'
}) {
  const edge = tall ? 'torn-sheet' : 'torn'
  return (
    <Tag className={cn('relative', className)}>
      <div aria-hidden="true" className={cn(edge, 'absolute inset-0 translate-x-[10px] translate-y-[10px] bg-dm-shadow')} />
      {tape && <span aria-hidden="true" className="tape-strip" />}
      <div className={cn(edge, 'relative', paperClassName)}>{children}</div>
    </Tag>
  )
}
