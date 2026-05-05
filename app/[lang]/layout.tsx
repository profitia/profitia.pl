import type { Metadata } from 'next'
import { Inter, Poppins } from 'next/font/google'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { getDictionary } from '@/lib/i18n'
import { locales, defaultLocale } from '@/middleware'
import type { Locale } from '@/middleware'

const inter = Inter({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-inter',
  display: 'swap',
})

const poppins = Poppins({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
})

type Props = {
  children: React.ReactNode
  params: Promise<{ lang: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang: rawLang } = await params
  const lang = (locales.includes(rawLang as Locale) ? rawLang : defaultLocale) as Locale
  const dict = await getDictionary(lang)

  return {
    title: {
      template: `%s | ${dict.site.name}`,
      default: dict.site.tagline,
    },
    description: dict.site.description,
    alternates: {
      languages: {
        pl: '/pl',
        en: '/en',
      },
    },
  }
}

export function generateStaticParams() {
  return [{ lang: 'pl' }, { lang: 'en' }]
}

export default async function LangLayout({ children, params }: Props) {
  const { lang: rawLang } = await params
  const lang = (locales.includes(rawLang as Locale) ? rawLang : defaultLocale) as Locale
  const dict = await getDictionary(lang)

  return (
    <>
      <Header lang={lang} dict={dict} />
      <main className={`min-h-screen ${inter.variable} ${poppins.variable}`}>{children}</main>
      <Footer lang={lang} dict={dict} />
    </>
  )
}
