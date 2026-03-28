import { ImageResponse } from 'next/og'
import { getAllArticleMeta } from '@/lib/mdx'
import { getPillarBySlug } from '@/lib/pillars'

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export function generateStaticParams() {
  return getAllArticleMeta().map((a) => ({ slug: a.slug }))
}

export default async function ArticleOGImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const articles = getAllArticleMeta()
  const article = articles.find((a) => a.slug === slug)
  const pillar = article ? getPillarBySlug(article.pillar) : null

  return new ImageResponse(
    (
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: '100%', height: '100%', background: '#0a0f1e', padding: 80 }}>
        <p style={{ color: '#6366f1', fontFamily: 'monospace', fontSize: 18 }}>
          {pillar ? `${pillar.emoji} ${pillar.label}` : 'neelbanker.com'}
        </p>
        <h1 style={{ color: 'white', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '24px 0' }}>
          {article?.title ?? 'Article'}
        </h1>
        <p style={{ color: '#64748b', fontSize: 22 }}>Neel Banker · neelbanker.com</p>
      </div>
    ),
    { ...size }
  )
}
