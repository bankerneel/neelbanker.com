'use client'

import { useEffect } from 'react'
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
import { sceneIsActive, setSceneInView, subscribeScenes } from './scene-coordinator'

const FRAME_BUDGET_MS = 20

const ERA_LINKS = [
  { k: 'case study', t: 'DocTrace on Hyperledger Fabric', chip: 'DocTrace on Fabric', href: '/projects/doctrace-fabric-documents' },
  { k: 'case study', t: 'Project Atlas · multi-chain wallet', chip: 'Project Atlas', href: '/projects/atlas-multichain-wallet' },
  { k: 'writing', t: 'AI agents that execute on chain', chip: 'AI agents on chain', href: '/writing/ai-agents-on-chain' },
] as const

/**
 * The pinned career map engine. The slot owns the server-rendered section,
 * heading, links and canvas element; this module only enhances that DOM.
 * One rAF reads scroll once per frame. Layout is measured on resize and theme
 * changes only, and pointer coordinates come from cached geometry. The scene
 * coordinator makes sure the burning paper is paused while this one is pinned.
 */
export function SubHero() {
  useEffect(() => {
    const wrap = document.getElementById('sub')
    const stage = document.getElementById('subStage')
    const head = document.getElementById('subHead')
    const canvas = document.querySelector<HTMLCanvasElement>('#sub .sub-canvas')
    const chip = document.getElementById('eraLink') as HTMLAnchorElement | null
    const label = document.getElementById('subLabel')
    if (!wrap || !stage || !head || !canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)')
    let raf = 0
    let last = 0
    let slow = 0
    let fast = 0
    let drawStride = 2
    let tick = 0
    let W = 0
    let H = 0
    let DPR = 1
    let navH = 64
    let sectionTop = 0
    let span = 1
    let stageLeft = 0
    let stageTopDoc = 0
    let scrollY = window.scrollY
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

    const progress = () => clamp((scrollY + navH - sectionTop) / span, 0, 1)

    // The sticky stage is at navH while pinned. Outside the pin we derive its
    // viewport top from cached document coordinates, never from layout.
    const stageTopNow = () => {
      if (scrollY < sectionTop - navH) return stageTopDoc - scrollY
      if (scrollY > sectionTop + span - navH) return sectionTop + span - scrollY
      return navH
    }

    const measure = () => {
      scrollY = window.scrollY
      const wr = wrap.getBoundingClientRect()
      const sr = stage.getBoundingClientRect()
      const hb = head.getBoundingClientRect()
      navH = document.querySelector('header')?.getBoundingClientRect().height ?? 64
      wrap.style.setProperty('--sub-nav-h', `${Math.round(navH)}px`)
      sectionTop = wr.top + scrollY
      stageLeft = sr.left
      stageTopDoc = sr.top + scrollY
      span = Math.max(1, wr.height - sr.height)
      W = sr.width
      H = sr.height
      DPR = 1
      canvas.width = Math.round(W * DPR)
      canvas.height = Math.round(H * DPR)
      if (W < 760) {
        const y = hb.bottom - sr.top + 24
        R = { x: 16, y, w: Math.max(80, W - 32), h: Math.max(120, H - y - 50), narrow: true }
      } else {
        const x = Math.max(W * 0.36, hb.right - sr.left + 56)
        R = { x, y: 52, w: Math.max(120, W - x - 28), h: Math.max(120, H - 104), narrow: false }
      }
      E = makeEras(
        { ...R, y: R.y + 66, h: R.h - 66 },
        R.narrow ? 16 : 32,
        { wrap: false, K: R.narrow ? 1.25 : 1.75, radF: 0.42, ticker: false },
      )
      ef = reduce.matches ? 1 : eraFromP(progress())
      vel = 0
      eraShown = -2
      labelShown = ''
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

    // The spring and the scroll readout advance on every rAF. Only the graph
    // raster is throttled when the device cannot keep up.
    const advance = (dt: number) => {
      scrollY = window.scrollY
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
      return sp
    }

    const frame = (now: number, sp: number) => {
      if (!E) return
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
      if (!E || !visible || !sceneIsActive('sub-hero')) {
        raf = 0
        return
      }
      const dt = Math.min(50, last ? now - last : 16.67)
      last = now
      if (dt > FRAME_BUDGET_MS) {
        slow++
        fast = 0
      } else {
        slow = Math.max(0, slow - 1)
        fast++
      }
      // The graph is decorative, so it draws at 30 fps and widens the stride
      // under sustained load. The spring and readout still run every frame.
      if (slow > 6 && drawStride < 32) {
        drawStride *= 2
        slow = 0
      }
      if (fast > 180 && drawStride > 1) {
        drawStride /= 2
        fast = 0
      }
      const sp = advance(dt)
      tick++
      if (tick % drawStride === 0) frame(now, sp)
      raf = requestAnimationFrame(loop)
    }

    const start = () => {
      if (raf) cancelAnimationFrame(raf)
      raf = 0
      tick = 0
      slow = 0
      fast = 0
      drawStride = 2
      pal = readPalette(document.documentElement)
      measure()
      syncPin()
      if (reduce.matches) frame(performance.now(), advance(16.67))
      else sync()
    }

    const sync = () => {
      if (reduce.matches || !E) return
      if (sceneIsActive('sub-hero') && visible && !raf) {
        last = 0
        raf = requestAnimationFrame(loop)
      } else if (!sceneIsActive('sub-hero') || !visible) {
        if (raf) cancelAnimationFrame(raf)
        raf = 0
      }
    }

    const onPointerMove = (e: PointerEvent) => {
      const x = e.clientX - stageLeft
      const y = e.clientY - stageTopNow()
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
      E.burst(e.clientX - stageLeft, e.clientY - stageTopNow(), performance.now(), ef)
    }
    const stopChipPointer = (e: Event) => e.stopPropagation()

    stage.addEventListener('pointermove', onPointerMove, { passive: true })
    stage.addEventListener('pointerleave', onPointerLeave, { passive: true })
    stage.addEventListener('pointerdown', onPointerDown, { passive: true })
    chip?.addEventListener('pointerdown', stopChipPointer)

    const syncPin = () => {
      const pinned = E !== null && scrollY + navH >= sectionTop && scrollY + navH <= sectionTop + span
      setSceneInView('sub-hero', visible && pinned)
    }
    const onScroll = () => {
      // Store scroll only. No draw and no layout read happens in this handler.
      scrollY = window.scrollY
      syncPin()
    }
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      last = 0
      syncPin()
    })
    io.observe(wrap)
    window.addEventListener('scroll', onScroll, { passive: true })
    const unsubscribe = subscribeScenes(sync)

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
      if (raf) cancelAnimationFrame(raf)
      raf = 0
      clearTimeout(resizeTimer)
      window.removeEventListener('scroll', onScroll)
      setSceneInView('sub-hero', false)
      unsubscribe()
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

  return null
}
