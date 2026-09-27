import { test, expect } from '@playwright/test'
import { gotoHydrated } from './helpers'

// The API routes send real email through Resend, so every submission here is
// intercepted with page.route(): these tests cover the form UX (validation,
// success, failure), not delivery. Role locators are filtered by text because
// Next.js adds its own role="alert" route announcer and the Cal embed a
// role="status" spinner.

test.describe('contact form', () => {
  test('flags every invalid field on an empty submit', async ({ page }) => {
    await gotoHydrated(page, '/work-with-me')
    await page.getByRole('button', { name: /send message/i }).click()
    for (const label of ['Name', 'Email', 'Which service interests you?', /Brief description/]) {
      await expect(page.getByLabel(label)).toHaveAttribute('aria-invalid', 'true')
    }
    await expect(page.getByText('Name is required')).toBeVisible()
  })

  async function fillValid(page: import('@playwright/test').Page) {
    await page.getByLabel('Name', { exact: true }).fill('Test Person')
    await page.getByLabel('Email', { exact: true }).fill('test@example.com')
    await page.getByLabel('Which service interests you?').selectOption('Architecture Review')
    await page.getByLabel(/Brief description/).fill('A custody platform that needs an architecture review.')
  }

  test('shows the success state when the API accepts', async ({ page }) => {
    await page.route('**/api/contact', (route) => route.fulfill({ json: { ok: true } }))
    await gotoHydrated(page, '/work-with-me')
    await fillValid(page)
    await page.getByRole('button', { name: /send message/i }).click()
    await expect(page.getByRole('status').filter({ hasText: 'Message received' })).toBeVisible()
  })

  test('shows the API error when sending fails', async ({ page }) => {
    await page.route('**/api/contact', (route) =>
      route.fulfill({ status: 500, json: { error: 'Something went wrong while sending your message.' } }),
    )
    await gotoHydrated(page, '/work-with-me')
    await fillValid(page)
    await page.getByRole('button', { name: /send message/i }).click()
    await expect(page.getByRole('alert').filter({ hasText: 'Something went wrong' })).toBeVisible()
  })
})

test.describe('newsletter', () => {
  test('confirms a subscription', async ({ page }) => {
    await page.route('**/api/subscribe', (route) => route.fulfill({ json: { ok: true } }))
    await gotoHydrated(page, '/newsletter')
    await page.getByLabel('Email address').fill('reader@example.com')
    await page.getByRole('button', { name: /subscribe/i }).click()
    await expect(page.getByRole('status').filter({ hasText: "You're in" })).toBeVisible()
  })

  test('reports a failure', async ({ page }) => {
    await page.route('**/api/subscribe', (route) => route.fulfill({ status: 500, json: { error: 'x' } }))
    await gotoHydrated(page, '/newsletter')
    await page.getByLabel('Email address').fill('reader@example.com')
    await page.getByRole('button', { name: /subscribe/i }).click()
    await expect(page.getByRole('alert').filter({ hasText: 'Something went wrong' })).toBeVisible()
  })
})

test.describe('resource download', () => {
  test('opens the file and leaves a fallback link', async ({ page, context }) => {
    await page.route('**/api/download', (route) =>
      route.fulfill({ json: { url: '/resources/blockchain-custody-guide.pdf' } }),
    )
    // The card opens the file in a new tab; close it so it can't interfere.
    context.on('page', (popup) => popup.close())
    await gotoHydrated(page, '/resources')
    const card = page.locator('article').filter({ hasText: 'Blockchain Custody Architecture Guide' })
    await card.getByLabel('Work email').fill('team@example.com')
    await card.getByRole('button', { name: /download guide/i }).click()
    await expect(card.getByRole('status')).toContainText('Download started')
    await expect(card.getByRole('link', { name: /open the file/i })).toHaveAttribute(
      'href',
      '/resources/blockchain-custody-guide.pdf',
    )
  })
})
