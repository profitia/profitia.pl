/**
 * ServiceCTA
 * ─────────────────────────────────────────────────────────────────────────
 * Service-specific CTA. Wraps CTASection (bg-black canonical).
 *
 * COMPOSITION: CTASection from ui/. Always the last section on a service page.
 */

import { CTASection } from '@/components/ui'

export interface ServiceCTAProps {
  headline?: string
  body?: string
  ctaPrimary?: { label: string; href: string }
  ctaSecondary?: { label: string; href: string }
}

export function ServiceCTA({
  headline = 'Gotowy na lepsze negocjacje?',
  body,
  ctaPrimary = { label: 'Umów demo', href: '/contact' },
  ctaSecondary,
}: ServiceCTAProps) {
  return (
    <CTASection
      headline={headline}
      subtitle={body}
      ctaPrimary={ctaPrimary}
      ctaSecondary={ctaSecondary}
    />
  )
}
