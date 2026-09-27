import { test, expect } from '@playwright/test'
import { gotoHydrated } from './helpers'

// The homepage film (app/motion.css + components/motion/motion-stage.tsx).

test('the page is split into bands with shaped edges', async ({ page }) => {
  await page.goto('/')
  const bands = page.locator('[data-band]')
  await expect(bands).toHaveCount(4)
  expect(await page.locator('[data-band] > .band-edge').count()).toBeGreaterThanOrEqual(4)
})

test('the opening hook ends with the headline uncovered', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' })
  await gotoHydrated(page, '/')
  // every paper strip has ripped away and is hidden once the hook finishes
  await expect
    .poll(() => page.$$eval('.hook-strip', (els) => els.every((el) => getComputedStyle(el).visibility === 'hidden')), { timeout: 5000 })
    .toBe(true)
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(/Building\s*what.s\s*Next\./)
})

test('reduced motion shows every final frame at once', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await gotoHydrated(page, '/')
  const state = await page.evaluate(() => ({
    running: document.getAnimations().filter((a) => a.playState === 'running').length,
    strips: [...document.querySelectorAll('.hook-strip')].every((el) => getComputedStyle(el).display === 'none'),
    hidden: [...document.querySelectorAll('[data-reveal], [data-sd]')].filter((el) => getComputedStyle(el).opacity !== '1').length,
    sticky: getComputedStyle(document.querySelector('.stack-item')!).position,
  }))
  expect(state.strips).toBe(true)
  expect(state.hidden).toBe(0)
  expect(state.sticky).toBe('static')
  // only the ticker tapes may run, and the global reduced-motion guard
  // collapses them to a single 0.01ms iteration
  expect(state.running).toBeLessThanOrEqual(2)
})

test('revealed sections are never left invisible after scrolling through', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' })
  await page.setViewportSize({ width: 1280, height: 800 })
  await gotoHydrated(page, '/')
  await page.evaluate(async () => {
    const total = document.documentElement.scrollHeight
    for (let y = 0; y <= total; y += 400) {
      window.scrollTo({ top: y, behavior: 'instant' })
      await new Promise((r) => setTimeout(r, 60))
    }
  })
  await expect
    .poll(() => page.$$eval('[data-reveal]', (els) => els.filter((el) => !('shown' in (el as HTMLElement).dataset)).length))
    .toBe(0)
})

test('the living sky starts after load, and never under reduced motion', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' })
  await gotoHydrated(page, '/')
  const webgl = await page.evaluate(() => !!document.createElement('canvas').getContext('webgl'))
  test.skip(!webgl, 'no WebGL in this browser')
  await expect(page.locator('canvas.sky-canvas')).toHaveCount(1, { timeout: 10_000 })

  await page.emulateMedia({ reducedMotion: 'reduce' })
  await gotoHydrated(page, '/')
  await page.waitForTimeout(3000)
  await expect(page.locator('canvas.sky-canvas')).toHaveCount(0)
})

test('stat counters keep their real values for screen readers', async ({ page }) => {
  await page.goto('/')
  const stats = page.getByRole('list', { name: 'At a glance' })
  await expect(stats).toContainText('7+')
  await expect(stats).toContainText('50+')
  await expect(stats).toContainText('15+')
})

// Neel's do / don't (AGENTS.md "Motion"): reading surfaces stay still.
for (const route of ['/writing/cross-chain-credential-verification', '/resume']) {
  test(`${route} stays still`, async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'no-preference' })
    await gotoHydrated(page, route)
    await page.waitForTimeout(3000)
    const found = await page.evaluate(() => ({
      // the footer's end card is site chrome and plays everywhere; the page itself must not move
      film: document.querySelectorAll('main :is(.film-progress, .intro-motion, [data-sd], [data-reveal])').length,
      sky: document.querySelectorAll('canvas.sky-canvas').length,
      hidden: [...document.querySelectorAll('main *')].filter((el) => getComputedStyle(el).opacity === '0').length,
    }))
    expect(found).toEqual({ film: 0, sky: 0, hidden: 0 })
  })
}

test('the inner pages play the light version of the film', async ({ page }) => {
  test.setTimeout(120_000) // seven routes, each compiled on demand by the dev server
  await page.emulateMedia({ reducedMotion: 'no-preference' })
  for (const route of ['/about', '/projects', '/work-with-me', '/writing', '/resources', '/speaking', '/newsletter']) {
    await gotoHydrated(page, route)
    await expect(page.locator('header.intro-motion'), route).toHaveCount(1)
    await expect(page.locator('.film-progress'), route).toHaveCount(1)
  }
})
