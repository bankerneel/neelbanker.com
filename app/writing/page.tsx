import type { Metadata } from 'next'
import { getAllArticleMeta } from '@/lib/mdx'
import { PillarFilter } from '@/components/pillar-filter'

export const metadata: Metadata = {
  title: 'Writing',
  description: 'Articles on Blockchain Architecture, AI × Web3, and Engineering Leadership.',
}

export default function WritingPage() {
  const articles = getAllArticleMeta()
  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <h1 className="mb-2 text-3xl font-bold">Writing</h1>
      <p className="mb-10 text-muted-foreground">
        Weekly articles on Blockchain Architecture, AI × Web3, and Engineering Leadership.
      </p>
      <PillarFilter articles={articles} />
    </div>
  )
}
