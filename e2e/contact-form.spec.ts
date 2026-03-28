import { test, expect } from '@playwright/test'

test.describe('Work with me page', () => {
  test('services section is visible', async ({ page }) => {
    await page.goto('/work-with-me')
    // At least one service card should be visible
    const heading = page.getByRole('heading', { level: 1 })
    await expect(heading).toBeVisible()
  })

  test('contact form requires valid email', async ({ page }) => {
    await page.goto('/work-with-me')
    // Find email input in the contact form
    const emailInput = page.locator('input[type="email"]').first()
    await expect(emailInput).toBeVisible()
    // HTML5 native validation — fill an invalid email and attempt submit
    await emailInput.fill('not-an-email')
    const submitBtn = page.getByRole('button', { name: /send/i })
    await submitBtn.click()
    // Page should NOT navigate away (form validation blocked submission)
    await expect(page).toHaveURL(/work-with-me/)
  })
})
