'use client'

import { useEffect } from 'react'
import { useTheme } from '@/lib/use-theme'
import { cn } from '@/lib/utils'

// The inline script in app/layout.tsx owns the initial theme; this button only
// flips the data-theme attribute and remembers the choice.

function storedTheme() {
  try {
    return localStorage.getItem('nb-theme')
  } catch {
    return null
  }
}

export function ThemeToggle({ className }: { className?: string }) {
  const dark = useTheme() === 'dark'

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
    const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark'
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
