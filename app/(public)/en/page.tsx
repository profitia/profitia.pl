import type { Metadata } from 'next'
import { getDictionary } from '@/lib/i18n'
import HomePageContent from '@/components/pages/HomePageContent'

export async function generateMetadata(): Promise<Metadata> {
  const dict = await getDictionary('en')
  return {
    title: dict.homepage.meta.title,
    description: dict.homepage.meta.description,
    alternates: {
      canonical: 'https://www.profitia.pl/en',
      languages: {
        'pl': 'https://www.profitia.pl',
        'en': 'https://www.profitia.pl/en',
        'x-default': 'https://www.profitia.pl',
      },
    },
  }
}

export default async function EnHomePage() {
  const dict = await getDictionary('en')
  return <HomePageContent dict={dict} />
}
