import { test, expect } from '@playwright/test'
import { gotoHydrated } from './helpers'

// Regression guard for the tilted, overlapping Dream Bazaar layout: at phone,
// tablet and small-laptop widths no element may stick out past the viewport.
// <main> clips horizontal overflow (overflow-x-clip), so scrollWidth can't
// catch this — measure element boxes instead. Decorative (aria-hidden)
// pieces, the marquee tape, and content inside scroll boxes (code, tables)
// are allowed to extend.
// Layout is measured at rest: the homepage film (app/motion.css) moves things
// through off-screen positions on purpose, so motion is switched off here and
// checked separately below.
const ROUTES = ['/', '/about', '/writing', '/writing/cross-chain-credential-verification', '/projects', '/work-with-me', '/resume']
const WIDTHS = [320, 375, 768, 1024]


for (const width of WIDTHS) {
  test(`no horizontal overflow at ${width}px`, async ({ page }) => {
    test.setTimeout(120_000) // seven routes per width
    await page.setViewportSize({ width, height: 900 })
    // test.use({ reducedMotion }) is not applied by this setup; emulate directly
    await page.emulateMedia({ reducedMotion: 'reduce' })
    for (const route of ROUTES) {
      await gotoHydrated(page, route)
      const offenders = await page.evaluate(() => {
        const limit = window.innerWidth + 1
        return [...document.querySelectorAll('body *')]
          .filter((el) => {
            if (el.closest('[aria-hidden="true"], .animate-marquee, pre, .table-scroll, iframe, [data-design-lab]')) return false
            const box = el.getBoundingClientRect()
            return box.width > 0 && box.right > limit
          })
          .slice(0, 5)
          .map((el) => `${el.tagName.toLowerCase()}.${String(el.className).slice(0, 60)} → ${Math.round(el.getBoundingClientRect().right)}px`)
      })
      expect(offenders, `${route} at ${width}px`).toEqual([])
    }
  })
}

// With motion on, animated pieces may travel past the edge, but <main> and the
// footer clip them: the page itself must never scroll sideways.
test.describe('motion never widens the page', () => {
  const MOVING = ['/', '/about', '/projects', '/work-with-me', '/writing', '/resources', '/speaking', '/newsletter']
  for (const route of MOVING)
  for (const width of [320, 1280]) {
    test(`${route} at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 800 })
      await page.emulateMedia({ reducedMotion: 'no-preference' })
      await gotoHydrated(page, route)
      const widths = await page.evaluate(async () => {
        const out: number[] = []
        const total = document.documentElement.scrollHeight
        for (let y = 0; y <= total; y += Math.round(innerHeight * 0.6)) {
          window.scrollTo({ top: y, behavior: 'instant' })
          await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)))
          out.push(document.documentElement.scrollWidth - innerWidth)
        }
        return out
      })
      expect(Math.max(...widths)).toBeLessThanOrEqual(0)
    })
  }
})
