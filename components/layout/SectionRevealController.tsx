'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

const SECTION_SELECTOR = 'main[data-section-reveal-root] section'

/**
 * Canonical public-page reveal authority.
 *
 * A whole section enters as one visual unit. Child cards and columns must not
 * create their own staggered scroll animation.
 */
export default function SectionRevealController() {
  const pathname = usePathname()

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>(SECTION_SELECTOR))
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (reduceMotion) {
      sections.forEach((section) => section.classList.add('section-reveal', 'section-reveal-active'))
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return

          entry.target.classList.add('section-reveal-active')
          observer.unobserve(entry.target)
        })
      },
      {
        rootMargin: '0px 0px -8% 0px',
        threshold: 0.06,
      },
    )

    sections.forEach((section) => {
      section.classList.add('section-reveal')
      observer.observe(section)
    })

    return () => observer.disconnect()
  }, [pathname])

  return null
}
