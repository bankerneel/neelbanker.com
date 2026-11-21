import * as THREE from 'three'
import type {
  ParticleMount,
  ParticlePalette,
  ParticleSceneContext,
  ParticleSceneDefinition,
  ParticleSceneHandle,
} from './types'

// One renderer, one scene, one camera and one frame loop for the 404 page.
// three is imported only by this module and by the scene, both of which are
// reached through a dynamic import in slot.tsx, so no other route loads it.

const MAX_DPR = 2
const PHONE_DPR = 1.5
const TOKENS: Array<[keyof ParticlePalette, string]> = [
  ['butter', '--dm-butter'],
  ['lilac', '--dm-lilac'],
  ['sky', '--dm-sky'],
  ['accentInk', '--dm-accent-ink'],
  ['nightInk', '--dm-night-ink'],
  ['panel', '--dm-panel'],
  ['ink', '--dm-ink'],
]

export interface ParticleDebugState {
  running: boolean
  reduced: boolean
  frames: number
  canvas: boolean
  scene: string | null
  word: string | null
  width: number
  height: number
}

declare global {
  interface Window {
    __NB_PARTICLES_404__?: { getState(): ParticleDebugState }
  }
}

function readPalette(): ParticlePalette {
  const style = getComputedStyle(document.documentElement)
  const palette = {} as ParticlePalette
  for (const [key, token] of TOKENS) palette[key] = style.getPropertyValue(token).trim()
  return palette
}

function isPhone(): boolean {
  return window.innerWidth < 720 || window.matchMedia('(pointer: coarse)').matches
}

function dprCap(): number {
  return Math.min(isPhone() ? PHONE_DPR : MAX_DPR, window.devicePixelRatio || 1)
}

export function mountParticleScene(container: HTMLElement, definition: ParticleSceneDefinition): ParticleMount {
  let renderer: THREE.WebGLRenderer | null = null
  let scene: THREE.Scene | null = null
  let camera: THREE.PerspectiveCamera | null = null
  let canvas: HTMLCanvasElement | null = null
  let handle: ParticleSceneHandle | null = null

  let raf = 0
  let lastTime = 0
  let elapsed = 0
  let framesRendered = 0
  let staticDrawnFor = false
  let wanted = false
  let inView = false
  let hidden = document.hidden
  let disposed = false

  let palette = readPalette()
  const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
  let reduced = motionQuery.matches

  let io: IntersectionObserver | null = null
  let ro: ResizeObserver | null = null
  let themeObserver: MutationObserver | null = null
  let onMotionChange: (() => void) | null = null
  let onVisibility: (() => void) | null = null
  const cleanups: Array<() => void> = []

  const ctx: ParticleSceneContext = {
    renderer: null as unknown as THREE.WebGLRenderer,
    scene: null as unknown as THREE.Scene,
    camera: null as unknown as THREE.PerspectiveCamera,
    quality: { level: 'high', particleScale: 1, pixelRatio: dprCap(), bloom: false },
    reducedMotion: reduced,
    pointer: { x: 0, y: 0, active: false },
    palette,
    width: 1,
    height: 1,
    reportCount: () => {},
    invalidate: () => invalidate(),
  }

  function getState(): ParticleDebugState {
    return {
      running: raf !== 0,
      reduced,
      frames: framesRendered,
      canvas: !!canvas && canvas.isConnected,
      scene: handle ? definition.id : null,
      word: handle?.currentWord?.() ?? null,
      width: ctx.width,
      height: ctx.height,
    }
  }
  window.__NB_PARTICLES_404__ = { getState }

  function stop(): void {
    if (raf) cancelAnimationFrame(raf)
    raf = 0
  }

  function ensureGL(): void {
    if (renderer) return
    const nextRenderer = new THREE.WebGLRenderer({
      antialias: false,
      alpha: true,
      powerPreference: 'high-performance',
    })
    nextRenderer.outputColorSpace = THREE.SRGBColorSpace
    nextRenderer.toneMapping = THREE.NoToneMapping
    nextRenderer.setClearColor(0x000000, 0)
    const nextCanvas = nextRenderer.domElement
    nextCanvas.className = 'particle-canvas'
    nextCanvas.setAttribute('aria-hidden', 'true')

    renderer = nextRenderer
    canvas = nextCanvas
    scene = new THREE.Scene()
    camera = new THREE.PerspectiveCamera(55, 1, 0.1, 4000)
    camera.position.set(0, 0, 60)
    ctx.renderer = nextRenderer
    ctx.scene = scene
    ctx.camera = camera
    ctx.quality.pixelRatio = dprCap()

    themeObserver = new MutationObserver(() => updatePalette())
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })

    onMotionChange = () => {
      reduced = motionQuery.matches
      ctx.reducedMotion = reduced
      handle?.setReducedMotion?.(reduced, ctx)
      invalidate()
      sync()
    }
    motionQuery.addEventListener('change', onMotionChange)

    onVisibility = () => {
      hidden = document.hidden
      sync()
    }
    document.addEventListener('visibilitychange', onVisibility)
  }

  function buildHandle(): void {
    if (handle || !renderer || !scene || !camera) return
    handle = definition.create(ctx)
  }

  function resizeRenderer(): void {
    if (!renderer || !camera) return
    const width = Math.max(1, container.clientWidth)
    const height = Math.max(1, container.clientHeight)
    ctx.width = width
    ctx.height = height
    camera.aspect = width / height
    camera.updateProjectionMatrix()
    renderer.setSize(width, height, false)
    renderer.setPixelRatio(ctx.quality.pixelRatio)
    handle?.resize?.(width, height, ctx)
    invalidate()
  }

  function updatePalette(): void {
    palette = readPalette()
    ctx.palette = palette
    handle?.setPalette?.(palette, ctx)
    invalidate()
  }

  /** Paint exactly one still frame, used for reduced motion and on changes. */
  function drawStatic(): void {
    if (!handle || !renderer || !scene || !camera || staticDrawnFor) return
    handle.update(0, 0, ctx)
    renderer.render(scene, camera)
    framesRendered += 1
    staticDrawnFor = true
  }

  function invalidate(): void {
    staticDrawnFor = false
    if (reduced && wanted && inView) drawStatic()
  }

  function sync(): void {
    if (!renderer || !scene || !camera || !handle) {
      stop()
      return
    }
    if (reduced) {
      stop()
      if (wanted && inView) drawStatic()
      return
    }
    if (!wanted || !inView || hidden) {
      stop()
      return
    }
    if (raf) return
    lastTime = performance.now()
    const tick = (now: number) => {
      if (!handle || !renderer || !scene || !camera || reduced) {
        raf = 0
        return
      }
      raf = requestAnimationFrame(tick)
      const dt = Math.min((now - lastTime) / 1000, 0.05)
      lastTime = now
      elapsed += dt
      handle.update(dt, elapsed, ctx)
      renderer.render(scene, camera)
      framesRendered += 1
    }
    raf = requestAnimationFrame(tick)
  }

  if ('IntersectionObserver' in window) {
    io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) inView = entry.isIntersecting
        sync()
      },
      { rootMargin: '200px' },
    )
    io.observe(container)
  } else {
    inView = true
  }

  if ('ResizeObserver' in window) {
    ro = new ResizeObserver(() => resizeRenderer())
    ro.observe(container)
  }

  const onPointer = (event: PointerEvent) => {
    if (!handle) return
    const box = container.getBoundingClientRect()
    const x = ((event.clientX - box.left) / Math.max(1, box.width)) * 2 - 1
    const y = -((event.clientY - box.top) / Math.max(1, box.height)) * 2 + 1
    ctx.pointer.x = x
    ctx.pointer.y = y
    ctx.pointer.active = true
    handle.onPointerMove?.(x, y, ctx)
  }
  const onLeave = () => {
    ctx.pointer.active = false
  }
  container.addEventListener('pointermove', onPointer, { passive: true })
  container.addEventListener('pointerleave', onLeave, { passive: true })
  cleanups.push(
    () => container.removeEventListener('pointermove', onPointer),
    () => container.removeEventListener('pointerleave', onLeave),
  )

  return {
    activate: () => {
      if (disposed) return
      wanted = true
      ensureGL()
      buildHandle()
      if (canvas && canvas.parentElement !== container) container.appendChild(canvas)
      resizeRenderer()
      sync()
    },
    deactivate: () => {
      if (disposed) return
      wanted = false
      sync()
    },
    dispose: () => {
      if (disposed) return
      disposed = true
      stop()
      io?.disconnect()
      ro?.disconnect()
      themeObserver?.disconnect()
      if (onMotionChange) motionQuery.removeEventListener('change', onMotionChange)
      if (onVisibility) document.removeEventListener('visibilitychange', onVisibility)
      cleanups.forEach((fn) => fn())

      handle?.dispose(ctx)
      handle = null
      if (scene) {
        const geometries = new Set<THREE.BufferGeometry>()
        const materials = new Set<THREE.Material>()
        scene.traverse((object) => {
          const mesh = object as THREE.Mesh
          if (mesh.geometry && (mesh.geometry as THREE.BufferGeometry).isBufferGeometry) {
            geometries.add(mesh.geometry as THREE.BufferGeometry)
          }
          const material = (mesh as unknown as { material?: THREE.Material | THREE.Material[] }).material
          if (Array.isArray(material)) material.forEach((item) => materials.add(item))
          else if (material) materials.add(material)
        })
        geometries.forEach((geometry) => geometry.dispose())
        materials.forEach((material) => material.dispose())
        scene.clear()
      }
      if (renderer) {
        renderer.renderLists.dispose()
        renderer.dispose()
        renderer.forceContextLoss()
      }
      canvas?.remove()
      canvas = null
      renderer = null
      scene = null
      camera = null
      delete window.__NB_PARTICLES_404__
    },
  }
}
