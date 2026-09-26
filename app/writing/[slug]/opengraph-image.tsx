import { ImageResponse } from 'next/og'
import { getAllArticleMeta } from '@/lib/mdx'
import { getPillarBySlug } from '@/lib/pillars'
import { Backdrop, loadOgFonts, NameTag, OG_SIZE, P, PILLAR_FILL, Ticket } from '@/lib/og'

export const size = OG_SIZE
export const contentType = 'image/png'
export const runtime = 'nodejs'

const KICKER = 'from the notebook'

export function generateStaticParams() {
  return getAllArticleMeta().map((a) => ({ slug: a.slug }))
}

/** Long titles step down so the longest (88 characters) still fits in four lines. */
function titleSize(title: string) {
  if (title.length > 75) return 56
  if (title.length > 55) return 62
  return 70
}

export default async function ArticleOGImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const article = getAllArticleMeta().find((a) => a.slug === slug)
  const pillar = article ? getPillarBySlug(article.pillar) : null
  const title = article?.title ?? 'Writing'
  const meta = article ? `${article.readingTime} min read` : ''
  const archivoText = ['Neel Banker', title, pillar?.label ?? '', meta, 'neelbanker.com'].join(' ').toUpperCase()
  const fonts = await loadOgFonts(archivoText, KICKER)

  return new ImageResponse(
    (
      <Backdrop>
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: '100%', padding: '54px 64px' }}>
          <NameTag />
          <div style={{ display: 'flex', flexDirection: 'column', maxWidth: 860 }}>
            <div
              style={{
                display: 'flex',
                fontFamily: 'Caveat',
                fontSize: 44,
                color: P.accentInk,
                transform: 'rotate(-2deg)',
                marginBottom: 8,
              }}
            >
              {KICKER}
            </div>
            <div
              style={{
                display: 'flex',
                fontSize: titleSize(title),
                lineHeight: 0.98,
                letterSpacing: '-0.035em',
                textTransform: 'uppercase',
              }}
            >
              {title}
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', gap: 14 }}>
              {pillar && (
                <Ticket fill={PILLAR_FILL[pillar.slug] ?? P.sage} rotate={-2}>
                  {pillar.label}
                </Ticket>
              )}
              {meta && (
                <Ticket fill={P.panel} rotate={1.5}>
                  {meta}
                </Ticket>
              )}
            </div>
            <div style={{ display: 'flex', fontSize: 20, letterSpacing: '0.12em', textTransform: 'uppercase', color: P.inkSoft }}>
              neelbanker.com
            </div>
          </div>
        </div>
      </Backdrop>
    ),
    { ...size, fonts },
  )
}
