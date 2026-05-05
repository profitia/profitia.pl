import type { Metadata } from 'next'
import { getDictionary } from '@/lib/i18n'
import type { Locale } from '@/middleware'

type Props = { params: Promise<{ lang: Locale }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params
  const dict = await getDictionary(lang)
  return { title: dict.nav.about }
}

export default async function AboutPage({ params }: Props) {
  const { lang } = await params
  const dict = await getDictionary(lang)

  return (
    <section className="py-20">
      <div className="container-base">
        <h1 className="text-4xl font-heading font-bold text-brand-primary mb-8">
          {dict.nav.about}
        </h1>
        {/* Content placeholder */}
        <p className="text-gray-500 text-lg">— Treść sekcji &quot;O nas&quot; —</p>
      </div>
    </section>
  )
}
