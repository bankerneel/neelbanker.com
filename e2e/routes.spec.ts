import { test, expect } from '@playwright/test'

// Every public route: loads, has one visible h1, throws no uncaught errors,
// and requests nothing from our own origin that 4xx/5xx's.
// (/_vercel/* analytics scripts only exist on Vercel, so they are ignored.)
const ROUTES = [
  '/',
  '/about',
  '/writing',
  '/writing/cross-chain-credential-verification',
  '/projects',
  '/resources',
  '/newsletter',
  '/speaking',
  '/work-with-me',
  '/resume',
]

for (const route of ROUTES) {
  test(`${route} renders cleanly`, async ({ page, baseURL }) => {
    const pageErrors: string[] = []
    const badResponses: string[] = []
    page.on('pageerror', (error) => pageErrors.push(error.message))
    page.on('response', (response) => {
      const url = response.url()
      if (url.startsWith(baseURL!) && !url.includes('/_vercel/') && response.status() >= 400) {
        badResponses.push(`${response.status()} ${url}`)
      }
    })

    const response = await page.goto(route)
    expect(response?.status()).toBe(200)
    await expect(page.getByRole('heading', { level: 1 })).toHaveCount(1)
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
    await page.waitForLoadState('load')

    expect(pageErrors).toEqual([])
    expect(badResponses).toEqual([])
  })
}

test('unknown URLs and missing articles return the 404 page', async ({ page }) => {
  for (const route of ['/definitely-not-a-page', '/writing/not-a-real-slug']) {
    const response = await page.goto(route)
    expect(response?.status()).toBe(404)
    await expect(page.getByRole('heading', { level: 1 })).toContainText('404')
    await expect(page).toHaveTitle(/Page not found/)
  }
})
