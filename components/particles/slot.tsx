'use client'

import { useEffect, useRef } from 'react'
import type { ParticleMount } from './types'

// The slot is the only particle code in a route's initial bundle. three and
// the scene module are fetched by dynamic import once this empty box comes
// within 200px of the viewport, well after first paint.

type SceneName = 'glyph-drift'

export function ParticleSlot({ scene, className = '' }: { scene: SceneName; className?: string }) {
  const hostRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const host = hostRef.current
    if (!host) return
    let cancelled = false
    let mount: ParticleMount | null = null
    let observer: IntersectionObserver | null = null

    const load = () => {
      Promise.all([
        import('./runtime'),
        scene === 'glyph-drift' ? import('./glyph-drift') : Promise.resolve(null),
      ])
        .then(([runtime, module]) => {
          if (cancelled || !module) return
          mount = runtime.mountParticleScene(host, module.default)
          mount.activate()
        })
        .catch(() => {})
    }

    if ('IntersectionObserver' in window) {
      observer = new IntersectionObserver(
        (entries) => {
          if (!entries.some((entry) => entry.isIntersecting)) return
          observer?.disconnect()
          observer = null
          load()
        },
        { rootMargin: '200px' },
      )
      observer.observe(host)
    } else {
      load()
    }

    return () => {
      cancelled = true
      observer?.disconnect()
      mount?.dispose()
    }
  }, [scene])

  return <div ref={hostRef} aria-hidden="true" className={`particle-slot ${className}`} />
}
