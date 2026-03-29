'use client'

import { useEffect } from 'react'
import Cal, { getCalApi } from '@calcom/embed-react'

export function CalBookingEmbed() {
  useEffect(() => {
    ;(async function initializeCal() {
      const cal = await getCalApi({ namespace: '15min' })
      cal('ui', { hideEventTypeDetails: true, layout: 'month_view' })
    })()
  }, [])

  return (
    <div className="h-[700px] overflow-hidden rounded-lg border border-border bg-muted/20">
      <Cal
        namespace="15min"
        calLink="neelbanker/15min"
        style={{ width: '100%', height: '100%', overflow: 'scroll' }}
        config={{ layout: 'month_view', useSlotsViewOnSmallScreen: 'true', theme: 'dark' }}
      />
    </div>
  )
}
