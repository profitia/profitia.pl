'use client'

import React from 'react'

interface LegalAnchorLinkProps {
  href: string
  className?: string
  children: React.ReactNode
}

/**
 * Smooth-scroll anchor link for legal TOC navigation.
 * Prevents default jump, scrolls with behavior:'smooth',
 * and updates the URL hash without triggering a Next.js navigation.
 */
export function LegalAnchorLink({ href, className, children }: LegalAnchorLinkProps) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    const id = href.replace('#', '')
    const el = document.getElementById(id)
    if (el) {
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      el.scrollIntoView({ behavior: prefersReduced ? 'auto' : 'smooth', block: 'start' })
      window.history.pushState(null, '', href)
    }
  }

  return (
    <a href={href} onClick={handleClick} className={className}>
      {children}
    </a>
  )
}
