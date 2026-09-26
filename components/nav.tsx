'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { ThemeToggle } from '@/components/theme-toggle'
import { cn } from '@/lib/utils'

const links = [
  { href: '/about', label: 'About', tone: 'tone-sage', tilt: '-rotate-2' },
  { href: '/writing', label: 'Writing', tone: 'tone-butter', tilt: 'rotate-[1.5deg]' },
  { href: '/projects', label: 'Projects', tone: 'tone-sky', tilt: '-rotate-1' },
  { href: '/resources', label: 'Resources', tone: 'tone-rose', tilt: 'rotate-2' },
  { href: '/newsletter', label: 'Newsletter', tone: 'tone-lilac', tilt: '-rotate-[1.5deg]' },
]

const focusRing =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-dm-panel'

export function Nav() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`)

  // Escape closes the mobile menu.
  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <header className="relative z-50">
      <nav aria-label="Main navigation" className="page-wrap flex items-center justify-between gap-4 pb-2 pt-6">
        <Link
          href="/"
          onClick={() => setOpen(false)}
          className={cn(
            'tone-panel -rotate-[1.4deg] shrink-0 cursor-pointer whitespace-nowrap border-[3px] border-current px-3.5 py-1.5 text-lg font-black uppercase leading-none tracking-tighter shadow-hard transition-[rotate] duration-200 hover:rotate-0 sm:text-xl',
            focusRing,
          )}
        >
          Neel Banker
        </Link>

        {/* Desktop */}
        <div className="hidden items-center gap-2.5 lg:flex">
          {links.map(({ href, label, tone, tilt }) => (
            <Link
              key={href}
              href={href}
              aria-current={isActive(href) ? 'page' : undefined}
              className={cn(
                'ticket cursor-pointer py-2 transition-[rotate,background-color,color] duration-200 hover:rotate-0',
                isActive(href) ? 'tone-ink rotate-0' : cn(tone, tilt),
                focusRing,
              )}
            >
              {label}
            </Link>
          ))}
          <Link
            href="/work-with-me"
            aria-current={isActive('/work-with-me') ? 'page' : undefined}
            className={cn(
              'ticket ml-1.5 cursor-pointer py-2.5 shadow-hard transition-[rotate,background-color,color] duration-200 hover:rotate-0',
              isActive('/work-with-me') ? 'tone-ink' : 'tone-terra rotate-[2.5deg]',
              focusRing,
            )}
          >
            Work with me ✦
          </Link>
          <ThemeToggle className="ml-2" />
        </div>

        {/* Mobile */}
        <div className="flex items-center gap-3 lg:hidden">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className={cn(
              'ticket tone-butter min-h-10 cursor-pointer shadow-hard transition-[rotate] duration-200',
              open ? 'rotate-0' : 'rotate-2',
              focusRing,
            )}
          >
            {open ? 'Close ✕' : 'Menu'}
          </button>
        </div>
      </nav>

      {open && (
        <div id="mobile-menu" className="page-wrap animate-fade-in pt-3 lg:hidden">
          <div className="tone-panel border-[3px] border-current p-4 shadow-hard-lg">
            {links.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                aria-current={isActive(href) ? 'page' : undefined}
                className={cn(
                  'flex min-h-12 cursor-pointer items-center justify-between border-b-2 border-dashed border-current/25 text-sm font-black uppercase tracking-tight transition-colors duration-200 last:border-0 hover:text-dm-accent-ink',
                  focusRing,
                )}
              >
                {label}
                {isActive(href) && <span className="hand text-xl font-normal normal-case text-dm-accent-ink">you are here</span>}
              </Link>
            ))}
            <Link
              href="/work-with-me"
              onClick={() => setOpen(false)}
              className={cn('ticket tone-terra mt-4 flex min-h-12 w-full cursor-pointer justify-center text-xs', focusRing)}
            >
              Work with me ✦
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
