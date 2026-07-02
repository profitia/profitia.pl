/**
 * FeatureEditorial
 * ─────────────────────────────────────────────────────────────────────────
 * Large typography moment. Minimal UI. Composition-driven.
 * The "strategic statement" section - one big idea, full width.
 *
 * USAGE: Between proof sections and CTA. "What this means."
 */

import { Button, LabelTag, RevealWrapper } from '@/components/ui'

export interface FeatureEditorialProps {
  label?: string
  headline: string            // Large, spans full width
  body?: string
  cta?: { label: string; href: string }
  background?: 'white' | 'gray-50'
  align?: 'left' | 'center'
}

export function FeatureEditorial({
  label,
  headline,
  body,
  cta,
  background = 'white',
  align = 'left',
}: FeatureEditorialProps) {
  const bgCls = background === 'white' ? 'bg-white' : 'bg-gray-50'
  const alignCls = align === 'center' ? 'text-center mx-auto' : ''
  const maxWCls = align === 'center' ? 'max-w-4xl mx-auto' : 'max-w-4xl'

  return (
    <section className={`py-28 ${bgCls} border-t border-gray-100`}>
      <div className="container mx-auto max-w-7xl px-6">
        <div className={maxWCls}>

          <RevealWrapper delay={0}>
            {label && (
              <LabelTag className={`mb-5 ${alignCls}`}>{label}</LabelTag>
            )}
            <h2 className={`text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-gray-900 leading-[1.06] ${alignCls}`}>
              {headline}
            </h2>
          </RevealWrapper>

          {(body || cta) && (
            <RevealWrapper delay={1}>
              {body && (
                <p className={`mt-8 text-lg text-gray-600 leading-relaxed max-w-2xl ${align === 'center' ? 'mx-auto' : ''}`}>
                  {body}
                </p>
              )}
              {cta && (
                <div className={`mt-10 ${align === 'center' ? 'flex justify-center' : ''}`}>
                  <Button href={cta.href}>
                    {cta.label}
                  </Button>
                </div>
              )}
            </RevealWrapper>
          )}

        </div>
      </div>
    </section>
  )
}
