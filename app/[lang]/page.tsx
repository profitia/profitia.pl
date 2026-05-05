import type { Metadata } from 'next'
import { getDictionary } from '@/lib/i18n'
import type { Locale } from '@/middleware'

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
      {/* Hero section — placeholder */}
      <section className="bg-brand-primary text-white py-24">
        <div className="container-base">
          <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6">
            {dict.home.hero.title}
          </h1>
          <p className="text-xl md:text-2xl text-blue-200 mb-10 max-w-2xl">
            {dict.home.hero.subtitle}
          </p>
          <a href={`/${lang}/contact`} className="btn-primary text-lg">
            {dict.home.hero.cta}
          </a>
        </div>
      </section>

      {/* Services preview — placeholder */}
      <section className="py-20 bg-white">
        <div className="container-base">
          <h2 className="text-3xl font-heading font-bold text-brand-primary mb-12 text-center">
            {dict.home.services.title}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {dict.home.services.items.map((item: { title: string; description: string }) => (
              <div key={item.title} className="p-6 border border-gray-200 rounded-xl hover:shadow-md transition-shadow">
                <h3 className="text-xl font-semibold text-brand-primary mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
