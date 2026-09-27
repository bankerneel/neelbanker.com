'use client'

import { useEffect, useRef } from 'react'

/**
 * A thin accent-ink bar pinned to the top of the viewport that fills as the
 * reader moves through `targetId` (the article sheet). Decorative — the
 * scrollbar already conveys position — so it is aria-hidden. It writes the
 * transform directly (no React state per scroll frame) and has no CSS
 * transition, so reduced-motion users see a bar that simply tracks scroll.
 */
export function ReadingProgress({ targetId }: { targetId: string }) {
  const barRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const target = document.getElementById(targetId)
    const bar = barRef.current
    if (!target || !bar) return

    let frame = 0
    const update = () => {
      frame = 0
      const rect = target.getBoundingClientRect()
      const total = rect.height - window.innerHeight
      const progress = total > 0 ? Math.min(1, Math.max(0, -rect.top / total)) : 1
      bar.style.transform = `scaleX(${progress})`
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [targetId])

  return (
    <div aria-hidden="true" className="no-print pointer-events-none fixed inset-x-0 top-0 z-[60] h-[3px]">
      <div ref={barRef} className="h-full origin-left bg-dm-accent-ink" style={{ transform: 'scaleX(0)' }} />
    </div>
  )
}
