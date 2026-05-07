import type { Capability, Locale } from '@/lib/capabilities'
import { t } from '@/lib/capabilities'
import CapabilityMeta from './CapabilityMeta'
import Link from 'next/link'

const BREADCRUMB_COPY = {
  pl: { home: 'Strona główna', services: 'Usługi', education: 'Edukacja' },
  en: { home: 'Home', services: 'Services', education: 'Education' },
}

const ROOT_HREFS: Record<Locale, Record<'services' | 'education', string>> = {
  pl: { services: '/services', education: '/education' },
  en: { services: '/en/services', education: '/en/education' },
}

const HOME_HREFS: Record<Locale, string> = { pl: '/', en: '/en' }

interface Props {
  capability: Capability
  locale: Locale
  prefix: 'services' | 'education'
}

/**
 * CapabilityDetail
 * ─────────────────────────────────────────────────────────────
 * Hero block for a capability detail page.
 * Breadcrumb → eyebrow → large title → intro paragraph.
 *
 * Institutional paper aesthetic: generous whitespace, wide prose,
 * no decorative elements. The intro paragraph acts as a lede.
 */
export default function CapabilityDetail({ capability, locale, prefix }: Props) {
  const c = BREADCRUMB_COPY[locale]

  return (
    <section className="pt-20 pb-16 border-b border-gray-100">
      <div className="container-base">

        {/* Breadcrumb */}
        <nav
          className="flex items-center gap-2 text-xs text-gray-400 mb-12"
          aria-label={locale === 'en' ? 'Breadcrumb' : 'Ścieżka nawigacji'}
        >
          <Link href={HOME_HREFS[locale]} className="hover:text-gray-600 transition-colors duration-200">
            {c.home}
          </Link>
          <span aria-hidden="true">/</span>
          <Link href={ROOT_HREFS[locale][prefix]} className="hover:text-gray-600 transition-colors duration-200">
            {c[prefix]}
          </Link>
          <span aria-hidden="true">/</span>
          <span className="text-gray-600">{t(capability.title, locale)}</span>
        </nav>

        <CapabilityMeta capability={capability} locale={locale} />

        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-gray-900 leading-[1.08] mt-6 mb-8 max-w-[42rem]">
          {t(capability.title, locale)}
        </h1>

        {/* Lede paragraph - wider, slightly heavier than body */}
        <p className="text-[17px] text-gray-600 leading-relaxed max-w-[44rem]">
          {t(capability.longDescription, locale)}
        </p>

      </div>
    </section>
  )
}
