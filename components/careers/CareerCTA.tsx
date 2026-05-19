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
 * Dark closing section — strong but restrained invitation.
 * Consistent with the dark hero. Frames the career section as a complete editorial unit.
 * Not an aggressive conversion panel. A considered, strategic close.
 */
export default function CareerCTA({ locale, invitation, label, href }: Props) {
  const contactHref = locale === 'en' ? '/en/contact' : '/contact'
  const contactLabel = locale === 'en' ? 'Send a message' : 'Napisz do nas'
  const orText = locale === 'en' ? 'or' : 'lub'

  return (
    <section className="bg-gray-950">
      <div className="container-base py-28 lg:py-36">
        <div className="max-w-[44rem]">
          <p className="text-[11px] font-medium tracking-[0.3em] uppercase text-white/28 mb-8">
            {locale === 'en' ? 'Next step' : 'Następny krok'}
          </p>
          <p className="text-3xl md:text-[2.2rem] font-semibold tracking-tight text-white leading-[1.1] mb-12">
            {invitation}
          </p>
          <div className="flex flex-col sm:flex-row gap-5 sm:gap-8 sm:items-center">
            <Link
              href={href}
              className="inline-block bg-white text-gray-900 text-sm font-medium px-7 py-3.5 hover:bg-gray-100 transition-colors duration-200"
            >
              {label} →
            </Link>
            <span className="text-sm text-white/30">
              {orText}{' '}
              <Link
                href={contactHref}
                className="text-white/50 underline underline-offset-4 decoration-white/20 hover:text-white/80 transition-colors duration-200"
              >
                {contactLabel}
              </Link>
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
