import Link from 'next/link'
import { PillarBadge } from './pillar-badge'
import { parseDate } from '@/lib/utils-date'
import type { ArticleMeta } from '@/types/content'

export function ArticleCard({ article }: { article: ArticleMeta }) {
  return (
    <Link href={`/writing/${article.slug}`} className="group block rounded-lg border border-border p-5 transition-colors hover:border-border/80 hover:bg-muted/40">
      <div className="mb-2 flex items-center justify-between gap-3">
        <PillarBadge pillar={article.pillar} />
        <span className="font-mono text-xs text-muted-foreground">{parseDate(article.date)}</span>
      </div>
      <h3 className="text-base font-semibold leading-snug group-hover:text-foreground/80">
        {article.title}
      </h3>
      <p className="mt-1.5 text-sm text-muted-foreground line-clamp-2">{article.excerpt}</p>
      <p className="mt-3 text-xs text-muted-foreground">{article.readingTime} min read</p>
    </Link>
  )
}
