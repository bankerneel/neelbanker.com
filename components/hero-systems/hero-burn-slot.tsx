'use client'

import { useEffect, useRef, useState } from 'react'
import dynamic from 'next/dynamic'

/**
 * Tiny client slot for the burning paper. The engine is a separate chunk that
 * is only requested once the opening hook has finished and the hero is near
 * the viewport, so it never enters the homepage initial bundle.
 *
 * The host is an absolute, aria-hidden overlay, so it needs no placeholder
 * height and cannot shift the layout when the canvas arrives.
 */

const HeroBurn = dynamic(() => import('./hero-burn').then((m) => m.HeroBurn), { ssr: false })

const HOOK_MS = 1200

export function HeroBurnSlot() {
  const hostRef = useRef<HTMLDivElement>(null)
  const [load, setLoad] = useState(false)

  useEffect(() => {
    const motion = matchMedia('(prefers-reduced-motion: reduce)')
    if (motion.matches) return
    const host = hostRef.current
    if (!host) return

    let near = false
    let timer = 0
    let cancelled = false

    const arm = () => {
      if (!near || timer || cancelled) return
      timer = window.setTimeout(() => setLoad(true), HOOK_MS)
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
              near = entry.isIntersecting
              if (near) arm()
            },
            { rootMargin: '200px 0px' },
          )
        : null
    if (observer) observer.observe(host)
    else {
      near = true
      arm()
    }

    return () => {
      cancelled = true
      window.clearTimeout(timer)
      motion.removeEventListener('change', onChange)
      observer?.disconnect()
    }
  }, [])

  return (
    <div ref={hostRef} aria-hidden="true" className="hero-burn-layer" data-hero-burn>
      {load && <HeroBurn hostRef={hostRef} />}
    </div>
  )
}
