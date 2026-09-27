import type { Locator, Page } from '@playwright/test'

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

/**
 * Wait until React has hydrated one specific element. `gotoHydrated` only
 * proves the header is live; a page's own client components (e.g. the writing
 * archive filter) can hydrate a moment later, and a click before that is lost.
 */
export async function waitForHydration(locator: Locator) {
  await locator.evaluate(
    (el) =>
      new Promise<void>((resolve) => {
        const check = () =>
          Object.keys(el).some((key) => key.startsWith('__reactProps')) ? resolve() : requestAnimationFrame(check)
        check()
      }),
  )
}
