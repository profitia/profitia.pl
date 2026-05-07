import Link from 'next/link'
import type { Locale } from '@/lib/capabilities'

interface Props {
  locale: Locale
  /** CTA label to display on the button */
  label: string
  /** CTA href */
  href: string
  /** Retained for backwards compatibility — not rendered visually */
  note?: string
}

const COPY = {
  pl: {
    invitation: 'Porozmawiajmy o tym, jak to wygląda w Państwa organizacji.',
    or: 'lub wyślij wiadomość przez',
    contactLink: 'formularz kontaktowy',
  },
  en: {
    invitation: "Let's talk about what this looks like in your organisation.",
    or: 'or send a message via',
    contactLink: 'contact form',
  },
}

const CONTACT_HREF: Record<Locale, string> = {
  pl: '/contact',
  en: '/en/contact',
}

/**
 * CapabilityCTA
 * ─────────────────────────────────────────────────────────────
 * Quiet institutional invitation — not a hero banner, not a conversion block.
 * Leads with a human statement, then a simple action.
 * Restrained close that fits both listing and detail pages.
 */
export default function CapabilityCTA({ locale, label, href }: Props) {
  const c = COPY[locale]

  return (
    <div className="border-t border-gray-100 pt-16 pb-16">
      <p className="text-[17px] text-gray-800 font-medium tracking-tight leading-snug mb-8 max-w-[34rem]">
        {c.invitation}
      </p>
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
