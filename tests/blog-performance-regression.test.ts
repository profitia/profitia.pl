import assert from 'node:assert/strict'
import { readdir, readFile, stat } from 'node:fs/promises'
import path from 'node:path'
import test from 'node:test'
import sharp from 'sharp'
import { getOptimizedArticleImageSrc } from '../lib/articles/images'
import { MAX_MEDIA_DIMENSION, processImageUpload } from '../lib/media/image'

const root = process.cwd()
const source = (file: string) => readFile(path.join(root, file), 'utf8')

test('legacy repository covers have canonical compact WebP siblings', async () => {
  const blogRoot = path.join(root, 'public', 'images', 'blog')
  const directories = await readdir(blogRoot, { withFileTypes: true })
  let totalBytes = 0
  let legacyCoverCount = 0

  for (const directory of directories) {
    if (!directory.isDirectory()) continue
    const articleDirectory = path.join(blogRoot, directory.name)
    const files = await readdir(articleDirectory)
    const sourceName = files.find((file) => /^cover\.(?:png|jpe?g)$/i.test(file))
    if (!sourceName) continue

    legacyCoverCount += 1
    assert.ok(files.includes('cover.webp'), `${directory.name} has no cover.webp`)
    const optimized = path.join(articleDirectory, 'cover.webp')
    const [file, metadata, sourceMetadata] = await Promise.all([
      stat(optimized),
      sharp(optimized).metadata(),
      sharp(path.join(articleDirectory, sourceName)).metadata(),
    ])
    totalBytes += file.size
    assert.equal(metadata.format, 'webp', `${directory.name} cover is not WebP`)
    assert.ok(Math.max(metadata.width ?? 0, metadata.height ?? 0) <= MAX_MEDIA_DIMENSION)
    assert.ok(file.size <= 650_000, `${directory.name} optimized cover is unexpectedly large`)
    const sourceRatio = (sourceMetadata.width ?? 0) / (sourceMetadata.height ?? 1)
    const optimizedRatio = (metadata.width ?? 0) / (metadata.height ?? 1)
    assert.ok(Math.abs(sourceRatio - optimizedRatio) < 0.002, `${directory.name} aspect ratio changed`)
  }

  assert.ok(legacyCoverCount > 0, 'No legacy covers were checked')
  assert.ok(totalBytes <= 5_000_000, `Optimized cover set is unexpectedly large: ${totalBytes}`)
})

test('cover resolver upgrades only legacy local cover paths', () => {
  assert.equal(
    getOptimizedArticleImageSrc('/images/blog/example/cover.png'),
    '/images/blog/example/cover.webp'
  )
  assert.equal(
    getOptimizedArticleImageSrc('/images/blog/example/cover.jpeg'),
    '/images/blog/example/cover.webp'
  )
  assert.equal(
    getOptimizedArticleImageSrc('https://media.example.com/blog/new.webp'),
    'https://media.example.com/blog/new.webp'
  )
  assert.equal(getOptimizedArticleImageSrc('/images/blog/example/inline.jpg'), '/images/blog/example/inline.jpg')
})

test('all public cover surfaces use the canonical resolver', async () => {
  const files = [
    'components/blog/ArticleCard.tsx',
    'components/blog/FeaturedArticle.tsx',
    'components/blog/ArticleHero.tsx',
    'components/blog/ArticleRelated.tsx',
    'lib/articles/article-seo.ts',
  ]

  for (const file of files) {
    assert.match(await source(file), /getOptimizedArticleImageSrc/, `${file} bypasses cover resolver`)
  }
})

test('blog listing limits eager image work and requests realistic widths', async () => {
  const [card, featured, deferred] = await Promise.all([
    source('components/blog/ArticleCard.tsx'),
    source('components/blog/FeaturedArticle.tsx'),
    source('components/blog/DeferredArticleImage.tsx'),
  ])

  assert.match(card, /DeferredArticleImage/)
  assert.match(card, /384px/)
  assert.doesNotMatch(card, /priority=/)
  assert.match(featured, /priority/)
  assert.match(featured, /720px/)
  assert.match(deferred, /IntersectionObserver/)
  assert.match(deferred, /rootMargin: '600px 0px'/)
  assert.match(deferred, /fetchPriority="low"/)
})

test('article listings use bounded tagged cache with publication invalidation', async () => {
  const [cache, pl, en, publish, unpublish, update, config] = await Promise.all([
    source('lib/articles/cache.ts'),
    source('app/(public)/blog/page.tsx'),
    source('app/(public)/en/blog/page.tsx'),
    source('app/api/articles/[id]/publish/route.ts'),
    source('app/api/articles/[id]/unpublish/route.ts'),
    source('app/api/articles/[id]/route.ts'),
    source('next.config.ts'),
  ])

  assert.match(cache, /ARTICLE_LIST_REVALIDATE_SECONDS = 300/)
  assert.match(cache, /unstable_cache/)
  assert.match(cache, /revalidateTag\(ARTICLE_LIST_CACHE_TAG\)/)
  assert.match(pl, /getPublishedPolishArticles/)
  assert.match(en, /getPublishedEnglishArticles/)
  for (const route of [publish, unpublish, update]) {
    assert.match(route, /revalidatePublishedArticlePages/)
  }
  assert.match(config, /minimumCacheTTL: 604800/)
})

test('future uploads execute the canonical WebP and dimension policy', async () => {
  const media = await source('lib/media/image.ts')
  assert.match(media, /MAX_MEDIA_DIMENSION = 1920/)
  assert.match(media, /withoutEnlargement: true/)
  assert.match(media, /\.webp\(\{ quality: 82/)
  assert.match(media, /mimeType: 'image\/webp'/)
  assert.match(media, /extension: 'webp'/)

  const input = await sharp({
    create: { width: 2400, height: 1200, channels: 3, background: '#176B87' },
  }).withMetadata({ exif: { IFD0: { Artist: 'must be removed' } } }).jpeg().toBuffer()
  const processed = await processImageUpload(input)
  const metadata = await sharp(processed.body).metadata()

  assert.equal(processed.mimeType, 'image/webp')
  assert.equal(processed.extension, 'webp')
  assert.equal(metadata.format, 'webp')
  assert.equal(metadata.width, 1920)
  assert.equal(metadata.height, 960)
  assert.equal(metadata.exif, undefined)
})
