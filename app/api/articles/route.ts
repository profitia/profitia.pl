import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'

// GET /api/articles — public list of published articles
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

// POST /api/articles — create article (admin auth to be added)
export async function POST(request: NextRequest) {
  try {
    // TODO: verify admin JWT token before allowing writes
    const body = await request.json()
    const data = ArticleSchema.parse(body)

    const existing = await prisma.article.findUnique({ where: { slug: data.slug } })
    if (existing) {
      return NextResponse.json({ success: false, message: 'Slug already in use' }, { status: 409 })
    }

    const article = await prisma.article.create({ data })
    return NextResponse.json({ success: true, article }, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ success: false, errors: error.errors }, { status: 422 })
    }
    console.error('[API /articles]', error)
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 })
  }
}
