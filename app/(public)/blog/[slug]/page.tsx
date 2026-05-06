import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

type Props = {
  params: Promise<{ slug: string }>
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
  const { slug } = await params

  const article = await prisma.article.findUnique({
    where: { slug, published: true },
  })

  if (!article) notFound()

  return (
    <article className="py-20">
      <div className="container-base max-w-3xl">
        <time className="text-sm text-gray-400">
          {new Date(article.createdAt).toLocaleDateString('pl-PL')}
        </time>
        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-gray-900 leading-[1.08] mt-4 mb-8">
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
