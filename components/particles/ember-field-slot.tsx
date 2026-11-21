'use client'

import { usePathname } from 'next/navigation'
import { ParticleSlot } from './slot'

/**
 * The Ember Field is homepage chrome only. This client boundary emits no DOM
 * and starts no effect on any other route, so their footer is byte for byte
 * the same as before the particle work.
 */
export function EmberFieldSlot() {
  const pathname = usePathname()
  if (pathname !== '/') return null
  return <ParticleSlot scene="ember-field" className="ember-slot" />
}
