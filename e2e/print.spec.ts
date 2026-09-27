import { test, expect } from '@playwright/test'

// /resume "Download PDF" is the browser's print-to-PDF. Under print media only
// the document sheet may show — including its own name/contact header.
test('resume prints only the document sheet', async ({ page }) => {
  await page.goto('/resume')
  await page.emulateMedia({ media: 'print' })

  await expect(page.locator('body > header')).toBeHidden()
  await expect(page.locator('body > footer')).toBeHidden()
  for (const el of await page.locator('.no-print').all()) {
    await expect(el).toBeHidden()
  }
  await expect(page.locator('.resume-sheet')).toBeVisible()
  await expect(page.locator('.resume-sheet header')).toBeVisible()
  await expect(page.locator('.resume-sheet header')).toContainText('Neel Banker')
  expect(await page.evaluate(() => getComputedStyle(document.body, '::before').display)).toBe('none')
})
