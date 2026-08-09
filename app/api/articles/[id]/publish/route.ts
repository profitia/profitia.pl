import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { isSameOriginRequest, verifyActiveAdminToken } from '@/lib/auth'
import { ArticleServiceError, publishArticle } from '@/lib/articles/article-service'

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
    const article = await publishArticle(id)
    return NextResponse.json({ success: true, article })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, message: 'Title, valid slug and content are required before publishing' },
        { status: 422 },
      )
    }
    if (error instanceof ArticleServiceError) {
      return NextResponse.json(
        { success: false, message: error.message },
        { status: error.code === 'ARTICLE_NOT_FOUND' ? 404 : 422 },
      )
    }
    console.error('[API /articles/:id/publish]', error)
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 })
  }
}