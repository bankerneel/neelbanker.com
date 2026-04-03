import Link from 'next/link'
import { PillarBadge } from './pillar-badge'
import { parseDate } from '@/lib/utils-date'
import type { ArticleMeta } from '@/types/content'

export function ArticleCard({ article }: { article: ArticleMeta }) {
  return (
    <Link
      href={`/writing/${article.slug}`}
      className="group relative flex flex-col md:flex-row md:items-center gap-4 md:gap-6 py-10 pl-5 border-t border-border transition-colors duration-200"
    >
      {/* Animated left accent bar */}
      <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-primary origin-top scale-y-0 group-hover:scale-y-100 transition-transform duration-300 ease-out" />

      {/* Metadata column — fixed width on desktop */}
      <div className="flex items-center gap-3 md:min-w-[200px] md:shrink-0">
        <PillarBadge pillar={article.pillar} />
        <span className="font-mono text-xs text-muted-foreground whitespace-nowrap">{parseDate(article.date)}</span>
      </div>

      {/* Title + excerpt */}
      <div className="flex-1 min-w-0">
        <h3 className="font-bold text-xl sm:text-2xl uppercase tracking-tight leading-snug group-hover:text-primary transition-colors duration-200 mb-2">
          {article.title}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">{article.excerpt}</p>
      </div>

      {/* Arrow */}
      <span className="hidden md:block text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all duration-200 shrink-0">↗</span>
    </Link>
  )
}
