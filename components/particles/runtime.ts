import * as THREE from 'three'
import type {
  ParticleMount,
  ParticlePalette,
  ParticleSceneContext,
  ParticleSceneDefinition,
  ParticleSceneHandle,
  QualityLevel,
  QualitySettings,
} from './types'

// One renderer, one scene, one camera and one frame loop for the whole site.
// A director gates scenes so at most one particle scene runs at a time. The
// sky shader in components/motion is separate and keeps its own rules.

const QUALITY: Record<QualityLevel, QualitySettings> = {
  high: { level: 'high', particleScale: 1, pixelRatio: 2, bloom: false },
  medium: { level: 'medium', particleScale: 0.6, pixelRatio: 1.25, bloom: false },
  low: { level: 'low', particleScale: 0.32, pixelRatio: 1, bloom: false },
}
const ORDER: QualityLevel[] = ['low', 'medium', 'high']
const TOKENS: Array<[keyof ParticlePalette, string]> = [
  ['butter', '--dm-butter'],
  ['lilac', '--dm-lilac'],
  ['sky', '--dm-sky'],
  ['rose', '--dm-rose'],
  ['terra', '--dm-terra'],
  ['inkSoft', '--dm-ink-soft'],
  ['accentInk', '--dm-accent-ink'],
  ['nightInk', '--dm-night-ink'],
  ['panel', '--dm-panel'],
  ['ink', '--dm-ink'],
]

/** Save-Data gets the same single still frame as prefers-reduced-motion. */
function prefersStill(): boolean {
  const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches || connection?.saveData === true
}

declare global {
  interface Window {
    __NB_PARTICLES__?: {
      frames: number
      getState(): Record<string, unknown>
      setQuality(level: QualityLevel): void
      invalidate(): void
      samplePixels(): number
      mountTest(id: string): void
      deactivateTest(): void
      disposeTest(): void
    }
  }
}

interface Mount {
  id: number
  container: HTMLElement
  definition: ParticleSceneDefinition
  handle: ParticleSceneHandle | null
  ctx: ParticleSceneContext
  wanted: boolean
  inView: boolean
  disposed: boolean
  io: IntersectionObserver | null
  ro: ResizeObserver | null
  cleanups: Array<() => void>
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
  return isPhone() ? 1.5 : 2
}

class ParticleDirector {
  private renderer: THREE.WebGLRenderer | null = null
  private scene: THREE.Scene | null = null
  private camera: THREE.PerspectiveCamera | null = null
  private canvas: HTMLCanvasElement | null = null
  private mounts = new Map<number, Mount>()
  private activeId: number | null = null
  private nextId = 1

  private raf = 0
  private lastTime = 0
  private elapsed = 0
  private frames = 0
  private framesRendered = 0
  private windowStart = 0
  private fps = 0
  private lowTime = 0
  private highTime = 0
  private level: QualityLevel = 'high'
  private autoQuality = true
  private count = 0
  private rememberedRatio: Partial<Record<QualityLevel, number>> = {}
  private testMounts: ParticleMount[] = []

  private palette: ParticlePalette
  private reduced: boolean
  private hidden = document.hidden
  private staticDrawnFor: number | null = null

  private motionQuery: MediaQueryList
  private themeObserver: MutationObserver | null = null
  private onMotionChange: (() => void) | null = null
  private onVisibility: (() => void) | null = null

  constructor() {
    this.palette = readPalette()
    this.reduced = prefersStill()
    this.motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    this.installDebugHook()
  }

  private installDebugHook(): void {
    const hook = {
      frames: 0,
      getState: () => {
        const active = this.activeId === null ? null : this.mounts.get(this.activeId)
        return {
          running: this.raf !== 0,
          scene: active ? active.definition.id : null,
          quality: this.level,
          pixelRatio: this.renderer ? this.renderer.getPixelRatio() : 0,
          fps: this.fps,
          count: this.count,
          reduced: this.reduced,
          frames: this.framesRendered,
          mounts: this.mounts.size,
          eligible: [...this.mounts.values()].filter((mount) => !mount.disposed && mount.wanted && mount.inView).length,
          objects: this.scene ? this.scene.children.length : 0,
          calls: this.renderer ? this.renderer.info.render.calls : 0,
          points: this.renderer ? this.renderer.info.render.points : 0,
        }
      },
      setQuality: (level: QualityLevel) => {
        if (level !== 'high' && level !== 'medium' && level !== 'low') return
        this.autoQuality = false
        this.applyQuality(level)
      },
      invalidate: () => this.invalidate(),
      samplePixels: () => this.samplePixels(),
      mountTest: (id: string) => {
        const host = document.getElementById(id)
        if (!host) return
        void import('./glyph-drift').then(({ default: definition }) => {
          if (!host.isConnected) return
          const mount = this.mount(host, definition)
          this.testMounts.push(mount)
          mount.activate()
        })
      },
      deactivateTest: () => {
        this.testMounts[this.testMounts.length - 1]?.deactivate()
      },
      disposeTest: () => {
        this.testMounts.forEach((mount) => mount.dispose())
        this.testMounts = []
      },
    }
    Object.defineProperty(hook, 'frames', { get: () => this.framesRendered })
    window.__NB_PARTICLES__ = hook
  }

  private ensureGL(): void {
    if (this.renderer) return
    const renderer = new THREE.WebGLRenderer({
      antialias: false,
      alpha: true,
      powerPreference: 'high-performance',
    })
    renderer.outputColorSpace = THREE.SRGBColorSpace
    renderer.toneMapping = THREE.NoToneMapping
    renderer.setClearColor(0x000000, 0)
    const canvas = renderer.domElement
    canvas.className = 'particle-canvas'
    canvas.setAttribute('aria-hidden', 'true')
    this.renderer = renderer
    this.canvas = canvas
    this.scene = new THREE.Scene()
    this.camera = new THREE.PerspectiveCamera(55, 1, 0.1, 4000)
    this.camera.position.set(0, 0, 60)

    this.themeObserver = new MutationObserver(() => this.updatePalette())
    this.themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })
    this.onMotionChange = () => {
      this.reduced = this.motionQuery.matches
      const mount = this.active()
      if (mount?.handle) mount.handle.setReducedMotion?.(this.reduced, mount.ctx)
      this.invalidate()
      this.sync()
    }
    this.motionQuery.addEventListener('change', this.onMotionChange)
    this.onVisibility = () => {
      this.hidden = document.hidden
      this.sync()
    }
    document.addEventListener('visibilitychange', this.onVisibility)
    this.applyQuality(this.level)
  }

  private active(): Mount | null {
    return this.activeId === null ? null : this.mounts.get(this.activeId) ?? null
  }

  /**
   * Put one wanted, in-view mount in charge of the shared renderer. Ownership
   * changes at three points: a mount gives it up, a wanted mount enters the
   * view, and sync finds no active mount. A displaced mount that stays wanted
   * is therefore re-elected when it scrolls back in.
   */
  private electActive(): Mount | null {
    const current = this.active()
    if (current && !current.disposed && current.wanted && current.inView) return current
    const next = [...this.mounts.values()].find(
      (candidate) => !candidate.disposed && candidate.wanted && candidate.inView,
    )
    this.setActive(next ? next.id : null)
    return this.active()
  }

  private qualityFor(level: QualityLevel): QualitySettings {
    const base = QUALITY[level]
    const ratio = this.rememberedRatio[level] ?? Math.min(base.pixelRatio, dprCap())
    return { ...base, pixelRatio: ratio }
  }

  private applyQuality(level: QualityLevel): void {
    this.level = level
    const quality = this.qualityFor(level)
    this.rememberedRatio[level] = quality.pixelRatio
    const mount = this.active()
    if (!mount || !this.renderer) return
    mount.ctx.quality = quality
    this.renderer.setPixelRatio(quality.pixelRatio)
    this.resizeRenderer(mount)
    mount.handle?.setQuality?.(quality, mount.ctx)
    if (this.reduced) this.invalidate()
  }

  /** Clear the cached static frame and repaint it when motion is reduced. */
  invalidate(): void {
    this.staticDrawnFor = null
    const mount = this.active()
    if (this.reduced && mount?.wanted && mount.inView) this.drawStatic()
  }

  /** Count lit pixels from a fresh render. Measurement hook, never used in UI. */
  private samplePixels(): number {
    if (!this.active()?.handle || !this.renderer || !this.scene || !this.camera) return 0
    this.renderer.render(this.scene, this.camera)
    const gl = this.renderer.getContext()
    const w = gl.drawingBufferWidth
    const h = gl.drawingBufferHeight
    const pixels = new Uint8Array(w * h * 4)
    gl.readPixels(0, 0, w, h, gl.RGBA, gl.UNSIGNED_BYTE, pixels)
    let lit = 0
    for (let i = 0; i < pixels.length; i += 4) {
      if (pixels[i] > 4 || pixels[i + 1] > 4 || pixels[i + 2] > 4 || pixels[i + 3] > 4) lit += 1
    }
    return lit
  }

  /** Dispose the outgoing scene's objects before another scene takes over. */
  private releaseHandle(mount: Mount): void {
    if (!mount.handle) return
    mount.handle.dispose(mount.ctx)
    mount.handle = null
    this.scene?.clear()
  }

  private resizeRenderer(mount: Mount): void {
    if (!this.renderer || !this.camera) return
    const w = Math.max(1, mount.container.clientWidth)
    const h = Math.max(1, mount.container.clientHeight)
    mount.ctx.width = w
    mount.ctx.height = h
    this.camera.aspect = w / h
    this.camera.updateProjectionMatrix()
    this.renderer.setSize(w, h, false)
    mount.handle?.resize?.(w, h, mount.ctx)
    if (this.reduced) this.invalidate()
  }

  private updatePalette(): void {
    this.palette = readPalette()
    const mount = this.active()
    if (mount?.handle) {
      mount.ctx.palette = this.palette
      mount.handle.setPalette?.(this.palette, mount.ctx)
    }
    this.invalidate()
  }

  private buildHandle(mount: Mount): void {
    if (mount.handle || !this.renderer || !this.scene || !this.camera) return
    const quality = this.qualityFor(this.level)
    const ctx: ParticleSceneContext = {
      renderer: this.renderer,
      scene: this.scene,
      camera: this.camera,
      quality,
      reducedMotion: this.reduced,
      pointer: { x: 0, y: 0, active: false },
      palette: this.palette,
      width: 1,
      height: 1,
      reportCount: (count) => {
        if (this.active() === mount) this.count = count
      },
      invalidate: () => {
        if (this.active() === mount) this.invalidate()
      },
    }
    mount.ctx = ctx
    mount.handle = mount.definition.create(ctx)
    this.resizeRenderer(mount)
  }

  setActive(id: number | null): void {
    if (id === this.activeId) return
    if (this.raf) {
      cancelAnimationFrame(this.raf)
      this.raf = 0
    }
    const previous = this.active()
    if (previous) this.releaseHandle(previous)
    this.lowTime = 0
    this.highTime = 0
    this.activeId = id
    this.staticDrawnFor = null
    const mount = this.active()
    if (!mount) {
      if (this.mounts.size === 0) this.disposeGL()
      return
    }
    this.ensureGL()
    this.buildHandle(mount)
    if (this.canvas && this.canvas.parentElement !== mount.container) {
      mount.container.appendChild(this.canvas)
    }
    this.resizeRenderer(mount)
    this.sync()
  }

  private drawStatic(): void {
    const mount = this.active()
    if (!mount?.handle || !this.renderer || !this.scene || !this.camera) return
    if (this.staticDrawnFor === mount.id) return
    mount.handle.staticFrame?.(mount.ctx)
    mount.handle.update(0, 0, mount.ctx)
    this.renderer.render(this.scene, this.camera)
    this.framesRendered += 1
    this.staticDrawnFor = mount.id
  }

  private sync(): void {
    let mount = this.active()
    if (!mount) {
      this.electActive()
      mount = this.active()
    }
    if (!mount || !this.renderer || !this.scene || !this.camera) {
      if (this.raf) cancelAnimationFrame(this.raf)
      this.raf = 0
      return
    }
    const shouldRun = mount.wanted && mount.inView && !this.hidden && !this.reduced
    if (this.reduced) {
      if (this.raf) cancelAnimationFrame(this.raf)
      this.raf = 0
      if (mount.wanted && mount.inView) this.drawStatic()
      return
    }
    if (shouldRun) {
      if (this.raf) return
      this.lastTime = performance.now()
      this.windowStart = this.lastTime
      this.frames = 0
      const tick = (now: number) => {
        const activeMount = this.active()
        if (!activeMount?.handle || !this.renderer || !this.scene || !this.camera) {
          this.raf = 0
          return
        }
        this.raf = requestAnimationFrame(tick)
        const dt = Math.min((now - this.lastTime) / 1000, 0.05)
        this.lastTime = now
        this.elapsed += dt
        activeMount.handle.update(dt, this.elapsed, activeMount.ctx)
        this.renderer.render(this.scene, this.camera)
        this.framesRendered += 1

        this.frames += 1
        const ms = now - this.windowStart
        if (ms >= 500) {
          this.fps = Math.round((this.frames * 1000) / ms)
          const seconds = ms / 1000
          if (this.autoQuality && this.elapsed > 3) {
            if (this.fps < 45) {
              this.lowTime += seconds
              this.highTime = 0
            } else if (this.fps > 57) {
              this.highTime += seconds
              this.lowTime = 0
            } else {
              this.lowTime = 0
              this.highTime = 0
            }
            const index = ORDER.indexOf(this.level)
            if (this.lowTime >= 3 && index > 0) {
              this.lowTime = 0
              this.applyQuality(ORDER[index - 1])
            } else if (this.highTime >= 8 && index < ORDER.length - 1) {
              this.highTime = 0
              this.applyQuality(ORDER[index + 1])
            }
          }
          this.frames = 0
          this.windowStart = now
        }
      }
      this.raf = requestAnimationFrame(tick)
    } else if (this.raf) {
      cancelAnimationFrame(this.raf)
      this.raf = 0
    }
  }

  mount(container: HTMLElement, definition: ParticleSceneDefinition): ParticleMount {
    const id = this.nextId++
    const quality = this.qualityFor(this.level)
    const ctx: ParticleSceneContext = {
      renderer: null as unknown as THREE.WebGLRenderer,
      scene: null as unknown as THREE.Scene,
      camera: null as unknown as THREE.PerspectiveCamera,
      quality,
      reducedMotion: this.reduced,
      pointer: { x: 0, y: 0, active: false },
      palette: this.palette,
      width: 1,
      height: 1,
      reportCount: (count) => {
        if (this.active() === record) this.count = count
      },
      invalidate: () => {
        if (this.active() === record) this.invalidate()
      },
    }
    const record: Mount = {
      id,
      container,
      definition,
      handle: null,
      ctx,
      wanted: false,
      inView: false,
      disposed: false,
      io: null,
      ro: null,
      cleanups: [],
    }
    this.mounts.set(id, record)

    if ('IntersectionObserver' in window) {
      record.io = new IntersectionObserver(
        (entries) => {
          let becameVisible = false
          for (const entry of entries) {
            if (entry.isIntersecting && !record.inView) becameVisible = true
            record.inView = entry.isIntersecting
          }
          if (becameVisible && record.wanted) this.electActive()
          this.sync()
        },
        { rootMargin: '200px' },
      )
      record.io.observe(container)
    } else {
      record.inView = true
    }

    if ('ResizeObserver' in window) {
      record.ro = new ResizeObserver(() => this.resizeRenderer(record))
      record.ro.observe(container)
    }

    const onPointer = (event: PointerEvent) => {
      const box = container.getBoundingClientRect()
      const x = ((event.clientX - box.left) / Math.max(1, box.width)) * 2 - 1
      const y = -((event.clientY - box.top) / Math.max(1, box.height)) * 2 + 1
      record.ctx.pointer.x = x
      record.ctx.pointer.y = y
      record.ctx.pointer.active = true
      record.handle?.onPointerMove?.(x, y, record.ctx)
    }
    const onLeave = () => {
      record.ctx.pointer.active = false
    }
    container.addEventListener('pointermove', onPointer, { passive: true })
    container.addEventListener('pointerleave', onLeave, { passive: true })
    record.cleanups.push(
      () => container.removeEventListener('pointermove', onPointer),
      () => container.removeEventListener('pointerleave', onLeave),
    )

    return {
      activate: () => {
        if (record.disposed) return
        record.wanted = true
        this.setActive(id)
      },
      deactivate: () => {
        if (record.disposed) return
        record.wanted = false
        if (this.activeId === id) this.electActive()
      },
      dispose: () => {
        if (record.disposed) return
        record.disposed = true
        record.io?.disconnect()
        record.ro?.disconnect()
        record.cleanups.forEach((fn) => fn())
        if (this.activeId === id) this.setActive(null)
        if (record.handle) {
          record.handle.dispose(record.ctx)
          record.handle = null
        }
        this.mounts.delete(id)
        if (this.mounts.size === 0) this.disposeGL()
      },
    }
  }

  private disposeGL(): void {
    if (this.raf) cancelAnimationFrame(this.raf)
    this.raf = 0
    this.testMounts.forEach((mount) => mount.dispose())
    this.testMounts = []
    for (const mount of this.mounts.values()) {
      mount.io?.disconnect()
      mount.ro?.disconnect()
      mount.cleanups.forEach((fn) => fn())
      mount.handle?.dispose(mount.ctx)
      mount.handle = null
    }
    this.mounts.clear()
    this.activeId = null

    if (this.themeObserver) this.themeObserver.disconnect()
    this.themeObserver = null
    if (this.onMotionChange) this.motionQuery.removeEventListener('change', this.onMotionChange)
    this.onMotionChange = null
    if (this.onVisibility) document.removeEventListener('visibilitychange', this.onVisibility)
    this.onVisibility = null

    if (this.scene) {
      const geometries = new Set<THREE.BufferGeometry>()
      const materials = new Set<THREE.Material>()
      this.scene.traverse((object) => {
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
      this.scene.clear()
    }
    if (this.renderer) {
      this.renderer.renderLists.dispose()
      this.renderer.dispose()
      this.renderer.forceContextLoss()
    }
    this.canvas?.remove()
    this.canvas = null
    this.renderer = null
    this.scene = null
    this.camera = null
    this.count = 0
    this.staticDrawnFor = null
  }
}

const director = new ParticleDirector()

/** Mount a scene into a slot. The caller owns the returned ParticleMount. */
export function mountParticleScene(container: HTMLElement, definition: ParticleSceneDefinition): ParticleMount {
  return director.mount(container, definition)
}
