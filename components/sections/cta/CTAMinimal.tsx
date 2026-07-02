/**
 * CTAMinimal
 * ─────────────────────────────────────────────────────────────────────────
 * Light inline CTA. Single line, left-aligned. Used inside content flow.
 *
 * USAGE: After feature sections. Mid-page lightweight conversion nudge.
 */

import { Button, RevealWrapper } from '@/components/ui'

export interface CTAMinimalProps {
  headline: string
  cta: { label: string; href: string }
  note?: string
  background?: 'white' | 'gray-50'
}

export function CTAMinimal({
  headline,
  cta,
  note,
  background = 'gray-50',
}: CTAMinimalProps) {
  const bgCls = background === 'white' ? 'bg-white' : 'bg-gray-50'

  return (
    <section className={`py-20 ${bgCls} border-t border-gray-100`}>
      <div className="container mx-auto max-w-7xl px-6">
        <RevealWrapper delay={0}>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
            <div>
              <p className="text-xl md:text-2xl font-semibold text-gray-900 leading-snug tracking-tight max-w-xl">
                {headline}
              </p>
              {note && (
                <p className="mt-2 text-sm text-gray-400">{note}</p>
              )}
            </div>
            <div className="flex-shrink-0">
              <Button href={cta.href}>
                {cta.label}
              </Button>
            </div>
          </div>
        </RevealWrapper>
      </div>
    </section>
  )
}
