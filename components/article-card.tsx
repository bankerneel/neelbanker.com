import Link from 'next/link'
import { PillarBadge } from './pillar-badge'
import { parseDate } from '@/lib/utils-date'
import type { ArticleMeta } from '@/types/content'

export function ArticleCard({ article }: { article: ArticleMeta }) {
  return (
    <Link
      href={`/writing/${article.slug}`}
      className="group relative flex items-start gap-4 py-6 pl-5 border-b border-border last:border-0 overflow-hidden hover:bg-white/[0.015] transition-colors duration-200"
    >
      {/* Animated left accent bar */}
      <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-primary origin-top scale-y-0 group-hover:scale-y-100 transition-transform duration-300 ease-out" />

      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap items-center gap-3 mb-2.5">
          <PillarBadge pillar={article.pillar} />
          <span className="font-mono text-xs text-muted-foreground">{parseDate(article.date)}</span>
          <span className="font-mono text-xs text-muted-foreground">{article.readingTime}m read</span>
        </div>
        <h3 className="text-base font-bold leading-snug group-hover:text-primary transition-colors duration-200">
          {article.title}
        </h3>
        <p className="mt-1.5 text-sm text-muted-foreground line-clamp-2">{article.excerpt}</p>
      </div>

      <span className="text-primary text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200 shrink-0 mt-0.5">→</span>
    </Link>
  )
}
