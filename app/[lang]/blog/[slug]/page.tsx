import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import type { Locale } from '@/middleware'

export const dynamic = 'force-dynamic'

type Props = {
  params: Promise<{ lang: Locale; slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const article = await prisma.article.findUnique({
    where: { slug },
    select: { title: true, excerpt: true },
  })
  if (!article) return { title: 'Not Found' }
  return {
    title: article.title,
    description: article.excerpt ?? undefined,
  }
}

export default async function ArticlePage({ params }: Props) {
  const { lang, slug } = await params

  const article = await prisma.article.findUnique({
    where: { slug, published: true },
  })

  if (!article) notFound()

  return (
    <article className="py-20">
      <div className="container-base max-w-3xl">
        <time className="text-sm text-gray-400">
          {new Date(article.createdAt).toLocaleDateString(lang === 'pl' ? 'pl-PL' : 'en-GB')}
        </time>
        <h1 className="text-4xl font-heading font-bold text-brand-primary mt-4 mb-8">
          {article.title}
        </h1>
        {/* Content rendered as HTML — sanitization to be added before production */}
        <div
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />
      </div>
    </article>
  )
}
