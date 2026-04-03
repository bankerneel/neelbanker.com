'use client'

import { useState } from 'react'
import type { ResourceMeta } from '@/types/content'

export function ResourceCard({ resource }: { resource: ResourceMeta }) {
  const [email, setEmail] = useState('')
  const [optIn, setOptIn] = useState(false)
  const [state, setState] = useState<'idle' | 'loading' | 'done' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setState('loading')
    const res = await fetch('/api/download', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, optIn, slug: resource.slug }),
    })
    setState(res.ok ? 'done' : 'error')
    if (res.ok) {
      const { url } = await res.json()
      window.open(url, '_blank')
    }
  }

  return (
    <div className="group h-full border border-border bg-background px-6 py-6 transition-colors duration-200 hover:border-primary/30 sm:px-7 sm:py-7">
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.22em] text-primary">Free download</p>
          <h3 className="max-w-lg text-lg font-semibold uppercase tracking-tight text-foreground">{resource.title}</h3>
        </div>
        <span className="shrink-0 border border-border px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground transition-colors duration-200 group-hover:border-primary/40">
          PDF
        </span>
      </div>

      <p className="mb-6 max-w-xl text-sm leading-[1.8] text-muted-foreground">{resource.description}</p>

      {state === 'done' ? (
        <div className="border border-primary/20 bg-primary/5 px-5 py-5">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-primary">Download started</p>
          <p className="mt-2 text-sm leading-[1.8] text-muted-foreground">
            The file should be opening now. A copy has also been sent to your inbox for later.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4 border-t border-dashed border-border pt-5">
          <div>
            <label className="mb-1.5 block font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
              Work email
            </label>
            <input
              type="email"
              required
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              suppressHydrationWarning
              className="w-full border border-border bg-muted/30 px-3 py-3 text-sm text-foreground placeholder:text-muted-foreground transition-colors duration-200 [color-scheme:dark] hover:border-primary/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            />
          </div>

          <label className="flex cursor-pointer items-start gap-3 border border-border px-4 py-3 transition-colors duration-200 hover:border-primary/30">
            <input
              type="checkbox"
              checked={optIn}
              onChange={(e) => setOptIn(e.target.checked)}
              className="mt-0.5 cursor-pointer accent-[hsl(72_100%_49%)]"
            />
            <span className="text-sm leading-[1.7] text-muted-foreground">
              Send me <span className="text-foreground">The Architect&apos;s Brief</span> as well. Weekly insights on blockchain, AI, and engineering leadership.
            </span>
          </label>

          <button
            type="submit"
            disabled={state === 'loading'}
            className="cursor-pointer bg-primary px-5 py-3 font-mono text-[10px] uppercase tracking-[0.18em] text-primary-foreground transition-colors duration-200 hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-50"
          >
            {state === 'loading' ? 'Sending…' : 'Download guide →'}
          </button>

          {state === 'error' && (
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-red-400">
              Something went wrong. Please try again.
            </p>
          )}
        </form>
      )}
    </div>
  )
}
