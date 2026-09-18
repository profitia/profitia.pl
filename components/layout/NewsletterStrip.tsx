'use client'

/**
 * NewsletterStrip - Institutional information strip above the main header.
 *
 * Canonical spec:
 *   - Static. No animation. No hide-on-scroll. No dynamic behavior.
 *   - deep navy strip, ~38px height.
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
    text: 'Zapisz się na ProfiNews - jedyny taki profesjonalny newsletter zakupowy',
    cta: 'Chcę otrzymywać ProfiNews',
  },
  en: {
    text: 'Subscribe to ProfiNews - a one-of-a-kind professional procurement newsletter',
    cta: 'Send me ProfiNews',
  },
} as const

export default function NewsletterStrip({ localeOverride }: { localeOverride?: 'pl' | 'en' } = {}) {
  const pathname = usePathname()
  const isEN = localeOverride ? localeOverride === 'en' : pathname.startsWith('/en')
  const t = COPY[isEN ? 'en' : 'pl']

  // Navigate to the footer newsletter section.
  // On pages where the section is suppressed, navigates to homepage newsletter.
  const newsletterHref = isEN ? '/en#footer-newsletter' : '/#footer-newsletter'

  return (
    <div
      className="flex min-h-[57px] flex-wrap items-center justify-center gap-x-6 gap-y-2 bg-gray-900 px-4 py-3 text-center"
    >
      <p className="min-w-0 text-[14px] leading-snug tracking-[0.01em] text-white sm:text-[16.5px]">
        {t.text}
      </p>
      <Link
        href={newsletterHref}
        className="shrink-0 text-[14px] font-semibold leading-snug text-white underline decoration-white/40 underline-offset-2 transition-colors duration-200 hover:text-brand-blue sm:text-[16.5px]"
      >
        {t.cta}
      </Link>
    </div>
  )
}
