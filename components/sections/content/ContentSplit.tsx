/**
 * ContentSplit
 * ─────────────────────────────────────────────────────────────────────────
 * Text + image split for content pages. Asymmetric, editorial.
 *
 * USAGE: Case study details, about sections, product explanation.
 */

import Image from 'next/image'
import Link from 'next/link'
import { RevealWrapper, SectionHeader } from '@/components/ui'

export interface ContentSplitProps {
  label?: string
  headline: string
  body: string
  cta?: { label: string; href: string }
  image: { src: string; alt: string }
  imagePosition?: 'right' | 'left'
  background?: 'white' | 'gray-50'
}

export function ContentSplit({
  label,
  headline,
  body,
  cta,
  image,
  imagePosition = 'right',
  background = 'white',
}: ContentSplitProps) {
  const bgCls = background === 'white' ? 'bg-white' : 'bg-gray-50'
  const contentOrder = imagePosition === 'left' ? 'lg:order-2' : 'lg:order-1'
  const imageOrder = imagePosition === 'left' ? 'lg:order-1' : 'lg:order-2'

  return (
    <section className={`py-28 ${bgCls} border-t border-gray-100`}>
      <div className="container mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          <div className={contentOrder}>
            <RevealWrapper delay={0}>
              <SectionHeader
                label={label}
                headline={headline}
                body={body}
                align="left"
              />
            </RevealWrapper>
            {cta && (
              <RevealWrapper delay={1}>
                <div className="mt-10">
                  <Link href={cta.href} className="btn-secondary">
                    {cta.label}
                  </Link>
                </div>
              </RevealWrapper>
            )}
          </div>

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
