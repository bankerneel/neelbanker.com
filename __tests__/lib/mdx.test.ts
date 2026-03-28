import { describe, it, expect } from 'vitest'
import { computeReadingTime, parseDate } from '@/lib/mdx'

describe('computeReadingTime', () => {
  it('returns 1 for very short content', () => {
    expect(computeReadingTime('hello world')).toBe(1)
  })

  it('returns correct minutes for 400-word content', () => {
    const words = Array(400).fill('word').join(' ')
    expect(computeReadingTime(words)).toBe(2)
  })
})

describe('parseDate', () => {
  it('formats ISO date to readable string', () => {
    expect(parseDate('2026-03-20')).toBe('Mar 20, 2026')
  })
})
