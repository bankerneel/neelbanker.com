'use client'

import { lazy, Suspense, useEffect, useRef, useState } from 'react'

/**
 * Tiny client slot for the burning paper. The engine is a separate chunk that
 * is only requested once the opening hook has finished and the hero is near
 * the viewport, so it never enters the homepage initial bundle.
 *
 * The host is an absolute, aria-hidden overlay, so it needs no placeholder
 * height and cannot shift the layout when the canvas arrives.
 */

const HeroBurn = lazy(() => import('./hero-burn').then((m) => ({ default: m.HeroBurn })))

export function HeroBurnSlot() {
  const hostRef = useRef<HTMLDivElement>(null)
  const [load, setLoad] = useState(false)

  useEffect(() => {
    const motion = matchMedia('(prefers-reduced-motion: reduce)')
    if (motion.matches) return
    const host = hostRef.current
    if (!host) return

    // `timer` stays non-zero after it fires, so it also guards against a
    // stale observer callback after cleanup - no separate flag is needed.
    let timer = 0
    const arm = () => {
      if (!timer) timer = window.setTimeout(() => setLoad(true), 1200)
    }
    const onChange = (e: MediaQueryListEvent) => {
      if (!e.matches) return
      window.clearTimeout(timer)
      timer = 0
      setLoad(false)
    }

    motion.addEventListener('change', onChange)
    const observer =
      'IntersectionObserver' in window
        ? new IntersectionObserver(
            ([entry]) => {
              if (entry.isIntersecting) arm()
            },
            { rootMargin: '200px 0px' },
          )
        : null
    if (observer) observer.observe(host)
    else arm()

    return () => {
      window.clearTimeout(timer)
      motion.removeEventListener('change', onChange)
      observer?.disconnect()
    }
  }, [])

  return (
    <div ref={hostRef} aria-hidden="true" className="hero-burn-layer" data-hero-burn>
      {load && (
        <Suspense fallback={null}>
          <HeroBurn hostRef={hostRef} />
        </Suspense>
      )}
    </div>
  )
}
