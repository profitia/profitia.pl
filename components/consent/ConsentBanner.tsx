'use client'

/**
 * ConsentBanner — Initial Consent Panel
 *
 * Appears on first visit (no stored consent) as a fixed bottom panel.
 * Canonical Profitia aesthetic: calm, restrained, editorial, institutional.
 * No dark patterns — all three actions are equally visible.
 *
 * Entrance: subtle slide-up with opacity fade.
 * Respects prefers-reduced-motion — no animation when true.
 *
 * Desktop: two-column layout (text / actions).
 * Mobile: stacked, safe-area aware.
 */

import { useEffect, useState } from 'react'
import { useConsent } from './ConsentProvider'

const COPY = {
  pl: {
    eyebrow: 'Prywatność',
    heading: 'Używamy plików cookie.',
    body: 'Niektóre z nich są niezbędne do działania serwisu. Pozostałe — analityczne i marketingowe — aktywujemy tylko za Twoją zgodą.',
    acceptAll: 'Zaakceptuj wszystkie',
    customize: 'Dostosuj ustawienia',
    rejectAll: 'Odrzuć niezbędne',
    privacyLink: 'Polityka prywatności',
  },
  en: {
    eyebrow: 'Privacy',
    heading: 'We use cookies.',
    body: 'Some are essential for the site to work. Others — analytics and marketing — are only activated with your consent.',
    acceptAll: 'Accept all',
    customize: 'Customise settings',
    rejectAll: 'Reject non-essential',
    privacyLink: 'Privacy policy',
  },
}

interface ConsentBannerProps {
  locale?: string
}

export function ConsentBanner({ locale = 'pl' }: ConsentBannerProps) {
  const { acceptAll, rejectAll, openModal } = useConsent()
  const [visible, setVisible] = useState(false)

  // Trigger entrance animation after mount
  useEffect(() => {
    const id = requestAnimationFrame(() => setVisible(true))
    return () => cancelAnimationFrame(id)
  }, [])

  const t = locale === 'en' ? COPY.en : COPY.pl
  const prefix = locale === 'en' ? '/en' : ''

  return (
    <div
      role="region"
      aria-label={t.eyebrow}
      aria-live="polite"
      className={[
        // Position + stacking
        'fixed bottom-0 left-0 right-0 z-[60]',
        // Background + border
        'bg-white border-t border-gray-100',
        // Shadow — mirrors footer feeling
        'shadow-[0_-1px_24px_0_rgba(0,0,0,0.05)]',
        // Safe area — iOS home indicator
        'pb-[env(safe-area-inset-bottom)]',
        // Entrance animation
        'transition-[transform,opacity] duration-300 ease-out',
        'motion-reduce:transition-none motion-reduce:translate-y-0 motion-reduce:opacity-100',
        visible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0',
      ].join(' ')}
    >
      <div className="container-base py-5 sm:py-6">
        <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-5 sm:gap-10 sm:items-center">

          {/* ── Text ──────────────────────────────────────── */}
          <div>
            <p className="text-[10px] font-semibold tracking-[0.22em] uppercase text-gray-400 mb-2">
              {t.eyebrow}
            </p>
            <p className="text-sm font-medium text-gray-900 mb-1">{t.heading}</p>
            <p className="text-sm text-gray-500 leading-[1.65] max-w-[52ch]">
              {t.body}{' '}
              <a
                href={`${prefix}/privacy`}
                className="underline text-gray-500 hover:text-gray-900 transition-colors duration-200 ease-out whitespace-nowrap"
              >
                {t.privacyLink} ↗
              </a>
            </p>
          </div>

          {/* ── Actions ───────────────────────────────────── */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-2.5 sm:gap-3">
            {/* Primary: Accept all */}
            <button
              onClick={acceptAll}
              className="px-5 py-3 text-sm font-medium text-white bg-[#1C1C1E] hover:bg-[#2D2D30] rounded-lg transition-colors duration-200 ease-out whitespace-nowrap"
            >
              {t.acceptAll}
            </button>

            {/* Secondary: Customize */}
            <button
              onClick={openModal}
              className="px-5 py-3 text-sm font-medium text-gray-700 bg-white border border-gray-200 hover:border-gray-400 rounded-lg transition-colors duration-200 ease-out whitespace-nowrap"
            >
              {t.customize}
            </button>

            {/* Tertiary: Reject */}
            <button
              onClick={rejectAll}
              className="px-3 py-3 text-sm text-gray-400 hover:text-gray-700 transition-colors duration-200 ease-out whitespace-nowrap sm:pl-1"
            >
              {t.rejectAll}
            </button>
          </div>

        </div>
      </div>
    </div>
  )
}
