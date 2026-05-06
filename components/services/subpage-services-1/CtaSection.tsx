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
    <section className="bg-brand-primary text-white py-24">
      <div className="container-base text-center">
        <RevealWrapper>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold leading-tight tracking-tight mb-6 max-w-2xl mx-auto">
            {headline}
          </h2>
          <p className="text-blue-200 text-lg leading-relaxed mb-10 max-w-lg mx-auto">
            {subtitle}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href={ctaPrimary.href}
              className="inline-flex items-center justify-center px-7 py-3.5 bg-white text-brand-primary font-medium rounded-lg hover:bg-brand-light transition-colors duration-200"
            >
              {ctaPrimary.label}
            </Link>
            {ctaSecondary && (
              <Link
                href={ctaSecondary.href}
                className="inline-flex items-center justify-center px-7 py-3.5 border-2 border-blue-400 text-blue-200 font-medium rounded-lg hover:border-white hover:text-white transition-colors duration-200"
              >
                {ctaSecondary.label}
              </Link>
            )}
          </div>
          {note && (
            <p className="text-blue-400 text-sm mt-8">{note}</p>
          )}
        </RevealWrapper>
      </div>
    </section>
  )
}
