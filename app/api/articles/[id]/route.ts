import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { isSameOriginRequest, verifyActiveAdminToken } from '@/lib/auth'
import { updateArticleDraftSchema } from '@/lib/articles/article-validation'
import { ArticleServiceError, updateArticleDraft } from '@/lib/articles/article-service'

type RouteContext = { params: Promise<{ id: string }> }

function serviceErrorResponse(error: ArticleServiceError) {
  const status = error.code === 'ARTICLE_NOT_FOUND'
    ? 404
    : error.code === 'SLUG_CONFLICT'
      || error.code === 'SLUG_LOCKED'
      || error.code === 'FEATURED_CONFLICT'
      ? 409
      : 422
  return NextResponse.json({ success: false, message: error.message }, { status })
}

export async function GET(request: NextRequest, { params }: RouteContext) {
  if (!await verifyActiveAdminToken(request)) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 })
  }

  const { id } = await params
  const article = await prisma.article.findUnique({ where: { id } })
  if (!article) {
    return NextResponse.json({ success: false, message: 'Article not found' }, { status: 404 })
  }
  return NextResponse.json({ success: true, article })
}

export async function PATCH(request: NextRequest, { params }: RouteContext) {
  try {
    if (!await verifyActiveAdminToken(request)) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 })
    }
    if (!isSameOriginRequest(request)) {
      return NextResponse.json({ success: false, message: 'Invalid request origin' }, { status: 403 })
    }

    const { id } = await params
    const data = updateArticleDraftSchema.parse(await request.json())
    const article = await updateArticleDraft(id, data)
    return NextResponse.json({ success: true, article })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ success: false, message: 'Invalid form', errors: error.errors }, { status: 422 })
    }
    if (error instanceof ArticleServiceError) {
      return serviceErrorResponse(error)
    }
    console.error('[API /articles/:id]', error)
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 })
  }
}