'use client'

import { useEffect, useRef, useState } from 'react'
import type { ParticleMount } from './types'

// The loader is the only particle code in a route's initial bundle. three and
// the scene module are fetched by dynamic import once this empty box comes
// within 200px of the viewport, well after first paint.

type SceneName = 'glyph-drift' | 'ember-field'
type EmberState = 'pending' | 'ready' | 'fallback'

/** One short lived capability probe. No renderer and no canvas is kept. */
function hasWebGL2(): boolean {
  try {
    const canvas = document.createElement('canvas')
    const gl = canvas.getContext('webgl2')
    if (!gl) return false
    gl.getExtension('WEBGL_lose_context')?.loseContext()
    return true
  } catch {
    return false
  }
}

/** Static, on-theme still for every WebGL failure path. No canvas, no error. */
function EmberFallback() {
  return (
    <div className="ember-fallback" aria-hidden="true">
      <span className="ember-fallback-sun tone-butter" />
      <span className="ember-fallback-spark ember-fallback-spark-a tone-butter" />
      <span className="ember-fallback-spark ember-fallback-spark-b tone-rose" />
      <span className="ember-fallback-spark ember-fallback-spark-c tone-terra" />
      <span className="ember-fallback-spark ember-fallback-spark-d tone-rose" />
      <span className="ember-fallback-spark ember-fallback-spark-e tone-terra" />
      <span className="ember-fallback-spark ember-fallback-spark-f tone-butter" />
      <span className="ember-fallback-spark ember-fallback-spark-g tone-rose" />
      <span className="ember-fallback-swatches pat-dots" />
    </div>
  )
}

export function ParticleSlot({ scene, className = '' }: { scene: SceneName; className?: string }) {
  const hostRef = useRef<HTMLDivElement>(null)
  const [emberState, setEmberState] = useState<EmberState>(scene === 'ember-field' ? 'pending' : 'ready')

  useEffect(() => {
    const host = hostRef.current
    if (!host) return
    if (!hasWebGL2()) {
      // No WebGL2 means the shared renderer cannot be built. Ember shows its
      // on-theme still; Glyph Drift simply stays an empty reserved box.
      setEmberState('fallback')
      return
    }

    let cancelled = false
    let mount: ParticleMount | null = null
    let canvas: HTMLCanvasElement | null = null
    let onLost: (() => void) | null = null

    const fail = () => {
      if (cancelled) return
      cancelled = true
      if (canvas && onLost) canvas.removeEventListener('webglcontextlost', onLost, true)
      canvas = null
      try {
        mount?.dispose()
      } catch {
        // A failed renderer can fail to dispose; the still must still show.
      }
      mount = null
      host.querySelectorAll('canvas.particle-canvas').forEach((el) => el.remove())
      setEmberState('fallback')
    }

    const handleLost = () => fail()
    onLost = handleLost

    const load = () => {
      const sceneModule = scene === 'glyph-drift' ? import('./glyph-drift') : import('./ember-field')
      Promise.all([import('./runtime'), sceneModule])
        .then(([runtime, module]) => {
          if (cancelled) return
          try {
            mount = runtime.mountParticleScene(host, module.default)
            mount.activate()
            canvas = host.querySelector('canvas.particle-canvas')
            canvas?.addEventListener('webglcontextlost', handleLost, true)
            setEmberState('ready')
          } catch {
            fail()
          }
        })
        .catch(fail)
    }

    let observer: IntersectionObserver | null = null
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
      if (canvas && onLost) canvas.removeEventListener('webglcontextlost', onLost, true)
      try {
        mount?.dispose()
      } catch {
        // Navigation teardown never surfaces an error to the page.
      }
    }
  }, [scene])

  return (
    <div
      ref={hostRef}
      aria-hidden="true"
      className={`particle-slot ${className}`}
      data-particle-scene={scene}
      data-ember-state={scene === 'ember-field' ? emberState : undefined}
    >
      {scene === 'ember-field' && emberState === 'fallback' && <EmberFallback />}
    </div>
  )
}
