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

  return (
    <div>
      <div className="mb-6 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setActive('all')}
          className={`cursor-pointer px-3 py-1.5 font-mono text-xs uppercase tracking-widest transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${active === 'all' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:text-foreground'}`}
        >
          All
        </button>
        {PILLARS.map((p) => (
          <button
            key={p.slug}
            type="button"
            onClick={() => setActive(p.slug)}
            className={`cursor-pointer px-3 py-1.5 font-mono text-xs uppercase tracking-widest transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${active === p.slug ? `${p.bgClass} ${p.textClass}` : 'bg-muted text-muted-foreground hover:text-foreground'}`}
          >
            {p.label}
          </button>
        ))}
      </div>
      <div>
        {filtered.map((a) => <ArticleCard key={a.slug} article={a} />)}
      </div>
    </div>
  )
}
