import type { Metadata } from 'next'
import NotFound, { metadata as base } from '../not-found'

// Lighthouse target for the 404 design (a real 404 status fails the SEO audit). Never indexed.
export const metadata: Metadata = { ...base, robots: { index: false, follow: false } }

export default NotFound
