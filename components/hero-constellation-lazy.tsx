'use client'

import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'

const HeroConstellation = dynamic(
  () => import('@/components/hero-constellation').then((m) => m.HeroConstellation),
  { ssr: false },
)

/**
 * Mounts the desktop constellation only on large viewports, after hydration,
 * so its chunk never loads on mobile and never blocks first paint.
 */
export function HeroConstellationLazy() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)')
    const update = () => setShow(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  if (!show) return null
  return <HeroConstellation />
}
