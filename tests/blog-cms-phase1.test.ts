import { randomUUID } from 'node:crypto'
import { ArticleLocale, Prisma, PrismaClient } from '@prisma/client'
import { NextRequest } from 'next/server'
import { GET as getArticlesViaApi, POST as createArticleViaApi } from '../app/api/articles/route'
import {
  findPublishedArticleBySlug,
  findPublishedTranslationSibling,
  preferLocalizedArticles,
} from '../lib/articles/queries'
import { resolveLanguageSwitchPath } from '../lib/articles/language-navigation'
import { signAdminToken } from '../lib/auth'

const prisma = new PrismaClient()
const cleanupIds: string[] = []
const testAdminId = `phase-1-admin-${randomUUID()}`
let failures = 0

async function test(name: string, run: () => Promise<void> | void) {
  try {
    await run()
    console.log(`PASS ${name}`)
  } catch (error) {
    failures += 1
    console.error(`FAIL ${name}`)
    console.error(error)
  }
}

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) throw new Error(message)
}

async function createArticle(data: {
  slug: string
  locale: ArticleLocale | null
  translationGroupId: string | null
}) {
  const article = await prisma.article.create({
    data: {
      ...data,
      title: `Phase 1 test ${data.slug}`,
      content: '<p>Phase 1 test</p>',
      published: true,
    },
  })
  cleanupIds.push(article.id)
  return article
}

async function expectUniqueViolation(run: () => Promise<unknown>) {
  try {
    await run()
  } catch (error) {
    assert(
      error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002',
      'Expected Prisma P2002 unique constraint violation',
    )
    return
  }
  throw new Error('Expected unique constraint violation')
}

function createAuthorizedRequest(body: Record<string, unknown>): NextRequest {
  process.env.JWT_SECRET ??= 'phase-1-test-secret'
  const token = signAdminToken(testAdminId)
  return new NextRequest('http://localhost/api/articles', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      cookie: `admin_token=${token}`,
      origin: 'http://localhost',
    },
    body: JSON.stringify(body),
  })
}

async function main() {
  const suffix = randomUUID()
  const pairGroup = randomUUID()
  const soloGroup = randomUUID()

  const legacyBefore = await prisma.article.count({
    where: { locale: null, translationGroupId: null },
  })

  await prisma.adminUser.create({
    data: {
      id: testAdminId,
      email: `${testAdminId}@example.invalid`,
      name: 'Phase 1 Admin',
      passwordHash: 'test-only',
      active: true,
    },
  })

  await test('all 22 existing articles remain nullable legacy records', () => {
    assert(legacyBefore === 22, `Expected 22 legacy records, received ${legacyBefore}`)
  })

  try {
    const legacy = await createArticle({
      slug: `phase1-legacy-${suffix}`,
      locale: null,
      translationGroupId: null,
    })
    const pl = await createArticle({
      slug: `phase1-pl-${suffix}`,
      locale: ArticleLocale.PL,
      translationGroupId: pairGroup,
    })
    const en = await createArticle({
      slug: `phase1-en-${suffix}`,
      locale: ArticleLocale.EN,
      translationGroupId: pairGroup,
    })
    const soloPl = await createArticle({
      slug: `phase1-solo-pl-${suffix}`,
      locale: ArticleLocale.PL,
      translationGroupId: soloGroup,
    })

    await test('legacy Article accepts nullable locale and translationGroupId', () => {
      assert(legacy.locale === null, 'Legacy locale must be null')
      assert(legacy.translationGroupId === null, 'Legacy translationGroupId must be null')
    })

    await test('PL and EN articles share a group while using different slugs', () => {
      assert(pl.locale === ArticleLocale.PL, 'PL locale was not stored')
      assert(en.locale === ArticleLocale.EN, 'EN locale was not stored')
      assert(pl.translationGroupId === en.translationGroupId, 'Translation groups differ')
      assert(pl.slug !== en.slug, 'Localized slugs should differ in this test')
    })

    await test('localized routes resolve their own slugs', async () => {
      const foundPl = await findPublishedArticleBySlug(pl.slug, ArticleLocale.PL)
      const foundEn = await findPublishedArticleBySlug(en.slug, ArticleLocale.EN)
      assert(foundPl?.id === pl.id, 'PL localized lookup failed')
      assert(foundEn?.id === en.id, 'EN localized lookup failed')
    })

    await test('legacy fallback remains available in both locales', async () => {
      const foundPl = await findPublishedArticleBySlug(legacy.slug, ArticleLocale.PL)
      const foundEn = await findPublishedArticleBySlug(legacy.slug, ArticleLocale.EN)
      assert(foundPl?.id === legacy.id, 'PL legacy fallback failed')
      assert(foundEn?.id === legacy.id, 'EN legacy fallback failed')
    })

    await test('GET locale filter includes localized and legacy records only', async () => {
      const response = await getArticlesViaApi(
        new NextRequest('http://localhost/api/articles?locale=PL&limit=50'),
      )
      const payload = await response.json() as { articles: Array<{ id: string }> }
      const ids = new Set(payload.articles.map((article) => article.id))
      assert(ids.has(pl.id), 'PL API filter omitted the localized PL article')
      assert(ids.has(legacy.id), 'PL API filter omitted the legacy article')
      assert(!ids.has(en.id), 'PL API filter included the localized EN article')
    })

    await test('GET without locale remains backward-compatible', async () => {
      const response = await getArticlesViaApi(
        new NextRequest('http://localhost/api/articles?limit=50'),
      )
      const payload = await response.json() as { articles: Array<{ id: string }> }
      const ids = new Set(payload.articles.map((article) => article.id))
      assert(ids.has(pl.id), 'Unfiltered API omitted the localized PL article')
      assert(ids.has(en.id), 'Unfiltered API omitted the localized EN article')
      assert(ids.has(legacy.id), 'Unfiltered API omitted the legacy article')
    })

    await test('one translation group cannot contain two PL records', async () => {
      await expectUniqueViolation(() =>
        prisma.article.create({
          data: {
            slug: `phase1-second-pl-${suffix}`,
            locale: ArticleLocale.PL,
            translationGroupId: pairGroup,
            title: 'Duplicate PL test',
            content: '<p>test</p>',
          },
        }),
      )
    })

    await test('slug is unique within one locale', async () => {
      await expectUniqueViolation(() =>
        prisma.article.create({
          data: {
            slug: pl.slug,
            locale: ArticleLocale.PL,
            translationGroupId: randomUUID(),
            title: 'Duplicate slug test',
            content: '<p>test</p>',
          },
        }),
      )
    })

    await test('the same slug is allowed in the other locale', async () => {
      const crossLocale = await createArticle({
        slug: pl.slug,
        locale: ArticleLocale.EN,
        translationGroupId: randomUUID(),
      })
      assert(crossLocale.slug === pl.slug, 'Cross-locale slug was not stored')
    })

    await test('localized list records replace same-slug legacy fallbacks', () => {
      const rows = preferLocalizedArticles([
        { slug: pl.slug, locale: null },
        { slug: pl.slug, locale: ArticleLocale.PL },
      ], ArticleLocale.PL)
      assert(rows.length === 1, 'List deduplication retained two records')
      assert(rows[0].locale === ArticleLocale.PL, 'List did not prefer the localized record')
    })

    await test('translation sibling resolves its own slug', async () => {
      const sibling = await findPublishedTranslationSibling(pl, ArticleLocale.EN)
      assert(sibling?.slug === en.slug, 'EN sibling slug was not resolved')
      const path = resolveLanguageSwitchPath(
        'en',
        `/blog/${pl.slug}`,
        false,
        { pl: `/blog/${pl.slug}`, en: `/en/blog/${sibling.slug}` },
      )
      assert(path === `/en/blog/${en.slug}`, 'Language switch generated the wrong EN URL')
    })

    await test('POST creates a group and reuses it for the second language', async () => {
      const plResponse = await createArticleViaApi(createAuthorizedRequest({
        locale: 'PL',
        slug: `phase1-api-pl-${suffix}`,
        title: 'Phase 1 API Polish article',
        content: '<p>Phase 1 API test</p>',
      }))
      assert(plResponse.status === 201, `Expected 201 for PL create, received ${plResponse.status}`)
      const plPayload = await plResponse.json() as { article: { id: string; translationGroupId: string } }
      cleanupIds.push(plPayload.article.id)
      assert(plPayload.article.translationGroupId, 'API did not generate a translationGroupId')

      const enResponse = await createArticleViaApi(createAuthorizedRequest({
        locale: 'EN',
        translationGroupId: plPayload.article.translationGroupId,
        slug: `phase1-api-en-${suffix}`,
        title: 'Phase 1 API English article',
        content: '<p>Phase 1 API test</p>',
      }))
      assert(enResponse.status === 201, `Expected 201 for EN create, received ${enResponse.status}`)
      const enPayload = await enResponse.json() as { article: { id: string; translationGroupId: string } }
      cleanupIds.push(enPayload.article.id)
      assert(
        enPayload.article.translationGroupId === plPayload.article.translationGroupId,
        'API did not reuse the translation group',
      )
    })

    await test('missing translation falls back to the target blog list', async () => {
      const sibling = await findPublishedTranslationSibling(soloPl, ArticleLocale.EN)
      assert(sibling === null, 'Unexpected EN sibling exists')
      const path = resolveLanguageSwitchPath(
        'en',
        `/blog/${soloPl.slug}`,
        false,
        { pl: `/blog/${soloPl.slug}` },
      )
      assert(path === '/en/blog', 'Missing translation must not generate a slug-based 404 URL')
    })

    await test('legacy switch preserves the existing same-slug behavior', () => {
      const path = resolveLanguageSwitchPath('en', `/blog/${legacy.slug}`, false, null)
      assert(path === `/en/blog/${legacy.slug}`, 'Legacy switch behavior changed')
    })
  } finally {
    await prisma.article.deleteMany({ where: { id: { in: cleanupIds } } })
    await prisma.adminUser.delete({ where: { id: testAdminId } })
    await prisma.$disconnect()
  }

  if (failures > 0) {
    process.exitCode = 1
  }
}

void main()
