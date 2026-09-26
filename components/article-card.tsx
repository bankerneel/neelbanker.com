import Link from 'next/link'
import { PillarBadge } from './pillar-badge'
import { parseDate } from '@/lib/utils-date'
import { cn } from '@/lib/utils'
import { focusRing, pick, softTilts } from '@/components/bazaar/styles'
import type { ArticleMeta } from '@/types/content'

/**
 * An index card for one article — full width, stacked in a list (never in a
 * multi-column grid: the title needs the width). `index` sets its gentle tilt.
 */
export function ArticleCard({ article, index = 0 }: { article: ArticleMeta; index?: number }) {
  return (
    <Link
      href={`/writing/${article.slug}`}
      className={cn(
        'group block cursor-pointer transition-[rotate] duration-200 [touch-action:manipulation] hover:rotate-0',
        pick(softTilts, index),
        focusRing,
      )}
    >
      <div className="tone-panel grid gap-4 border-2 border-current p-6 shadow-hard sm:p-7 md:grid-cols-[210px_minmax(0,1fr)_auto] md:items-start md:gap-7">
        <div className="flex flex-wrap items-center gap-2.5 md:flex-col md:items-start md:pt-1">
          <PillarBadge pillar={article.pillar} className="whitespace-normal leading-tight" />
          <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-dm-ink-soft">
            {parseDate(article.date)} · {article.readingTime} min
          </span>
        </div>

        <div className="min-w-0">
          <h3 className="text-[1.2rem] font-black uppercase leading-[1.12] tracking-tight transition-colors duration-200 group-hover:text-dm-accent-ink sm:text-[1.4rem]">
            {article.title}
          </h3>
          <p className="mt-2.5 line-clamp-2 text-[15px] font-medium leading-[1.65] text-dm-ink-soft">{article.excerpt}</p>
        </div>

        <span
          aria-hidden="true"
          className="hidden self-center text-2xl font-black transition-[translate] duration-200 group-hover:translate-x-1 md:block"
        >
          →
        </span>
      </div>
    </Link>
  )
}
