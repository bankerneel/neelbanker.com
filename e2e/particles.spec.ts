import { test, expect } from '@playwright/test'
import { gotoHydrated } from './helpers'

// The shared particle runtime and the Glyph Drift slot. All four checks share
// one page and one browser context so the WebGL work stays off the other
// parallel workers. The sky canvas is a separate system with another class.
// (a) no canvas before the section is near, (b) canvas after scrolling,
// (c) static frame under reduced motion, (d) nothing on inner pages.

test('the particle scene loads only near the viewport and respects reduced motion', async ({ page }) => {
  test.setTimeout(120_000)
  await page.emulateMedia({ reducedMotion: 'no-preference' })
  await page.setViewportSize({ width: 1280, height: 720 })
  await gotoHydrated(page, '/')

  // (a) the slot is reserved in server HTML, but three is not loaded yet
  await expect(page.locator('.particle-slot')).toHaveCount(1)
  await expect(page.locator('canvas.particle-canvas')).toHaveCount(0)

  const webgl = await page.evaluate(() => !!document.createElement('canvas').getContext('webgl'))
  if (webgl) {
    // (b) scrolling the band into view mounts one canvas and the glyph scene
    await page.locator('.particle-slot').scrollIntoViewIfNeeded()
    await expect(page.locator('canvas.particle-canvas')).toHaveCount(1, { timeout: 12000 })
    const state = await page.evaluate(() => window.__NB_PARTICLES__?.getState?.() ?? null)
    expect(state?.scene).toBe('glyph-drift')

    // (c) reduced motion draws one NEEL frame and starts no loop
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await gotoHydrated(page, '/')
    await page.locator('.particle-slot').scrollIntoViewIfNeeded()
    await expect(page.locator('canvas.particle-canvas')).toHaveCount(1, { timeout: 12000 })
    await page.waitForTimeout(300)
    const first = await page.evaluate(() => window.__NB_PARTICLES__?.getState?.() ?? null)
    expect(first?.reduced).toBe(true)
    expect(first?.running).toBe(false)
    await page.waitForTimeout(800)
    const second = await page.evaluate(() => window.__NB_PARTICLES__?.getState?.() ?? null)
    expect(second?.frames).toBe(first?.frames)
    const moving = await page.evaluate(
      () => document.getAnimations().filter((animation) => animation.playState === 'running').length,
    )
    expect(moving).toBeLessThanOrEqual(2)
  }

  // (d) no particle canvas anywhere that does not own a slot
  for (const route of ['/about', '/projects', '/writing/cross-chain-credential-verification']) {
    await gotoHydrated(page, route)
    await expect(page.locator('canvas.particle-canvas'), route).toHaveCount(0)
  }
})
