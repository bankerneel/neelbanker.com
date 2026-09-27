'use client'

import { useRef, useState, type ComponentProps } from 'react'
import { cn } from '@/lib/utils'
import { focusRing } from '@/components/bazaar/styles'

/**
 * MDX <pre> with a copy button and a language label (from the fence's
 * `language-xyz` class, when present). The copy button sits outside the
 * scrolling <pre> so it stays put while long lines scroll.
 */
export function CodeBlock({ children, className, ...props }: ComponentProps<'pre'>) {
  const preRef = useRef<HTMLPreElement>(null)
  const [copied, setCopied] = useState(false)

  const codeClass = (children as { props?: { className?: string } } | undefined)?.props?.className ?? ''
  const language = codeClass.match(/language-([\w-]+)/)?.[1]

  async function copy() {
    const text = preRef.current?.innerText ?? ''
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 1600)
    } catch {
      // clipboard blocked (permissions / insecure context) — leave the label as is
    }
  }

  return (
    <div className="code-block relative">
      <div className="absolute right-2 top-2 z-10 flex items-center gap-2">
        {language && (
          <span className="rounded-sm bg-white/10 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.12em] text-[var(--dm-code-fg)]">
            {language}
          </span>
        )}
        <button
          type="button"
          onClick={copy}
          className={cn(
            'cursor-pointer rounded-sm border border-current/40 bg-[var(--dm-code)] px-2 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-[var(--dm-code-fg)] transition-colors duration-200 hover:border-current',
            focusRing,
          )}
        >
          <span aria-live="polite">{copied ? 'Copied ✓' : 'Copy'}</span>
        </button>
      </div>
      <pre ref={preRef} className={className} {...props}>
        {children}
      </pre>
    </div>
  )
}
