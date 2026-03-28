import type { Pillar, PillarSlug } from '@/types/content'

export const PILLARS: Pillar[] = [
  {
    slug: 'blockchain',
    label: 'Blockchain Architecture',
    emoji: '⛓️',
    colour: 'indigo',
    bgClass: 'bg-indigo-500/10',
    textClass: 'text-indigo-400',
    borderClass: 'border-indigo-500/30',
  },
  {
    slug: 'ai',
    label: 'AI × Web3',
    emoji: '🤖',
    colour: 'emerald',
    bgClass: 'bg-emerald-500/10',
    textClass: 'text-emerald-400',
    borderClass: 'border-emerald-500/30',
  },
  {
    slug: 'leadership',
    label: 'Engineering Leadership',
    emoji: '🏗️',
    colour: 'amber',
    bgClass: 'bg-amber-500/10',
    textClass: 'text-amber-400',
    borderClass: 'border-amber-500/30',
  },
]

export function getPillarBySlug(slug: string): Pillar | undefined {
  return PILLARS.find((p) => p.slug === slug)
}

export function getPillarColour(slug: string): string {
  return getPillarBySlug(slug)?.colour ?? 'zinc'
}
