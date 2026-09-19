'use client'

import { useState, type ReactNode } from 'react'

/**
 * Wraps a prototype and owns its light/dark state. The palette lives entirely
 * in CSS custom properties, so switching themes is a single class swap —
 * children never need to know which mode is active.
 */
export function ThemeShell({
  base,
  darkClass,
  className = '',
  children,
}: {
  base: string
  darkClass: string
  className?: string
  children: ReactNode
}) {
  const [dark, setDark] = useState(false)

  return (
    <div className={`${base} ${dark ? darkClass : ''} ${className} min-h-screen overflow-hidden`}>
      {children}

      <button
        type="button"
        onClick={() => setDark((v) => !v)}
        aria-pressed={dark}
        aria-label={dark ? 'Switch to light theme' : 'Switch to dark theme'}
        className="fixed bottom-4 right-4 z-[80] flex cursor-pointer items-center gap-2 rounded-full border-[2px] px-4 py-2.5 font-mono text-[10px] font-bold uppercase tracking-[0.16em] shadow-lg transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2"
        style={{
          borderColor: 'var(--dm-ink)',
          background: 'var(--dm-panel)',
          color: 'var(--dm-ink)',
        }}
      >
        <span aria-hidden="true">{dark ? '☾' : '☀'}</span>
        {dark ? 'Dark' : 'Light'}
      </button>
    </div>
  )
}
