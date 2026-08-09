import type { Metadata } from 'next'
import ArticleForm from '@/components/admin/ArticleForm'

export const metadata: Metadata = { title: 'Nowy artykuł' }

export default function NewArticlePage() {
  return (
    <ArticleForm
      mode="create"
      initialValue={{
        locale: 'PL',
        title: '',
        slug: '',
        excerpt: '',
        content: '',
        published: false,
        publishedAt: '',
        metaTitle: '',
        metaDescription: '',
        category: '',
        readingTime: '',
        coverImage: '',
        coverImageAlt: '',
        coverMediaId: '',
        featured: false,
      }}
    />
  )
}