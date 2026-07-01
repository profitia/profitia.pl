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
    <section className="py-24 lg:py-32 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <div className="container-base text-center">
        <RevealWrapper>
          <p className="text-xs font-semibold tracking-[0.25em] uppercase text-white/56 mb-7">
            Następny krok
          </p>
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight mb-7 max-w-2xl mx-auto leading-tight">
            {headline}
          </h2>
          <p className={`text-white/72 text-lg max-w-lg mx-auto leading-relaxed ${note ? 'mb-4' : 'mb-12'}`}>
            {subtitle}
          </p>
          {note && (
            <p className="text-white/58 text-sm mb-12">{note}</p>
          )}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href={ctaPrimary.href}
              className="inline-block bg-white text-gray-900 rounded-xl px-8 py-4 font-medium text-base hover:bg-[rgba(255,255,255,0.92)] transition-colors duration-200"
            >
              {ctaPrimary.label}
            </Link>
            {ctaSecondary && (
              <Link
                href={ctaSecondary.href}
                className="inline-block border border-white/30 text-white/78 rounded-xl px-8 py-4 font-medium text-base hover:border-brand-blue hover:text-white hover:bg-[rgba(0,109,158,0.08)] transition-colors duration-200"
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
