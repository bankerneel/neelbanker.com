/**
 * Defer optional canvas work until the browser is idle after first paint.
 * Used by every decorative scene so the LCP element and the page's own work
 * always get the main thread first. Returns a cancellation function.
 */

type IdleDeadline = { didTimeout: boolean; timeRemaining: () => number }
type IdleWindow = Window & {
  requestIdleCallback?: (callback: (deadline: IdleDeadline) => void, options?: { timeout: number }) => number
  cancelIdleCallback?: (handle: number) => void
}

export function scheduleAfterIdle(callback: () => void, timeout = 1600): () => void {
  const win = window as IdleWindow
  const run = () => callback()
  if (typeof win.requestIdleCallback === 'function') {
    const handle = win.requestIdleCallback(run, { timeout })
    return () => win.cancelIdleCallback?.(handle)
  }
  const handle = window.setTimeout(run, timeout)
  return () => window.clearTimeout(handle)
}

export function afterLoad(callback: () => void): () => void {
  if (document.readyState === 'complete') {
    callback()
    return () => {}
  }
  const done = () => callback()
  window.addEventListener('load', done, { once: true })
  return () => window.removeEventListener('load', done)
}
