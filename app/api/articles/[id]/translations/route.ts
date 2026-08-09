import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { isSameOriginRequest, verifyActiveAdminToken } from '@/lib/auth'
import { createTranslationSchema } from '@/lib/articles/article-validation'
import { ArticleServiceError, createTranslation } from '@/lib/articles/article-service'

type RouteContext = { params: Promise<{ id: string }> }

export async function POST(request: NextRequest, { params }: RouteContext) {
  try {
    if (!await verifyActiveAdminToken(request)) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 })
    }
    if (!isSameOriginRequest(request)) {
      return NextResponse.json({ success: false, message: 'Invalid request origin' }, { status: 403 })
    }
    const { id } = await params
    const { locale } = createTranslationSchema.parse(await request.json())
    const article = await createTranslation(id, locale)
    return NextResponse.json({ success: true, article }, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ success: false, message: 'Invalid target language' }, { status: 422 })
    }
    if (error instanceof ArticleServiceError) {
      const status = error.code === 'ARTICLE_NOT_FOUND'
        ? 404
        : error.code === 'TRANSLATION_EXISTS'
          ? 409
          : 422
      return NextResponse.json({ success: false, message: error.message }, { status })
    }
    console.error('[API /articles/:id/translations]', error)
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 })
  }
}