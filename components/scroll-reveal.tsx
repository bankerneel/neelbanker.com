'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'

interface Props {
  children: ReactNode
  delay?: number
  className?: string
}

/** Adds `is-visible` the first time the element scrolls into view. */
function useInView<T extends HTMLElement>() {
  const ref = useRef<T>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el || visible) return

    // No IntersectionObserver (rare/old browsers): reveal on next frame.
    // Reduced motion is handled in CSS, so no special-casing needed here.
    if (!('IntersectionObserver' in window)) {
      const id = requestAnimationFrame(() => setVisible(true))
      return () => cancelAnimationFrame(id)
    }

    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setVisible(true)
          io.disconnect()
        }
      },
      { rootMargin: '0px 0px -80px 0px', threshold: 0.01 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [visible])

  return { ref, visible }
}

function cx(...parts: (string | false | undefined)[]) {
  return parts.filter(Boolean).join(' ')
}

export function FadeUp({ children, delay = 0, className }: Props) {
  const { ref, visible } = useInView<HTMLDivElement>()
  return (
    <div
      ref={ref}
      className={cx('reveal reveal-up', visible && 'is-visible', className)}
      style={delay ? { transitionDelay: `${delay}s` } : undefined}
    >
      {children}
    </div>
  )
}

export function FadeIn({ children, delay = 0, className }: Props) {
  const { ref, visible } = useInView<HTMLDivElement>()
  return (
    <div
      ref={ref}
      className={cx('reveal', visible && 'is-visible', className)}
      style={delay ? { transitionDelay: `${delay}s` } : undefined}
    >
      {children}
    </div>
  )
}

export function SlideIn({
  children,
  delay = 0,
  className,
  from = 'left',
}: Props & { from?: 'left' | 'right' }) {
  const { ref, visible } = useInView<HTMLDivElement>()
  return (
    <div
      ref={ref}
      className={cx('reveal', from === 'left' ? 'reveal-left' : 'reveal-right', visible && 'is-visible', className)}
      style={delay ? { transitionDelay: `${delay}s` } : undefined}
    >
      {children}
    </div>
  )
}

export function StaggerContainer({
  children,
  className,
}: Props & { delay?: number }) {
  const { ref, visible } = useInView<HTMLDivElement>()
  return (
    <div ref={ref} className={cx('stagger', visible && 'is-visible', className)}>
      {children}
    </div>
  )
}

export function StaggerItem({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return <div className={cx('stagger-item', className)}>{children}</div>
}
