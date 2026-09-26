'use client'

import { useEffect } from 'react'
import Cal, { getCalApi } from '@calcom/embed-react'
import { useTheme } from '@/lib/use-theme'

// Cal can't read our CSS custom properties (it renders in an iframe), so the
// palette values are mirrored here: accent-ink and panel, per theme.
const CAL_VARS = {
  light: { 'cal-brand': '#9a4a2c', 'cal-bg': '#fffaf2', 'cal-bg-muted': '#f6eee4' },
  dark: { 'cal-brand': '#e59a74', 'cal-bg': '#342b3f', 'cal-bg-muted': '#3d3349' },
}

export function CalBookingEmbed() {
  const theme = useTheme()

  useEffect(() => {
    ;(async function initializeCal() {
      const cal = await getCalApi({ namespace: '15min' })
      cal('ui', {
        hideEventTypeDetails: true,
        layout: 'month_view',
        cssVarsPerTheme: CAL_VARS,
      })
    })()
  }, [])

  return (
    <div className="tone-panel h-[620px] overflow-hidden border-2 border-current shadow-hard-lg sm:h-[700px]">
      {/* Mount only once the site theme is known, and remount when it flips,
          so the embed always matches the page. */}
      {theme && (
        <Cal
          key={theme}
          namespace="15min"
          calLink="neelbanker/15min"
          style={{ width: '100%', height: '100%', overflow: 'scroll' }}
          config={{ layout: 'month_view', useSlotsViewOnSmallScreen: 'true', theme }}
        />
      )}
    </div>
  )
}
