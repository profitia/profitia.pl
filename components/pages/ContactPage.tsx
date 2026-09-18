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
import { PublicJsonLd } from '@/components/seo/PublicJsonLd'
import type { Locale } from '@/lib/forms/types'
import Image from 'next/image'

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

const SEO = {
  pl: {
    title: 'Kontakt',
    description: 'Skontaktuj się z Profitia - doradztwo zakupowe, SpendGuru, szkolenia CIPS. Odpowiadamy w ciągu jednego dnia roboczego.',
  },
  en: {
    title: 'Contact',
    description: 'Contact Profitia - procurement advisory, SpendGuru, CIPS training. We respond within one business day.',
  },
} as const

export function ContactPage({ locale = 'pl' }: ContactPageProps) {
  const t = COPY[locale]
  const seo = SEO[locale]

  return (
    <div>
      <PublicJsonLd routeId="contact" locale={locale} title={seo.title} description={seo.description} />
      {/* ── HERO ──────────────────────────────────────────────────────── */}
      <div className="border-b border-gray-100">
        <div className="container-base grid gap-12 py-16 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:items-center lg:gap-20 lg:py-24">
          <div className="max-w-[40rem]">
            <p className="editorial-label text-gray-500 mb-7">
              {t.hero.eyebrow}
            </p>
            <h1 className="text-[2.5rem] md:text-[3.25rem] lg:text-[4rem] font-semibold tracking-tight text-gray-900 leading-[1.04] mb-6">
              {t.hero.h1}
            </h1>
            <p className="text-[1.125rem] text-gray-500 leading-[1.75]">
              {t.hero.subtitle}
            </p>
          </div>

          <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-100 shadow-sm">
            <Image
              src="/images/website/Profitia_39.jpg"
              alt={locale === 'pl' ? 'Rozmowa konsultacyjna z zespołem Profitia' : 'A consultation with the Profitia team'}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 54vw"
            />
          </div>
        </div>
      </div>

      {/* ── MAIN ──────────────────────────────────────────────────────── */}
      <div className="container-base py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-[5fr_7fr] gap-16 lg:gap-24">

          {/* ── LEFT: Contact info ─────────────────────────────────── */}
          <div className="lg:pt-1">
            <p className="editorial-label text-gray-400 mb-8">
              {t.info.eyebrow}
            </p>

            <div className="space-y-7">
              {/* Email */}
              <div>
                <p className="editorial-label text-gray-400 mb-1.5">
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
                <p className="editorial-label text-gray-400 mb-1.5">
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
                <p className="editorial-label text-gray-400 mb-1.5">
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
              <p className="editorial-label text-gray-400 mb-1.5">
                {t.info.responseLabel}
              </p>
              <p className="text-[15px] text-gray-600 leading-[1.7]">
                {t.info.responseText}
              </p>
            </div>
          </div>

          {/* ── RIGHT: ContactForm ─────────────────────────────────── */}
          <div>
            <p className="editorial-label text-gray-400 mb-8">
              {t.form.eyebrow}
            </p>
            <ContactForm locale={locale} />
          </div>

        </div>
      </div>
    </div>
  )
}
