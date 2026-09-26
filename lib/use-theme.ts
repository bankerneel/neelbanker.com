'use client'

import { useSyncExternalStore } from 'react'

// The inline script in app/layout.tsx sets data-theme on <html> before paint;
// the nav toggle flips it. This hook only reads that attribute, so server and
// client markup always match (the server snapshot is null).

function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange)
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })
  return () => observer.disconnect()
}

const getTheme = () => (document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light')
const getServerTheme = () => null

/** 'light' | 'dark' in the browser, null during SSR and hydration. */
export function useTheme() {
  return useSyncExternalStore(subscribe, getTheme, getServerTheme)
}
