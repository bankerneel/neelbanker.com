import { ImageResponse } from 'next/og'
import { getAllArticleMeta } from '@/lib/mdx'
import { getPillarBySlug } from '@/lib/pillars'

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'
export const runtime = 'nodejs'

function getAccent(pillar?: string) {
  if (pillar === 'ai') return { solid: '#00d5ff', soft: 'rgba(0, 213, 255, 0.16)', label: '#7ee7ff' }
  if (pillar === 'leadership') return { solid: '#ff8a33', soft: 'rgba(255, 138, 51, 0.16)', label: '#ffb37f' }
  return { solid: '#c6ff00', soft: 'rgba(198, 255, 0, 0.16)', label: '#dfff73' }
}

export function generateStaticParams() {
  return getAllArticleMeta().map((a) => ({ slug: a.slug }))
}

export default async function ArticleOGImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const articles = getAllArticleMeta()
  const article = articles.find((a) => a.slug === slug)
  const pillar = article ? getPillarBySlug(article.pillar) : null
  const accent = getAccent(article?.pillar)

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          width: '100%',
          height: '100%',
          background: '#090909',
          color: '#f0eadd',
          position: 'relative',
          overflow: 'hidden',
          padding: '56px 64px',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `linear-gradient(135deg, ${accent.soft} 0%, rgba(0,0,0,0) 38%), linear-gradient(180deg, rgba(255,255,255,0.02) 0%, rgba(255,255,255,0) 100%)`,
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: 62,
            right: 62,
            width: 120,
            height: 120,
            borderRadius: 24,
            border: `2px solid ${accent.solid}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 50,
            fontWeight: 800,
            letterSpacing: '-0.06em',
            color: '#f0eadd',
            background: 'rgba(255,255,255,0.015)',
          }}
        >
          NB
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            width: '100%',
            height: '100%',
            position: 'relative',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', maxWidth: 930 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 18, marginBottom: 30 }}>
              <div
                style={{
                  display: 'flex',
                  padding: '10px 18px',
                  border: `1px solid ${accent.soft}`,
                  background: 'rgba(255,255,255,0.02)',
                  fontSize: 18,
                  color: accent.label,
                  textTransform: 'uppercase',
                  letterSpacing: '0.12em',
                }}
              >
                {pillar ? `${pillar.emoji} ${pillar.label}` : 'Neel Banker'}
              </div>
            </div>
            <div
              style={{
                display: 'flex',
                fontSize: 68,
                fontWeight: 800,
                lineHeight: 1,
                letterSpacing: '-0.06em',
              }}
            >
              {article?.title ?? 'Article'}
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', fontSize: 26, color: '#9ca3af', marginBottom: 18 }}>
              {article?.excerpt ?? 'Writing on blockchain architecture, AI × Web3, and engineering leadership.'}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              {/* <div style={{ display: 'flex', fontSize: 22, color: '#f0eadd' }}>Neel Banker</div> */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <div style={{ display: 'flex', width: 110, height: 6, background: accent.solid }} />
                <div style={{ display: 'flex', fontSize: 18, color: '#9ca3af', letterSpacing: '0.16em', textTransform: 'uppercase' }}>
                  neelbanker.com
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size }
  )
}
