'use client'

import { useState, useEffect } from 'react'

interface ProtectedPersonProps {
  name: string
  className?: string
}

/**
 * Renders a person's name only after client-side hydration.
 * SSR output: empty placeholder span - name absent from HTML source.
 * Client output: plain <span> with the name.
 */
export function ProtectedPerson({ name, className }: ProtectedPersonProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <span className={className} aria-hidden="true" />
  }

  return <span className={className}>{name}</span>
}
