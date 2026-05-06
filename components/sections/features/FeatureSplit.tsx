/**
 * FeatureSplit
 * ─────────────────────────────────────────────────────────────────────────
 * Asymmetric content + image split section.
 * Editorial spacing, cinematic proportions.
 *
 * USAGE: For "how it works", product details, key feature callouts.
 */

import Image from 'next/image'
import Link from 'next/link'
import { RevealWrapper, SectionHeader } from '@/components/ui'

export interface FeatureSplitProps {
  label?: string
  headline: string
  body: string
  bullets?: string[]
  cta?: { label: string; href: string }
  image: { src: string; alt: string }
  imagePosition?: 'right' | 'left'
  background?: 'white' | 'gray-50'
}

export function FeatureSplit({
  label,
  headline,
  body,
  bullets,
  cta,
  image,
  imagePosition = 'right',
  background = 'white',
}: FeatureSplitProps) {
  const bgCls = background === 'white' ? 'bg-white' : 'bg-gray-50'
  const contentOrder = imagePosition === 'left' ? 'lg:order-2' : 'lg:order-1'
  const imageOrder = imagePosition === 'left' ? 'lg:order-1' : 'lg:order-2'

  return (
    <section className={`py-28 ${bgCls} border-t border-gray-100`}>
      <div className="container mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Content */}
          <div className={contentOrder}>
            <RevealWrapper delay={0}>
              <SectionHeader
                label={label}
                headline={headline}
                body={body}
                align="left"
              />
            </RevealWrapper>

            {bullets && bullets.length > 0 && (
              <RevealWrapper delay={1}>
                <ul className="mt-8 space-y-4">
                  {bullets.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="mt-1 w-5 h-5 rounded-full bg-gray-900 text-white flex items-center justify-center flex-shrink-0">
                        <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                          <path d="M1 4l2.5 2.5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </span>
                      <span className="text-gray-600 leading-relaxed text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </RevealWrapper>
            )}

            {cta && (
              <RevealWrapper delay={2}>
                <div className="mt-10">
                  <Link href={cta.href} className="btn-primary">
                    {cta.label}
                  </Link>
                </div>
              </RevealWrapper>
            )}
          </div>

          {/* Image */}
          <div className={imageOrder}>
            <RevealWrapper delay={1}>
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </RevealWrapper>
          </div>

        </div>
      </div>
    </section>
  )
}
