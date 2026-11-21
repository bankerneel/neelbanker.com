import type * as THREE from 'three'

// Shared, client safe contracts for the particle runtime and its scenes.
// A type only import keeps three out of every bundle that only needs these.

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
  rose: string
  terra: string
  inkSoft: string
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
  /** Ask the director to repaint one static frame. No-op while looping. */
  invalidate: () => void
}

export interface ParticleSceneHandle {
  update(dt: number, elapsed: number, ctx: ParticleSceneContext): void
  /** Snap geometry to the current targets for the single reduced-motion frame. */
  staticFrame?(ctx: ParticleSceneContext): void
  resize?(w: number, h: number, ctx: ParticleSceneContext): void
  setQuality?(q: QualitySettings, ctx: ParticleSceneContext): void
  setReducedMotion?(reduced: boolean, ctx: ParticleSceneContext): void
  setPalette?(palette: ParticlePalette, ctx: ParticleSceneContext): void
  onPointerMove?(x: number, y: number, ctx: ParticleSceneContext): void
  dispose(ctx: ParticleSceneContext): void
}

/**
 * A scene module default exports one of these. The runtime owns the single
 * renderer, scene and camera; a scene only fills the scene graph and updates it.
 * A second scene (Ember Field) can register through the same slot API and is
 * gated by the director, so at most one scene is ever running.
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
