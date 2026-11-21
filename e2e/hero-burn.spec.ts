import { test, expect, type Locator } from '@playwright/test'
import { gotoHydrated } from './helpers'

// The burning-paper canvas behind the hero copy (components/hero-systems/hero-burn.tsx).

const CANVAS = 'canvas[data-hero-burn-canvas]'
const HOST = '[data-hero-burn]'

type BurnMount = { at: number; stripsHidden: boolean }
declare global {
  interface Window {
    __burnMount?: BurnMount
  }
}

const frames = async (host: Locator) => Number((await host.getAttribute('data-frames')) ?? 0)

test('hero burn canvas mounts only after the opening hook', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' })

  // Record the exact instant the canvas is inserted, relative to navigation,
  // plus the state of the opening hook at that instant. This stays reliable
  // even when a busy dev server hydrates before the load event resolves.
  await page.addInitScript(() => {
    const t0 = performance.now()
    const observer = new MutationObserver(() => {
      const canvas = document.querySelector('canvas[data-hero-burn-canvas]')
      if (!canvas || window.__burnMount) return
      const strips = Array.from(document.querySelectorAll('.hook-strip'))
      window.__burnMount = {
        at: performance.now() - t0,
        stripsHidden: strips.length > 0 && strips.every((el) => getComputedStyle(el).visibility === 'hidden'),
      }
      observer.disconnect()
    })
    observer.observe(document, { childList: true, subtree: true })
  })

  await page.goto('/')
  await expect(page.locator(HOST)).toHaveCount(1)
  await expect(page.locator(CANVAS)).toHaveCount(1, { timeout: 8000 })

  const mount = await page.evaluate(() => window.__burnMount)
  expect(mount).toBeTruthy()
  // the hook runs for about 1.2 s before the reserved box gets its canvas
  expect(mount!.at).toBeGreaterThan(900)
  expect(mount!.stripsHidden).toBe(true)
})

test('hero burn pauses offscreen and when the document is hidden', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' })
  await gotoHydrated(page, '/')

  const host = page.locator(HOST)
  await expect(page.locator(CANVAS)).toHaveCount(1, { timeout: 8000 })
  await expect(host).toHaveAttribute('data-running', '1')

  const count = () => frames(host)

  const f1 = await count()
  await page.waitForTimeout(300)
  expect(await count()).toBeGreaterThan(f1)

  // scrolling the hero away stops the loop
  await page.evaluate(() => {
    const hero = document.querySelector('[data-hero]')!
    window.scrollTo({ top: hero.getBoundingClientRect().height + 1200, behavior: 'instant' })
  })
  await expect(host).not.toHaveAttribute('data-running', '1')
  const o1 = await count()
  await page.waitForTimeout(300)
  expect(await count()).toBe(o1)

  // coming back into view resumes cleanly
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }))
  await expect(host).toHaveAttribute('data-running', '1')
  await page.waitForTimeout(300)
  expect(await count()).toBeGreaterThan(o1)

  // a hidden document pauses too
  await page.evaluate(() => {
    Object.defineProperty(document, 'hidden', { configurable: true, get: () => true })
    document.dispatchEvent(new Event('visibilitychange'))
  })
  await expect(host).not.toHaveAttribute('data-running', '1')
  const h1 = await count()
  await page.waitForTimeout(300)
  expect(await count()).toBe(h1)

  await page.evaluate(() => {
    Object.defineProperty(document, 'hidden', { configurable: true, get: () => false })
    document.dispatchEvent(new Event('visibilitychange'))
  })
  await expect(host).toHaveAttribute('data-running', '1')
  await page.waitForTimeout(300)
  expect(await count()).toBeGreaterThan(h1)
})

test('hero burn is absent under reduced motion', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await gotoHydrated(page, '/')
  await page.waitForTimeout(2000)

  await expect(page.locator(CANVAS)).toHaveCount(0)
  await expect(page.locator(HOST)).toHaveCount(1)
  expect((await page.locator(HOST).innerHTML()).trim()).toBe('')
})
