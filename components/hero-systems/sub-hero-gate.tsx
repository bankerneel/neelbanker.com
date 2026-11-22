'use client'

import { lazy, Suspense, useEffect, useState } from 'react'
import { afterLoad, scheduleAfterIdle } from '@/lib/idle'

// The canvas engine is a separate async chunk. It is requested only when the
// reserved box approaches the viewport and the main thread is idle after
// first paint, never in the initial JS or ahead of the LCP element.
const SubHero = lazy(() => import('./sub-hero').then((m) => ({ default: m.SubHero })))

/** Tiny client gate: observes the server-rendered box, then mounts the scene. */
export function SubHeroGate() {
  const [engaged, setEngaged] = useState(false)

  useEffect(() => {
    const wrap = document.getElementById('sub')
    if (wrap) {
      const nav = document.querySelector('header')?.getBoundingClientRect().height ?? 64
      wrap.style.setProperty('--sub-nav-h', `${Math.round(nav)}px`)
      wrap.dataset.motion = matchMedia('(prefers-reduced-motion: reduce)').matches ? 'reduced' : 'full'
    }

    let cancelLoad: (() => void) | null = null
    let cancelIdle: (() => void) | null = null
    let queued = false
    const arm = () => {
      if (queued) return
      queued = true
      cancelLoad = afterLoad(() => {
        cancelIdle = scheduleAfterIdle(() => setEngaged(true), 1600)
      })
    }

    if (!wrap || !('IntersectionObserver' in window)) {
      arm()
      return () => {
        cancelLoad?.()
        cancelIdle?.()
      }
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          arm()
          io.disconnect()
        }
      },
      { rootMargin: '300px 0px' },
    )
    io.observe(wrap)
    return () => {
      io.disconnect()
      cancelLoad?.()
      cancelIdle?.()
    }
  }, [])

  return engaged ? (
    <Suspense fallback={null}>
      <SubHero />
    </Suspense>
  ) : null
}
