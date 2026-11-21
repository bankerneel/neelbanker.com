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
  expect(webgl, 'WebGL is required for the particle e2e checks').toBe(true)

  // (b) scrolling the band into view mounts one canvas and a painted frame
  await page.locator('.particle-slot').scrollIntoViewIfNeeded()
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

  // (c) reduced motion draws one NEEL frame, starts no loop, and repaints on theme flip
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await gotoHydrated(page, '/')
  await page.locator('.particle-slot').scrollIntoViewIfNeeded()
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

  // A resize must repaint the still frame with geometry scaled to the new box.
  const beforeResize = await page.evaluate(() => Number(window.__NB_PARTICLES__?.getState?.().frames ?? 0))
  await page.setViewportSize({ width: 900, height: 720 })
  await expect
    .poll(() => page.evaluate(() => window.__NB_PARTICLES__?.getState?.().frames ?? 0))
    .toBeGreaterThan(beforeResize)
  const afterResize = await page.evaluate(() => window.__NB_PARTICLES__?.getState?.() ?? null)
  expect(afterResize?.running).toBe(false)
  expect(await page.evaluate(() => window.__NB_PARTICLES__?.samplePixels?.() ?? 0)).toBeGreaterThan(0)

  const moving = await page.evaluate(
    () => document.getAnimations().filter((animation) => animation.playState === 'running').length,
  )
  expect(moving).toBeLessThanOrEqual(2)

  // (d) no particle canvas anywhere that does not own a slot
  for (const route of ['/about', '/projects', '/writing/cross-chain-credential-verification']) {
    await gotoHydrated(page, route)
    await expect(page.locator('canvas.particle-canvas'), route).toHaveCount(0)
  }
})
