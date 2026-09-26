'use client'

import { useEffect, useSyncExternalStore } from 'react'
import { cn } from '@/lib/utils'

// The inline script in app/layout.tsx sets data-theme on <html> before paint.
// This component only reads that attribute and flips it — it never owns the
// theme, so server and client markup always match.

function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange)
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })
  return () => observer.disconnect()
}

const isDarkNow = () => document.documentElement.dataset.theme === 'dark'
const isDarkOnServer = () => false

function storedTheme() {
  try {
    return localStorage.getItem('nb-theme')
  } catch {
    return null
  }
}

export function ThemeToggle({ className }: { className?: string }) {
  const dark = useSyncExternalStore(subscribe, isDarkNow, isDarkOnServer)

  // Keep following the OS until the visitor makes an explicit choice.
  useEffect(() => {
    const query = matchMedia('(prefers-color-scheme: dark)')
    const onSystemChange = (event: MediaQueryListEvent) => {
      const stored = storedTheme()
      if (stored === 'light' || stored === 'dark') return
      document.documentElement.dataset.theme = event.matches ? 'dark' : 'light'
    }
    query.addEventListener('change', onSystemChange)
    return () => query.removeEventListener('change', onSystemChange)
  }, [])

  function toggle() {
    const next = isDarkNow() ? 'light' : 'dark'
    document.documentElement.dataset.theme = next
    try {
      localStorage.setItem('nb-theme', next)
    } catch {
      // storage blocked (private mode) — the switch still applies for this page view
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={dark}
      aria-label="Dark theme"
      title={dark ? 'Switch to light theme' : 'Switch to dark theme'}
      className={cn(
        'tone-panel flex size-10 shrink-0 cursor-pointer items-center justify-center rounded-full border-2 border-current text-lg leading-none shadow-hard transition-[rotate,background-color,color] duration-200 hover:rotate-12 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-dm-panel',
        className,
      )}
    >
      {/* Icons swap in CSS, so the first paint is already right. */}
      <span aria-hidden="true" className="dark:hidden">☾</span>
      <span aria-hidden="true" className="hidden dark:inline">☀</span>
    </button>
  )
}
