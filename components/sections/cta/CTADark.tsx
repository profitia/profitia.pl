/**
 * CTADark
 * ─────────────────────────────────────────────────────────────────────────
 * Canonical dark CTA. Re-exports CTASection from components/ui.
 * bg-black, white logo, primary-dark button.
 *
 * USAGE: End of every page. One per page maximum.
 */

import { CTASection } from '@/components/ui'

export interface CTADarkProps {
  headline?: string
  subtitle?: string
  ctaPrimary?: { label: string; href: string }
  ctaSecondary?: { label: string; href: string }
}

export function CTADark({
  headline = 'Gotowy na kolejny krok?',
  subtitle,
  ctaPrimary = { label: 'Umów rozmowę', href: '/contact' },
  ctaSecondary,
}: CTADarkProps) {
  return (
    <CTASection
      headline={headline}
      subtitle={subtitle}
      ctaPrimary={ctaPrimary}
      ctaSecondary={ctaSecondary}
    />
  )
}
