/**
 * ServiceProof
 * ─────────────────────────────────────────────────────────────────────────
 * Testimonial + optional logo cloud for service pages.
 * Dark tonal break. The "we've done this" credibility moment.
 *
 * COMPOSITION: QuoteBlock + optional LogoCloud.
 */

import { RevealWrapper, QuoteBlock } from '@/components/ui'
import Image from 'next/image'

export interface ProofLogo {
  src: string
  alt: string
  width?: number
  height?: number
}

export interface ServiceProofProps {
  quote: string
  author: string
  role: string
  company?: string
  metric?: string
  metricLabel?: string
  logos?: ProofLogo[]
  logosLabel?: string
}

export function ServiceProof({
  quote,
  author,
  role,
  company,
  metric,
  metricLabel,
  logos,
  logosLabel,
}: ServiceProofProps) {
  return (
    <section className="py-28 bg-gray-900 border-t border-gray-800">
      <div className="container mx-auto max-w-7xl px-6">

        <RevealWrapper delay={0}>
          <QuoteBlock
            quote={quote}
            author={author}
            role={company ? `${role} - ${company}` : role}
            metric={metric}
            metricLabel={metricLabel}
          />
        </RevealWrapper>

        {logos && logos.length > 0 && (
          <RevealWrapper delay={1}>
            <div className="mt-16 pt-16 border-t border-white/10">
              {logosLabel && (
                <p className="text-xs font-medium tracking-[0.25em] uppercase text-gray-600 mb-10 text-center">
                  {logosLabel}
                </p>
              )}
              <div className="flex flex-wrap items-center justify-center gap-10 lg:gap-16">
                {logos.map((logo) => (
                  <div
                    key={logo.alt}
                    className="relative opacity-30 hover:opacity-50 transition-opacity duration-300 grayscale invert"
                  >
                    <Image
                      src={logo.src}
                      alt={logo.alt}
                      width={logo.width ?? 100}
                      height={logo.height ?? 28}
                      className="object-contain"
                    />
                  </div>
                ))}
              </div>
            </div>
          </RevealWrapper>
        )}

      </div>
    </section>
  )
}
