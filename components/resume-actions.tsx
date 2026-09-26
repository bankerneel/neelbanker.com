'use client'

import { chipLink } from '@/components/bazaar/styles'
import { cn } from '@/lib/utils'

export function ResumeActions() {
  return (
    <div className="no-print flex flex-wrap gap-3 lg:flex-col lg:items-start">
      <button
        type="button"
        onClick={() => window.print()}
        className={cn(chipLink, 'tone-ink min-h-12 px-6 text-xs shadow-hard -rotate-2')}
      >
        Download PDF →
      </button>
      <a href="/resume/neel-banker-resume.tex" download className={cn(chipLink, 'tone-butter min-h-12 px-6 text-xs shadow-hard rotate-[1.5deg]')}>
        LaTeX source
      </a>
    </div>
  )
}
