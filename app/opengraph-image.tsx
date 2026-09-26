import { ImageResponse } from 'next/og'
import { Backdrop, loadOgFonts, NameTag, OG_SIZE, P, Ticket } from '@/lib/og'

export const size = OG_SIZE
export const contentType = 'image/png'
export const runtime = 'nodejs'
export const alt = 'Neel Banker — system architect for high-stakes systems'

const HEADLINE = 'System architect for high-stakes systems.'
const KICKER = 'blockchain, AI × Web3, leadership'
const TICKETS = [
  { label: 'Blockchain architecture', fill: P.sage, rotate: -2 },
  { label: 'AI × Web3', fill: P.sky, rotate: 1.5 },
  { label: 'Engineering leadership', fill: P.rose, rotate: -1 },
]

export default async function OGImage() {
  const archivoText = ['Neel Banker', HEADLINE, ...TICKETS.map((t) => t.label)].join(' ').toUpperCase()
  const fonts = await loadOgFonts(archivoText, KICKER)

  return new ImageResponse(
    (
      <Backdrop>
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: '100%', padding: '54px 64px' }}>
          <NameTag />
          <div style={{ display: 'flex', flexDirection: 'column', maxWidth: 820 }}>
            <div
              style={{
                display: 'flex',
                fontFamily: 'Caveat',
                fontSize: 44,
                color: P.accentInk,
                transform: 'rotate(-2deg)',
                marginBottom: 6,
              }}
            >
              {KICKER}
            </div>
            <div
              style={{
                display: 'flex',
                fontSize: 78,
                lineHeight: 0.95,
                letterSpacing: '-0.04em',
                textTransform: 'uppercase',
              }}
            >
              {HEADLINE}
            </div>
          </div>
          <div style={{ display: 'flex', gap: 14 }}>
            {TICKETS.map((t) => (
              <Ticket key={t.label} fill={t.fill} rotate={t.rotate}>
                {t.label}
              </Ticket>
            ))}
          </div>
        </div>
      </Backdrop>
    ),
    { ...size, fonts },
  )
}
