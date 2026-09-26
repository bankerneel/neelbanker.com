import type { ReactNode } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { chipLink, pick, tilts } from '@/components/bazaar/styles'

/**
 * The inner-page header: breadcrumb tickets → handwritten kicker → giant h1,
 * then whatever the page pins to its wall (children). Decorative furniture
 * (arch, sun) is optional and desktop-only.
 */
export function PageIntro({
  crumbs = [{ href: '/', label: '← Home' }],
  kicker,
  title,
  children,
  furniture = true,
  className,
}: {
  crumbs?: { href: string; label: string }[]
  kicker: ReactNode
  title: ReactNode
  children?: ReactNode
  furniture?: boolean
  className?: string
}) {
  return (
    <header className={cn('page-wrap relative pt-10 sm:pt-14', className)}>
      {furniture && (
        <>
          <div
            aria-hidden="true"
            className="surreal-arch dm-longshadow pointer-events-none absolute right-[5%] top-4 hidden h-72 w-44 bg-dm-lilac lg:block"
          />
          <div
            aria-hidden="true"
            className="dm-longshadow pointer-events-none absolute right-[3%] top-[24rem] hidden size-24 rounded-full bg-dm-butter lg:block"
          />
        </>
      )}

      <nav aria-label="Breadcrumb" className="relative z-20 flex flex-wrap items-center gap-3">
        {crumbs.map((crumb, i) => (
          <Link key={crumb.href} href={crumb.href} className={cn(chipLink, 'tone-panel', pick(tilts, i))}>
            {crumb.label}
          </Link>
        ))}
      </nav>

      <p className="hand relative z-20 mt-10 -rotate-2 text-[1.75rem] leading-none text-dm-accent-ink sm:text-[2.1rem]">
        {kicker}
      </p>
      <h1 className="relative z-20 mt-3 max-w-[22ch] text-balance text-[clamp(2.4rem,7vw,6.5rem)] font-black uppercase leading-[0.9] tracking-[-0.04em]">
        {title}
      </h1>

      {children}
    </header>
  )
}
