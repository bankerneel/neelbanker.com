import type { Metadata } from 'next'
import Script from 'next/script'
import { Archivo, Caveat } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Nav } from '@/components/nav'
import { Footer } from '@/components/footer'
import './globals.css'

// Archivo is variable: one file (35 KB) covers every weight.
const archivo = Archivo({
  variable: '--font-archivo',
  subsets: ['latin'],
})

// Caveat is only used for short handwritten accents, so load one static
// weight — the variable file is 75 KB.
const caveat = Caveat({
  variable: '--font-caveat',
  subsets: ['latin'],
  weight: ['500'],
})

// Runs before first paint so the page never flashes the wrong theme.
// A stored choice (from the nav toggle) wins; otherwise follow the OS.
// beforeInteractive = Next injects it into <head> itself, outside React's
// render (a raw <script> in the layout trips React 19's script-tag warning).
const themeScript = `(function(){try{var t=localStorage.getItem('nb-theme');if(t!=='light'&&t!=='dark'){t=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}document.documentElement.dataset.theme=t}catch(e){}})()`

export const metadata: Metadata = {
  metadataBase: new URL('https://neelbanker.com'),
  title: { default: 'Neel Banker — Blockchain Architect', template: '%s | Neel Banker' },
  description: 'Senior Blockchain Architect writing on Web3, AI, and engineering leadership.',
  icons: {
    icon: [{ url: '/favicon.svg', type: 'image/svg+xml' }],
    shortcut: '/favicon.svg',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://neelbanker.com',
    siteName: 'Neel Banker',
  },
  twitter: { card: 'summary_large_image' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${archivo.variable} ${caveat.variable}`} suppressHydrationWarning>
      <body className="min-h-screen font-sans text-dm-ink antialiased" suppressHydrationWarning>
        <Script id="theme-init" strategy="beforeInteractive">
          {themeScript}
        </Script>
        <Nav />
        <main className="overflow-x-clip">{children}</main>
        <Footer />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
