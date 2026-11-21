import { test, expect } from '@playwright/test'
import { gotoHydrated } from './helpers'

// The shared particle runtime, Glyph Drift and Ember Field. All checks share
// one page and one browser context so the WebGL work stays off the other
// parallel workers. The sky canvas is a separate system with another class.
// (a) two reserved slots and no canvas before either is near, (b) Glyph Drift
// lazy load and single active scene director, (c) Ember Field lazy load, still
// frame and WebGL fallback, (d) nothing on inner pages or articles.

test('both particle scenes load only near their slots and respect reduced motion', async ({ page }) => {
  test.setTimeout(240_000)
  const errors: string[] = []
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(message.text())
  })
  page.on('pageerror', (error) => errors.push(String(error)))

  await page.emulateMedia({ reducedMotion: 'no-preference' })
  await page.setViewportSize({ width: 1280, height: 720 })
  await gotoHydrated(page, '/')

  const glyph = page.locator('[data-particle-scene="glyph-drift"]')
  const ember = page.locator('[data-particle-scene="ember-field"]')

  // (a) both boxes are reserved in server HTML; three is not loaded yet
  await expect(page.locator('.particle-slot')).toHaveCount(2)
  await expect(glyph).toHaveCount(1)
  await expect(ember).toHaveCount(1)
  await expect(page.locator('canvas.particle-canvas')).toHaveCount(0)

  const webgl = await page.evaluate(() => !!document.createElement('canvas').getContext('webgl'))
  expect(webgl, 'WebGL is required for the particle e2e checks').toBe(true)

  // (b) scrolling the night band into view mounts one canvas and a painted frame
  await glyph.scrollIntoViewIfNeeded()
  await expect(page.locator('canvas.particle-canvas')).toHaveCount(1, { timeout: 12000 })
  const state = await page.evaluate(() => window.__NB_PARTICLES__?.getState?.() ?? null)
  expect(state?.scene).toBe('glyph-drift')
  expect(state?.count).toBeGreaterThan(0)
  await expect.poll(() => page.evaluate(() => window.__NB_PARTICLES__?.samplePixels?.() ?? 0)).toBeGreaterThan(0)

  // two slots must never leave two scene objects in the shared scene
  await page.evaluate(() => {
    let host = document.getElementById('nb-test-slot')
    if (!host) {
      host = document.createElement('div')
      host.id = 'nb-test-slot'
      host.style.cssText = 'position:absolute;top:0;left:0;width:240px;height:120px;pointer-events:none'
      document.body.appendChild(host)
    }
    window.__NB_PARTICLES__?.mountTest?.('nb-test-slot')
  })
  await expect.poll(() => page.evaluate(() => window.__NB_PARTICLES__?.getState?.().mounts ?? 0)).toBe(2)
  await expect.poll(() => page.evaluate(() => window.__NB_PARTICLES__?.getState?.().objects ?? 0)).toBe(1)
  await page.evaluate(() => window.__NB_PARTICLES__?.deactivateTest?.())
  await expect.poll(() => page.evaluate(() => window.__NB_PARTICLES__?.getState?.().objects ?? 0)).toBe(1)

  // A displaced mount stays wanted: when the active mount gives up the
  // renderer it must be re-elected as soon as it scrolls back into view.
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }))
  await expect.poll(() => page.evaluate(() => window.__NB_PARTICLES__?.getState?.().eligible ?? 0)).toBe(0)

  await page.evaluate(() => {
    const far = document.createElement('div')
    far.id = 'nb-far-slot'
    far.style.cssText = 'position:fixed;left:0;top:-1000px;width:240px;height:120px;pointer-events:none'
    document.body.appendChild(far)
    window.__NB_PARTICLES__?.mountTest?.('nb-far-slot')
  })
  await expect.poll(() => page.evaluate(() => window.__NB_PARTICLES__?.getState?.().mounts ?? 0)).toBe(3)

  await page.evaluate(() => {
    const near = document.createElement('div')
    near.id = 'nb-near-slot'
    near.style.cssText = 'position:fixed;left:0;top:120px;width:240px;height:120px;pointer-events:none'
    document.body.appendChild(near)
    window.__NB_PARTICLES__?.mountTest?.('nb-near-slot')
  })
  await expect.poll(() => page.evaluate(() => window.__NB_PARTICLES__?.getState?.().mounts ?? 0)).toBe(4)
  await expect.poll(() => page.evaluate(() => window.__NB_PARTICLES__?.getState?.().eligible ?? 0)).toBe(1)
  await expect.poll(() => page.evaluate(() => window.__NB_PARTICLES__?.getState?.().objects ?? 0)).toBe(1)

  // The active mount deactivates while the displaced one is still offscreen.
  await page.evaluate(() => window.__NB_PARTICLES__?.deactivateTest?.())
  await expect.poll(() => page.evaluate(() => window.__NB_PARTICLES__?.getState?.().eligible ?? 0)).toBe(0)
  await expect.poll(() => page.evaluate(() => window.__NB_PARTICLES__?.getState?.().objects ?? 0)).toBe(0)

  // Bring the displaced mount back: the canvas moves to its container and the
  // scene renders again without a reload.
  await page.evaluate(() => {
    document.getElementById('nb-far-slot')!.style.top = '120px'
  })
  await expect.poll(() => page.evaluate(() => window.__NB_PARTICLES__?.getState?.().eligible ?? 0)).toBe(1)
  await expect.poll(() => page.evaluate(() => window.__NB_PARTICLES__?.getState?.().objects ?? 0)).toBe(1)
  await expect
    .poll(() => page.evaluate(() => document.querySelector('canvas.particle-canvas')?.parentElement?.id ?? ''))
    .toBe('nb-far-slot')
  const beforeRepaint = await page.evaluate(() => Number(window.__NB_PARTICLES__?.getState?.().frames ?? 0))
  await expect
    .poll(() => page.evaluate(() => window.__NB_PARTICLES__?.getState?.().frames ?? 0))
    .toBeGreaterThan(beforeRepaint)
  expect(await page.evaluate(() => window.__NB_PARTICLES__?.samplePixels?.() ?? 0)).toBeGreaterThan(0)

  // (c) the footer slot takes over the single renderer when it comes near
  await page.evaluate(() => window.__NB_PARTICLES__?.disposeTest?.())
  await expect.poll(() => page.evaluate(() => window.__NB_PARTICLES__?.getState?.().mounts ?? 0)).toBe(1)
  await ember.scrollIntoViewIfNeeded()
  await expect.poll(() => page.evaluate(() => window.__NB_PARTICLES__?.getState?.().scene ?? '')).toBe('ember-field')
  await expect(page.locator('canvas.particle-canvas')).toHaveCount(1)
  const emberState = await page.evaluate(() => window.__NB_PARTICLES__?.getState?.() ?? null)
  expect(emberState?.count).toBeGreaterThan(0)
  const tier = await ember.getAttribute('data-ember-tier')
  const reported = Number(await ember.getAttribute('data-ember-count'))
  const expectedCount: Record<string, number> = { high: 57600, medium: 36864, low: 12544 }
  expect(reported).toBe(expectedCount[tier ?? ''])
  await expect.poll(() => page.evaluate(() => window.__NB_PARTICLES__?.samplePixels?.() ?? 0)).toBeGreaterThan(0)

  // A lost context must swap the canvas for the static on-theme still.
  await page.evaluate(() => {
    document.querySelector('canvas.particle-canvas')?.dispatchEvent(new Event('webglcontextlost'))
  })
  await expect(ember.locator('.ember-fallback')).toHaveCount(1)
  await expect(page.locator('canvas.particle-canvas')).toHaveCount(0)

  // (d) reduced motion draws one Glyph Drift frame, starts no loop, repaints on
  // theme flip and resize, then hands the single renderer to Ember as a still.
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await gotoHydrated(page, '/')
  await glyph.scrollIntoViewIfNeeded()
  await expect(page.locator('canvas.particle-canvas')).toHaveCount(1, { timeout: 12000 })
  await page.waitForTimeout(700)
  const first = await page.evaluate(() => window.__NB_PARTICLES__?.getState?.() ?? null)
  expect(first?.reduced).toBe(true)
  expect(first?.running).toBe(false)
  expect(first?.count).toBeGreaterThan(0)
  expect(first?.frames).toBe(1)
  await expect.poll(() => page.evaluate(() => window.__NB_PARTICLES__?.samplePixels?.() ?? 0)).toBeGreaterThan(0)

  await page.evaluate(() => {
    document.documentElement.dataset.theme = 'dark'
  })
  await expect
    .poll(() => page.evaluate(() => window.__NB_PARTICLES__?.getState?.().frames ?? 0))
    .toBeGreaterThan(1)
  const afterTheme = await page.evaluate(() => window.__NB_PARTICLES__?.getState?.() ?? null)
  expect(afterTheme?.running).toBe(false)
  expect(await page.evaluate(() => window.__NB_PARTICLES__?.samplePixels?.() ?? 0)).toBeGreaterThan(0)
  await page.waitForTimeout(600)
  const settled = await page.evaluate(() => window.__NB_PARTICLES__?.getState?.() ?? null)
  expect(settled?.frames).toBe(afterTheme?.frames)

  const beforeResize = await page.evaluate(() => Number(window.__NB_PARTICLES__?.getState?.().frames ?? 0))
  await page.setViewportSize({ width: 900, height: 720 })
  await expect
    .poll(() => page.evaluate(() => window.__NB_PARTICLES__?.getState?.().frames ?? 0))
    .toBeGreaterThan(beforeResize)
  const afterResize = await page.evaluate(() => window.__NB_PARTICLES__?.getState?.() ?? null)
  expect(afterResize?.running).toBe(false)
  expect(await page.evaluate(() => window.__NB_PARTICLES__?.samplePixels?.() ?? 0)).toBeGreaterThan(0)

  await ember.scrollIntoViewIfNeeded()
  await expect.poll(() => page.evaluate(() => window.__NB_PARTICLES__?.getState?.().scene ?? '')).toBe('ember-field')
  await page.waitForTimeout(500)
  const emberStill = await page.evaluate(() => window.__NB_PARTICLES__?.getState?.() ?? null)
  expect(emberStill?.reduced).toBe(true)
  expect(emberStill?.running).toBe(false)
  expect(emberStill?.count).toBeGreaterThan(0)
  await expect.poll(() => page.evaluate(() => window.__NB_PARTICLES__?.samplePixels?.() ?? 0)).toBeGreaterThan(0)
  const emberFrames = Number(emberStill?.frames ?? 0)
  await page.evaluate(() => {
    document.documentElement.dataset.theme = 'light'
  })
  await expect
    .poll(() => page.evaluate(() => window.__NB_PARTICLES__?.getState?.().frames ?? 0))
    .toBeGreaterThan(emberFrames)
  const afterEmberTheme = await page.evaluate(() => window.__NB_PARTICLES__?.getState?.() ?? null)
  expect(afterEmberTheme?.running).toBe(false)
  await page.waitForTimeout(500)
  expect(await page.evaluate(() => Number(window.__NB_PARTICLES__?.getState?.().frames ?? 0))).toBe(
    afterEmberTheme?.frames,
  )

  const moving = await page.evaluate(
    () => document.getAnimations().filter((animation) => animation.playState === 'running').length,
  )
  expect(moving).toBeLessThanOrEqual(2)

  // (e) no particle canvas or Ember slot anywhere that does not own one
  for (const route of ['/about', '/projects', '/writing/cross-chain-credential-verification']) {
    await gotoHydrated(page, route)
    await expect(page.locator('canvas.particle-canvas'), route).toHaveCount(0)
    await expect(page.locator('[data-particle-scene="ember-field"]'), route).toHaveCount(0)
  }
  expect(errors).toEqual([])
})

test('Ember shows a static still when WebGL is unavailable', async ({ page }) => {
  test.setTimeout(120_000)
  const errors: string[] = []
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(message.text())
  })
  page.on('pageerror', (error) => errors.push(String(error)))
  await page.addInitScript(() => {
    const proto = HTMLCanvasElement.prototype as unknown as { getContext: (...args: unknown[]) => unknown }
    const original = proto.getContext
    proto.getContext = function (...args: unknown[]) {
      const type = args[0]
      if (type === 'webgl' || type === 'webgl2' || type === 'experimental-webgl') return null
      return original.call(this, ...args)
    }
  })
  await gotoHydrated(page, '/')
  await expect(page.locator('.particle-slot')).toHaveCount(2)
  await page.locator('[data-particle-scene="ember-field"]').scrollIntoViewIfNeeded()
  const ember = page.locator('[data-particle-scene="ember-field"]')
  await expect(ember.locator('.ember-fallback')).toHaveCount(1)
  await expect(ember).toHaveAttribute('data-ember-state', 'fallback')
  await expect(page.locator('canvas.particle-canvas')).toHaveCount(0)
  expect(errors).toEqual([])
})
