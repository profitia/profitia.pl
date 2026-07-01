/**
 * ContactPage - canonical institutional contact page.
 *
 * Server Component - renders static layout + ContactForm (client).
 * Locale-aware (PL/EN), bilingual from single component.
 *
 * Layout:
 *   Hero: eyebrow + h1 + subtitle (restrained, max-w-[40rem])
 *   Main: two-column grid
 *     Left  (5fr): contact info + response promise
 *     Right (7fr): ContactForm
 *
 * Used by:
 *   app/(public)/contact/page.tsx       → locale="pl"
 *   app/(public)/en/contact/page.tsx    → locale="en"
 */

import { ProtectedEmail, ProtectedPhone } from '@/components/security'
import { ContactForm } from '@/components/forms'
import type { Locale } from '@/lib/forms/types'

interface ContactPageProps {
  locale?: Locale
}

const COPY = {
  pl: {
    hero: {
      eyebrow: 'KONTAKT',
      h1: 'Porozmawiajmy.',
      subtitle: 'Zaczynamy od zrozumienia sytuacji, nie od oferty. Pierwsze spotkanie służy diagnozie wyzwań i możliwości poprawy wyników zakupowych.',
    },
    info: {
      eyebrow: 'DANE KONTAKTOWE',
      emailLabel: 'E-mail',
      phoneLabel: 'Telefon',
      addressLabel: 'Adres',
      addressLine1: 'Villa Metro, ul. Puławska 145, V p.',
      addressLine2: '02-715 Warszawa',
      responseLabel: 'Czas odpowiedzi',
      responseText: 'Odpowiadamy w ciągu jednego dnia roboczego.',
    },
    form: {
      eyebrow: 'WYŚLIJ ZAPYTANIE',
    },
  },
  en: {
    hero: {
      eyebrow: 'CONTACT',
      h1: "Let's talk.",
      subtitle: 'We start by understanding your situation, not with an offer. The first meeting is about diagnosing challenges and opportunities for improving procurement outcomes.',
    },
    info: {
      eyebrow: 'CONTACT DETAILS',
      emailLabel: 'E-mail',
      phoneLabel: 'Phone',
      addressLabel: 'Address',
      addressLine1: 'Villa Metro, ul. Puławska 145, 5th floor',
      addressLine2: '02-715 Warsaw, Poland',
      responseLabel: 'Response time',
      responseText: 'We respond within one business day.',
    },
    form: {
      eyebrow: 'SEND AN ENQUIRY',
    },
  },
} as const

export function ContactPage({ locale = 'pl' }: ContactPageProps) {
  const t = COPY[locale]

  return (
    <div>
      {/* ── HERO ──────────────────────────────────────────────────────── */}
      <div className="container-base pt-20 pb-16 lg:pt-36 lg:pb-20 border-b border-gray-100">
        <div className="max-w-[40rem]">
          <p className="text-[10px] font-semibold tracking-[0.28em] uppercase text-gray-500 mb-7">
            {t.hero.eyebrow}
          </p>
          <h1 className="text-[2.5rem] md:text-[3.25rem] lg:text-[4rem] font-semibold tracking-tight text-gray-900 leading-[1.04] mb-6">
            {t.hero.h1}
          </h1>
          <p className="text-[1.125rem] text-gray-500 leading-[1.75]">
            {t.hero.subtitle}
          </p>
        </div>
      </div>

      {/* ── MAIN ──────────────────────────────────────────────────────── */}
      <div className="container-base py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-[5fr_7fr] gap-16 lg:gap-24">

          {/* ── LEFT: Contact info ─────────────────────────────────── */}
          <div className="lg:pt-1">
            <p className="text-[10px] font-semibold tracking-[0.28em] uppercase text-gray-400 mb-8">
              {t.info.eyebrow}
            </p>

            <div className="space-y-7">
              {/* Email */}
              <div>
                <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-gray-400 mb-1.5">
                  {t.info.emailLabel}
                </p>
                <ProtectedEmail
                  user="kontakt"
                  domain="profitia.pl"
                  className="text-[15px] text-gray-700 hover:text-brand-blue transition-colors duration-200"
                />
              </div>

              {/* Phone */}
              <div>
                <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-gray-400 mb-1.5">
                  {t.info.phoneLabel}
                </p>
                <ProtectedPhone
                  parts={['+48', '787', '417', '293']}
                  display="+48 787 417 293"
                  className="text-[15px] text-gray-700 hover:text-brand-blue transition-colors duration-200"
                />
              </div>

              {/* Address */}
              <div>
                <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-gray-400 mb-1.5">
                  {t.info.addressLabel}
                </p>
                <p className="text-[15px] text-gray-700 leading-[1.7]">
                  {t.info.addressLine1}
                  <br />
                  {t.info.addressLine2}
                </p>
              </div>
            </div>

            {/* Response time promise */}
            <div className="mt-10 pt-8 border-t border-gray-100">
              <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-gray-400 mb-1.5">
                {t.info.responseLabel}
              </p>
              <p className="text-[15px] text-gray-600 leading-[1.7]">
                {t.info.responseText}
              </p>
            </div>
          </div>

          {/* ── RIGHT: ContactForm ─────────────────────────────────── */}
          <div>
            <p className="text-[10px] font-semibold tracking-[0.28em] uppercase text-gray-400 mb-8">
              {t.form.eyebrow}
            </p>
            <ContactForm locale={locale} />
          </div>

        </div>
      </div>
    </div>
  )
}
