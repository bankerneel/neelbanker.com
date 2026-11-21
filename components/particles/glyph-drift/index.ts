import * as THREE from 'three'
import type {
  ParticlePalette,
  ParticleSceneContext,
  ParticleSceneDefinition,
  ParticleSceneHandle,
} from '../types'

// Glyph Drift: points sample the two words NEEL then BANKER, hold, dissolve
// into a noise field and reform. Colours come from the live --dm-* tokens.

const WORDS = ['NEEL', 'BANKER'] as const
type Word = (typeof WORDS)[number]

const DESKTOP_COUNT = 26000
const PHONE_COUNT = 10000
const FLOOR = 8000
const VIEW_MARGIN = 0.86
const SCATTER_DISTANCE = 16
const TAU = Math.PI * 2

interface WordData {
  text: Word
  samples: Float32Array
  count: number
  boxW: number
  boxH: number
}

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t
}

function baseCount(): number {
  return window.innerWidth < 720 || window.matchMedia('(pointer: coarse)').matches ? PHONE_COUNT : DESKTOP_COUNT
}

async function loadArchivo(): Promise<boolean> {
  try {
    await document.fonts.load('900 236px "Archivo"')
    await document.fonts.ready
    return document.fonts.check('900 236px "Archivo"')
  } catch {
    return false
  }
}

function sampleWord(text: Word, useArchivo: boolean): WordData {
  const canvas = document.createElement('canvas')
  canvas.width = 1024
  canvas.height = 320
  const g = canvas.getContext('2d', { willReadFrequently: true })
  let boxW = 1
  let boxH = 1
  let samples = new Float32Array([0, 0])
  const family = useArchivo ? '"Archivo", Arial, sans-serif' : 'Arial, Helvetica, sans-serif'

  if (g) {
    g.clearRect(0, 0, canvas.width, canvas.height)
    let size = 236
    g.font = `900 ${size}px ${family}`
    const maxWidth = canvas.width * 0.92
    const measured = g.measureText(text).width
    if (measured > maxWidth) {
      size *= maxWidth / measured
      g.font = `900 ${size}px ${family}`
    }
    g.fillStyle = '#ffffff'
    g.textAlign = 'center'
    g.textBaseline = 'middle'
    g.fillText(text, canvas.width / 2, canvas.height / 2)

    const pixels = g.getImageData(0, 0, canvas.width, canvas.height).data
    let minX = canvas.width
    let minY = canvas.height
    let maxX = 0
    let maxY = 0
    for (let y = 0; y < canvas.height; y += 1) {
      for (let x = 0; x < canvas.width; x += 1) {
        if (pixels[(y * canvas.width + x) * 4 + 3] > 128) {
          if (x < minX) minX = x
          if (x > maxX) maxX = x
          if (y < minY) minY = y
          if (y > maxY) maxY = y
        }
      }
    }

    if (maxX >= minX && maxY >= minY) {
      const coords: number[] = []
      for (let y = minY; y <= maxY; y += 1) {
        for (let x = minX; x <= maxX; x += 1) {
          if (pixels[(y * canvas.width + x) * 4 + 3] > 128) coords.push(x, y)
        }
      }
      const pairs = coords.length / 2
      for (let k = pairs - 1; k > 0; k -= 1) {
        const j = Math.floor(Math.random() * (k + 1))
        const ax = coords[k * 2]
        const ay = coords[k * 2 + 1]
        coords[k * 2] = coords[j * 2]
        coords[k * 2 + 1] = coords[j * 2 + 1]
        coords[j * 2] = ax
        coords[j * 2 + 1] = ay
      }
      boxW = maxX - minX + 1
      boxH = maxY - minY + 1
      const cx = (minX + maxX) / 2
      const cy = (minY + maxY) / 2
      samples = new Float32Array(pairs * 2)
      for (let k = 0; k < pairs; k += 1) {
        samples[k * 2] = (coords[k * 2] - cx) / boxW
        samples[k * 2 + 1] = -(coords[k * 2 + 1] - cy) / boxH
      }
    }
  }
  return { text, samples, count: samples.length / 2, boxW, boxH }
}

const VERTEX_SHADER = `
attribute vec3 aColor;
attribute float aSize;
attribute float aPhase;
uniform float uTime;
uniform float uSize;
uniform float uPixelRatio;
varying vec3 vColor;
varying float vTwinkle;
void main() {
  vColor = aColor;
  float twinkle = 0.86 + 0.14 * sin(uTime * 2.1 + aPhase * 6.2831853);
  vTwinkle = twinkle;
  vec4 mv = modelViewMatrix * vec4(position, 1.0);
  gl_PointSize = aSize * uSize * uPixelRatio * (112.0 / max(1.0, -mv.z)) * twinkle;
  gl_Position = projectionMatrix * mv;
}
`

const FRAGMENT_SHADER = `
precision highp float;
uniform float uOpacity;
varying vec3 vColor;
varying float vTwinkle;
void main() {
  float d = length(gl_PointCoord - vec2(0.5));
  if (d > 0.5) discard;
  float core = smoothstep(0.42, 0.08, d);
  float halo = smoothstep(0.5, 0.0, d) * 0.25;
  float a = (core * 0.8 + halo) * uOpacity;
  if (a < 0.008) discard;
  gl_FragColor = vec4(vColor * (0.62 + core * 0.38) * vTwinkle, a);
}
`

function paletteColors(palette: ParticlePalette): [THREE.Color, THREE.Color, THREE.Color] {
  const sky = new THREE.Color(palette.sky || palette.ink)
  const lilac = new THREE.Color(palette.lilac || palette.panel)
  const butter = new THREE.Color(palette.butter || palette.nightInk)
  return [sky, lilac, butter]
}

const definition: ParticleSceneDefinition = {
  id: 'glyph-drift',

  create(ctx: ParticleSceneContext): ParticleSceneHandle {
    let words: WordData[] = WORDS.map((word) =>
      sampleWord(word, typeof document.fonts?.check === 'function' && document.fonts.check('900 236px "Archivo"')),
    )
    let colors = paletteColors(ctx.palette)
    let reduced = ctx.reducedMotion
    let disposed = false

    const params = {
      particleSize: 1.6,
      repelRadius: 0.085,
      repelStrength: 46,
      stiffness: 12,
    }

    let count = 0
    let currentScale = Math.max(0.2, ctx.quality.particleScale)
    let wordIndex = 0
    let phase: 'hold' | 'dissolve' | 'form' = 'hold'
    let phaseTime = 0
    let scatter = 0
    let visibleW = 1
    let visibleH = 1

    let geometry: THREE.BufferGeometry | null = null
    let material: THREE.ShaderMaterial | null = null
    let points: THREE.Points | null = null
    let posArr!: Float32Array
    let colorArr!: Float32Array
    let sizeArr!: Float32Array
    let phaseArr!: Float32Array
    let vel!: Float32Array
    let target!: Float32Array
    let rand!: Float32Array
    let jitter!: Float32Array
    let positionAttr!: THREE.BufferAttribute

    function refreshViewport(): void {
      const fov = (ctx.camera.fov * Math.PI) / 180
      const height = 2 * Math.tan(fov / 2) * ctx.camera.position.z
      visibleH = Math.max(1, height)
      visibleW = Math.max(1, height * ctx.camera.aspect)
    }

    function computeTargets(): void {
      const word = words[wordIndex]
      const aspectH = word.boxH / word.boxW
      const worldW = Math.min(visibleW * VIEW_MARGIN, (visibleH * VIEW_MARGIN) / aspectH)
      const worldH = worldW * aspectH
      const p = Math.max(1, word.count)
      const jxScale = (worldW / word.boxW) * 1.8
      const jyScale = (worldH / word.boxH) * 1.8
      const [c0, c1, c2] = colors

      for (let i = 0; i < count; i += 1) {
        const s = Math.min(p - 1, Math.floor((i * p) / count))
        const nx = word.samples[s * 2]
        const ny = word.samples[s * 2 + 1]
        const x = nx * worldW + jitter[i * 2] * jxScale
        const y = ny * worldH + jitter[i * 2 + 1] * jyScale
        const z = rand[i * 3 + 2] * 2.4
        const i3 = i * 3
        target[i3] = x
        target[i3 + 1] = y
        target[i3 + 2] = z

        const t = THREE.MathUtils.clamp(x / worldW + 0.5, 0, 1)
        let r: number
        let g: number
        let b: number
        if (t < 0.5) {
          const k = t * 2
          r = lerp(c0.r, c1.r, k)
          g = lerp(c0.g, c1.g, k)
          b = lerp(c0.b, c1.b, k)
        } else {
          const k = (t - 0.5) * 2
          r = lerp(c1.r, c2.r, k)
          g = lerp(c1.g, c2.g, k)
          b = lerp(c1.b, c2.b, k)
        }
        const bright = 0.8 + Math.random() * 0.38
        colorArr[i3] = r * bright
        colorArr[i3 + 1] = g * bright
        colorArr[i3 + 2] = b * bright
      }
      if (geometry) {
        const colorAttr = geometry.getAttribute('aColor') as THREE.BufferAttribute | undefined
        if (colorAttr) colorAttr.needsUpdate = true
      }
    }

    function releaseBuffers(): void {
      if (points) {
        ctx.scene.remove(points)
        points = null
      }
      geometry?.dispose()
      geometry = null
      material?.dispose()
      material = null
    }

    function buildBuffers(): void {
      releaseBuffers()
      count = Math.max(FLOOR, Math.round(baseCount() * Math.max(0.2, currentScale)))
      posArr = new Float32Array(count * 3)
      colorArr = new Float32Array(count * 3)
      sizeArr = new Float32Array(count)
      phaseArr = new Float32Array(count)
      vel = new Float32Array(count * 3)
      target = new Float32Array(count * 3)
      rand = new Float32Array(count * 3)
      jitter = new Float32Array(count * 2)

      for (let i = 0; i < count; i += 1) {
        const theta = Math.random() * TAU
        const z = Math.random() * 2 - 1
        const rr = Math.sqrt(Math.max(0, 1 - z * z))
        rand[i * 3] = Math.cos(theta) * rr
        rand[i * 3 + 1] = Math.sin(theta) * rr
        rand[i * 3 + 2] = z
        jitter[i * 2] = Math.random() - 0.5
        jitter[i * 2 + 1] = Math.random() - 0.5
        sizeArr[i] = 0.72 + Math.random() * 0.86
        phaseArr[i] = Math.random()
      }

      geometry = new THREE.BufferGeometry()
      positionAttr = new THREE.BufferAttribute(posArr, 3).setUsage(THREE.DynamicDrawUsage)
      geometry.setAttribute('position', positionAttr)
      geometry.setAttribute('aColor', new THREE.BufferAttribute(colorArr, 3))
      geometry.setAttribute('aSize', new THREE.BufferAttribute(sizeArr, 1))
      geometry.setAttribute('aPhase', new THREE.BufferAttribute(phaseArr, 1))

      material = new THREE.ShaderMaterial({
        uniforms: {
          uTime: { value: 0 },
          uSize: { value: params.particleSize },
          uPixelRatio: { value: ctx.quality.pixelRatio },
          uOpacity: { value: 0.6 },
        },
        vertexShader: VERTEX_SHADER,
        fragmentShader: FRAGMENT_SHADER,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        depthTest: false,
        toneMapped: false,
      })
      points = new THREE.Points(geometry, material)
      points.frustumCulled = false
      ctx.scene.add(points)
      ctx.reportCount(count)
    }

    function advance(): void {
      if (phase === 'hold') {
        phase = 'dissolve'
        phaseTime = 0
      } else if (phase === 'dissolve') {
        wordIndex = (wordIndex + 1) % words.length
        computeTargets()
        phase = 'form'
        phaseTime = 0
      } else {
        phase = 'hold'
        phaseTime = 0
      }
    }

    function durationFor(value: typeof phase): number {
      if (value === 'hold') return 3
      if (value === 'dissolve') return 1.1
      return 1.4
    }

    function snapToTargets(): void {
      computeTargets()
      if (count) {
        posArr.set(target)
        vel.fill(0)
        positionAttr.needsUpdate = true
      }
    }

    function snapHome(): void {
      wordIndex = 0
      phase = 'hold'
      phaseTime = 0
      scatter = 0
      snapToTargets()
    }

    refreshViewport()
    buildBuffers()
    computeTargets()
    posArr.set(target)
    positionAttr.needsUpdate = true

    // Re-sample with Archivo 900 once that face is available. Until then the
    // fallback glyphs are shown, so the first frame is never a blank box.
    void loadArchivo().then((ok) => {
      if (disposed || !ok) return
      words = WORDS.map((word) => sampleWord(word, true))
      if (reduced) snapHome()
      else computeTargets()
      ctx.invalidate()
    })

    const handle: ParticleSceneHandle = {
      staticFrame(c: ParticleSceneContext): void {
        if (!reduced) return
        // Keep the selected word (BANKER may already be chosen) but snap its
        // points to the targets the resize just recomputed.
        snapToTargets()
        void c
      },

      update(dt: number, elapsed: number, c: ParticleSceneContext): void {
        if (!geometry || !material) return
        if (reduced) {
          scatter = 0
        } else {
          phaseTime += dt
          if (phaseTime >= durationFor(phase)) advance()
          const t = THREE.MathUtils.clamp(phaseTime / durationFor(phase), 0, 1)
          if (phase === 'hold') scatter = 0
          else if (phase === 'dissolve') scatter = t * t * (3 - 2 * t)
          else scatter = 1 - (1 - t) * (1 - t) * (1 - t)
        }

        const fov = (c.camera.fov * Math.PI) / 180
        const viewH = 2 * Math.tan(fov / 2) * c.camera.position.z
        const viewW = viewH * c.camera.aspect
        const radius = Math.max(0.001, params.repelRadius * viewW)
        const radius2 = radius * radius
        const strength = params.repelStrength * (viewW / 100)
        const pointerX = c.pointer.active ? c.pointer.x * viewW * 0.5 : 0
        const pointerY = c.pointer.active ? c.pointer.y * viewH * 0.5 : 0
        const stiffness = params.stiffness
        const damping = reduced ? 5 : 3.4
        const scatterWorld = scatter * SCATTER_DISTANCE
        const time = elapsed

        for (let i = 0; i < count; i += 1) {
          const i3 = i * 3
          let tx = target[i3]
          let ty = target[i3 + 1]
          let tz = target[i3 + 2]

          if (scatterWorld > 0.001) {
            const ph = phaseArr[i] * TAU
            const osc = 0.72 + 0.28 * Math.sin(time * 0.9 + ph)
            const amt = scatterWorld * osc
            tx += rand[i3] * amt
            ty += rand[i3 + 1] * amt
            tz += rand[i3 + 2] * amt * 1.4
          }

          let ax = (tx - posArr[i3]) * stiffness - vel[i3] * damping
          let ay = (ty - posArr[i3 + 1]) * stiffness - vel[i3 + 1] * damping
          const az = (tz - posArr[i3 + 2]) * stiffness - vel[i3 + 2] * damping

          if (c.pointer.active) {
            const dx = posArr[i3] - pointerX
            const dy = posArr[i3 + 1] - pointerY
            const d2 = dx * dx + dy * dy
            if (d2 < radius2 && d2 > 1e-6) {
              const d = Math.sqrt(d2)
              const force = ((1 - d / radius) * strength) / d
              ax += dx * force
              ay += dy * force
            }
          }

          vel[i3] += ax * dt
          vel[i3 + 1] += ay * dt
          vel[i3 + 2] += az * dt
          posArr[i3] += vel[i3] * dt
          posArr[i3 + 1] += vel[i3 + 1] * dt
          posArr[i3 + 2] += vel[i3 + 2] * dt
        }
        positionAttr.needsUpdate = true

        const density = THREE.MathUtils.clamp(viewW / 95, 0.28, 1.1)
        material.uniforms.uTime.value = time
        material.uniforms.uSize.value = params.particleSize
        material.uniforms.uOpacity.value = 0.6 * density
        material.uniforms.uPixelRatio.value = c.quality.pixelRatio
      },

      resize(w: number, h: number, c: ParticleSceneContext): void {
        void w
        void h
        refreshViewport()
        computeTargets()
        if (material) material.uniforms.uPixelRatio.value = c.quality.pixelRatio
      },

      setQuality(q, c): void {
        const next = Math.max(0.2, q.particleScale)
        if (Math.abs(next - currentScale) > 1e-4) {
          currentScale = next
          refreshViewport()
          buildBuffers()
          computeTargets()
          posArr.set(target)
          positionAttr.needsUpdate = true
        }
        if (material) material.uniforms.uPixelRatio.value = c.quality.pixelRatio
      },

      setReducedMotion(value: boolean, c: ParticleSceneContext): void {
        reduced = value
        if (value) {
          snapHome()
          if (material) material.uniforms.uTime.value = 0
        }
        void c
      },

      setPalette(palette: ParticlePalette, c: ParticleSceneContext): void {
        colors = paletteColors(palette)
        computeTargets()
        if (reduced && count) {
          posArr.set(target)
          positionAttr.needsUpdate = true
        }
        void c
      },

      dispose(c: ParticleSceneContext): void {
        disposed = true
        releaseBuffers()
        void c
      },
    }

    return handle
  },
}

export default definition
