import { test, expect } from '@playwright/test'
import { gotoHydrated } from './helpers'

test.describe('desktop nav', () => {
  test.use({ viewport: { width: 1280, height: 800 } })

  test('links navigate and mark the current page', async ({ page }) => {
    await gotoHydrated(page, '/')
    const nav = page.getByRole('navigation', { name: 'Main navigation' })
    await nav.getByRole('link', { name: 'Projects' }).click()
    await expect(page).toHaveURL(/\/projects$/, { timeout: 20_000 })
    await expect(nav.getByRole('link', { name: 'Projects' })).toHaveAttribute('aria-current', 'page')
    await expect(nav.getByRole('link', { name: 'Writing' })).not.toHaveAttribute('aria-current', 'page')
  })

  test('header stays pinned and gains its paper strip on scroll', async ({ page }) => {
    await gotoHydrated(page, '/writing/cross-chain-credential-verification')
    const header = page.locator('body > header')
    const strip = header.locator('div[aria-hidden="true"]').first()
    await expect(strip).toHaveCSS('opacity', '0')
    await page.evaluate(() => window.scrollTo(0, 1500))
    await expect(strip).toHaveCSS('opacity', '1')
    expect(await header.evaluate((el) => el.getBoundingClientRect().top)).toBe(0)
  })
})

test.describe('mobile menu', () => {
  test.use({ viewport: { width: 375, height: 812 } })

  test('opens, navigates, and closes with Escape', async ({ page }) => {
    await gotoHydrated(page, '/')
    const toggle = page.getByRole('button', { name: 'Menu' })
    await toggle.click()
    await expect(page.getByRole('button', { name: /Close/ })).toHaveAttribute('aria-expanded', 'true')
    const menu = page.locator('#mobile-menu')
    await expect(menu).toBeVisible()

    await page.keyboard.press('Escape')
    await expect(menu).toBeHidden()

    await page.getByRole('button', { name: 'Menu' }).click()
    await menu.getByRole('link', { name: 'About' }).click()
    // generous: in dev, /about may compile on first visit while other workers run
    await expect(page).toHaveURL(/\/about$/, { timeout: 20_000 })
    await expect(menu).toBeHidden()
  })
})

test.describe('theme', () => {
  test.use({ colorScheme: 'light' })

  test('follows the OS, and the toggle overrides it across reloads', async ({ page }) => {
    await gotoHydrated(page, '/')
    const html = page.locator('html')
    await expect(html).toHaveAttribute('data-theme', 'light')

    await page.getByRole('button', { name: 'Dark theme' }).first().click()
    await expect(html).toHaveAttribute('data-theme', 'dark')
    expect(await page.evaluate(() => localStorage.getItem('nb-theme'))).toBe('dark')

    await page.reload()
    await expect(html).toHaveAttribute('data-theme', 'dark')
    await gotoHydrated(page, '/about')
    await expect(html).toHaveAttribute('data-theme', 'dark')
  })

  test('a notFound() page still gets a theme', async ({ page }) => {
    await gotoHydrated(page, '/writing/not-a-real-slug')
    await expect(page.locator('html')).toHaveAttribute('data-theme', /^(light|dark)$/)
  })
})

test.describe('writing archive filter', () => {
  test('filters by pillar and keeps the choice in the URL', async ({ page }) => {
    await gotoHydrated(page, '/writing')
    const filters = page.getByRole('group', { name: 'Filter by pillar' })
    await filters.getByRole('button', { name: 'AI × Web3' }).click()
    await expect(page).toHaveURL(/\?pillar=ai$/)
    await expect(filters.getByRole('button', { name: 'AI × Web3' })).toHaveAttribute('aria-pressed', 'true')
    await expect(page.getByText(/^AI × Web3 · \d+ of \d+$/)).toBeVisible()

    await gotoHydrated(page, '/writing?pillar=leadership')
    await expect(filters.getByRole('button', { name: 'Engineering Leadership' })).toHaveAttribute('aria-pressed', 'true')
  })
})
