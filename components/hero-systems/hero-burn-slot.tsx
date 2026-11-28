'use client'

import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { afterLoad, scheduleAfterIdle } from '@/lib/idle'

/**
 * Tiny client slot for the burning paper. The engine is a separate chunk that
 * is only requested once the opening hook is over, the hero is near the
 * viewport and the browser is idle after first paint. It never enters the
 * homepage initial bundle and cannot count against the critical paint work.
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

    let timer = 0
    let cancelLoad: (() => void) | null = null
    let cancelIdle: (() => void) | null = null
    let armed = false

    const clear = () => {
      window.clearTimeout(timer)
      timer = 0
      cancelLoad?.()
      cancelLoad = null
      cancelIdle?.()
      cancelIdle = null
      armed = false
    }
    const arm = () => {
      if (armed) return
      armed = true
      timer = window.setTimeout(() => {
        cancelLoad = afterLoad(() => {
          cancelIdle = scheduleAfterIdle(() => setLoad(true), 1600)
        })
      }, 1200)
    }
    const onChange = (e: MediaQueryListEvent) => {
      if (!e.matches) return
      clear()
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
      clear()
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
