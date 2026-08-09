import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { ArticleLocale } from '@prisma/client'
import { prisma } from '@/lib/prisma'
import { isSameOriginRequest, verifyActiveAdminToken } from '@/lib/auth'
import {
  publishedArticlesForLocaleWhere,
} from '@/lib/articles/queries'
import { createArticleDraftSchema } from '@/lib/articles/article-validation'
import { ArticleServiceError, createArticleDraft } from '@/lib/articles/article-service'

// GET /api/articles - public list of published articles
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const page = Math.max(1, parseInt(searchParams.get('page') ?? '1'))
  const limit = Math.min(50, parseInt(searchParams.get('limit') ?? '10'))
  const skip = (page - 1) * limit
  const localeParam = searchParams.get('locale')?.toUpperCase()
  const locale = localeParam && Object.values(ArticleLocale).includes(localeParam as ArticleLocale)
    ? localeParam as ArticleLocale
    : null
  const where = locale ? publishedArticlesForLocaleWhere(locale) : { published: true }

  const [articles, total] = await Promise.all([
    prisma.article.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      skip,
      take: limit,
      select: { id: true, slug: true, title: true, excerpt: true, createdAt: true },
    }),
    prisma.article.count({ where }),
  ])

  return NextResponse.json({ articles, total, page, limit })
}

async function parseArticleRequest(request: NextRequest) {
  const contentType = request.headers.get('content-type') ?? ''

  if (contentType.includes('application/json')) {
    return {
      data: createArticleDraftSchema.parse(await request.json()),
      expectsRedirect: false,
    }
  }

  const formData = await request.formData()
  return {
    data: createArticleDraftSchema.parse({
      locale: formData.get('locale'),
      translationGroupId: formData.get('translationGroupId') || undefined,
      title: formData.get('title'),
      slug: formData.get('slug'),
      excerpt: formData.get('excerpt') || undefined,
      content: formData.get('content') || '',
      publishedAt: formData.get('publishedAt') || undefined,
      metaTitle: formData.get('metaTitle') || undefined,
      metaDescription: formData.get('metaDescription') || undefined,
      category: formData.get('category') || undefined,
      readingTime: formData.get('readingTime') || undefined,
      coverImage: formData.get('coverImage') || undefined,
      featured: formData.get('featured') === 'on',
    }),
    expectsRedirect: true,
  }
}

// POST /api/articles - create article (admin only)
export async function POST(request: NextRequest) {
  try {
    if (!await verifyActiveAdminToken(request)) {
      const contentType = request.headers.get('content-type') ?? ''
      if (!contentType.includes('application/json')) {
        return NextResponse.redirect(new URL('/admin/login', request.url), { status: 303 })
      }
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 })
    }
    if (!isSameOriginRequest(request)) {
      return NextResponse.json({ success: false, message: 'Invalid request origin' }, { status: 403 })
    }

    const { data, expectsRedirect } = await parseArticleRequest(request)

    const article = await createArticleDraft(data)

    if (expectsRedirect) {
      return NextResponse.redirect(new URL(`/admin/articles/${article.id}/edit`, request.url), { status: 303 })
    }

    return NextResponse.json({ success: true, article }, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      if (!((request.headers.get('content-type') ?? '').includes('application/json'))) {
        return NextResponse.redirect(new URL('/admin/articles/new?error=validation', request.url), { status: 303 })
      }
      return NextResponse.json({ success: false, errors: error.errors }, { status: 422 })
    }
    if (error instanceof ArticleServiceError) {
      const status = error.code === 'SLUG_CONFLICT'
        || error.code === 'FEATURED_CONFLICT'
        || error.code === 'TRANSLATION_EXISTS'
        ? 409
        : 422
      return NextResponse.json({ success: false, message: error.message }, { status })
    }
    console.error('[API /articles]', error)
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 })
  }
}
