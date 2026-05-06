'use client'

import { useState, useEffect } from 'react'

interface ProtectedPhoneProps {
  /** Number parts assembled client-side — e.g. ['+48', '533', '747', '340'] */
  parts: string[]
  /** Human-readable display string — e.g. '+48 533 747 340'. Defaults to parts.join(' '). */
  display?: string
  className?: string
}

/**
 * Renders a phone link only after client-side hydration.
 * SSR output: empty placeholder span — no tel: href, no number in HTML source.
 * Client output: full semantic <a href="tel:..."> with formatted number.
 */
export function ProtectedPhone({ parts, display, className }: ProtectedPhoneProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <span className={className} aria-hidden="true" />
  }

  const number = parts.join('')
  const label = display ?? parts.join(' ')
  return (
    <a href={`tel:${number}`} className={className}>
      {label}
    </a>
  )
}
