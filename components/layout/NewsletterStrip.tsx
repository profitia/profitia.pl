'use client'

/**
 * NewsletterStrip - Institutional information strip above the main header.
 *
 * Canonical spec:
 *   - Static. No animation. No hide-on-scroll. No dynamic behavior.
 *   - bg-gray-950, ~38px height.
 *   - Small, quiet typography. No gradients, icons, emojis, counters.
 *   - CTA navigates to the footer newsletter section (existing form, no duplication).
 *
 * Feel reference: Financial Times / think tank publication strip.
 * NOT: growth hacking announcement bar, promo strip, startup launch banner.
 */

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const COPY = {
  pl: {
    text: 'ProfiNews - miesięczny briefing zakupowy Profitii.',
    cta: 'Zapisz się',
  },
  en: {
    text: 'ProfiNews - Profitia monthly procurement briefing.',
    cta: 'Subscribe',
  },
} as const

export default function NewsletterStrip() {
  const pathname = usePathname()
  const isEN = pathname.startsWith('/en')
  const t = COPY[isEN ? 'en' : 'pl']

  // Navigate to the footer newsletter section.
  // On pages where the section is suppressed, navigates to homepage newsletter.
  const newsletterHref = isEN ? '/en#footer-newsletter' : '/#footer-newsletter'

  return (
    <div
      className="flex items-center justify-center gap-5 px-4 bg-gray-950"
      style={{ height: '38px' }}
    >
      <p className="text-[11px] text-gray-500 leading-none tracking-[0.01em] truncate min-w-0">
        {t.text}
      </p>
      <Link
        href={newsletterHref}
        className="text-[11px] text-gray-400 hover:text-gray-200 transition-colors duration-200 shrink-0 underline underline-offset-2 decoration-gray-700 leading-none"
      >
        {t.cta}
      </Link>
    </div>
  )
}
