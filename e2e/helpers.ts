import type { Page } from '@playwright/test'

/**
 * Navigate and wait until React has hydrated the page, so the first click
 * isn't lost on server-rendered markup (under parallel load that race made
 * the mobile-menu test flaky). React attaches `__reactProps$…` to DOM nodes as
 * it hydrates them; the header's buttons exist on every page.
 *
 * Don't use `networkidle` instead: /work-with-me never reaches it — the
 * Cal.com embed keeps a connection open.
 */
export async function gotoHydrated(page: Page, url: string) {
  const response = await page.goto(url)
  await page.waitForFunction(() => {
    const button = document.querySelector('body > header button')
    return !!button && Object.keys(button).some((key) => key.startsWith('__reactProps'))
  })
  return response
}
