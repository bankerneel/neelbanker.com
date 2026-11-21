'use client'

import { useEffect, useRef } from 'react'
import {
  chainHead,
  clamp,
  drawTicker,
  eraFromP,
  fmt,
  makeEras,
  readPalette,
  type Chain,
  type EraSystem,
  type Palette,
  type Pointer,
  type Rect,
} from './engine'

const ERA_LINKS = [
  { k: 'case study', t: 'DocTrace on Hyperledger Fabric', chip: 'DocTrace on Fabric', href: '/projects/doctrace-fabric-documents' },
  { k: 'case study', t: 'Project Atlas · multi-chain wallet', chip: 'Project Atlas', href: '/projects/atlas-multichain-wallet' },
  { k: 'writing', t: 'AI agents that execute on chain', chip: 'AI agents on chain', href: '/writing/ai-agents-on-chain' },
] as const

/**
 * The pinned career map. Server-rendered heading and real links live in the
 * HTML; the canvas is decoration and is aria-hidden. One rAF reads scroll at
 * most once, from a passive listener, and all layout is measured only on
 * resize or theme change, never per frame.
 */
export function SubHero() {
  const wrapRef = useRef<HTMLElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const headRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const chipRef = useRef<HTMLAnchorElement>(null)
  const labelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const wrap = wrapRef.current
    const stage = stageRef.current
    const head = headRef.current
    const canvas = canvasRef.current
    const chip = chipRef.current
    const label = labelRef.current
    if (!wrap || !stage || !head || !canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)')
    let raf = 0
    let last = 0
    let W = 0
    let H = 0
    let DPR = 1
    let navH = 64
    let sectionTop = 0
    let span = 1
    let scrollY = window.scrollY
    let needsScroll = true
    let visible = true
    let R: Rect = { x: 16, y: 0, w: 0, h: 0 }
    let E: EraSystem | null = null
    let pal: Palette = readPalette(document.documentElement)
    let ef = 0
    let vel = 0
    let eraShown = -2
    let labelShown = ''
    const ptr: Pointer = { x: -1e4, y: -1e4, vx: 0, vy: 0, in: false }
    const chain: Chain = { n: 0, hash: '', at: 0, live: false, busy: false, last: 0 }

    wrap.dataset.motion = reduce.matches ? 'reduced' : 'full'

    const progress = () => {
      if (needsScroll) {
        scrollY = window.scrollY
        needsScroll = false
      }
      return clamp((scrollY + navH - sectionTop) / span, 0, 1)
    }

    const measure = () => {
      const wr = wrap.getBoundingClientRect()
      const sr = stage.getBoundingClientRect()
      const hb = head.getBoundingClientRect()
      navH = document.querySelector('header')?.getBoundingClientRect().height ?? 64
      wrap.style.setProperty('--sub-nav-h', `${Math.round(navH)}px`)
      sectionTop = wr.top + window.scrollY
      span = Math.max(1, wr.height - sr.height)
      W = sr.width
      H = sr.height
      DPR = Math.min(2, window.devicePixelRatio || 1)
      canvas.width = Math.round(W * DPR)
      canvas.height = Math.round(H * DPR)
      if (W < 760) {
        // Phone: heading on top, graph below it.
        const y = hb.bottom - sr.top + 24
        R = { x: 16, y, w: Math.max(80, W - 32), h: Math.max(120, H - y - 50), narrow: true }
      } else {
        const x = Math.max(W * 0.36, hb.right - sr.left + 56)
        R = { x, y: 52, w: Math.max(120, W - x - 28), h: Math.max(120, H - 104), narrow: false }
      }
      E = makeEras(
        { ...R, y: R.y + 66, h: R.h - 66 },
        R.narrow ? 26 : 42,
        { wrap: false, K: R.narrow ? 1.25 : 1.75, radF: 0.42, ticker: false },
      )
      ef = reduce.matches ? 1 : eraFromP(progress())
      vel = 0
      eraShown = -2
      labelShown = ''
      needsScroll = true
    }

    const showChip = (k: number, strong: boolean) => {
      if (!chip) return
      if (k < 0 || !strong) {
        if (eraShown !== -1) {
          chip.style.display = 'none'
          chip.dataset.visible = 'false'
          eraShown = -1
        }
        return
      }
      if (eraShown === k && chip.dataset.visible === 'true') return
      const link = ERA_LINKS[k]
      chip.href = link.href
      chip.dataset.visible = 'true'
      chip.style.display = 'inline-flex'
      chip.replaceChildren()
      const kind = document.createElement('b')
      kind.textContent = link.k
      chip.append(kind, document.createTextNode(` ${link.chip} →`))
      chip.style.left = `${R.x}px`
      chip.style.top = `${R.y + 28}px`
      eraShown = k
    }

    const setLabel = (s: string) => {
      if (s !== labelShown && label) {
        label.textContent = s
        labelShown = s
      }
    }

    const frame = (dt: number, now: number) => {
      if (!E) return
      const sp = progress()
      const target = eraFromP(sp)
      if (reduce.matches) {
        // No pin and no scrub: hold the web3 graph still.
        ef = 1
        vel = 0
      } else {
        // Critically damped spring, omega 9, exactly as in the source.
        const h = Math.min(dt, 34) / 1000
        const om = 9
        vel += (om * om * (target - ef) - 2 * om * vel) * h
        ef = clamp(ef + vel * h, 0, 2)
      }
      E.scrub = sp
      E.update(now, ef)
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0)
      ctx.clearRect(0, 0, W, H)
      const ws = E.w(ef)
      const k = ws.indexOf(Math.max(...ws))
      drawTicker(ctx, R, ws, E.scrub, pal)
      showChip(reduce.matches ? -1 : k, ws[k] > 0.85)
      E.draw(ctx, now, ef, pal, ptr)
      ptr.vx *= 0.8
      ptr.vy *= 0.8
      if (!reduce.matches && k === 0 && now - chain.last > 12000) void chainHead(chain)
      let text = E.label(ef)
      if (k === 0 && !reduce.matches) {
        text = chain.live
          ? `ethereum mainnet · head #${fmt(chain.n + Math.floor((now - chain.at) / 12000))} · ${chain.hash} · live`
          : `blockchain · block #${fmt(E.block)} · ${E.hash} · simulated`
      }
      setLabel(`${text} · scroll ${Math.round(sp * 100)}%`)
    }

    const loop = (now: number) => {
      if (visible) {
        const dt = Math.min(50, last ? now - last : 16.67)
        last = now
        frame(dt, now)
      }
      raf = requestAnimationFrame(loop)
    }

    const start = () => {
      cancelAnimationFrame(raf)
      pal = readPalette(document.documentElement)
      measure()
      if (reduce.matches) frame(16.67, performance.now())
      else {
        last = 0
        raf = requestAnimationFrame(loop)
      }
    }

    const onScroll = () => {
      needsScroll = true
    }
    const onPointerMove = (e: PointerEvent) => {
      const r = stage.getBoundingClientRect()
      const x = e.clientX - r.left
      const y = e.clientY - r.top
      if (ptr.in) {
        ptr.vx = x - ptr.x
        ptr.vy = y - ptr.y
      }
      ptr.x = x
      ptr.y = y
      ptr.in = true
    }
    const onPointerLeave = () => {
      ptr.in = false
      ptr.x = -1e4
      ptr.y = -1e4
    }
    const onPointerDown = (e: PointerEvent) => {
      if (!E) return
      const r = stage.getBoundingClientRect()
      E.burst(e.clientX - r.left, e.clientY - r.top, performance.now(), ef)
    }
    const stopChipPointer = (e: Event) => e.stopPropagation()

    window.addEventListener('scroll', onScroll, { passive: true })
    stage.addEventListener('pointermove', onPointerMove, { passive: true })
    stage.addEventListener('pointerleave', onPointerLeave, { passive: true })
    stage.addEventListener('pointerdown', onPointerDown, { passive: true })
    chip?.addEventListener('pointerdown', stopChipPointer)

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      last = 0
    })
    io.observe(wrap)

    let resizeTimer = 0
    const ro = new ResizeObserver(() => {
      clearTimeout(resizeTimer)
      resizeTimer = window.setTimeout(start, 120)
    })
    ro.observe(wrap)

    const themeObserver = new MutationObserver(() => start())
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })
    reduce.addEventListener('change', start)

    start()

    return () => {
      cancelAnimationFrame(raf)
      clearTimeout(resizeTimer)
      window.removeEventListener('scroll', onScroll)
      stage.removeEventListener('pointermove', onPointerMove)
      stage.removeEventListener('pointerleave', onPointerLeave)
      stage.removeEventListener('pointerdown', onPointerDown)
      chip?.removeEventListener('pointerdown', stopChipPointer)
      io.disconnect()
      ro.disconnect()
      themeObserver.disconnect()
      reduce.removeEventListener('change', start)
    }
  }, [])

  return (
    <section id="sub" ref={wrapRef} className="sub-hero" data-sub-hero aria-labelledby="sub-heading">
      <div id="subStage" ref={stageRef} className="sub-stage">
        <canvas ref={canvasRef} className="sub-canvas" aria-hidden="true" />

        <div className="page-wrap sub-pw">
          <div id="subHead" ref={headRef} className="sub-head">
            <span className="ticket tone-panel -rotate-1">Seven years, three eras</span>
            <h2 id="sub-heading">
              Blockchain <span className="text-dm-accent-ink">→</span> Web3 <span className="text-dm-accent-ink">→</span> AI agents
            </h2>
            <p>Scroll to walk through the work. Each era links to the real thing: a case study or a post.</p>
            <span className="sub-hand hand">keep scrolling ↓</span>
          </div>
        </div>

        <a
          id="eraLink"
          ref={chipRef}
          className="sub-era-link cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-dm-panel"
          href={ERA_LINKS[0].href}
          data-visible="false"
        >
          <b>{ERA_LINKS[0].k}</b> {ERA_LINKS[0].chip} →
        </a>

        <div id="subLabel" ref={labelRef} className="sub-label" aria-hidden="true" />

        <ul className="sub-sr-links" aria-label="All three eras">
          {ERA_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-dm-panel"
              >
                <b>{link.k}</b> {link.t} →
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
