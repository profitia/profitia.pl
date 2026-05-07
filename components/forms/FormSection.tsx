import type { ReactNode } from 'react'

/**
 * FormSection - optional eyebrow label + grouped children.
 * Purely presentational. No 'use client' needed.
 */

interface FormSectionProps {
  eyebrow?: string
  children: ReactNode
  className?: string
}

export function FormSection({ eyebrow, children, className = '' }: FormSectionProps) {
  return (
    <div className={className}>
      {eyebrow && (
        <p className="text-[10px] font-semibold tracking-[0.28em] uppercase text-gray-400 mb-6">
          {eyebrow}
        </p>
      )}
      <div className="space-y-5">{children}</div>
    </div>
  )
}
