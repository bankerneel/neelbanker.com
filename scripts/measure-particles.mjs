// Local performance and screenshot harness for the particle work.
// Run from the repo root against a dev server bound to 127.0.0.1.
//   node scripts/measure-particles.mjs
// Set LABEL=before or LABEL=after to name the metrics file.
// No em dashes, no en dashes, no network access beyond the local server.

import { chromium } from '@playwright/test'
import fs from 'node:fs'
import path from 'node:path'

const BASE = process.env.BASE_URL || 'http://127.0.0.1:3000'
const LABEL = process.env.LABEL || 'after'
const OUT = path.resolve('docs/particles/evidence')
fs.mkdirSync(OUT, { recursive: true })

const ROUTES = ['/', '/about', '/writing/cross-chain-credential-verification']
const VIEWPORTS = [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'mobile', width: 390, height: 844 },
]
const SLOW_4G = {
  offline: false,
  latency: 150,
  downloadThroughput: (1.6 * 1024 * 1024) / 8,
  uploadThroughput: (750 * 1024) / 8,
  connectionType: 'cellular4g',
}

function installObservers() {
  window.__NB_METRICS__ = { lcp: 0, tbt: 0, cls: 0, longtasks: [] }
  const m = window.__NB_METRICS__
  try {
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) m.lcp = entry.startTime
    }).observe({ type: 'largest-contentful-paint', buffered: true })
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.duration > 50) {
          m.tbt += entry.duration - 50
          m.longtasks.push(Math.round(entry.duration))
        }
      }
    }).observe({ type: 'longtask', buffered: true })
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (!entry.hadRecentInput) m.cls += entry.value
      }
    }).observe({ type: 'layout-shift', buffered: true })
  } catch (error) {
    void error
  }
}

async function newContext(browser, viewport, reducedMotion) {
  const context = await browser.newContext({
    viewport: { width: viewport.width, height: viewport.height },
    deviceScaleFactor: 1,
    reducedMotion,
  })
  await context.addInitScript(installObservers)
  return context
}

async function measureRoute(browser, route, viewport) {
  const context = await newContext(browser, viewport, 'no-preference')
  const page = await context.newPage()
  await page.goto(BASE + route, { waitUntil: 'domcontentloaded' })
  await page.waitForTimeout(900)
  const client = await context.newCDPSession(page)
  await client.send('Emulation.setCPUThrottlingRate', { rate: 4 })
  await client.send('Network.emulateNetworkConditions', SLOW_4G)
  await page.reload({ waitUntil: 'load' })
  await page.waitForTimeout(2600)
  const raw = await page.evaluate(() => ({ ...window.__NB_METRICS__ }))
  await context.close()
  return {
    lcp: Math.round(raw.lcp),
    tbt: Math.round(raw.tbt),
    cls: Number(raw.cls.toFixed(3)),
  }
}

async function waitForParticleCanvas(page) {
  if ((await page.locator('.particle-slot').count()) === 0) return false
  await page.locator('.particle-slot').scrollIntoViewIfNeeded()
  await page.waitForSelector('canvas.particle-canvas', { timeout: 20000 })
  await page.waitForTimeout(1300)
  return true
}

async function sceneFrames(page, ms) {
  const before = await page.evaluate(() => window.__NB_PARTICLES__?.frames ?? 0)
  await page.waitForTimeout(ms)
  const after = await page.evaluate(() => window.__NB_PARTICLES__?.frames ?? 0)
  return Math.round(((after - before) / ms) * 1000)
}

async function measureParticles(browser) {
  const result = { fps: {}, count: {}, dpr: {}, errors: [] }
  for (const viewport of VIEWPORTS) {
    const context = await newContext(browser, viewport, 'no-preference')
    const page = await context.newPage()
    const errors = []
    page.on('console', (msg) => {
      if (msg.type() === 'error') errors.push(msg.text())
    })
    page.on('pageerror', (error) => errors.push(String(error)))
    await page.goto(BASE + '/', { waitUntil: 'domcontentloaded' })
    if (!(await waitForParticleCanvas(page))) {
      await context.close()
      continue
    }
    const client = await context.newCDPSession(page)
    await client.send('Emulation.setCPUThrottlingRate', { rate: 4 })
    const state = await page.evaluate(() => window.__NB_PARTICLES__?.getState?.() ?? null)
    if (state) {
      result.count[viewport.name] = state.count
      result.dpr[viewport.name] = state.pixelRatio
      for (const level of ['high', 'medium', 'low']) {
        await page.evaluate((value) => window.__NB_PARTICLES__?.setQuality?.(value), level)
        result.fps[level + '-' + viewport.name] = await sceneFrames(page, 1500)
      }
      await page.evaluate(() => window.__NB_PARTICLES__?.setQuality?.('high'))
    }
    result.errors.push(...errors)
    await context.close()
  }
  return result
}

async function captureShots(browser) {
  for (const viewport of VIEWPORTS) {
    const context = await newContext(browser, viewport, 'no-preference')
    const page = await context.newPage()
    await page.goto(BASE + '/', { waitUntil: 'domcontentloaded' })
    if (!(await waitForParticleCanvas(page))) {
      await context.close()
      continue
    }
    for (const theme of ['light', 'dark']) {
      await page.evaluate((value) => {
        document.documentElement.dataset.theme = value
      }, theme)
      await page.waitForTimeout(350)
      const slot = page.locator('.particle-slot')
      await slot.screenshot({ path: path.join(OUT, 'glyph-' + viewport.name + '-' + theme + '.png') })
    }
    await context.close()
  }
  const context = await newContext(browser, VIEWPORTS[0], 'reduce')
  const page = await context.newPage()
  await page.goto(BASE + '/', { waitUntil: 'domcontentloaded' })
  if (!(await waitForParticleCanvas(page))) {
    await context.close()
    return null
  }
  const state = await page.evaluate(() => window.__NB_PARTICLES__?.getState?.() ?? null)
  await page.locator('.particle-slot').screenshot({ path: path.join(OUT, 'glyph-reduced-motion.png') })
  await context.close()
  return state
}

async function main() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true })
  const routes = {}
  try {
    for (const viewport of VIEWPORTS) {
      for (const route of ROUTES) {
        routes[route + ' @ ' + viewport.name] = await measureRoute(browser, route, viewport)
      }
    }
    const particles = await measureParticles(browser)
    const reduced = await captureShots(browser)
    const payload = { label: LABEL, base: BASE, capturedAt: new Date().toISOString(), routes, particles, reduced }
    fs.writeFileSync(path.join(OUT, 'metrics-' + LABEL + '.json'), JSON.stringify(payload, null, 2) + '\n')
    console.log(JSON.stringify(payload, null, 2))
  } finally {
    await browser.close()
  }
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
