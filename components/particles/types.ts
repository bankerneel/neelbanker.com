import type * as THREE from 'three'

// Client safe contracts for the particle runtime and its scenes. The type only
// import keeps three out of every bundle that needs just these definitions.

export type QualityLevel = 'low' | 'medium' | 'high'

export interface QualitySettings {
  level: QualityLevel
  particleScale: number
  pixelRatio: number
  bloom: false
}

export interface PointerState {
  x: number
  y: number
  active: boolean
}

/** Colours sampled from the live --dm-* tokens on every theme flip. */
export interface ParticlePalette {
  butter: string
  lilac: string
  sky: string
  accentInk: string
  nightInk: string
  panel: string
  ink: string
}

export interface ParticleSceneContext {
  renderer: THREE.WebGLRenderer
  scene: THREE.Scene
  camera: THREE.PerspectiveCamera
  quality: QualitySettings
  reducedMotion: boolean
  pointer: PointerState
  palette: ParticlePalette
  width: number
  height: number
  reportCount: (count: number) => void
  /** Ask the runtime to repaint one static frame. No-op while looping. */
  invalidate: () => void
}

export interface ParticleSceneHandle {
  update(dt: number, elapsed: number, ctx: ParticleSceneContext): void
  resize?(w: number, h: number, ctx: ParticleSceneContext): void
  setQuality?(q: QualitySettings, ctx: ParticleSceneContext): void
  setReducedMotion?(reduced: boolean, ctx: ParticleSceneContext): void
  setPalette?(palette: ParticlePalette, ctx: ParticleSceneContext): void
  onPointerMove?(x: number, y: number, ctx: ParticleSceneContext): void
  /** Current glyph, exposed for tests that check the reduced motion still frame. */
  currentWord?(): string
  dispose(ctx: ParticleSceneContext): void
}

/**
 * A scene module default exports one of these. The runtime owns the single
 * renderer, scene and camera; a scene only fills the scene graph and updates it.
 */
export interface ParticleSceneDefinition {
  id: string
  create(ctx: ParticleSceneContext): ParticleSceneHandle
}

export interface ParticleMount {
  activate(): void
  deactivate(): void
  dispose(): void
}
