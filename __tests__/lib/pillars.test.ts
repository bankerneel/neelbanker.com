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

  it('maps each pillar to its Dream Bazaar accent', () => {
    expect(getPillarColour('blockchain')).toBe('sage')
    expect(getPillarColour('ai')).toBe('sky')
    expect(getPillarColour('leadership')).toBe('rose')
    expect(getPillarBySlug('ai')?.toneClass).toBe('tone-sky')
  })
})
