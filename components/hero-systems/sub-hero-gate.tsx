'use client'

import { lazy, Suspense, useEffect, useState } from 'react'

// The canvas engine is a separate async chunk. It is requested only when the
// reserved 340vh box approaches the viewport, never in the initial JS.
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
    if (!wrap || !('IntersectionObserver' in window)) {
      queueMicrotask(() => setEngaged(true))
      return
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setEngaged(true)
          io.disconnect()
        }
      },
      { rootMargin: '300px 0px' },
    )
    io.observe(wrap)
    return () => io.disconnect()
  }, [])

  return engaged ? (
    <Suspense fallback={null}>
      <SubHero />
    </Suspense>
  ) : null
}
