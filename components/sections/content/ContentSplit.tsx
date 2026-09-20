/**
 * ContentSplit
 * ─────────────────────────────────────────────────────────────────────────
 * Text + image split for content pages. Asymmetric, editorial.
 *
 * USAGE: Case study details, about sections, product explanation.
 */

import Image from 'next/image'
import type { ReactNode } from 'react'
import { Button, RevealWrapper, SectionHeader } from '@/components/ui'

export interface ContentSplitProps {
  label?: string
  headline: string
  body: ReactNode
  cta?: { label: string; href: string; target?: '_blank' }
  image: { src: string; alt: string }
  imagePosition?: 'right' | 'left'
  background?: 'white' | 'gray-50'
  imageLayout?: 'card' | 'stretch'
}

export function ContentSplit({
  label,
  headline,
  body,
  cta,
  image,
  imagePosition = 'right',
  background = 'white',
  imageLayout = 'card',
}: ContentSplitProps) {
  const bgCls = background === 'white' ? 'bg-white' : 'bg-gray-50'
  const contentOrder = imagePosition === 'left' ? 'lg:order-2' : 'lg:order-1'
  const imageOrder = imagePosition === 'left' ? 'lg:order-1' : 'lg:order-2'
  const isStretchImage = imageLayout === 'stretch'

  return (
    <section className={`py-28 ${bgCls} border-t border-gray-100`}>
      <div className="container mx-auto max-w-7xl px-6">
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 ${isStretchImage ? 'lg:items-stretch' : 'items-center'}`}>

          <div className={contentOrder}>
            <RevealWrapper delay={0}>
              <SectionHeader
                label={label}
                headline={headline}
                align="left"
              />
              {typeof body === 'string' ? (
                <p className="text-gray-600 leading-relaxed">{body}</p>
              ) : body}
            </RevealWrapper>
            {cta && (
              <RevealWrapper delay={1}>
                <div className="mt-10">
                  <Button
                    href={cta.href}
                    variant="secondary"
                    target={cta.target}
                    rel={cta.target === '_blank' ? 'noopener noreferrer' : undefined}
                  >
                    {cta.label}
                  </Button>
                </div>
              </RevealWrapper>
            )}
          </div>

          <div className={`${imageOrder} ${isStretchImage ? 'lg:self-stretch' : ''}`}>
            <RevealWrapper delay={1} className={isStretchImage ? 'h-full' : undefined}>
              <div className={`relative aspect-[4/3] overflow-hidden bg-gray-100 ${isStretchImage ? 'lg:aspect-auto lg:h-full lg:min-h-full' : 'rounded-2xl'}`}>
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
