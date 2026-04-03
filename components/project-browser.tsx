'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ProjectCard } from '@/components/project-card'
import type { ProjectMeta } from '@/types/content'

type ProjectFilter = 'all' | 'wallets' | 'infrastructure' | 'ai' | 'leadership'

const FILTERS: Array<{ key: ProjectFilter; label: string; description: string }> = [
  { key: 'all', label: 'All Work', description: 'Full project archive across delivery contexts.' },
  { key: 'wallets', label: 'Wallets', description: 'Custody, NCW, ERC-4337, and transaction infrastructure.' },
  { key: 'infrastructure', label: 'Infrastructure', description: 'Chains, Fabric networks, bridges, and system backbones.' },
  { key: 'ai', label: 'AI Systems', description: 'Agents, local LLM workflows, and AI-assisted product systems.' },
  { key: 'leadership', label: 'Leadership-Heavy', description: 'Programs where delivery orchestration mattered as much as code.' },
]

const PROJECT_CATEGORIES: Record<string, ProjectFilter[]> = {
  'cryptsync-ncw': ['wallets', 'infrastructure', 'leadership'],
  'truetiger-non-custodial-wallet': ['wallets', 'leadership'],
  'fireblocks-bitgo-custody': ['wallets', 'leadership'],
  'best-wallet-ecosystem': ['wallets', 'leadership'],
  'fabric-polygon-interop': ['infrastructure'],
  'verionce': ['infrastructure', 'leadership'],
  'doctrace-fabric-documents': ['infrastructure', 'leadership'],
  'pepe-unchained-l2': ['infrastructure', 'leadership'],
  'ncog-earth-chain': ['infrastructure'],
  'memevault': ['infrastructure'],
  'smart-contract-audit-suite': ['infrastructure', 'leadership'],
  'roomquery': ['ai'],
  'ai-social-media-agent': ['ai'],
  'privatgpt-offline': ['ai'],
  'keytu-ai-mentoring-platform': ['ai', 'leadership'],
  'idosy-ido-platform': ['wallets', 'leadership'],
}

const FEATURED_SPOTLIGHTS = [
  {
    label: 'Wallet Systems',
    title: 'Project Atlas, Project Tiger, Project Orbit, Fireblocks vs BitGo',
    body: 'A through-line across non-custodial wallets, custody choices, key-management UX, and production transaction orchestration.',
  },
  {
    label: 'Infrastructure',
    title: 'Project Ember, VeriOnce, Fabric–Polygon, NCOG Earth Chain',
    body: 'L2 operations, Fabric architectures, cross-chain verification, and the trade-offs behind custom or specialised blockchain infrastructure.',
  },
  {
    label: 'AI Delivery',
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

export function ProjectBrowser({ projects }: { projects: ProjectMeta[] }) {
  const [activeFilter, setActiveFilter] = useState<ProjectFilter>('all')
  const visibleProjects = projects.filter((project) => includesFilter(project, activeFilter))
  const activeMeta = FILTERS.find((filter) => filter.key === activeFilter) ?? FILTERS[0]

  return (
    <div>
      <div className="mb-10 border border-border bg-background p-6 sm:p-8">
        <div className="mb-6 flex flex-wrap gap-2">
          {FILTERS.map((filter) => (
            <button
              key={filter.key}
              type="button"
              onClick={() => setActiveFilter(filter.key)}
              className={`relative min-h-11 cursor-pointer overflow-hidden px-3 py-2 font-mono text-xs uppercase tracking-widest transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${activeFilter === filter.key ? 'text-primary-foreground' : 'bg-muted text-muted-foreground hover:text-foreground'}`}
            >
              {activeFilter === filter.key && (
                <motion.span
                  layoutId="project-filter-pill"
                  className="absolute inset-0 bg-primary"
                  transition={{ type: 'spring', stiffness: 280, damping: 26 }}
                />
              )}
              <span className="relative z-10">{filter.label}</span>
            </button>
          ))}
        </div>

        <div className="mb-8 max-w-2xl">
          <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.22em] text-primary">Browse by category</p>
          <h2 className="mb-4 font-bold text-2xl sm:text-3xl uppercase tracking-tight">{activeMeta.label}</h2>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-xl text-sm leading-[1.8] text-muted-foreground">
              {activeMeta.description}
            </p>
            <div className="inline-flex w-full items-center gap-3 border border-border bg-muted/40 px-4 py-3 sm:w-fit">
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">In view</span>
              <span className="font-bold text-lg leading-none text-foreground tabular-nums">{visibleProjects.length}</span>
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                {visibleProjects.length === 1 ? 'project' : 'projects'}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-10 grid gap-px bg-border lg:grid-cols-3">
        {FEATURED_SPOTLIGHTS.map((spotlight) => (
          <div key={spotlight.label} className="bg-background p-6">
            <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.22em] text-primary">{spotlight.label}</p>
            <h2 className="mb-4 font-bold text-lg uppercase tracking-tight">{spotlight.title}</h2>
            <p className="text-sm leading-[1.8] text-muted-foreground">{spotlight.body}</p>
          </div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeFilter}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
          className="grid gap-px bg-border sm:grid-cols-2"
        >
          {visibleProjects.map((project) => (
            <div key={project.slug} className="bg-background">
              <ProjectCard project={project} />
            </div>
          ))}
        </motion.div>
      </AnimatePresence>

      <div className="mt-16 border-t border-border pt-12">
        <div className="mb-8 max-w-2xl">
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.22em] text-muted-foreground">Selected SoluLab case studies</p>
          <h2 className="mb-4 font-bold text-2xl sm:text-3xl uppercase tracking-tighter">Client delivery, grouped as proof rather than a raw archive</h2>
          <p className="text-sm leading-[1.8] text-muted-foreground">
            Not every client system belongs in a public deep-dive. These external case studies give a representative view of the kinds of platforms delivered across NFT marketplaces, gaming, supply-chain, token systems, and broader blockchain product builds.
          </p>
        </div>
        <div className="grid gap-px bg-border sm:grid-cols-2 xl:grid-cols-3">
          {SOLULAB_CASE_STUDIES.map((study) => (
            <a
              key={study.label}
              href={study.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex min-h-[132px] cursor-pointer flex-col justify-between overflow-hidden bg-background p-6 transition-colors duration-200 hover:bg-muted/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <div
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-primary transition-transform duration-300 group-hover:scale-x-100"
              />
              <div className="relative z-10">
                <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                  External case study
                </p>
                <p className="max-w-[18ch] font-bold text-base uppercase tracking-tight leading-snug transition-colors duration-200 group-hover:text-primary">
                  {study.label}
                </p>
              </div>
              <div className="relative z-10 flex items-center justify-between gap-4">
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                  SoluLab archive
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground transition-transform duration-200 group-hover:translate-x-1">
                  View ↗
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
