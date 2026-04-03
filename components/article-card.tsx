import Link from 'next/link'
import { PillarBadge } from './pillar-badge'
import { parseDate } from '@/lib/utils-date'
import type { ArticleMeta } from '@/types/content'

export function ArticleCard({ article }: { article: ArticleMeta }) {
  return (
    <Link
      href={`/writing/${article.slug}`}
      className="group relative grid cursor-pointer gap-5 border-t border-border py-8 pl-4 pr-2 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary [touch-action:manipulation] sm:py-10 sm:pl-5 md:grid-cols-[220px_minmax(0,1fr)_auto] md:items-start md:gap-6"
    >
      {/* Animated left accent bar */}
      <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-primary origin-top scale-y-0 group-hover:scale-y-100 transition-transform duration-300 ease-out" />

      {/* Metadata column — fixed width on desktop */}
      <div className="flex min-h-[44px] flex-wrap items-center gap-2.5 pr-4 md:min-h-0 md:items-start md:pt-1">
        <PillarBadge pillar={article.pillar} />
        <span className="font-mono text-xs text-muted-foreground whitespace-nowrap">{parseDate(article.date)}</span>
      </div>

      {/* Title + excerpt */}
      <div className="min-w-0 pr-4">
        <h3 className="font-bold text-xl sm:text-2xl uppercase tracking-tight leading-snug group-hover:text-primary transition-colors duration-200 mb-2">
          {article.title}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">{article.excerpt}</p>
      </div>

      {/* Arrow */}
      <span className="hidden shrink-0 self-center pr-4 text-muted-foreground transition-transform duration-200 group-hover:translate-x-1 group-hover:text-primary md:block">↗</span>
    </Link>
  )
}
