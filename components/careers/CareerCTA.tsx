import Link from 'next/link'
import type { CareerLocale } from '@/lib/careers'

interface Props {
  locale: CareerLocale
  invitation: string
  label: string
  href: string
}

/**
 * CareerCTA
 * ─────────────────────────────────────────────────────────────
 * Quiet institutional invitation.
 * Used on both the listing page (contact link) and job detail pages.
 * No aggressive conversion. A considered, human close.
 */
export default function CareerCTA({ locale, invitation, label, href }: Props) {
  const contactHref = locale === 'en' ? '/en/contact' : '/contact'
  const contactLabel = locale === 'en' ? 'contact form' : 'formularz kontaktowy'
  const orText = locale === 'en' ? 'or send a message via' : 'lub wyślij wiadomość przez'

  return (
    <div className="border-t border-gray-100 pt-16 pb-16">
      <p className="text-[17px] text-gray-800 font-medium tracking-tight leading-snug mb-8 max-w-[36rem]">
        {invitation}
      </p>
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <Link
          href={href}
          className="inline-block bg-gray-900 text-white rounded-xl px-6 py-3.5 text-sm font-medium hover:bg-gray-700 transition-colors duration-200"
        >
          {label}
        </Link>
        <span className="text-sm text-gray-400">
          {orText}{' '}
          <Link
            href={contactHref}
            className="text-gray-600 underline underline-offset-4 decoration-gray-300 hover:text-gray-900 transition-colors duration-200"
          >
            {contactLabel}
          </Link>
        </span>
      </div>
    </div>
  )
}
