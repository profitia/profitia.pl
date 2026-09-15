import type { Metadata } from 'next'
import { PublicJsonLd } from '@/components/seo/PublicJsonLd'
import { getDictionary } from '@/lib/i18n'
import HomePageContent from '@/components/pages/HomePageContent'
import { buildPublicMetadata } from '@/lib/routing/public-seo'

export async function generateMetadata(): Promise<Metadata> {
  const dict = await getDictionary('pl')
  return buildPublicMetadata('home', 'pl', {
    title: dict.homepage.meta.title,
    description: dict.homepage.meta.description,
  })
}

export default async function HomePage() {
  const dict = await getDictionary('pl')
  return (
    <>
      <PublicJsonLd routeId="home" locale="pl" title={dict.homepage.meta.title} description={dict.homepage.meta.description} />
      <HomePageContent dict={dict} locale="pl" />
    </>
  )
}
