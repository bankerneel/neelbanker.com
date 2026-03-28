import { test, expect } from '@playwright/test'

test.describe('Newsletter signup', () => {
  test('newsletter form is present on homepage', async ({ page }) => {
    await page.goto('/')
    const form = page.locator('form').filter({ has: page.locator('input[type="email"]') }).first()
    await expect(form).toBeVisible()
  })

  test('newsletter page renders with heading', async ({ page }) => {
    await page.goto('/newsletter')
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
  })
})
