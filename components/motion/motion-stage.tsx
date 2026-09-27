'use client'

import { useEffect } from 'react'

/**
 * The homepage film's only JavaScript (app/motion.css does the rest):
 * - marks [data-reveal] / [data-sd] elements as shown when they scroll in
 *   (time-based reveals, and the fallback where scroll timelines are missing);
 * - pauses the hero's ambient loops while it is off-screen;
 * - desktop mice only: hero parallax, a spotlight that follows the pointer
 *   across the night set, and magnetic call-to-action buttons;
 * - starts the living sky (sky-shader.ts) once the page has loaded and gone
 *   idle, so WebGL never competes with the first paint.
 * `html.motion-ready` is added only after anything already on screen is
 * marked shown, so no-JS visitors and the first paint never hide content.
 */
export function MotionStage() {
  useEffect(() => {
    const root = document.documentElement
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches
    const finePointer = matchMedia('(hover: hover) and (pointer: fine)').matches
    const cleanups: Array<() => void> = []
    let cancelled = false
    cleanups.push(() => {
      cancelled = true
    })

    // ── reveals ────────────────────────────────────────────────────────
    const targets = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal], [data-sd]'))
    const vh = innerHeight
    for (const el of targets) {
      const r = el.getBoundingClientRect()
      if (r.top < vh && r.bottom > 0) el.dataset.shown = ''
    }
    root.classList.add('motion-ready')
    cleanups.push(() => root.classList.remove('motion-ready'))

    if ('IntersectionObserver' in window) {
      const reveal = new IntersectionObserver(
        (entries) => {
          for (const e of entries) {
            if (!e.isIntersecting) continue
            ;(e.target as HTMLElement).dataset.shown = ''
            reveal.unobserve(e.target)
          }
        },
        { rootMargin: '0px 0px -12% 0px' },
      )
      targets.filter((el) => !('shown' in el.dataset)).forEach((el) => reveal.observe(el))
      cleanups.push(() => reveal.disconnect())

      const ambient = new IntersectionObserver((entries) => {
        for (const e of entries) (e.target as HTMLElement).dataset.inview = String(e.isIntersecting)
      })
      document.querySelectorAll('[data-ambient]').forEach((el) => ambient.observe(el))
      cleanups.push(() => ambient.disconnect())
    } else {
      targets.forEach((el) => (el.dataset.shown = ''))
    }

    // ── pointer: parallax, spotlight, magnets (desktop mice only) ─────────
    if (!reduce && finePointer) {
      const listen = (el: HTMLElement, type: 'pointermove' | 'pointerleave', fn: (e: PointerEvent) => void) => {
        el.addEventListener(type, fn as EventListener, { passive: true })
        cleanups.push(() => el.removeEventListener(type, fn as EventListener))
      }
      const throttled = (fn: (e: PointerEvent) => void) => {
        let frame = 0
        let last: PointerEvent
        cleanups.push(() => cancelAnimationFrame(frame))
        return (e: PointerEvent) => {
          last = e
          if (!frame)
            frame = requestAnimationFrame(() => {
              frame = 0
              fn(last)
            })
        }
      }

      const hero = document.querySelector<HTMLElement>('[data-hero]')
      if (hero)
        listen(
          hero,
          'pointermove',
          throttled((e) => {
            hero.style.setProperty('--mx', ((e.clientX / innerWidth) * 2 - 1).toFixed(3))
            hero.style.setProperty('--my', ((e.clientY / innerHeight) * 2 - 1).toFixed(3))
          }),
        )

      document.querySelectorAll<HTMLElement>('[data-spotlight]').forEach((band) => {
        listen(
          band,
          'pointermove',
          throttled((e) => {
            const box = band.getBoundingClientRect()
            band.style.setProperty('--sx', `${Math.round(e.clientX - box.left)}px`)
            band.style.setProperty('--sy', `${Math.round(e.clientY - box.top)}px`)
            band.dataset.lit = ''
          }),
        )
        listen(band, 'pointerleave', () => delete band.dataset.lit)
      })

      document.querySelectorAll<HTMLElement>('[data-magnetic]').forEach((el) => {
        listen(
          el,
          'pointermove',
          throttled((e) => {
            const box = el.getBoundingClientRect()
            const dx = (e.clientX - (box.left + box.width / 2)) / (box.width / 2)
            const dy = (e.clientY - (box.top + box.height / 2)) / (box.height / 2)
            el.style.setProperty('--gx', `${(dx * 7).toFixed(1)}px`)
            el.style.setProperty('--gy', `${(dy * 5).toFixed(1)}px`)
          }),
        )
        listen(el, 'pointerleave', () => {
          el.style.removeProperty('--gx')
          el.style.removeProperty('--gy')
        })
      })
    }

    // ── the living sky ───────────────────────────────────────────────────
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData
    if (!reduce && !saveData) {
      const whenIdle = (fn: () => void) =>
        'requestIdleCallback' in window ? requestIdleCallback(fn, { timeout: 2500 }) : setTimeout(fn, 1200)
      const start = () =>
        import('./sky-shader').then(({ startShaderSky }) => {
          if (!cancelled) cleanups.push(startShaderSky())
        })
      if (document.readyState === 'complete') whenIdle(start)
      else addEventListener('load', () => whenIdle(start), { once: true })
    }

    return () => cleanups.forEach((fn) => fn())
  }, [])

  return null
}
