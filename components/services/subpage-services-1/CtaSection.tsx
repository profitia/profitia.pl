import Link from 'next/link'
import RevealWrapper from './RevealWrapper'

interface Props {
  headline: string
  subtitle: string
  ctaPrimary: { label: string; href: string }
  ctaSecondary?: { label: string; href: string }
  note?: string
}

export default function CtaSection({ headline, subtitle, ctaPrimary, ctaSecondary, note }: Props) {
  return (
    <section className="py-24 lg:py-32 bg-black text-white">
      <div className="container-base text-center">
        <RevealWrapper>
          <p className="text-xs font-semibold tracking-[0.25em] uppercase text-gray-600 mb-7">
            Następny krok
          </p>
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight mb-7 max-w-2xl mx-auto leading-tight">
            {headline}
          </h2>
          <p className={`text-gray-400 text-lg max-w-lg mx-auto leading-relaxed ${note ? 'mb-4' : 'mb-12'}`}>
            {subtitle}
          </p>
          {note && (
            <p className="text-gray-600 text-sm mb-12">{note}</p>
          )}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href={ctaPrimary.href}
              className="inline-block bg-white text-black rounded-xl px-8 py-4 font-medium text-base hover:bg-gray-100 transition-colors duration-200"
            >
              {ctaPrimary.label}
            </Link>
            {ctaSecondary && (
              <Link
                href={ctaSecondary.href}
                className="inline-block border border-gray-700 text-gray-300 rounded-xl px-8 py-4 font-medium text-base hover:border-gray-400 hover:text-white transition-colors duration-200"
              >
                {ctaSecondary.label}
              </Link>
            )}
          </div>
        </RevealWrapper>
      </div>
    </section>
  )
}
