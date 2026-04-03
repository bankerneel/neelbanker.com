'use client'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { PILLARS } from '@/lib/pillars'
import { ArticleCard } from './article-card'
import type { ArticleMeta, PillarSlug } from '@/types/content'

const PILLAR_SLUGS = new Set<PillarSlug>(PILLARS.map((pillar) => pillar.slug))

function getActivePillar(value: string | null): PillarSlug | 'all' {
  return value && PILLAR_SLUGS.has(value as PillarSlug) ? (value as PillarSlug) : 'all'
}

export function PillarFilter({
  articles,
  initialActive = 'all',
}: {
  articles: ArticleMeta[]
  initialActive?: PillarSlug | 'all'
}) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const active = getActivePillar(searchParams.get('pillar')) === 'all'
    ? initialActive
    : getActivePillar(searchParams.get('pillar'))

  function setActive(next: PillarSlug | 'all') {
    const params = new URLSearchParams(searchParams.toString())

    if (next === 'all') {
      params.delete('pillar')
    } else {
      params.set('pillar', next)
    }

    const query = params.toString()
    router.push(query ? `${pathname}?${query}` : pathname, { scroll: false })
  }

  const filtered = active === 'all' ? articles : articles.filter((a) => a.pillar === active)
  const activeLabel = active === 'all'
    ? 'All articles'
    : PILLARS.find((pillar) => pillar.slug === active)?.label ?? 'Filtered articles'

  return (
    <div>
      <div className="mb-8 flex flex-col gap-4 border-b border-border pb-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">Archive</p>
          <p className="text-sm leading-[1.7] text-muted-foreground">
            <span className="font-semibold text-foreground">{activeLabel}</span> · {filtered.length} of {articles.length} articles
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setActive('all')}
          className={`cursor-pointer min-h-11 px-3 py-2 font-mono text-xs uppercase tracking-widest transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${active === 'all' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:text-foreground'}`}
        >
          All
        </button>
        {PILLARS.map((p) => (
          <button
            key={p.slug}
            type="button"
            onClick={() => setActive(p.slug)}
            className={`cursor-pointer min-h-11 px-3 py-2 font-mono text-xs uppercase tracking-widest transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${active === p.slug ? `${p.bgClass} ${p.textClass}` : 'bg-muted text-muted-foreground hover:text-foreground'}`}
          >
            {p.label}
          </button>
        ))}
        </div>
      </div>
      <div>
        {filtered.length > 0 ? (
          filtered.map((a) => <ArticleCard key={a.slug} article={a} />)
        ) : (
          <div className="border border-border px-6 py-10">
            <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">No matches</p>
            <p className="text-sm leading-[1.8] text-muted-foreground">
              There are no articles in this pillar yet. Switch filters to explore the rest of the archive.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
