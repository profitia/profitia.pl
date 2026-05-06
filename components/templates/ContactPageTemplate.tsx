/**
 * ContactPageTemplate
 * ─────────────────────────────────────────────────────────────────────────
 * Composition system for the Contact page.
 *
 * SECTION ORDER:
 *   Hero (minimal) → Split (form left, info right) → optional LogoCloud
 *
 * TONAL RHYTHM:
 *   white → white (form) → gray-50 (logos)
 *
 * USAGE:
 *   The actual form is passed as children (server component or client form).
 *   ContactPageTemplate wraps with correct layout, spacing, and context.
 */

import { ReactNode } from 'react'
import { HeroMinimal, LogoCloud } from '@/components/sections'
import { RevealWrapper } from '@/components/ui'
import type { LogoItem } from '@/components/sections'

export interface ContactInfo {
  label: string
  value: string
  href?: string
}

export interface ContactPageContent {
  hero: {
    label?: string
    headline: string
    subtitle?: string
  }
  info?: ContactInfo[]
  trustLabel?: string
  logos?: LogoItem[]
}

export function ContactPageTemplate({
  content,
  formSlot,
}: {
  content: ContactPageContent
  formSlot: ReactNode
}) {
  return (
    <>
      <HeroMinimal
        label={content.hero.label}
        headline={content.hero.headline}
        subtitle={content.hero.subtitle}
      />

      <section className="py-28 bg-white border-t border-gray-100">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">

            {/* Form slot */}
            <RevealWrapper delay={0}>
              {formSlot}
            </RevealWrapper>

            {/* Contact info */}
            {content.info && content.info.length > 0 && (
              <RevealWrapper delay={1}>
                <div className="space-y-10 lg:pt-4">
                  {content.info.map((item) => (
                    <div key={item.label} className="border-b border-gray-100 pb-8 last:border-0">
                      <p className="label-tag mb-2">{item.label}</p>
                      {item.href ? (
                        <a
                          href={item.href}
                          className="text-gray-900 font-medium hover:text-gray-600 transition-colors duration-200"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-gray-900 font-medium">{item.value}</p>
                      )}
                    </div>
                  ))}
                </div>
              </RevealWrapper>
            )}

          </div>
        </div>
      </section>

      {content.logos && content.logos.length > 0 && (
        <LogoCloud
          label={content.trustLabel}
          logos={content.logos}
          background="gray-50"
        />
      )}
    </>
  )
}
