'use client'
import { useState } from 'react'
import { PILLARS } from '@/lib/pillars'
import { ArticleCard } from './article-card'
import type { ArticleMeta, PillarSlug } from '@/types/content'

export function PillarFilter({ articles }: { articles: ArticleMeta[] }) {
  const [active, setActive] = useState<PillarSlug | 'all'>('all')

  const filtered = active === 'all' ? articles : articles.filter((a) => a.pillar === active)

  return (
    <div>
      <div className="mb-6 flex flex-wrap gap-2">
        <button
          onClick={() => setActive('all')}
          className={`cursor-pointer px-3 py-1.5 font-mono text-xs uppercase tracking-widest transition-colors duration-200 ${active === 'all' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:text-foreground'}`}
        >
          All
        </button>
        {PILLARS.map((p) => (
          <button
            key={p.slug}
            onClick={() => setActive(p.slug)}
            className={`cursor-pointer px-3 py-1.5 font-mono text-xs uppercase tracking-widest transition-colors duration-200 ${active === p.slug ? `${p.bgClass} ${p.textClass}` : 'bg-muted text-muted-foreground hover:text-foreground'}`}
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
