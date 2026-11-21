import * as THREE from 'three'
import type {
  ParticlePalette,
  ParticleSceneContext,
  ParticleSceneDefinition,
  ParticleSceneHandle,
  QualityLevel,
  QualitySettings,
} from '../types'
import { POINT_FRAGMENT, POINT_VERTEX, SIM_FRAGMENT, SIM_VERTEX } from './shaders'

// Ember Field: a GPGPU ember and smoke plume in the homepage footer end card.
// Ported from the read-only particle lab. The shared runtime owns the renderer,
// scene, camera, frame loop, adaptive quality, palette reading and disposal.

const TAU = Math.PI * 2
const MAX_SIZE = 512
const MIN_SIZE = 64
const BASE_RADIUS = 6.0
const PLUME_HEIGHT = 26.0
const FOCUS_Y = 12.0

// The host uses 1 / 0.6 / 0.32 for its generic particleScale. Fire is much
// more fill heavy than Glyph Drift, so Ember maps its own effective scales.
const EMBER_SCALE: Record<QualityLevel, number> = { high: 0.2, medium: 0.12, low: 0.045 }
const POINT_SIZE: Record<QualityLevel, number> = { high: 0.32, medium: 0.36, low: 0.4 }

export class EmberUnsupportedError extends Error {
  constructor(reason: string) {
    super(`Ember Field unsupported: ${reason}`)
    this.name = 'EmberUnsupportedError'
  }
}

/** Source sizeForScale with a 0.01 clamp and a 64 texel floor. */
export function sizeForScale(scale: number): number {
  const target = MAX_SIZE * MAX_SIZE * Math.max(0.01, scale)
  const stepped = Math.ceil(Math.sqrt(target) / 16) * 16
  return Math.max(MIN_SIZE, Math.min(MAX_SIZE, stepped))
}

function scaleForQuality(quality: QualitySettings): number {
  return EMBER_SCALE[quality.level] ?? quality.particleScale * 0.2
}

/** Probe the host context. Throws when no color-renderable float target exists. */
function chooseDataType(ctx: ParticleSceneContext): THREE.TextureDataType {
  const gl = ctx.renderer.getContext()
  const webgl2 =
    ctx.renderer.capabilities.isWebGL2 === true ||
    (typeof WebGL2RenderingContext !== 'undefined' && gl instanceof WebGL2RenderingContext)
  if (!webgl2) throw new EmberUnsupportedError('WebGL2 is unavailable')

  let dataType: THREE.TextureDataType
  if (gl.getExtension('EXT_color_buffer_float')) dataType = THREE.FloatType
  else if (gl.getExtension('EXT_color_buffer_half_float')) dataType = THREE.HalfFloatType
  else throw new EmberUnsupportedError('no float color target')

  // Some drivers advertise the extension and still fail to attach the target.
  const probe = new THREE.WebGLRenderTarget(4, 4, {
    minFilter: THREE.NearestFilter,
    magFilter: THREE.NearestFilter,
    format: THREE.RGBAFormat,
    type: dataType,
    depthBuffer: false,
    stencilBuffer: false,
    generateMipmaps: false,
  })
  const previous = ctx.renderer.getRenderTarget()
  let complete = false
  try {
    ctx.renderer.setRenderTarget(probe)
    complete = gl.checkFramebufferStatus(gl.FRAMEBUFFER) === gl.FRAMEBUFFER_COMPLETE
  } finally {
    ctx.renderer.setRenderTarget(previous)
    probe.dispose()
  }
  if (!complete) throw new EmberUnsupportedError('framebuffer preflight failed')
  if (gl.getParameter(gl.MAX_TEXTURE_SIZE) < sizeForScale(EMBER_SCALE.high)) {
    throw new EmberUnsupportedError('MAX_TEXTURE_SIZE is too small')
  }
  return dataType
}

function paletteColors(palette: ParticlePalette): { fire: THREE.Color[]; smoke: THREE.Color } {
  const butter = new THREE.Color(palette.butter || palette.nightInk || '#ffffff')
  const rose = new THREE.Color(palette.rose || palette.butter || '#ffffff')
  const terra = new THREE.Color(palette.terra || palette.rose || '#ffffff')
  const inkSoft = new THREE.Color(palette.inkSoft || palette.ink || '#888888')
  return { fire: [butter, rose, terra, inkSoft], smoke: inkSoft.clone() }
}

const definition: ParticleSceneDefinition = {
  id: 'ember-field',

  create(ctx: ParticleSceneContext): ParticleSceneHandle {
    const dataType = chooseDataType(ctx)
    const renderer = ctx.renderer
    const camera = ctx.camera
    const savedPosition = camera.position.clone()
    const savedQuaternion = camera.quaternion.clone()
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches

    const params = {
      turbulence: 1.7,
      buoyancy: 2.1,
      speed: 0.85,
      lifeRate: 0.13,
    }

    let size = sizeForScale(scaleForQuality(ctx.quality))
    let count = size * size
    let disposed = false
    let reduced = ctx.reducedMotion
    let needsSeed = true
    let staticStepped = false
    let simTime = 0

    let targetA: THREE.WebGLRenderTarget | null = null
    let targetB: THREE.WebGLRenderTarget | null = null
    let current: THREE.WebGLRenderTarget | null = null
    let seedTexture: THREE.DataTexture | null = null
    let pointGeometry: THREE.BufferGeometry | null = null

    const simScene = new THREE.Scene()
    const simCamera = new THREE.Camera()
    const simQuadGeometry = new THREE.PlaneGeometry(2, 2)
    const simUniforms: Record<string, THREE.IUniform> = {
      uPositions: { value: null },
      uDt: { value: 0 },
      uTime: { value: 0 },
      uTurbulence: { value: params.turbulence },
      uBuoyancy: { value: params.buoyancy },
      uSpeed: { value: params.speed },
      uLifeRate: { value: params.lifeRate },
      uNoiseScale: { value: 0.23 },
      uBaseRadius: { value: BASE_RADIUS },
      uPlumeHeight: { value: PLUME_HEIGHT },
      uPointer: { value: new THREE.Vector2(9999, 9999) },
      uPointerStrength: { value: 0 },
      uPointerRadius: { value: 6.0 },
      uCalm: { value: reduced ? 1 : 0 },
    }
    const simMaterial = new THREE.ShaderMaterial({
      uniforms: simUniforms,
      vertexShader: SIM_VERTEX,
      fragmentShader: SIM_FRAGMENT,
      depthTest: false,
      depthWrite: false,
      toneMapped: false,
    })
    const simQuad = new THREE.Mesh(simQuadGeometry, simMaterial)
    simQuad.frustumCulled = false
    simScene.add(simQuad)

    let palette = paletteColors(ctx.palette)
    const renderUniforms = {
      uPositions: { value: null as THREE.Texture | null },
      uSizeScale: { value: computeSizeScale(ctx) },
      uSize: { value: POINT_SIZE[ctx.quality.level] },
      uColors: { value: palette.fire },
      uSmokeColor: { value: palette.smoke },
      uTime: { value: 0 },
    }

    function makePointMaterial(smoke: boolean): THREE.ShaderMaterial {
      return new THREE.ShaderMaterial({
        uniforms: {
          uPositions: renderUniforms.uPositions,
          uSizeScale: renderUniforms.uSizeScale,
          uSize: renderUniforms.uSize,
          uColors: renderUniforms.uColors,
          uSmokeColor: renderUniforms.uSmokeColor,
          uOpacity: { value: smoke ? 0.004 : 0.2 },
          uTime: renderUniforms.uTime,
        },
        vertexShader: POINT_VERTEX,
        fragmentShader: POINT_FRAGMENT,
        defines: smoke ? { SMOKE: 1 } : {},
        transparent: true,
        depthTest: true,
        depthWrite: false,
        blending: smoke ? THREE.NormalBlending : THREE.AdditiveBlending,
        toneMapped: false,
      })
    }

    const smokeMaterial = makePointMaterial(true)
    const fireMaterial = makePointMaterial(false)

    // Light theme ink-soft is a dark ink, so a normal-blended haze would read
    // as soot on the pale dusk sky. Dark theme ink-soft is light and reads as
    // smoke. Both values come from the same token, only the alpha changes.
    function applySmokeOpacity(): void {
      const light = document.documentElement.dataset.theme !== 'dark'
      smokeMaterial.uniforms.uOpacity.value = light ? 0.004 : 0.02
    }
    applySmokeOpacity()

    const smokePoints = new THREE.Points(new THREE.BufferGeometry(), smokeMaterial)
    const firePoints = new THREE.Points(new THREE.BufferGeometry(), fireMaterial)
    smokePoints.frustumCulled = false
    firePoints.frustumCulled = false
    smokePoints.renderOrder = 0
    firePoints.renderOrder = 1
    ctx.scene.add(smokePoints, firePoints)

    // Frame the plume. The saved camera state is restored on dispose so the
    // next scene (Glyph Drift) sees the shared host camera exactly as before.
    camera.position.set(0, 14.5, 49)
    camera.lookAt(0, FOCUS_Y, 0)
    const focusTarget = new THREE.Vector3(0, FOCUS_Y, 0)

    function computeSizeScale(context: ParticleSceneContext): number {
      const fovRad = (context.camera.fov * Math.PI) / 180
      return (context.height * context.quality.pixelRatio) / (2 * Math.tan(fovRad / 2))
    }

    function makeTarget(dimension: number): THREE.WebGLRenderTarget {
      const target = new THREE.WebGLRenderTarget(dimension, dimension, {
        minFilter: THREE.NearestFilter,
        magFilter: THREE.NearestFilter,
        format: THREE.RGBAFormat,
        type: dataType,
        depthBuffer: false,
        stencilBuffer: false,
        generateMipmaps: false,
      })
      target.texture.colorSpace = THREE.NoColorSpace
      target.texture.name = 'EmberFieldPosition'
      return target
    }

    // Age distributed seed: frame one already shows a full column, which is
    // also the reduced-motion still.
    function makeSeed(dimension: number): THREE.DataTexture {
      const n = dimension * dimension
      const data = new Float32Array(n * 4)
      for (let i = 0; i < n; i += 1) {
        const t = Math.random()
        const angle = Math.random() * TAU
        const radius = BASE_RADIUS * (0.25 + 0.75 * Math.random()) * (0.45 + 0.55 * t)
        const wobble = t * 1.4
        const o = i * 4
        data[o] = Math.cos(angle) * radius + (Math.random() - 0.5) * wobble
        data[o + 1] = t * PLUME_HEIGHT * (0.85 + 0.3 * Math.random()) + 0.02
        data[o + 2] = Math.sin(angle) * radius + (Math.random() - 0.5) * wobble
        data[o + 3] = t
      }
      const texture = new THREE.DataTexture(data, dimension, dimension, THREE.RGBAFormat, THREE.FloatType)
      texture.minFilter = THREE.NearestFilter
      texture.magFilter = THREE.NearestFilter
      texture.wrapS = THREE.ClampToEdgeWrapping
      texture.wrapT = THREE.ClampToEdgeWrapping
      texture.generateMipmaps = false
      texture.colorSpace = THREE.NoColorSpace
      texture.needsUpdate = true
      return texture
    }

    function makePointGeometry(dimension: number): THREE.BufferGeometry {
      const n = dimension * dimension
      const refs = new Float32Array(n * 3)
      for (let y = 0; y < dimension; y += 1) {
        for (let x = 0; x < dimension; x += 1) {
          const i = (y * dimension + x) * 3
          refs[i] = (x + 0.5) / dimension
          refs[i + 1] = (y + 0.5) / dimension
        }
      }
      const geometry = new THREE.BufferGeometry()
      geometry.setAttribute('position', new THREE.BufferAttribute(refs, 3))
      return geometry
    }

    function freeSimulationTargets(): void {
      targetA?.dispose()
      targetB?.dispose()
      targetA = null
      targetB = null
      current = null
      seedTexture?.dispose()
      seedTexture = null
    }

    function labelHost(): void {
      ctx.reportCount(count)
      const host = renderer.domElement.parentElement as HTMLElement | null
      if (!host) return
      if (host.dataset.emberTier !== ctx.quality.level) host.dataset.emberTier = ctx.quality.level
      if (host.dataset.emberCount !== String(count)) host.dataset.emberCount = String(count)
    }

    function rebuild(dimension: number): void {
      if (disposed || (dimension === size && pointGeometry)) return
      freeSimulationTargets()
      pointGeometry?.dispose()
      size = dimension
      count = dimension * dimension
      targetA = makeTarget(size)
      targetB = makeTarget(size)
      current = targetA
      seedTexture = makeSeed(size)
      pointGeometry = makePointGeometry(size)
      smokePoints.geometry = pointGeometry
      firePoints.geometry = pointGeometry
      needsSeed = true
      staticStepped = false
      renderUniforms.uPositions.value = seedTexture
      labelHost()
    }

    function stepSimulation(dt: number): void {
      if (!targetA || !targetB) return
      const source = needsSeed && seedTexture ? seedTexture : current?.texture
      if (!source) return
      const destination = needsSeed || current === targetB ? targetA : targetB
      simUniforms.uPositions.value = source
      simUniforms.uDt.value = dt
      const previousTarget = renderer.getRenderTarget()
      renderer.setRenderTarget(destination)
      renderer.render(simScene, simCamera)
      renderer.setRenderTarget(previousTarget)
      current = destination
      needsSeed = false
    }

    function applyRenderUniforms(context: ParticleSceneContext): void {
      renderUniforms.uPositions.value = current?.texture ?? seedTexture
      renderUniforms.uSizeScale.value = computeSizeScale(context)
      renderUniforms.uSize.value = POINT_SIZE[context.quality.level]
      renderUniforms.uTime.value = simTime
    }

    function applyPointer(context: ParticleSceneContext): void {
      if (!finePointer || !context.pointer.active || reduced) {
        simUniforms.uPointerStrength.value = 0
        return
      }
      const fovRad = (context.camera.fov * Math.PI) / 180
      const distance = context.camera.position.distanceTo(focusTarget)
      const visibleH = 2 * Math.tan(fovRad / 2) * distance
      const visibleW = visibleH * context.camera.aspect
      ;(simUniforms.uPointer.value as THREE.Vector2).set(
        context.pointer.x * visibleW * 0.5,
        FOCUS_Y + context.pointer.y * visibleH * 0.5,
      )
      simUniforms.uPointerStrength.value = 0.8
    }

    rebuild(size)
    labelHost()
    camera.updateProjectionMatrix()

    const handle: ParticleSceneHandle = {
      staticFrame(c: ParticleSceneContext): void {
        if (!reduced || disposed) return
        // One settled step from the age distributed seed, then repaints only.
        if (!staticStepped) {
          stepSimulation(1 / 60)
          simTime = 1 / 60
          staticStepped = true
        }
        simUniforms.uTime.value = simTime
        simUniforms.uCalm.value = 1
        applyRenderUniforms(c)
      },

      update(dt: number, _elapsed: number, c: ParticleSceneContext): void {
        if (disposed || document.hidden) return
        labelHost()
        simUniforms.uTurbulence.value = params.turbulence
        simUniforms.uBuoyancy.value = params.buoyancy
        simUniforms.uSpeed.value = params.speed
        simUniforms.uLifeRate.value = params.lifeRate

        if (reduced) {
          applyRenderUniforms(c)
          return
        }

        // The host owns the loop and pauses it offscreen or when hidden. A
        // time step is a single capped delta, never a catch-up accumulator.
        const step = Math.min(Math.max(dt, 0), 0.05)
        simTime += step
        simUniforms.uCalm.value = 0
        stepSimulation(step)
        applyPointer(c)
        simUniforms.uTime.value = simTime
        applyRenderUniforms(c)
      },

      resize(w: number, h: number, c: ParticleSceneContext): void {
        void w
        void h
        renderUniforms.uSizeScale.value = computeSizeScale(c)
        camera.updateProjectionMatrix()
      },

      setQuality(q: QualitySettings, c: ParticleSceneContext): void {
        rebuild(sizeForScale(scaleForQuality(q)))
        renderUniforms.uSizeScale.value = computeSizeScale(c)
        labelHost()
      },

      setReducedMotion(value: boolean, c: ParticleSceneContext): void {
        reduced = value
        simUniforms.uCalm.value = value ? 1 : 0
        if (value) {
          // The live simulation is already settled; do not advance it again.
          staticStepped = true
          simUniforms.uPointerStrength.value = 0
          applyRenderUniforms(c)
        }
      },

      setPalette(next: ParticlePalette, c: ParticleSceneContext): void {
        palette = paletteColors(next)
        renderUniforms.uColors.value = palette.fire
        renderUniforms.uSmokeColor.value = palette.smoke
        applySmokeOpacity()
        applyRenderUniforms(c)
        void c
      },

      dispose(c: ParticleSceneContext): void {
        if (disposed) return
        disposed = true
        c.renderer.setRenderTarget(null)
        c.scene.remove(smokePoints, firePoints)
        freeSimulationTargets()
        pointGeometry?.dispose()
        pointGeometry = null
        simQuadGeometry.dispose()
        simMaterial.dispose()
        smokeMaterial.dispose()
        fireMaterial.dispose()
        simUniforms.uPositions.value = null
        renderUniforms.uPositions.value = null
        simScene.clear()
        c.camera.position.copy(savedPosition)
        c.camera.quaternion.copy(savedQuaternion)
        c.camera.updateProjectionMatrix()
        const host = c.renderer.domElement.parentElement as HTMLElement | null
        if (host) {
          delete host.dataset.emberTier
          delete host.dataset.emberCount
        }
      },
    }

    return handle
  },
}

export default definition
