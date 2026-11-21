import { test, expect, type Page } from '@playwright/test'
import { gotoHydrated } from './helpers'

// Glyph Drift lives only on the 404 page. three is fetched by a dynamic import
// after the reserved slot intersects, never in another route's initial bundle.

const LOST = '/a-page-that-wandered-off'
const THREE_MARKERS = ['WebGLRenderer', 'BufferGeometry']

type State = {
  running: boolean
  reduced: boolean
  frames: number
  canvas: boolean
  scene: string | null
  word: string | null
  width: number
  height: number
}

function state(page: Page): Promise<State | null> {
  return page.evaluate(() => window.__NB_PARTICLES_404__?.getState?.() ?? null)
}

function watchJs(page: Page) {
  const pending: Array<Promise<{ url: string; body: string }>> = []
  page.on('response', (response) => {
    const url = response.url()
    if (!url.includes('/_next/') || !url.includes('.js')) return
    pending.push(response.text().then((body) => ({ url, body })).catch(() => ({ url, body: '' })))
  })
  return pending
}

async function threeChunks(pending: Array<Promise<{ url: string; body: string }>>) {
  const responses = await Promise.all(pending)
  return responses.filter(({ body }) => THREE_MARKERS.every((marker) => body.includes(marker))).map(({ url }) => url)
}

test('the 404 keeps its real content and adds an aria hidden slot', async ({ page }) => {
  await gotoHydrated(page, LOST)
  await expect(page.getByRole('heading', { level: 1 })).toContainText('404')
  await expect(page.getByRole('link', { name: 'Home' })).toHaveCount(1)
  const slot = page.locator('.particle-slot')
  await expect(slot).toHaveCount(1)
  await expect(slot).toHaveAttribute('aria-hidden', 'true')
  const box = await slot.boundingBox()
  expect(box?.height).toBeGreaterThan(200)
})

test('no canvas is created before the slot intersects', async ({ page }) => {
  await page.addInitScript(() => {
    const Real = window.IntersectionObserver
    class Blocked extends Real {
      observe(target: Element) {
        if (target instanceof Element && target.classList.contains('particle-slot')) return
        super.observe(target)
      }
    }
    window.IntersectionObserver = Blocked
  })
  await gotoHydrated(page, LOST)
  await page.waitForTimeout(700)
  await expect(page.locator('canvas.particle-canvas')).toHaveCount(0)
  expect(await state(page)).toBeNull()
})

test('the canvas and runtime arrive after intersection', async ({ page }) => {
  await gotoHydrated(page, LOST)
  await expect(page.locator('canvas.particle-canvas')).toHaveCount(1, { timeout: 15000 })
  await expect.poll(async () => (await state(page))?.scene).toBe('glyph-drift')
  expect((await state(page))?.word).toBe('404')
})

test('reduced motion paints one still 404 and starts no loop', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await gotoHydrated(page, LOST)
  await expect(page.locator('canvas.particle-canvas')).toHaveCount(1, { timeout: 15000 })
  // The async Archivo re-sample calls invalidate once after fonts settle.
  await page.evaluate(async () => {
    await document.fonts.ready
  })
  await expect.poll(async () => (await state(page))?.word).toBe('404')
  const first = await state(page)
  await page.waitForTimeout(700)
  const second = await state(page)
  expect(first?.reduced).toBe(true)
  expect(first?.running).toBe(false)
  expect(second?.running).toBe(false)
  // One extra still frame from the font re-sample is allowed; no loop is.
  expect(second!.frames).toBeLessThanOrEqual(2)
  expect(second!.frames - first!.frames).toBeLessThanOrEqual(1)
})

test('three.js is fetched on the 404 route and on no other route', async ({ page }) => {
  const lostPending = watchJs(page)
  await gotoHydrated(page, LOST)
  await expect(page.locator('canvas.particle-canvas')).toHaveCount(1, { timeout: 15000 })
  await expect.poll(async () => (await threeChunks(lostPending)).length).toBeGreaterThan(0)

  const otherPending = watchJs(page)
  for (const route of ['/', '/about', '/writing', '/resume', '/projects', '/speaking']) {
    await gotoHydrated(page, route)
  }
  await page.waitForTimeout(300)
  expect(await threeChunks(otherPending)).toEqual([])
})
