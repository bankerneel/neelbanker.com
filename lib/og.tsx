/**
 * Shared pieces for the Dream Bazaar OG images (app/opengraph-image.tsx,
 * app/writing/[slug]/opengraph-image.tsx). Satori renders inline styles only
 * and can't read our CSS custom properties or next/font files, so the light
 * palette is mirrored here as hex and fonts are fetched from Google Fonts,
 * subset to the exact text drawn. Keep these hexes in sync with the light
 * :root tokens in app/globals.css.
 */
import type { ReactNode } from 'react'

export const OG_SIZE = { width: 1200, height: 630 }

export const P = {
  panel: '#fffaf2',
  ink: '#3a2f3d',
  inkSoft: '#5f4f62',
  accentInk: '#9a4a2c',
  rose: '#e0a08f',
  butter: '#f2dca8',
  sky: '#a9c2dc',
  lilac: '#c3aad0',
  sage: '#a8bd9e',
  terra: '#d68f73',
  shadow: 'rgba(58, 47, 61, 0.22)',
  longShadow: 'rgba(58, 47, 61, 0.16)',
}

export const PILLAR_FILL: Record<string, string> = { blockchain: P.sage, ai: P.sky, leadership: P.rose }

type OgFont = { name: string; data: ArrayBuffer; weight: 400 | 500 | 900; style: 'normal' }

async function googleFont(family: string, weight: number, text: string): Promise<ArrayBuffer> {
  const url = `https://fonts.googleapis.com/css2?family=${family}:wght@${weight}&text=${encodeURIComponent(text)}`
  // No browser user-agent → Google serves TrueType, which Satori can read (it can't read woff2).
  const css = await (await fetch(url)).text()
  const src = css.match(/src: url\((.+?)\) format\('(?:opentype|truetype)'\)/)?.[1]
  if (!src) throw new Error(`No TrueType source for ${family} ${weight}`)
  return (await fetch(src)).arrayBuffer()
}

/**
 * Archivo 900 for everything set in caps, Caveat 500 for the handwritten
 * line. On any network failure the image still renders in the default font
 * rather than failing the build.
 */
export async function loadOgFonts(archivoText: string, caveatText: string): Promise<OgFont[] | undefined> {
  try {
    const [archivo, caveat] = await Promise.all([
      googleFont('Archivo', 900, archivoText),
      googleFont('Caveat', 500, caveatText),
    ])
    return [
      { name: 'Archivo', data: archivo, weight: 900, style: 'normal' },
      { name: 'Caveat', data: caveat, weight: 500, style: 'normal' },
    ]
  } catch {
    return undefined
  }
}

/** Dream-sky backdrop with the lilac arch and butter sun. */
export function Backdrop({ children }: { children: ReactNode }) {
  return (
    <div
      style={{
        display: 'flex',
        width: '100%',
        height: '100%',
        position: 'relative',
        overflow: 'hidden',
        color: P.ink,
        fontFamily: 'Archivo',
        backgroundColor: '#f1e2ec',
        backgroundImage:
          'radial-gradient(circle at 18% 12%, #ffd9a0 0%, rgba(255,217,160,0) 45%), radial-gradient(circle at 82% 8%, #ffb3c7 0%, rgba(255,179,199,0) 42%), radial-gradient(circle at 50% 100%, #b9c6ff 0%, rgba(185,198,255,0) 55%), linear-gradient(180deg, #fbe7d2 0%, #ecdcf5 52%, #d7dfff 100%)',
      }}
    >
      {/* arch + its long shadow */}
      <div
        style={{
          position: 'absolute',
          right: 70,
          top: 60,
          width: 190,
          height: 300,
          borderRadius: '999px 999px 18px 18px',
          background: P.lilac,
          boxShadow: `36px 36px 0 ${P.longShadow}`,
        }}
      />
      <div
        style={{
          position: 'absolute',
          right: 230,
          top: 330,
          width: 110,
          height: 110,
          borderRadius: 999,
          background: P.butter,
          boxShadow: `22px 22px 0 ${P.longShadow}`,
        }}
      />
      {children}
    </div>
  )
}

export function NameTag() {
  return (
    <div
      style={{
        display: 'flex',
        alignSelf: 'flex-start',
        border: `4px solid ${P.ink}`,
        background: P.panel,
        padding: '8px 18px',
        fontSize: 30,
        letterSpacing: '-0.03em',
        textTransform: 'uppercase',
        boxShadow: `6px 6px 0 ${P.shadow}`,
        transform: 'rotate(-1.4deg)',
      }}
    >
      Neel Banker
    </div>
  )
}

export function Ticket({ children, fill, rotate = 0 }: { children: ReactNode; fill: string; rotate?: number }) {
  return (
    <div
      style={{
        display: 'flex',
        border: `3px solid ${P.ink}`,
        background: fill,
        padding: '8px 16px',
        fontSize: 20,
        letterSpacing: '0.06em',
        textTransform: 'uppercase',
        transform: `rotate(${rotate}deg)`,
      }}
    >
      {children}
    </div>
  )
}
