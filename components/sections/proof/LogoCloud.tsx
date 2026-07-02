/**
 * LogoCloud
 * ─────────────────────────────────────────────────────────────────────────
 * Minimalist logo grid. Grayscale. Clean social proof.
 *
 * USAGE: "Trusted by" proof. Subheader of homepage or service pages.
 */

import Image from 'next/image'
import { LabelTag, RevealWrapper } from '@/components/ui'

export interface LogoItem {
  src: string
  alt: string
  width?: number
  height?: number
}

export interface LogoCloudProps {
  label?: string
  logos: LogoItem[]
  background?: 'white' | 'gray-50'
}

export function LogoCloud({
  label,
  logos,
  background = 'gray-50',
}: LogoCloudProps) {
  const bgCls = background === 'white' ? 'bg-white' : 'bg-gray-50'

  return (
    <section className={`py-16 ${bgCls} border-t border-gray-100`}>
      <div className="container mx-auto max-w-7xl px-6">
        {label && (
          <RevealWrapper delay={0}>
            <LabelTag className="mb-10 text-center">{label}</LabelTag>
          </RevealWrapper>
        )}
        <RevealWrapper delay={1}>
          <div className="flex flex-wrap items-center justify-center gap-10 lg:gap-16">
            {logos.map((logo) => (
              <div
                key={logo.alt}
                className="relative opacity-40 hover:opacity-70 transition-opacity duration-300 grayscale"
              >
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={logo.width ?? 120}
                  height={logo.height ?? 32}
                  className="object-contain"
                />
              </div>
            ))}
          </div>
        </RevealWrapper>
      </div>
    </section>
  )
}
