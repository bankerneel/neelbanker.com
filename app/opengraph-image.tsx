import { ImageResponse } from 'next/og'

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OGImage() {
  return new ImageResponse(
    (
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '100%', height: '100%', background: '#0a0f1e', padding: 80 }}>
        <p style={{ color: '#6366f1', fontFamily: 'monospace', fontSize: 20, marginBottom: 24 }}>
          neelbanker.com
        </p>
        <h1 style={{ color: 'white', fontSize: 72, fontWeight: 800, lineHeight: 1.1, margin: 0 }}>
          I architect what&apos;s next.
        </h1>
        <p style={{ color: '#64748b', fontSize: 28, marginTop: 24 }}>
          Blockchain · AI · Engineering Leadership
        </p>
      </div>
    ),
    { ...size }
  )
}
