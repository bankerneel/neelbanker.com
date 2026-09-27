'use client'

import { useState } from 'react'
import { ProjectCard } from '@/components/project-card'
import { Scrap } from '@/components/bazaar/scrap'
import { chipLink, focusRing, pick, tilts, tones } from '@/components/bazaar/styles'
import { cn } from '@/lib/utils'
import type { ProjectMeta } from '@/types/content'

type ProjectFilter = 'all' | 'wallets' | 'infrastructure' | 'ai' | 'leadership'

const FILTERS: Array<{ key: ProjectFilter; label: string; description: string; tone: string }> = [
  { key: 'all', label: 'All work', description: 'Full project archive across delivery contexts.', tone: 'tone-panel' },
  { key: 'wallets', label: 'Wallets', description: 'Custody, NCW, ERC-4337, and transaction infrastructure.', tone: 'tone-butter' },
  { key: 'infrastructure', label: 'Infrastructure', description: 'Chains, Fabric networks, bridges, and system backbones.', tone: 'tone-sage' },
  { key: 'ai', label: 'AI systems', description: 'Agents, local LLM workflows, and AI-assisted product systems.', tone: 'tone-sky' },
  { key: 'leadership', label: 'Leadership-heavy', description: 'Programs where delivery orchestration mattered as much as code.', tone: 'tone-rose' },
]

// Keyed by content/projects/<slug>.mdx — keep in sync when adding a project,
// or it only ever shows under "All work".
const PROJECT_CATEGORIES: Record<string, ProjectFilter[]> = {
  'cryptsync-ncw': ['wallets', 'infrastructure', 'leadership'],
  'truetiger-non-custodial-wallet': ['wallets', 'leadership'],
  'fireblocks-bitgo-custody': ['wallets', 'leadership'],
  'best-wallet-ecosystem': ['wallets', 'leadership'],
  'w3p-presale-dapps-platform': ['wallets'],
  'fabric-polygon-interop': ['infrastructure'],
  'verionce': ['infrastructure', 'leadership'],
  'doctrace-fabric-documents': ['infrastructure', 'leadership'],
  'pepe-unchained-l2': ['infrastructure', 'leadership'],
  'ncog-earth-chain': ['infrastructure'],
  'memevault': ['infrastructure'],
  'smart-contract-audit-suite': ['infrastructure', 'leadership'],
  'fightout-move-to-earn': ['infrastructure', 'leadership'],
  'roomquery': ['ai'],
  'ai-social-media-agent': ['ai'],
  'privatgpt-offline': ['ai'],
  'keytu-ai-mentoring-platform': ['ai', 'leadership'],
  'hashira-product-system': ['leadership'],
  'splint-marketplace-platform': ['leadership'],
  'idosy-ido-platform': ['wallets', 'leadership'],
}

const FEATURED_SPOTLIGHTS = [
  {
    label: 'Wallet systems',
    tone: 'tone-butter',
    title: 'Project Atlas, Project Tiger, Project Orbit, Fireblocks vs BitGo',
    body: 'A through-line across non-custodial wallets, custody choices, key-management UX, and production transaction orchestration.',
  },
  {
    label: 'Infrastructure',
    tone: 'tone-sage',
    title: 'Project Ember, VeriOnce, Fabric–Polygon, NCOG Earth Chain',
    body: 'L2 operations, Fabric architectures, cross-chain verification, and the trade-offs behind custom or specialised blockchain infrastructure.',
  },
  {
    label: 'AI delivery',
    tone: 'tone-sky',
    title: 'RoomQuery, Project Beacon, PrivateGPT, AI Social Media Agent',
    body: 'Applied AI systems focused on ranking, retrieval, orchestration, and practical workflow leverage instead of generic demo-layer novelty.',
  },
]

const SOLULAB_CASE_STUDIES = [
  { label: 'HighVibe Network', href: 'https://www.solulab.com/case-study/highvibe-network/' },
  { label: 'Morpheus Network', href: 'https://www.solulab.com/case-studies/morpheus-network/' },
  { label: 'NFT Gallery', href: 'https://www.solulab.com/case-study/nft-gallery-reinventing-the-dynamics-of-the-art-market/' },
  { label: 'Krypto Kiddies', href: 'https://www.solulab.com/case-study/krypto-kiddies-a-crypto-landscape-where-learning-is-fun/' },
  { label: 'NFT Blockchain', href: 'https://www.solulab.com/case-study/nft-blockchain-blockchain-built-exclusively-for-nfts-case-study/' },
  { label: 'MultiVAC NFT Marketplace', href: 'https://www.solulab.com/case-study/multivac-a-next-gen-nft-marketplace-for-crypto-trading/' },
  { label: 'AnrKeyX', href: 'https://www.solulab.com/case-study/anrkeyx-first-game-studio-for-defi-gaming/' },
  { label: 'Alacrity Blockchain', href: 'https://www.solulab.com/case-study/alacrity-your-next-generation-user-friendly-blockchain/' },
  { label: 'NFTY Token', href: 'https://www.solulab.com/case-study/nfty-a-token-for-promoting-quality-in-nft-marketplaces/' },
]

function includesFilter(project: ProjectMeta, filter: ProjectFilter) {
  if (filter === 'all') return true
  return PROJECT_CATEGORIES[project.slug]?.includes(filter) ?? false
}

const sectionTitle = 'text-[clamp(2rem,5vw,3.4rem)] font-black uppercase leading-none tracking-tighter'
const handWord = 'hand text-[1.15em] font-normal lowercase text-dm-accent-ink'

export function ProjectBrowser({ projects }: { projects: ProjectMeta[] }) {
  const [activeFilter, setActiveFilter] = useState<ProjectFilter>('all')
  const visibleProjects = projects.filter((project) => includesFilter(project, activeFilter))
  const activeMeta = FILTERS.find((filter) => filter.key === activeFilter) ?? FILTERS[0]

  return (
    <div>
      {/* ── Through-lines ─────────────────────────────────────────── */}
      <section aria-labelledby="through-lines">
        <h2 id="through-lines" className={sectionTitle}>
          The <span className={handWord}>through</span>-lines
        </h2>
        <div className="mt-10 flex flex-col gap-10 lg:flex-row lg:items-start">
          {FEATURED_SPOTLIGHTS.map((spotlight, i) => (
            <Scrap
              key={spotlight.label}
              className={cn(
                'relative w-full lg:flex-1',
                ['-rotate-[1.4deg]', 'rotate-[1.2deg] lg:-ml-6 lg:mt-10', '-rotate-[0.8deg] lg:-ml-6 lg:mt-3'][i],
              )}
              paperClassName={cn(spotlight.tone, 'px-7 py-9')}
            >
              <span className="ticket">{spotlight.label}</span>
              <h3 className="mt-5 text-[1.15rem] font-black uppercase leading-[1.12] tracking-tight">{spotlight.title}</h3>
              <p className="mt-3 text-sm font-medium leading-[1.7]">{spotlight.body}</p>
            </Scrap>
          ))}
        </div>
      </section>

      {/* ── Filterable archive ────────────────────────────────────── */}
      <section aria-labelledby="all-projects" className="mt-24 sm:mt-28">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-xl">
            <h2 id="all-projects" className={sectionTitle}>
              {activeMeta.label}
            </h2>
            <p className="mt-3 text-[15px] leading-[1.7] text-dm-ink-soft">{activeMeta.description}</p>
            <p className="mt-2 text-[13px] font-bold uppercase tracking-[0.14em]" aria-live="polite">
              {visibleProjects.length} {visibleProjects.length === 1 ? 'project' : 'projects'} in view
            </p>
          </div>
          <div role="group" aria-label="Filter by category" className="flex flex-wrap gap-3">
            {FILTERS.map((filter, i) => {
              const isActive = activeFilter === filter.key
              return (
                <button
                  key={filter.key}
                  type="button"
                  onClick={() => setActiveFilter(filter.key)}
                  aria-pressed={isActive}
                  className={cn(
                    'ticket min-h-11 cursor-pointer px-4 transition-[rotate,background-color,color] duration-200 hover:rotate-0',
                    isActive ? 'tone-ink rotate-0 shadow-hard' : cn(filter.tone, pick(tilts, i)),
                    focusRing,
                  )}
                >
                  {filter.label}
                </button>
              )
            })}
          </div>
        </div>

        <ul key={activeFilter} className="animate-fade-in mt-10 grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
          {visibleProjects.map((project, i) => (
            <li key={project.slug} className="min-w-0">
              <ProjectCard project={project} index={i} />
            </li>
          ))}
        </ul>
      </section>

      {/* ── External case studies ─────────────────────────────────── */}
      <section aria-labelledby="client-delivery" className="mt-24 sm:mt-28">
        <Scrap className="-rotate-[0.6deg]" paperClassName="tone-panel px-7 py-10 sm:px-12 sm:py-14">
          <h2 id="client-delivery" className="text-[clamp(1.7rem,4vw,2.6rem)] font-black uppercase leading-[1.02] tracking-tight">
            Client delivery, <span className={handWord}>as proof</span>
          </h2>
          <p className="mt-4 max-w-2xl text-[15px] leading-[1.75] text-dm-ink-soft">
            Not every client system belongs in a public deep-dive. These SoluLab case studies give a representative view
            of the platforms delivered across NFT marketplaces, gaming, supply-chain, token systems, and broader
            blockchain product builds.
          </p>
          <ul className="mt-8 flex flex-wrap gap-3">
            {SOLULAB_CASE_STUDIES.map((study, i) => (
              <li key={study.label}>
                <a
                  href={study.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(chipLink, pick(tones, i), pick(tilts, i))}
                >
                  {study.label} ↗
                </a>
              </li>
            ))}
          </ul>
        </Scrap>
      </section>
    </div>
  )
}
