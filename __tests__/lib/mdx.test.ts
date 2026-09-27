import { describe, it, expect } from 'vitest'
import { computeReadingTime, extractOutcome, parseDate } from '@/lib/mdx'

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

describe('extractOutcome', () => {
  it('returns the bullets under "## Outcome" as plain text', () => {
    const body = [
      '## Approach',
      '- not this one',
      '',
      '## Outcome',
      '',
      '- Latency p95: `~800ms` end to end',
      '- **Zero** raw PII on chain',
      '- See [the gist](https://example.com)',
      '',
      '## Lessons',
      '- not this either',
    ].join('\n')
    expect(extractOutcome(body)).toEqual([
      'Latency p95: ~800ms end to end',
      'Zero raw PII on chain',
      'See the gist',
    ])
  })

  it('returns an empty list when there is no Outcome section', () => {
    expect(extractOutcome('## Problem\n- something')).toEqual([])
  })
})
