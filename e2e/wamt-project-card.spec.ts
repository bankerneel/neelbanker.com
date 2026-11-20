import { test, expect, type Page } from '@playwright/test'
import { gotoHydrated, waitForHydration } from './helpers'

// Public project: the brief explicitly allows the real name here, so the card
// must show it verbatim along with both external destinations.
const TITLE = 'Who Ate My Tokens (wamt): Local Token Observability for AI Coding Agents'
const REPO = 'https://github.com/bankerneel/wamt'
const DEMO = 'https://whoatemytokens.vercel.app'

function wamtCard(page: Page) {
  return page.locator('article').filter({ hasText: TITLE })
}

test('wamt card renders with its real title, cover and link destinations', async ({ page }) => {
  await gotoHydrated(page, '/projects')
  const card = wamtCard(page)
  await expect(card).toHaveCount(1)
  await expect(card.getByRole('heading', { level: 3 })).toHaveText(TITLE)

  const repo = card.getByRole('link', { name: /^Repo/ })
  const demo = card.getByRole('link', { name: /^Live demo/ })
  await expect(repo).toHaveAttribute('href', REPO)
  await expect(demo).toHaveAttribute('href', DEMO)
  for (const link of [repo, demo]) {
    await expect(link).toHaveAttribute('target', '_blank')
    await expect(link).toHaveAttribute('rel', 'noopener noreferrer')
  }

  const img = card.getByRole('img', { name: /cover/ })
  await expect(img).toHaveAttribute('src', '/images/wamt/banner.webp')
  await expect(img).toHaveAttribute('width', '1600')
  await expect(img).toHaveAttribute('height', '480')
  const imgBox = await img.boundingBox()
  const cardBox = await card.boundingBox()
  expect(imgBox).not.toBeNull()
  expect(cardBox).not.toBeNull()
  expect(imgBox!.width).toBeGreaterThan(0)
  expect(imgBox!.height).toBeGreaterThan(0)
  expect(imgBox!.width).toBeLessThanOrEqual(cardBox!.width + 1)
})

test('wamt card shows under both AI systems and Infrastructure filters', async ({ page }) => {
  await gotoHydrated(page, '/projects')
  const group = page.getByRole('group', { name: 'Filter by category' })

  for (const label of ['AI systems', 'Infrastructure']) {
    const filter = group.getByRole('button', { name: label })
    await waitForHydration(filter)
    await filter.click()
    await expect(filter).toHaveAttribute('aria-pressed', 'true')
    await expect(wamtCard(page)).toHaveCount(1)
    await expect(wamtCard(page)).toBeVisible()
  }

  const wallets = group.getByRole('button', { name: 'Wallets' })
  await waitForHydration(wallets)
  await wallets.click()
  await expect(wamtCard(page)).toHaveCount(0)
})

test('wamt card image stays inside the card at 320px', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 900 })
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await gotoHydrated(page, '/projects')
  const card = wamtCard(page)
  const imgBox = await card.getByRole('img', { name: /cover/ }).boundingBox()
  const cardBox = await card.boundingBox()
  expect(imgBox).not.toBeNull()
  expect(cardBox).not.toBeNull()
  expect(imgBox!.x).toBeGreaterThanOrEqual(cardBox!.x - 1)
  expect(imgBox!.x + imgBox!.width).toBeLessThanOrEqual(cardBox!.x + cardBox!.width + 1)
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)
  expect(overflow).toBeLessThanOrEqual(0)
})
