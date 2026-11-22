'use client'

import { useEffect, useRef, type RefObject } from 'react'
import { sceneIsActive, setSceneInView, subscribeScenes } from './scene-coordinator'

/**
 * Burning paper behind the hero copy. Port of the approved lab engine in
 * design/hero-systems/final.html (makeBurn, the hero's pointer handling and
 * its frame loop), adapted to the live --dm-* palette.
 *
 * Loaded on demand by hero-burn-slot.tsx once the opening hook is over, so the
 * engine never enters the homepage initial bundle. The host is an absolute,
 * aria-hidden overlay provided by the slot and carries the test hooks.
 *
 * Layout is measured only on resize. The scroll listener stores scrollY, the
 * single rAF does all drawing, and the canvas is only as big as the hero box.
 */

type Tone = 'panel' | 'butter' | 'rose' | 'sky' | 'lilac'
type Vertex = [number, number, number, number]
type Scrap = {
  x: number
  y: number
  vx: number
  vy: number
  a: number
  va: number
  v: Vertex[]
  life: number
  dur: number
  ph: number
  tone: Tone
}
type Spark = { x: number; y: number; vx: number; vy: number; l: number; d: number }
type Palette = {
  panel: string
  butter: string
  rose: string
  sky: string
  lilac: string
  ember: string
  glow: string
  shadow: string
  dark: boolean
}
type Pointer = { x: number; y: number; vx: number; vy: number; in: boolean }
type BurnContext = {
  palette: () => Palette
  width: () => number
  height: () => number
  dpr: () => number
  pointer: Pointer
}

const FRAME_BUDGET_MS = 20
const TONES: Tone[] = ['panel', 'panel', 'butter', 'rose', 'sky', 'lilac']
const TAU = Math.PI * 2

const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v))
const rnd = (a = 0, b = 1) => a + Math.random() * (b - a)

function hexToRgb(hex: string): [number, number, number] {
  const c = hex.replace('#', '')
  const full = c.length === 3 ? c.replace(/./g, (x) => x + x) : c.slice(0, 6)
  const n = parseInt(full, 16)
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255]
}

// Darken a token colour toward charred paper. Every colour stays derived from
// a --dm-* token rather than a hex literal in the component.
function charred(tone: string, burn: number): string {
  const [r, g, b] = hexToRgb(tone)
  const k = 1 - Math.pow(burn, 0.8) * 0.82
  return `rgb(${Math.round(r * k)},${Math.round(g * k)},${Math.round(b * k)})`
}

function readPalette(): Palette {
  const root = document.documentElement
  const css = (name: string) => getComputedStyle(root).getPropertyValue(name).trim()
  return {
    panel: css('--dm-panel'),
    butter: css('--dm-butter'),
    rose: css('--dm-rose'),
    sky: css('--dm-sky'),
    lilac: css('--dm-lilac'),
    ember: css('--dm-ember'),
    glow: css('--dm-glow'),
    shadow: css('--dm-shadow'),
    dark: root.dataset.theme === 'dark',
  }
}

function makeBurn(maxN: number, every: number, size: number, ctx: BurnContext) {
  const scraps: Scrap[] = []
  const sparks: Spark[] = []
  let acc = 0
  let t = 0
  let limit = maxN
  let sparksPerBurn = 7

  const spawn = () => {
    const n = 5 + ((Math.random() * 3) | 0)
    const R = rnd(10, 26) * size
    const v: Vertex[] = []
    for (let i = 0; i < n; i++) {
      const a = (i / n) * TAU + rnd(-0.25, 0.25)
      v.push([Math.cos(a), Math.sin(a), R * rnd(0.7, 1.2), rnd(0.5, 1)])
    }
    scraps.push({
      x: rnd(0, ctx.width()),
      y: ctx.height() + 40,
      vx: 0,
      vy: -rnd(0.3, 0.7),
      a: rnd(0, TAU),
      va: rnd(-0.01, 0.01),
      v,
      life: 0,
      dur: rnd(520, 820),
      ph: rnd(0, TAU),
      tone: TONES[(Math.random() * TONES.length) | 0],
    })
  }

  const step = (dt: number, quiet = false) => {
    const f = dt / 16.67
    t += dt
    acc += f
    if (acc > every && scraps.length < limit) {
      acc = 0
      spawn()
    }
    for (const p of scraps) {
      p.life += f / p.dur
      p.vy -= 0.0018 * f
      p.vx *= Math.pow(0.96, f)
      if (!quiet && ctx.pointer.in) {
        const dx = p.x - ctx.pointer.x
        const dy = p.y - ctx.pointer.y
        const d = Math.hypot(dx, dy) || 1
        if (d < 150) {
          const k = (1 - d / 150) * 0.6 * f
          p.vx += (dx / d) * k
          p.vy += (dy / d) * k
        }
      }
      p.x += (p.vx + Math.sin(t * 0.0011 + p.ph) * 0.4) * f
      p.y += p.vy * f
      p.a += p.va * f
      if (p.life >= 1) {
        for (let i = 0; i < sparksPerBurn; i++) {
          sparks.push({
            x: p.x + rnd(-8, 8),
            y: p.y + rnd(-8, 8),
            vx: rnd(-0.7, 0.7) + p.vx * 0.3,
            vy: rnd(-2.2, -0.5),
            l: 1,
            d: rnd(0.012, 0.028),
          })
        }
      }
    }
    // In-place compaction keeps the frame loop free of new arrays.
    let out = 0
    for (let i = 0; i < scraps.length; i += 1) {
      const p = scraps[i]
      if (p.life < 1 && p.y > -80) scraps[out++] = p
    }
    scraps.length = out
    out = 0
    for (let i = 0; i < sparks.length; i += 1) {
      const q = sparks[i]
      q.x += q.vx * f
      q.y += q.vy * f
      q.vy *= Math.pow(0.985, f)
      q.l -= q.d * f
      if (q.l > 0) sparks[out++] = q
    }
    sparks.length = out
  }

  const draw = (c: CanvasRenderingContext2D) => {
    const pal = ctx.palette()
    const dpr = ctx.dpr()
    c.setTransform(dpr, 0, 0, dpr, 0, 0)
    c.clearRect(0, 0, ctx.width(), ctx.height())

    const shape = (p: Scrap, o: number) => {
      const burn = clamp((p.life - 0.35) / 0.65, 0, 1)
      const co = Math.cos(p.a)
      const si = Math.sin(p.a)
      c.beginPath()
      for (let i = 0; i < p.v.length; i += 1) {
        const [cx, cy, r, nz] = p.v[i]
        const rr = r * (1 - burn * (0.55 + 0.45 * nz))
        const lx = cx * rr
        const ly = cy * rr
        const X = p.x + lx * co - ly * si + o
        const Y = p.y + lx * si + ly * co + o
        if (i) c.lineTo(X, Y)
        else c.moveTo(X, Y)
      }
      c.closePath()
      return burn
    }

    c.globalAlpha = 0.35
    c.fillStyle = pal.shadow
    for (const p of scraps) {
      shape(p, 4)
      c.fill()
    }

    for (const p of scraps) {
      const burn = shape(p, 0)
      c.globalAlpha = 0.7
      c.fillStyle = charred(pal[p.tone], burn)
      c.fill()
      if (burn > 0) {
        // A wide translucent pass stands in for canvas shadowBlur, which is
        // a known frame killer when repeated for every scrap on every frame.
        c.strokeStyle = pal.glow
        c.globalAlpha = 0.24
        c.lineWidth = 5 + burn * 4
        c.stroke()
        c.strokeStyle = pal.ember
        c.globalAlpha = 0.85
        c.lineWidth = 1.1 + burn * 1.6
        c.stroke()
      }
    }

    c.globalCompositeOperation = pal.dark ? 'lighter' : 'source-over'
    for (const q of sparks) {
      c.globalAlpha = q.l * 0.9
      c.fillStyle = pal.dark ? pal.ember : pal.glow
      c.beginPath()
      c.arc(q.x, q.y, 1.3, 0, TAU)
      c.fill()
    }
    c.globalAlpha = 1
    c.globalCompositeOperation = 'source-over'
  }

  // Warm up off screen so the hero never starts with an empty sky.
  for (let i = 0; i < 700; i++) step(16.67, true)

  return {
    step,
    draw,
    // Sustained slow frames trim the workload without stopping the effect.
    trim() {
      limit = Math.max(10, Math.floor(limit * 0.7))
      sparksPerBurn = Math.max(3, Math.floor(sparksPerBurn * 0.6))
    },
  }
}

export function HeroBurn({ hostRef }: { hostRef: RefObject<HTMLDivElement | null> }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const host = hostRef.current
    const canvas = canvasRef.current
    if (!host || !canvas) return
    const section = host.closest<HTMLElement>('[data-hero]') ?? host
    const c = canvas.getContext('2d')
    if (!c) return

    const pointer: Pointer = { x: -1e4, y: -1e4, vx: 0, vy: 0, in: false }
    let width = 0
    let height = 0
    let dpr = 1
    let rectLeft = 0
    let rectTopDoc = 0
    let scrollY = window.scrollY
    let palette = readPalette()
    const ctx: BurnContext = {
      palette: () => palette,
      width: () => width,
      height: () => height,
      dpr: () => dpr,
      pointer,
    }
    let burn!: ReturnType<typeof makeBurn>

    let raf = 0
    let last = 0
    let frames = 0
    let slow = 0
    let fast = 0
    let drawStride = 2
    let tick = 0

    const size = () => {
      const phone = section.offsetWidth < 760
      // offsetWidth and offsetHeight are the untransformed hero box. A
      // getBoundingClientRect here would include the opening hook's scale.
      width = section.offsetWidth
      height = section.offsetHeight
      const r = section.getBoundingClientRect()
      rectLeft = r.left
      rectTopDoc = r.top + window.scrollY
      dpr = Math.min(phone ? 1 : 1.5, window.devicePixelRatio || 1)
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      burn = makeBurn(phone ? 16 : 54, 8, 1.25, ctx)
      burn.draw(c)
    }

    const frame = (now: number) => {
      const dt = Math.min(50, last ? now - last : 16.67)
      last = now
      if (dt > FRAME_BUDGET_MS) {
        slow++
        fast = 0
      } else {
        slow = Math.max(0, slow - 1)
        fast++
      }
      // Physics runs every frame. Only the raster work is throttled, so the
      // paper keeps drifting smoothly even when the draw stride widens.
      burn.step(dt)
      // The paper drifts slowly, so a 30 fps draw is enough. Sustained slow
      // frames widen the stride; sustained fast frames narrow it again.
      if (slow > 6 && drawStride < 32) {
        drawStride *= 2
        burn.trim()
        slow = 0
      }
      if (fast > 180 && drawStride > 1) {
        drawStride /= 2
        fast = 0
      }
      tick++
      if (tick % drawStride === 0) burn.draw(c)
      pointer.vx *= 0.8
      pointer.vy *= 0.8
      host.dataset.frames = String(++frames)
      raf = requestAnimationFrame(frame)
    }

    const start = () => {
      if (raf || document.hidden || !sceneIsActive('hero-burn')) return
      last = 0
      slow = 0
      fast = 0
      drawStride = 2
      tick = 0
      host.dataset.running = '1'
      raf = requestAnimationFrame(frame)
    }
    const stop = () => {
      if (raf) cancelAnimationFrame(raf)
      raf = 0
      delete host.dataset.running
    }
    const sync = () => {
      if (sceneIsActive('hero-burn')) start()
      else stop()
    }

    const onMove = (e: PointerEvent) => {
      const x = e.clientX - rectLeft
      const y = e.clientY + scrollY - rectTopDoc
      if (pointer.in) {
        pointer.vx = x - pointer.x
        pointer.vy = y - pointer.y
      }
      pointer.x = x
      pointer.y = y
      pointer.in = true
    }
    const onLeave = () => {
      pointer.in = false
      pointer.x = pointer.y = -1e4
    }
    const onScroll = () => {
      scrollY = window.scrollY
    }
    const onVisibility = () => {
      if (document.hidden) stop()
      else sync()
    }
    const motion = matchMedia('(prefers-reduced-motion: reduce)')
    const onMotionChange = (e: MediaQueryListEvent) => {
      if (!e.matches) return
      stop()
    }

    section.addEventListener('pointermove', onMove, { passive: true })
    section.addEventListener('pointerleave', onLeave, { passive: true })
    window.addEventListener('scroll', onScroll, { passive: true })
    document.addEventListener('visibilitychange', onVisibility)
    motion.addEventListener('change', onMotionChange)
    const unsubscribe = subscribeScenes(sync)

    const observer =
      'IntersectionObserver' in window
        ? new IntersectionObserver(([entry]) => {
            setSceneInView('hero-burn', entry.isIntersecting)
          })
        : null
    if (observer) observer.observe(section)
    else setSceneInView('hero-burn', true)

    const themeObserver = new MutationObserver(() => {
      palette = readPalette()
    })
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })

    let resizeTimer = 0
    let lastW = 0
    let lastH = 0
    const onResize = () => {
      if (Math.abs(section.offsetWidth - lastW) < 2 && Math.abs(section.offsetHeight - lastH) < 2) return
      lastW = section.offsetWidth
      lastH = section.offsetHeight
      window.clearTimeout(resizeTimer)
      resizeTimer = window.setTimeout(size, 150)
    }
    const resizeObserver = 'ResizeObserver' in window ? new ResizeObserver(onResize) : null
    if (resizeObserver) resizeObserver.observe(section)
    else addEventListener('resize', onResize)

    size()
    lastW = width
    lastH = height
    setSceneInView(
      'hero-burn',
      rectTopDoc < window.scrollY + window.innerHeight && rectTopDoc + height > window.scrollY,
    )
    sync()

    return () => {
      stop()
      setSceneInView('hero-burn', false)
      unsubscribe()
      window.clearTimeout(resizeTimer)
      section.removeEventListener('pointermove', onMove)
      section.removeEventListener('pointerleave', onLeave)
      window.removeEventListener('scroll', onScroll)
      document.removeEventListener('visibilitychange', onVisibility)
      motion.removeEventListener('change', onMotionChange)
      observer?.disconnect()
      themeObserver.disconnect()
      if (resizeObserver) resizeObserver.disconnect()
      else removeEventListener('resize', onResize)
      c.setTransform(1, 0, 0, 1, 0, 0)
      c.clearRect(0, 0, canvas.width, canvas.height)
    }
  }, [hostRef])

  return <canvas ref={canvasRef} aria-hidden="true" className="hero-burn-canvas" data-hero-burn-canvas />
}
