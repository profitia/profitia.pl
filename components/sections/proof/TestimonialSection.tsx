/**
 * TestimonialSection
 * ─────────────────────────────────────────────────────────────────────────
 * Dark premium section. QuoteBlock based.
 * The tonal break in page rhythm - gray-900 background.
 *
 * USAGE: Mid-page proof moment. One featured testimonial with optional metric.
 */

import { RevealWrapper, QuoteBlock, SectionHeader } from '@/components/ui'

export interface TestimonialSectionProps {
  label?: string
  headline?: string
  quote: string
  author: string
  role: string
  company?: string
  metric?: string
  metricLabel?: string
}

export function TestimonialSection({
  label,
  headline,
  quote,
  author,
  role,
  company,
  metric,
  metricLabel,
}: TestimonialSectionProps) {
  return (
    <section className="py-28 bg-gray-900 border-t border-gray-800">
      <div className="container mx-auto max-w-7xl px-6">

        {headline && (
          <RevealWrapper delay={0}>
            <SectionHeader
              label={label}
              headline={headline}
              align="center"
              dark
            />
          </RevealWrapper>
        )}

        <RevealWrapper delay={headline ? 1 : 0}>
          <div className={headline ? 'mt-12' : ''}>
            <QuoteBlock
              quote={quote}
              author={author}
              role={company ? `${role} - ${company}` : role}
              metric={metric}
              metricLabel={metricLabel}
            />
          </div>
        </RevealWrapper>

      </div>
    </section>
  )
}
