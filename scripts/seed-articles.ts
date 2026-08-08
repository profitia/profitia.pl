import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

type LegacyArticleRecord = {
  slug: string
  title: string
  excerpt: string | null
  subtitle: string | null
  content: string
  published: boolean
  publishedAt: string | null
  metaTitle: string | null
  metaDescription: string | null
  category: string | null
  readingTime: number | null
  coverImage: string | null
  featured: boolean
  authorName: string | null
  authorRole: string | null
  authorBio: string | null
  relatedSlugs: string[]
}

function loadArticles(): LegacyArticleRecord[] {
  const filePath = join(process.cwd(), 'db', 'legacy-blog', 'legacy-blog-articles.json')
  return JSON.parse(readFileSync(filePath, 'utf-8')) as LegacyArticleRecord[]
}

function toArticleData(article: LegacyArticleRecord) {
  return {
    slug: article.slug,
    title: article.title,
    excerpt: article.excerpt,
    subtitle: article.subtitle,
    content: article.content,
    published: article.published,
    publishedAt: article.publishedAt ? new Date(article.publishedAt) : null,
    metaTitle: article.metaTitle,
    metaDescription: article.metaDescription,
    category: article.category,
    readingTime: article.readingTime,
    coverImage: article.coverImage,
    featured: article.featured,
    authorName: article.authorName,
    authorRole: article.authorRole,
    authorBio: article.authorBio,
    relatedSlugs: article.relatedSlugs,
  }
}

async function main() {
  const articles = loadArticles()
  console.log(`Starting legacy blog import for ${articles.length} articles...\n`)

  for (const article of articles) {
    const saved = await prisma.article.upsert({
      where: { slug: article.slug },
      create: toArticleData(article),
      update: toArticleData(article),
    })

    console.log(`✓ Upserted: "${saved.title}" (${saved.slug})`)
  }

  console.log('\nLegacy blog import complete.')
}

main()
  .catch((error) => {
    console.error('Seed failed:', error)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
