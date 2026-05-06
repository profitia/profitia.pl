/**
 * HeroSplit
 * ─────────────────────────────────────────────────────────────────────────
 * Split hero: content left, image right.
 * Cinematic proportions. Premium whitespace.
 *
 * COMPOSITION:
 *   - Left: label + H1 + subtitle + CTA
 *   - Right: image with optional overlay caption
 *   - imagePosition: 'right' (default) | 'left' (flipped)
 *
 * VISUAL RHYTHM:
 *   bg-white → gray-50 or gray-900
 */

import Image from 'next/image'
import Link from 'next/link'
import { RevealWrapper } from '@/components/ui'

export interface HeroSplitProps {
  label?: string
  headline: string
  subtitle?: string
  ctaPrimary: { label: string; href: string }
  ctaSecondary?: { label: string; href: string }
  image: { src: string; alt: string }
  imageCaption?: string
  imagePosition?: 'right' | 'left'
  background?: 'white' | 'gray-50'
}

export function HeroSplit({
  label,
  headline,
  subtitle,
  ctaPrimary,
  ctaSecondary,
  image,
  imageCaption,
  imagePosition = 'right',
  background = 'white',
}: HeroSplitProps) {
  const bgCls = background === 'white' ? 'bg-white' : 'bg-gray-50'
  const contentOrder = imagePosition === 'left' ? 'lg:order-2' : 'lg:order-1'
  const imageOrder = imagePosition === 'left' ? 'lg:order-1' : 'lg:order-2'

  return (
    <section className={`py-24 lg:py-32 ${bgCls}`}>
      <div className="container mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">

          {/* Content */}
          <div className={contentOrder}>
            <RevealWrapper delay={0}>
              {label && <p className="label-tag mb-5">{label}</p>}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-gray-900 leading-[1.06] mb-6">
                {headline}
              </h1>
            </RevealWrapper>
            <RevealWrapper delay={1}>
              {subtitle && (
                <p className="text-lg text-gray-600 leading-relaxed mb-10 max-w-lg">
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
            </RevealWrapper>
          </div>

          {/* Image */}
          <div className={`${imageOrder} relative`}>
            <RevealWrapper delay={2}>
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              {imageCaption && (
                <p className="mt-4 text-xs text-gray-400 tracking-wide">
                  {imageCaption}
                </p>
              )}
            </RevealWrapper>
          </div>

        </div>
      </div>
    </section>
  )
}
