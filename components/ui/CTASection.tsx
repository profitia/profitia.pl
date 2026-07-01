import Button from './Button'
import RevealWrapper from './RevealWrapper'

interface Props {
  label?: string
  headline: string
  subtitle?: string
  note?: string
  ctaPrimary: { label: string; href: string }
  ctaSecondary?: { label: string; href: string }
}

/**
 * Global CTA section - pixel-perfect match of public/landing/components/cta.html.
 * Always deep navy. Use at the bottom of every public-facing page.
 *
 * label     - small caps above headline (optional, defaults to "Następny krok")
 * headline  - main CTA headline (max-w-2xl)
 * subtitle  - white/72 supporting text (max-w-lg)
 * note      - white/58 fine print below subtitle (optional)
 */
export default function CTASection({
  label = 'Następny krok',
  headline,
  subtitle,
  note,
  ctaPrimary,
  ctaSecondary,
}: Props) {
  return (
    <section className="py-24 lg:py-32 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <div className="container-base text-center">
        <RevealWrapper>
          <p className="text-xs font-semibold tracking-[0.25em] uppercase text-white/56 mb-7">
            {label}
          </p>
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight mb-7 max-w-2xl mx-auto leading-tight">
            {headline}
          </h2>
          {subtitle && (
            <p
                className={`text-white/72 text-lg max-w-lg mx-auto leading-relaxed ${
                note ? 'mb-4' : 'mb-12'
              }`}
            >
              {subtitle}
            </p>
          )}
          {note && (
            <p className="text-white/58 text-sm mb-12">{note}</p>
          )}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button href={ctaPrimary.href} variant="primary-dark" size="lg">
              {ctaPrimary.label}
            </Button>
            {ctaSecondary && (
              <Button href={ctaSecondary.href} variant="secondary-dark" size="lg">
                {ctaSecondary.label}
              </Button>
            )}
          </div>
        </RevealWrapper>
      </div>
    </section>
  )
}
