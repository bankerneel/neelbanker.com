import type { Pillar, PillarSlug } from '@/types/content'

export const PILLARS: Pillar[] = [
  {
    slug: 'blockchain',
    label: 'Blockchain Architecture',
    emoji: '⛓️',
    colour: 'lime',
    bgClass: 'bg-lime-400/10',
    textClass: 'text-lime-300',
    borderClass: 'border-lime-400/30',
  },
  {
    slug: 'ai',
    label: 'AI × Web3',
    emoji: '🤖',
    colour: 'cyan',
    bgClass: 'bg-cyan-400/10',
    textClass: 'text-cyan-300',
    borderClass: 'border-cyan-400/30',
  },
  {
    slug: 'leadership',
    label: 'Engineering Leadership',
    emoji: '🏗️',
    colour: 'orange',
    bgClass: 'bg-orange-400/10',
    textClass: 'text-orange-300',
    borderClass: 'border-orange-400/30',
  },
]

export function getPillarBySlug(slug: string): Pillar | undefined {
  return PILLARS.find((p) => p.slug === slug)
}

export function getPillarColour(slug: string): string {
  return getPillarBySlug(slug)?.colour ?? 'zinc'
}
