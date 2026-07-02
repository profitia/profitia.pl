import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { verifyAdminToken } from '@/lib/auth'

// GET /api/articles - public list of published articles
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const page = Math.max(1, parseInt(searchParams.get('page') ?? '1'))
  const limit = Math.min(50, parseInt(searchParams.get('limit') ?? '10'))
  const skip = (page - 1) * limit

  const [articles, total] = await Promise.all([
    prisma.article.findMany({
      where: { published: true },
      orderBy: { createdAt: 'desc' },
      skip,
      take: limit,
      select: { id: true, slug: true, title: true, excerpt: true, createdAt: true },
    }),
    prisma.article.count({ where: { published: true } }),
  ])

  return NextResponse.json({ articles, total, page, limit })
}

const ArticleSchema = z.object({
  title: z.string().min(3).max(200),
  slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Invalid slug format'),
  excerpt: z.string().max(500).optional(),
  content: z.string().min(1),
  published: z.boolean().default(false),
})

async function parseArticleRequest(request: NextRequest) {
  const contentType = request.headers.get('content-type') ?? ''

  if (contentType.includes('application/json')) {
    return {
      data: ArticleSchema.parse(await request.json()),
      expectsRedirect: false,
    }
  }

  const formData = await request.formData()
  return {
    data: ArticleSchema.parse({
      title: formData.get('title'),
      slug: formData.get('slug'),
      excerpt: formData.get('excerpt') || undefined,
      content: formData.get('content'),
      published: formData.get('published') === 'on',
    }),
    expectsRedirect: true,
  }
}

// POST /api/articles - create article (admin only)
export async function POST(request: NextRequest) {
  try {
    if (!verifyAdminToken(request)) {
      const contentType = request.headers.get('content-type') ?? ''
      if (!contentType.includes('application/json')) {
        return NextResponse.redirect(new URL('/admin/login', request.url), { status: 303 })
      }
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 })
    }

    const { data, expectsRedirect } = await parseArticleRequest(request)

    const existing = await prisma.article.findUnique({ where: { slug: data.slug } })
    if (existing) {
      if (expectsRedirect) {
        return NextResponse.redirect(new URL('/admin/articles/new?error=slug', request.url), { status: 303 })
      }
      return NextResponse.json({ success: false, message: 'Slug already in use' }, { status: 409 })
    }

    const article = await prisma.article.create({ data })

    if (expectsRedirect) {
      return NextResponse.redirect(new URL('/admin/articles', request.url), { status: 303 })
    }

    return NextResponse.json({ success: true, article }, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      if (!((request.headers.get('content-type') ?? '').includes('application/json'))) {
        return NextResponse.redirect(new URL('/admin/articles/new?error=validation', request.url), { status: 303 })
      }
      return NextResponse.json({ success: false, errors: error.errors }, { status: 422 })
    }
    console.error('[API /articles]', error)
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 })
  }
}
