'use client'

import type { FormEvent, ReactNode } from 'react'

/**
 * FormLayout — semantic <form> wrapper with institutional spacing.
 *
 * Marked 'use client' because it handles the onSubmit event.
 * Used when you need a reusable form shell outside of ContactForm/NewsletterForm.
 */

interface FormLayoutProps {
  children: ReactNode
  onSubmit?: (e: FormEvent<HTMLFormElement>) => void
  ariaLabel?: string
  noValidate?: boolean
  className?: string
}

export function FormLayout({
  children,
  onSubmit,
  ariaLabel,
  noValidate = true,
  className = 'space-y-6',
}: FormLayoutProps) {
  return (
    <form
      onSubmit={onSubmit}
      aria-label={ariaLabel}
      noValidate={noValidate}
      className={className}
    >
      {children}
    </form>
  )
}
