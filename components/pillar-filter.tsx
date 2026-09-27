'use client'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { PILLARS } from '@/lib/pillars'
import { cn } from '@/lib/utils'
import { focusRing, pick, tilts } from '@/components/bazaar/styles'
import { Scribbled } from '@/components/motion/scribbled'
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

  const options = [
    { slug: 'all' as const, label: 'All', tone: 'tone-panel' },
    ...PILLARS.map((p) => ({ slug: p.slug, label: p.label, tone: p.toneClass })),
  ]

  return (
    <div>
      <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h2 id="archive" data-sd className="sd-slam text-[clamp(2rem,5vw,3.4rem)] font-black uppercase leading-none tracking-tighter">
            The <Scribbled>whole</Scribbled> archive
          </h2>
          {/* sits on the night band: inherit the band's text colour, not ink-soft */}
          <p className="mt-3 text-[13px] font-bold uppercase tracking-[0.14em]" aria-live="polite">
            {activeLabel} · {filtered.length} of {articles.length}
          </p>
        </div>
        <div role="group" aria-label="Filter by pillar" className="flex flex-wrap gap-3">
          {options.map((option, i) => {
            const isActive = active === option.slug
            return (
              <button
                key={option.slug}
                type="button"
                onClick={() => setActive(option.slug)}
                aria-pressed={isActive}
                className={cn(
                  'ticket min-h-11 cursor-pointer px-4 transition-[rotate,background-color,color] duration-200 hover:rotate-0',
                  isActive ? 'tone-ink rotate-0 shadow-hard' : cn(option.tone, pick(tilts, i)),
                  focusRing,
                )}
              >
                {option.label}
              </button>
            )
          })}
        </div>
      </div>

      {filtered.length > 0 ? (
        <div className="space-y-7">
          {filtered.map((a, i) => (
            <div key={a.slug} className="sd-scroll sd-rise">
              <ArticleCard article={a} index={i} />
            </div>
          ))}
        </div>
      ) : (
        <div className="tone-panel border-2 border-dashed border-current px-6 py-10">
          <p className="text-[11px] font-bold uppercase tracking-[0.22em]">No matches</p>
          <p className="mt-2 text-[15px] leading-[1.7] text-dm-ink-soft">
            There are no articles in this pillar yet. Switch filters to explore the rest of the archive.
          </p>
        </div>
      )}
    </div>
  )
}
