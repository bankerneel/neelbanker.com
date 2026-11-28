/**
 * One canvas scene at a time on the homepage.
 *
 * Each scene reports whether its section is in view. The pinned sub hero wins
 * whenever both report in view, so the burning paper never draws behind it.
 * There is no rAF and no layout work here, only a tiny shared flag.
 */

export type HeroScene = 'hero-burn' | 'sub-hero'

type Listener = () => void

const inView: Record<HeroScene, boolean> = { 'hero-burn': false, 'sub-hero': false }
const listeners = new Set<Listener>()
let current: HeroScene | null = null

function resolve(): void {
  const next: HeroScene | null = inView['sub-hero']
    ? 'sub-hero'
    : inView['hero-burn']
      ? 'hero-burn'
      : null
  if (next === current) return
  current = next
  listeners.forEach((listener) => listener())
}

export function setSceneInView(scene: HeroScene, visible: boolean): void {
  if (inView[scene] === visible) return
  inView[scene] = visible
  resolve()
}

export function sceneIsActive(scene: HeroScene): boolean {
  return current === scene
}

export function subscribeScenes(listener: Listener): () => void {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

export function resetScenesForTests(): void {
  inView['hero-burn'] = false
  inView['sub-hero'] = false
  current = null
}
