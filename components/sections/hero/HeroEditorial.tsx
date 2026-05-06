/**
 * HeroEditorial
 * ─────────────────────────────────────────────────────────────────────────
 * Minimalist editorial hero. White background, asymmetric layout.
 * Strategic SaaS / intelligence-platform feel.
 *
 * COMPOSITION:
 *   - Left-aligned label + H1 + subtitle
 *   - Max-w-2xl headline (editorial, not centered)
 *   - Optional micro-detail below CTA (e.g. "No credit card required")
 *   - No image — pure typography moment
 *
 * VISUAL RHYTHM:
 *   bg-white → [gray-50 section follows]
 */

import Link from 'next/link'
import { RevealWrapper } from '@/components/ui'

export interface HeroEditorialProps {
  label?: string
  headline: string
  subtitle?: string
  ctaPrimary: { label: string; href: string }
  ctaSecondary?: { label: string; href: string }
  note?: string          // e.g. "No credit card required • 14-day free trial"
  size?: 'standard' | 'xl'  // xl for homepage, standard for subpages
}

export function HeroEditorial({
  label,
  headline,
  subtitle,
  ctaPrimary,
  ctaSecondary,
  note,
  size = 'standard',
}: HeroEditorialProps) {
  const paddingCls = size === 'xl' ? 'py-24 lg:py-36' : 'py-24 lg:py-32'

  return (
    <section className={`${paddingCls} bg-white`}>
      <div className="container mx-auto max-w-7xl px-6">
        <div className="max-w-2xl">
          <RevealWrapper delay={0}>
            {label && (
              <p className="label-tag mb-5">{label}</p>
            )}
            <h1
              className={`font-semibold tracking-tight text-gray-900 leading-[1.06] mb-6 ${
                size === 'xl'
                  ? 'text-5xl md:text-6xl lg:text-7xl'
                  : 'text-4xl md:text-5xl lg:text-6xl'
              }`}
            >
              {headline}
            </h1>
          </RevealWrapper>

          <RevealWrapper delay={1}>
            {subtitle && (
              <p className="text-lg text-gray-600 leading-relaxed mb-10 max-w-xl">
                {subtitle}
              </p>
            )}
            <div className="flex flex-wrap items-center gap-4">
              <Link href={ctaPrimary.href} className="btn-primary">
                {ctaPrimary.label}
              </Link>
              {ctaSecondary && (
                <Link href={ctaSecondary.href} className="btn-secondary">
                  {ctaSecondary.label}
                </Link>
              )}
            </div>
            {note && (
              <p className="mt-6 text-xs text-gray-400 tracking-wide">{note}</p>
            )}
          </RevealWrapper>
        </div>
      </div>
    </section>
  )
}
