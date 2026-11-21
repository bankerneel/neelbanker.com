import { test, expect, type Page } from '@playwright/test'
import { gotoHydrated } from './helpers'

// The pinned sub hero: three eras between the hero and the tech marquee.

const HREFS = [
  '/projects/doctrace-fabric-documents',
  '/projects/atlas-multichain-wallet',
  '/writing/ai-agents-on-chain',
]

async function scrollToProgress(page: Page, p: number) {
  await page.evaluate((value) => {
    const wrap = document.querySelector('[data-sub-hero]') as HTMLElement
    const stage = wrap.querySelector('.sub-stage') as HTMLElement
    const nav = document.querySelector('header')?.getBoundingClientRect().height ?? 64
    const wr = wrap.getBoundingClientRect()
    const sr = stage.getBoundingClientRect()
    const top = wr.top + window.scrollY
    const span = wr.height - sr.height
    window.scrollTo({ top: top - nav + value * span, behavior: 'instant' })
  }, p)
}

test('the hero pins at the nav height and reads as a three era story', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' })
  await page.setViewportSize({ width: 1280, height: 800 })
  await gotoHydrated(page, '/')
  await expect(page.locator('[data-sub-hero]')).toHaveAttribute('data-motion', 'full')

  const state = await page.evaluate(() => {
    const wrap = document.querySelector('[data-sub-hero]') as HTMLElement
    const stage = wrap.querySelector('.sub-stage') as HTMLElement
    return {
      position: getComputedStyle(stage).position,
      top: getComputedStyle(stage).top,
      nav: `${Math.round(document.querySelector('header')!.getBoundingClientRect().height)}px`,
      height: wrap.getBoundingClientRect().height,
      vh: window.innerHeight,
      hasCanvas: !!wrap.querySelector('canvas.sub-canvas'),
      heading: document.querySelector('#sub-heading')?.textContent,
      copy: document.querySelector('.sub-head p')?.textContent,
      canvasHidden: wrap.querySelector('canvas')?.getAttribute('aria-hidden'),
      readoutHidden: document.querySelector('.sub-label')?.getAttribute('aria-hidden'),
    }
  })
  expect(state.position).toBe('sticky')
  expect(state.top).toBe(state.nav)
  expect(state.height).toBeGreaterThan(state.vh * 3)
  expect(state.hasCanvas).toBe(true)
  expect(state.heading).toMatch(/Blockchain[\s\S]*Web3[\s\S]*AI agents/)
  expect(state.copy).toContain('Scroll to walk through the work')
  expect(state.canvasHidden).toBe('true')
  expect(state.readoutHidden).toBe('true')
})

for (const [p, era, href] of [
  [0.1, /blockchain|ethereum mainnet/i, HREFS[0]],
  [0.5, /web3/i, HREFS[1]],
  [0.9, /ai agents/i, HREFS[2]],
] as const) {
  test(`the era at ${p * 100} percent shows the matching readout and chip`, async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'no-preference' })
    await page.setViewportSize({ width: 1280, height: 800 })
    await gotoHydrated(page, '/')
    await scrollToProgress(page, p)

    const chip = page.locator('#eraLink')
    await expect(chip).toHaveAttribute('data-visible', 'true', { timeout: 8000 })
    await expect(chip).toHaveAttribute('href', href)
    await expect(page.locator('.sub-label')).toContainText(era, { timeout: 8000 })
    await expect(page.locator('.sub-label')).toContainText(/scroll \d+%/)
  })
}

test('reduced motion drops the pin and lists all three links in the open', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.setViewportSize({ width: 1280, height: 800 })
  await gotoHydrated(page, '/')
  await expect(page.locator('[data-sub-hero]')).toHaveAttribute('data-motion', 'reduced')

  const state = await page.evaluate(() => {
    const wrap = document.querySelector('[data-sub-hero]') as HTMLElement
    const stage = wrap.querySelector('.sub-stage') as HTMLElement
    return {
      motion: wrap.dataset.motion,
      position: getComputedStyle(stage).position,
      height: wrap.getBoundingClientRect().height,
      vh: window.innerHeight,
      chip: getComputedStyle(document.querySelector('#eraLink')!).display,
    }
  })
  expect(state.motion).toBe('reduced')
  expect(state.position).toBe('static')
  expect(state.height).toBeLessThan(state.vh * 2)
  expect(state.chip).toBe('none')

  for (const href of HREFS) {
    const link = page.locator(`.sub-sr-links a[href="${href}"]`)
    await expect(link).toBeVisible()
    expect((await link.boundingBox())?.width).toBeGreaterThan(0)
  }
  // The canvas still holds a single, still web3 frame.
  await expect(page.locator('.sub-label')).toContainText(/web3/i)
})

test('a real scroll leaves the film progress and the hero pull-back intact', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' })
  await page.setViewportSize({ width: 1280, height: 800 })
  await gotoHydrated(page, '/')
  const supported = await page.evaluate(() => CSS.supports('animation-timeline: scroll(root)'))
  test.skip(!supported, 'this browser has no scroll-driven animations')

  const read = () =>
    page.evaluate(() => ({
      scroll: window.scrollY,
      progress: getComputedStyle(document.querySelector('.film-progress')!).transform,
      pullback: getComputedStyle(document.querySelector('.hero-stage .px-scroll')!).translate,
    }))
  const before = await read()
  await page.mouse.move(640, 400)
  for (let i = 0; i < 40; i++) await page.mouse.wheel(0, 700)
  await page.waitForTimeout(600)
  const after = await read()

  expect(after.scroll).toBeGreaterThan(before.scroll + 1000)
  expect(after.progress).not.toBe(before.progress)
  expect(after.pullback).not.toBe(before.pullback)
})

test('the era chip stays inside a 390px phone', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' })
  await page.setViewportSize({ width: 390, height: 844 })
  await gotoHydrated(page, '/')
  await scrollToProgress(page, 0.1)

  const chip = page.locator('#eraLink')
  await expect(chip).toHaveAttribute('data-visible', 'true', { timeout: 8000 })
  const box = await chip.boundingBox()
  expect(box).not.toBeNull()
  expect(box!.x).toBeGreaterThanOrEqual(0)
  expect(box!.x + box!.width).toBeLessThanOrEqual(390)
})

test('all three links are in the HTML with JavaScript off', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false })
  const page = await context.newPage()
  await page.goto('/')
  const links = page.locator('.sub-sr-links a')
  await expect(links).toHaveCount(3)
  for (const href of HREFS) await expect(page.locator(`.sub-sr-links a[href="${href}"]`)).toHaveCount(1)
  await context.close()
})
