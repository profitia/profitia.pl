import type { Metadata } from 'next'
import { getDictionary } from '@/lib/i18n'
import type { Locale } from '@/middleware'
import { PremiumCard, CTASection } from '@/components/ui'

type Props = {
  params: Promise<{ lang: Locale }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params
  const dict = await getDictionary(lang)
  return { title: dict.home.hero.title }
}

export default async function HomePage({ params }: Props) {
  const { lang } = await params
  const dict = await getDictionary(lang)

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="container-base">
          <p className="text-xs font-medium tracking-[0.25em] uppercase text-gray-400 mb-6">
            Negotiation Intelligence
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-gray-900 leading-[1.08] mb-8 max-w-2xl">
            {dict.home.hero.title}
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed mb-10 max-w-lg">
            {dict.home.hero.subtitle}
          </p>
          <div className="flex flex-wrap gap-3">
            <a href={`/${lang}/contact`} className="btn-primary">
              {dict.home.hero.cta}
            </a>
            <a href={`/${lang}/services`} className="btn-secondary">
              Nasze usługi
            </a>
          </div>
        </div>
      </section>

      {/* ── Services grid ────────────────────────────────────────────────── */}
      <section className="py-28 bg-gray-50 border-t border-gray-100">
        <div className="container-base">
          <p className="text-xs font-medium tracking-[0.25em] uppercase text-gray-400 mb-5">
            Co robimy
          </p>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-gray-900 leading-tight mb-16 max-w-xl">
            {dict.home.services.title}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {dict.home.services.items.map(
              (item: { title: string; description: string }, i: number) => (
                <PremiumCard
                  key={item.title}
                  title={item.title}
                  description={item.description}
                  href={`/${lang}/services`}
                  delay={Math.min(i + 1, 4) as 1 | 2 | 3 | 4}
                />
              )
            )}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <CTASection
        headline={dict.home.hero.title}
        subtitle={dict.home.hero.subtitle}
        ctaPrimary={{ label: dict.home.hero.cta, href: `/${lang}/contact` }}
        ctaSecondary={{ label: 'Nasze usługi', href: `/${lang}/services` }}
      />
    </>
  )
}
