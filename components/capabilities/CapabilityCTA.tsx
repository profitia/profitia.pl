import Link from 'next/link'
import type { Locale } from '@/lib/capabilities'

interface Props {
  locale: Locale
  /** CTA label to display on the button */
  label: string
  /** CTA href */
  href: string
  /** Optional custom invitation copy shown above the actions */
  invitation?: string
  /** Retained for backwards compatibility - not rendered visually */
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
 * Quiet institutional invitation - not a hero banner, not a conversion block.
 * Leads with a human statement, then a simple action.
 * Restrained close that fits both listing and detail pages.
 */
export default function CapabilityCTA({ locale, label, href, invitation }: Props) {
  const c = COPY[locale]

  return (
    <div className="border-t border-[rgba(149,166,199,0.35)] pt-16 pb-16">
      <p className="text-[17px] text-[rgb(59,56,56)] font-medium tracking-tight leading-snug mb-8 max-w-[34rem]">
        {invitation ?? c.invitation}
      </p>
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <Link
          href={href}
          className="inline-block bg-[rgb(36,47,68)] text-white rounded-xl px-6 py-3.5 text-sm font-medium hover:bg-[rgb(72,94,136)] transition-colors duration-[250ms]"
        >
          {label}
        </Link>
        <span className="text-sm text-[rgb(59,56,56)]">
          {c.or}{' '}
          <Link
            href={CONTACT_HREF[locale]}
            className="text-[rgb(72,94,136)] underline underline-offset-4 decoration-[rgba(149,166,199,0.45)] hover:text-[rgb(0,109,158)] transition-colors duration-200"
          >
            {c.contactLink}
          </Link>
        </span>
      </div>
    </div>
  )
}
