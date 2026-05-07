import Link from 'next/link'
import type { Locale } from '@/lib/capabilities'

interface Props {
  locale: Locale
  /** CTA label to display */
  label: string
  /** CTA href */
  href: string
  /** Optional context note above the label */
  note?: string
}

const COPY = {
  pl: { or: 'lub wyślij wiadomość przez', contactLink: 'formularz kontaktowy' },
  en: { or: 'or send a message via', contactLink: 'contact form' },
}

const CONTACT_HREF: Record<Locale, string> = {
  pl: '/contact',
  en: '/en/contact',
}

/**
 * CapabilityCTA
 * ─────────────────────────────────────────────────────────────
 * Quiet, understated CTA block. Not a hero, not a banner.
 * Restrained institutional close.
 */
export default function CapabilityCTA({ locale, label, href, note }: Props) {
  const c = COPY[locale]

  return (
    <div className="border-t border-gray-100 pt-14 pb-14">
      {note && (
        <p className="text-[10px] font-semibold tracking-[0.25em] uppercase text-gray-400 mb-6">
          {note}
        </p>
      )}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <Link
          href={href}
          className="inline-block bg-gray-900 text-white rounded-xl px-6 py-3.5 text-sm font-medium hover:bg-gray-700 transition-colors duration-200"
        >
          {label}
        </Link>
        <span className="text-sm text-gray-400">
          {c.or}{' '}
          <Link
            href={CONTACT_HREF[locale]}
            className="text-gray-600 underline underline-offset-4 decoration-gray-300 hover:text-gray-900 transition-colors duration-200"
          >
            {c.contactLink}
          </Link>
        </span>
      </div>
    </div>
  )
}
