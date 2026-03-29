import { ImageResponse } from 'next/og'

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'
export const runtime = 'nodejs'

export default function OGImage() {
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
            backgroundImage:
              'linear-gradient(135deg, rgba(198,255,0,0.08) 0%, rgba(198,255,0,0) 35%), linear-gradient(180deg, rgba(255,255,255,0.02) 0%, rgba(255,255,255,0) 100%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: 40,
            right: 40,
            width: 220,
            height: 220,
            borderRadius: 9999,
            border: '1px solid rgba(198,255,0,0.22)',
            opacity: 0.7,
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: 86,
            right: 86,
            width: 128,
            height: 128,
            borderRadius: 24,
            border: '2px solid #c6ff00',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 54,
            fontWeight: 800,
            letterSpacing: '-0.06em',
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
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div
              style={{
                display: 'flex',
                fontSize: 22,
                textTransform: 'uppercase',
                letterSpacing: '0.18em',
                color: '#c6ff00',
                marginBottom: 28,
              }}
            >
              Neel Banker
            </div>
            <div
              style={{
                display: 'flex',
                maxWidth: 820,
                fontSize: 82,
                lineHeight: 0.95,
                fontWeight: 800,
                letterSpacing: '-0.07em',
              }}
            >
              System architect for high-stakes systems.
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div
              style={{
                display: 'flex',
                fontSize: 30,
                color: '#9ca3af',
                marginBottom: 28,
              }}
            >
              Engineering leadership · AI × Web3 · Infrastructure
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
              <div style={{ display: 'flex', width: 74, height: 6, background: '#c6ff00' }} />
              <div style={{ display: 'flex', width: 74, height: 6, background: '#00d5ff' }} />
              <div style={{ display: 'flex', width: 74, height: 6, background: '#ff8a33' }} />
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size }
  )
}
