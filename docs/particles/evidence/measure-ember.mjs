// Ember Field host frame cadence, count and DPR evidence. Run from the repo
// root against a dev server bound to 127.0.0.1:3000. Uses Edge via msedge.
//   node docs/particles/evidence/measure-ember.mjs
// The cadence value is derived from the host requestAnimationFrame counter in
// window.__NB_PARTICLES__.getState().frames, which increments once per host
// render while the simulation shader runs. WebGL work is asynchronous, so this
// is not a GPU timer query and not a measurement of shader execution time.
// Phone runs use CPU 4x, desktop runs use CPU 1, both with slow 4G.
// No em dashes, no en dashes, no network access beyond the local server.

import { chromium } from '@playwright/test'
import fs from 'node:fs'
import path from 'node:path'

const BASE = process.env.BASE_URL || 'http://127.0.0.1:3000'
const OUT = path.resolve('docs/particles/evidence')
const SLOW_4G = {
  offline: false,
  latency: 150,
  downloadThroughput: (1.6 * 1024 * 1024) / 8,
  uploadThroughput: (750 * 1024) / 8,
  connectionType: 'cellular4g',
}
const VIEWPORTS = [
  { name: 'desktop', width: 1440, height: 900, cpu: 1 },
  { name: 'phone', width: 390, height: 844, cpu: 4 },
]

function round(value) {
  return Math.round(value * 100) / 100
}

async function measure(browser, viewport) {
  const context = await browser.newContext({
    viewport: { width: viewport.width, height: viewport.height },
    deviceScaleFactor: 1,
    reducedMotion: 'no-preference',
  })
  const page = await context.newPage()
  const errors = []
  page.on('console', (msg) => {
    if (msg.type() === 'error') errors.push(msg.text())
  })
  page.on('pageerror', (error) => errors.push(String(error)))
  await page.goto(BASE + '/', { waitUntil: 'domcontentloaded' })
  await page.waitForFunction(() => {
    const button = document.querySelector('body > header button')
    return !!button && Object.keys(button).some((key) => key.startsWith('__reactProps'))
  })
  const client = await context.newCDPSession(page)
  await client.send('Network.enable')
  await client.send('Network.emulateNetworkConditions', SLOW_4G)
  await client.send('Emulation.setCPUThrottlingRate', { rate: viewport.cpu })
  await page.locator('[data-particle-scene="ember-field"]').scrollIntoViewIfNeeded()
  await page.locator('[data-particle-scene="ember-field"] canvas.particle-canvas').waitFor({ timeout: 20000 })
  await page.waitForTimeout(1500)

  const tiers = {}
  for (const level of ['high', 'medium', 'low']) {
    await page.evaluate((value) => window.__NB_PARTICLES__?.setQuality?.(value), level)
    await page.waitForTimeout(400)
    const before = await page.evaluate(() => Number(window.__NB_PARTICLES__?.getState?.().frames ?? 0))
    const started = Date.now()
    await page.waitForTimeout(3000)
    const after = await page.evaluate(() => Number(window.__NB_PARTICLES__?.getState?.().frames ?? 0))
    const state = await page.evaluate(() => window.__NB_PARTICLES__?.getState?.() ?? {})
    tiers[level] = {
      hostFrameCadence: round(((after - before) * 1000) / (Date.now() - started)),
      count: state.count,
      pixelRatio: state.pixelRatio,
      scene: state.scene,
      canvases: await page.locator('canvas.particle-canvas').count(),
    }
  }
  await client.detach()
  await context.close()
  return { tiers, errors, cpuRate: viewport.cpu }
}

const browser = await chromium.launch({ channel: 'msedge' })
const result = {
  capturedAt: new Date().toISOString(),
  base: BASE,
  metric: 'host requestAnimationFrame cadence, not GPU time',
  limitation: 'WebGL work is asynchronous, so the counter does not time shader execution',
  viewports: {},
}
try {
  for (const viewport of VIEWPORTS) result.viewports[viewport.name] = await measure(browser, viewport)
  fs.mkdirSync(OUT, { recursive: true })
  fs.writeFileSync(path.join(OUT, 'metrics-ember.json'), JSON.stringify(result, null, 2) + '\n')
  console.log(JSON.stringify(result, null, 2))
} finally {
  await browser.close()
}
