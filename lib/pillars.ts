import type { Pillar } from '@/types/content'

// Dream Bazaar accents: blockchain = sage, ai = sky, leadership = rose.
// Use toneClass for filled chips/cards — it pairs the fill with a text colour
// that passes contrast in both themes.
export const PILLARS: Pillar[] = [
  {
    slug: 'blockchain',
    label: 'Blockchain Architecture',
    short: 'Blockchain',
    emoji: '⛓️',
    colour: 'sage',
    toneClass: 'tone-sage',
    bgClass: 'bg-dm-sage',
    textClass: 'text-dm-ink',
    borderClass: 'border-dm-sage',
  },
  {
    slug: 'ai',
    label: 'AI × Web3',
    short: 'AI × Web3',
    emoji: '🤖',
    colour: 'sky',
    toneClass: 'tone-sky',
    bgClass: 'bg-dm-sky',
    textClass: 'text-dm-ink',
    borderClass: 'border-dm-sky',
  },
  {
    slug: 'leadership',
    label: 'Engineering Leadership',
    short: 'Leadership',
    emoji: '🏗️',
    colour: 'rose',
    toneClass: 'tone-rose',
    bgClass: 'bg-dm-rose',
    textClass: 'text-dm-ink',
    borderClass: 'border-dm-rose',
  },
]

export function getPillarBySlug(slug: string): Pillar | undefined {
  return PILLARS.find((p) => p.slug === slug)
}

export function getPillarColour(slug: string): string {
  return getPillarBySlug(slug)?.colour ?? 'sage'
}
