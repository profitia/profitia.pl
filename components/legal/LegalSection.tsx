import React from 'react'

interface LegalSectionProps {
  id: string
  title: string
  children: React.ReactNode
}

/**
 * Reusable legal section wrapper.
 * The `id` prop feeds the TOC anchor system.
 * `scroll-mt-28` offsets for the sticky header on anchor navigation.
 */
export function LegalSection({ id, title, children }: LegalSectionProps) {
  return (
    <section id={id} className="scroll-mt-28">
      <h2 className="text-xl font-semibold tracking-tight text-gray-900 leading-snug mt-12 mb-4 pt-6 border-t border-gray-100">
        {title}
      </h2>
      {children}
    </section>
  )
}
