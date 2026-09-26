'use client'

import { useId, useState } from 'react'
import { cn } from '@/lib/utils'
import { focusRing } from '@/components/bazaar/styles'
import type { ResourceMeta } from '@/types/content'

export function ResourceCard({ resource, tone = 'tone-butter' }: { resource: ResourceMeta; tone?: string }) {
  const uid = useId()
  const [email, setEmail] = useState('')
  const [optIn, setOptIn] = useState(false)
  const [state, setState] = useState<'idle' | 'loading' | 'done' | 'error'>('idle')
  const [fileUrl, setFileUrl] = useState<string | null>(null)

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
      setFileUrl(url)
      // Opening after an await can be blocked as a popup — the link below is the fallback.
      window.open(url, '_blank')
    }
  }

  return (
    <article className="tone-panel flex h-full flex-col border-2 border-current shadow-hard-lg">
      <div className={cn('flex items-center justify-between gap-4 border-b-2 border-dm-ink px-6 py-3', tone)}>
        <span className="text-[11px] font-bold uppercase tracking-[0.16em]">Free download</span>
        <span className="hand text-[1.3rem] leading-none">PDF</span>
      </div>

      <div className="flex flex-1 flex-col px-6 py-6 sm:px-7">
        <h3 className="text-[1.3rem] font-black uppercase leading-[1.1] tracking-tight">{resource.title}</h3>
        <p className="mt-3 text-[15px] leading-[1.7] text-dm-ink-soft">{resource.description}</p>

        {state === 'done' ? (
          <div role="status" className="tone-sage mt-6 border-2 border-current px-5 py-5">
            <p className="text-[11px] font-bold uppercase tracking-[0.16em]">Download started</p>
            <p className="mt-2 text-[15px] leading-[1.6]">
              A copy has also been sent to your inbox.{' '}
              {fileUrl && (
                <a href={fileUrl} target="_blank" rel="noopener noreferrer" className={cn('font-bold underline decoration-2 underline-offset-4', focusRing)}>
                  Open the file ↗
                </a>
              )}
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-auto space-y-4 border-t-2 border-dashed border-current/30 pt-5">
            <div>
              <label htmlFor={`${uid}-email`} className="mb-1.5 block text-[11px] font-bold uppercase tracking-[0.16em]">
                Work email
              </label>
              <input
                id={`${uid}-email`}
                type="email"
                required
                autoComplete="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                suppressHydrationWarning
                className={cn(
                  'w-full border-2 border-current/45 bg-dm-panel px-3 py-3 text-[15px] text-dm-ink placeholder:text-dm-ink-soft transition-colors duration-200 hover:border-current',
                  focusRing,
                )}
              />
            </div>

            <label className="flex cursor-pointer items-start gap-3 border-2 border-dashed border-current/30 px-4 py-3 transition-colors duration-200 hover:border-current/60">
              <input
                type="checkbox"
                checked={optIn}
                onChange={(e) => setOptIn(e.target.checked)}
                className="mt-1 size-4 cursor-pointer accent-[var(--dm-accent-ink)]"
              />
              <span className="text-sm leading-[1.6] text-dm-ink-soft">
                Send me <span className="font-bold text-dm-ink">The Architect&apos;s Brief</span> as well. Weekly insights
                on blockchain, AI, and engineering leadership.
              </span>
            </label>

            <button
              type="submit"
              disabled={state === 'loading'}
              className={cn(
                'ticket tone-ink min-h-11 cursor-pointer px-6 shadow-hard transition-[rotate,background-color] duration-200 hover:-rotate-1 disabled:cursor-not-allowed disabled:opacity-60',
                focusRing,
              )}
            >
              {state === 'loading' ? 'Sending…' : 'Download guide →'}
            </button>

            {state === 'error' && (
              <p role="alert" className="text-sm font-semibold text-destructive">
                Something went wrong. Please try again.
              </p>
            )}
          </form>
        )}
      </div>
    </article>
  )
}
