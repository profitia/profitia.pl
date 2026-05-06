/**
 * ServiceHero
 * ─────────────────────────────────────────────────────────────────────────
 * Hero for service subpages.
 * Editorial layout, asymmetric, white background.
 * Configurable: text-only or split with image.
 */

import Image from 'next/image'
import Link from 'next/link'
import { RevealWrapper } from '@/components/ui'

export interface ServiceHeroProps {
  label?: string                              // e.g. "Analityka zakupowa"
  headline: string
  subtitle: string
  ctaPrimary?: { label: string; href: string }
  ctaSecondary?: { label: string; href: string }
  image?: { src: string; alt: string }
  layout?: 'editorial' | 'split'            // editorial=text only, split=text+image
}

export function ServiceHero({
  label,
  headline,
  subtitle,
  ctaPrimary,
  ctaSecondary,
  image,
  layout = 'editorial',
}: ServiceHeroProps) {
  if (layout === 'split' && image) {
    return (
      <section className="py-24 lg:py-32 bg-white">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
            <div>
              <RevealWrapper delay={0}>
                {label && <p className="label-tag mb-5">{label}</p>}
                <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-gray-900 leading-[1.06] mb-6">
                  {headline}
                </h1>
              </RevealWrapper>
              <RevealWrapper delay={1}>
                <p className="text-lg text-gray-600 leading-relaxed mb-10 max-w-lg">
                  {subtitle}
                </p>
                <div className="flex flex-wrap items-center gap-4">
                  {ctaPrimary && (
                    <Link href={ctaPrimary.href} className="btn-primary">{ctaPrimary.label}</Link>
                  )}
                  {ctaSecondary && (
                    <Link href={ctaSecondary.href} className="btn-secondary">{ctaSecondary.label}</Link>
                  )}
                </div>
              </RevealWrapper>
            </div>
            <div>
              <RevealWrapper delay={2}>
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100">
                  <Image src={image.src} alt={image.alt} fill className="object-cover" sizes="50vw" />
                </div>
              </RevealWrapper>
            </div>
          </div>
        </div>
      </section>
    )
  }

  // Editorial layout (default)
  return (
    <section className="py-24 lg:py-32 bg-white">
      <div className="container mx-auto max-w-7xl px-6">
        <div className="max-w-2xl">
          <RevealWrapper delay={0}>
            {label && <p className="label-tag mb-5">{label}</p>}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-gray-900 leading-[1.06] mb-6">
              {headline}
            </h1>
          </RevealWrapper>
          <RevealWrapper delay={1}>
            <p className="text-lg text-gray-600 leading-relaxed mb-10 max-w-lg">
              {subtitle}
            </p>
            <div className="flex flex-wrap items-center gap-4">
              {ctaPrimary && (
                <Link href={ctaPrimary.href} className="btn-primary">{ctaPrimary.label}</Link>
              )}
              {ctaSecondary && (
                <Link href={ctaSecondary.href} className="btn-secondary">{ctaSecondary.label}</Link>
              )}
            </div>
          </RevealWrapper>
        </div>
      </div>
    </section>
  )
}
