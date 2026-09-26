import type { ComponentProps } from 'react'

/**
 * Element overrides for long-form MDX (articles). Styling lives in the
 * `.prose-bazaar` rules in app/globals.css; these only add structure CSS
 * cannot: a highlighter span inside h2, and a scroll box around tables so a
 * wide table never overflows (or gets clipped by) the torn reading sheet.
 */
export const articleMdxComponents = {
  h2: ({ children, ...props }: ComponentProps<'h2'>) => (
    <h2 {...props}>
      <span className="marker">{children}</span>
    </h2>
  ),
  table: (props: ComponentProps<'table'>) => (
    <div className="table-scroll" role="region" aria-label="Table" tabIndex={0}>
      <table {...props} />
    </div>
  ),
}
