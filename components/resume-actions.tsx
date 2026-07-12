'use client'

export function ResumeActions() {
  return (
    <div className="no-print flex flex-wrap gap-3">
      <button
        type="button"
        onClick={() => window.print()}
        className="inline-flex cursor-pointer items-center bg-primary px-5 py-3 font-mono text-xs font-bold uppercase tracking-widest text-primary-foreground transition-colors duration-200 hover:bg-foreground hover:text-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      >
        Download PDF →
      </button>
      <a
        href="/resume/neel-banker-resume.tex"
        download
        className="inline-flex cursor-pointer items-center border border-border px-5 py-3 font-mono text-xs font-semibold uppercase tracking-widest text-foreground transition-colors duration-200 hover:border-primary hover:bg-primary hover:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      >
        LaTeX source
      </a>
    </div>
  )
}
