import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

export type BandTone = 'night' | 'panel' | 'butter' | 'sky'
export type BandEdge = 'torn' | 'perf' | 'zig' | 'scallop'
export type BandPattern = 'stars' | 'ruled' | 'blueprint'

/**
 * A full-bleed "set" that breaks the page into chapters: its own ground
 * colour, an optional texture, and a shaped edge where it meets the section
 * above (and optionally below).
 *
 * The edges are small separate strips, so the band itself is never clipped:
 * a clip-path or mask on a tall band would clip every animated child with it
 * and make scrolling expensive. The strips overlap the neighbouring section,
 * so a perforated edge shows the band above through its holes.
 *
 * Hand-lettered words inside a band inherit the band's text colour
 * (`--band-hand`), because the accent ink only passes contrast on paper.
 * `spotlight` adds a soft glow that follows a desktop pointer (MotionStage).
 */
export function Band({
  tone,
  edge,
  bottomEdge,
  pattern,
  spotlight = false,
  className,
  children,
}: {
  tone: BandTone
  edge?: BandEdge
  bottomEdge?: BandEdge
  pattern?: BandPattern
  spotlight?: boolean
  className?: string
  children: ReactNode
}) {
  const toneClass = `tone-${tone}`
  return (
    <div className={cn('band relative isolate', toneClass, className)} data-band={tone} data-spotlight={spotlight || undefined}>
      {edge && <div aria-hidden="true" className={cn('band-edge band-edge-top', `band-edge-${edge}`, toneClass)} />}
      {(pattern || spotlight) && (
        <div aria-hidden="true" className={cn('band-pattern', pattern && `band-pattern-${pattern}`)}>
          {pattern === 'stars' && (
            <>
              <div className="stars stars-far" />
              <div className="stars stars-near" />
            </>
          )}
          {pattern === 'blueprint' && <div className="bp-scan" />}
          {spotlight && <div className="band-spot" />}
        </div>
      )}
      {children}
      {bottomEdge && (
        <div aria-hidden="true" className={cn('band-edge band-edge-bottom', `band-edge-${bottomEdge}`, toneClass)} />
      )}
    </div>
  )
}
