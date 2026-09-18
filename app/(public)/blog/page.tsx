import type { Metadata } from 'next'
import BlogListingPage from '@/components/pages/BlogListingPage'
import { getPublishedPolishArticles } from '@/lib/articles/cache'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Inteligencja zakupowa | Profitia',
  description:
    'Analizy, strategie i inteligencja dla osób odpowiedzialnych za zakupy, koszty i negocjacje.',
  alternates: {
    canonical: 'https://profitia.pl/blog',
    languages: { en: 'https://profitia.pl/en/blog' },
  },
  openGraph: {
    title: 'Inteligencja zakupowa | Profitia',
    description:
      'Analizy zakupowe, strategie negocjacyjne i inteligencja rynkowa od Profitia.',
    type: 'website',
  },
}

export default async function BlogPage() {
  const articles = await getPublishedPolishArticles()
  return <BlogListingPage locale="pl" articles={articles} />
}
