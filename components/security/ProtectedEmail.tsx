'use client'

import { useState, useEffect } from 'react'

interface ProtectedEmailProps {
  user: string
  domain: string
  className?: string
}

/**
 * Renders an email link only after client-side hydration.
 * SSR output: empty placeholder span — no mailto, no address in HTML source.
 * Client output: full semantic <a href="mailto:..."> with email text.
 */
export function ProtectedEmail({ user, domain, className }: ProtectedEmailProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <span className={className} aria-hidden="true" />
  }

  const email = `${user}@${domain}`
  return (
    <a href={`mailto:${email}`} className={className}>
      {email}
    </a>
  )
}
