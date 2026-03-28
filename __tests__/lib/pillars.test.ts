import { describe, it, expect } from 'vitest'
import { PILLARS, getPillarBySlug, getPillarColour } from '@/lib/pillars'

describe('pillars', () => {
  it('exports three pillars', () => {
    expect(PILLARS).toHaveLength(3)
  })

  it('finds pillar by slug', () => {
    expect(getPillarBySlug('blockchain')?.label).toBe('Blockchain Architecture')
  })

  it('returns undefined for unknown slug', () => {
    expect(getPillarBySlug('unknown')).toBeUndefined()
  })

  it('returns tailwind colour class for valid pillar', () => {
    const colour = getPillarColour('ai')
    expect(colour).toContain('emerald')
  })
})
