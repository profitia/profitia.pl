import { randomUUID } from 'node:crypto'
import { PrismaClient } from '@prisma/client'
import { NextRequest } from 'next/server'
import { POST as createArticle } from '../app/api/articles/route'
import { GET as getArticle, PATCH as updateArticle } from '../app/api/articles/[id]/route'
import { POST as publishArticle } from '../app/api/articles/[id]/publish/route'
import { POST as unpublishArticle } from '../app/api/articles/[id]/unpublish/route'
import { POST as createTranslation } from '../app/api/articles/[id]/translations/route'
import { findPublishedArticleBySlug } from '../lib/articles/queries'
import { signAdminToken } from '../lib/auth'

const prisma = new PrismaClient()
const cleanupIds: string[] = []
const testAdminId = `phase-2-admin-${randomUUID()}`
let failures = 0

type Locale = 'PL' | 'EN'
type RouteHandler = (
  request: NextRequest,
  context: { params: Promise<{ id: string }> },
) => Promise<Response>

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) throw new Error(message)
}

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

function authCookie() {
  process.env.JWT_SECRET ??= 'phase-2-test-secret'
  return `admin_token=${signAdminToken(testAdminId)}`
}

function request(
  url: string,
  method: string,
  body?: Record<string, unknown>,
  authorized = true,
) {
  return new NextRequest(`http://localhost${url}`, {
    method,
    headers: {
      ...(body && { 'content-type': 'application/json' }),
      ...(authorized && { cookie: authCookie() }),
      origin: 'http://localhost',
    },
    ...(body && { body: JSON.stringify(body) }),
  })
}

function route(handler: RouteHandler, id: string, method: string, body?: Record<string, unknown>, authorized = true) {
  return handler(
    request(`/api/articles/${id}`, method, body, authorized),
    { params: Promise.resolve({ id }) },
  )
}

function draftData(locale: Locale, slug: string, overrides: Record<string, unknown> = {}) {
  return {
    locale,
    title: `Phase 2 ${locale} draft`,
    slug,
    excerpt: 'Initial excerpt',
    content: '',
    metaTitle: null,
    metaDescription: null,
    featured: false,
    ...overrides,
  }
}

async function createDraft(locale: Locale, slug: string, overrides: Record<string, unknown> = {}) {
  const response = await createArticle(request('/api/articles', 'POST', draftData(locale, slug, overrides)))
  assert(response.status === 201, `Expected create 201, received ${response.status}`)
  const payload = await response.json() as {
    article: { id: string; locale: Locale; translationGroupId: string; published: boolean }
  }
  cleanupIds.push(payload.article.id)
  return payload.article
}

async function main() {
  const suffix = randomUUID()
  const legacyBefore = await prisma.article.findMany({
    where: { locale: null, translationGroupId: null },
    orderBy: { id: 'asc' },
    select: {
      id: true,
      slug: true,
      title: true,
      published: true,
      coverImage: true,
      locale: true,
      translationGroupId: true,
    },
  })

  await prisma.adminUser.create({
    data: {
      id: testAdminId,
      email: `${testAdminId}@example.invalid`,
      name: 'Phase 2 Admin',
      passwordHash: 'test-only',
      active: true,
    },
  })

  try {
    let plDraftId = ''
    let enDraftId = ''
    let publishedAt = ''

    await test('unauthorized create is rejected', async () => {
      const response = await createArticle(request('/api/articles', 'POST', draftData('PL', `unauthorized-${suffix}`), false))
      assert(response.status === 401, `Expected 401, received ${response.status}`)
    })

    await test('admin creates PL draft with locale and translation group', async () => {
      const article = await createDraft('PL', `phase2-pl-${suffix}`)
      plDraftId = article.id
      assert(article.locale === 'PL', 'PL locale was not stored')
      assert(Boolean(article.translationGroupId), 'translationGroupId was not generated')
      assert(article.published === false, 'New article must be a draft')
    })

    await test('admin creates EN draft with locale and translation group', async () => {
      const article = await createDraft('EN', `phase2-en-${suffix}`)
      enDraftId = article.id
      assert(article.locale === 'EN', 'EN locale was not stored')
      assert(Boolean(article.translationGroupId), 'translationGroupId was not generated')
    })

    await test('admin edits title, excerpt, content and meta fields', async () => {
      const response = await route(updateArticle, plDraftId, 'PATCH', draftData('PL', `phase2-pl-${suffix}`, {
        locale: 'EN',
        title: 'Updated Phase 2 title',
        excerpt: 'Updated excerpt',
        content: '<p>Updated content</p>',
        metaTitle: 'Updated meta title',
        metaDescription: 'Updated meta description',
      }))
      assert(response.status === 200, `Expected 200, received ${response.status}`)
      const payload = await response.json() as { article: { locale: Locale; title: string; excerpt: string; content: string; metaTitle: string; metaDescription: string } }
      assert(payload.article.locale === 'PL', 'PATCH must not change locale')
      assert(payload.article.title === 'Updated Phase 2 title', 'Title was not updated')
      assert(payload.article.excerpt === 'Updated excerpt', 'Excerpt was not updated')
      assert(payload.article.content === '<p>Updated content</p>', 'Content was not updated')
      assert(payload.article.metaTitle === 'Updated meta title', 'Meta title was not updated')
      assert(payload.article.metaDescription === 'Updated meta description', 'Meta description was not updated')
    })

    await test('unauthorized read and edit are rejected', async () => {
      const getResponse = await route(getArticle, plDraftId, 'GET', undefined, false)
      const patchResponse = await route(updateArticle, plDraftId, 'PATCH', draftData('PL', `phase2-pl-${suffix}`), false)
      assert(getResponse.status === 401, `Expected GET 401, received ${getResponse.status}`)
      assert(patchResponse.status === 401, `Expected PATCH 401, received ${patchResponse.status}`)
    })

    await test('draft save remains unpublished and invisible publicly', async () => {
      const stored = await prisma.article.findUniqueOrThrow({ where: { id: enDraftId } })
      const publicArticle = await findPublishedArticleBySlug(stored.slug, 'EN')
      assert(stored.published === false, 'Draft save changed published state')
      assert(stored.publishedAt === null, 'Draft save set publishedAt')
      assert(publicArticle === null, 'Draft became publicly visible')
    })

    await test('publish without content is rejected', async () => {
      const response = await route(publishArticle, enDraftId, 'POST')
      assert(response.status === 422, `Expected 422, received ${response.status}`)
    })

    await test('valid first publish sets published and publishedAt', async () => {
      const response = await route(publishArticle, plDraftId, 'POST')
      assert(response.status === 200, `Expected 200, received ${response.status}`)
      const payload = await response.json() as { article: { published: boolean; publishedAt: string | null } }
      assert(payload.article.published, 'Article was not published')
      assert(payload.article.publishedAt, 'First publish did not set publishedAt')
      publishedAt = payload.article.publishedAt
    })

    await test('subsequent save preserves publishedAt', async () => {
      const response = await route(updateArticle, plDraftId, 'PATCH', draftData('PL', `phase2-pl-${suffix}`, {
        title: 'Saved after publish',
        content: '<p>Updated after publish</p>',
      }))
      assert(response.status === 200, `Expected 200, received ${response.status}`)
      const stored = await prisma.article.findUniqueOrThrow({ where: { id: plDraftId } })
      assert(stored.publishedAt?.toISOString() === publishedAt, 'Save reset publishedAt')
    })

    await test('slug change after publication is rejected', async () => {
      const response = await route(updateArticle, plDraftId, 'PATCH', draftData('PL', `changed-${suffix}`, {
        title: 'Slug lock test',
        content: '<p>Content</p>',
      }))
      assert(response.status === 409, `Expected 409, received ${response.status}`)
    })

    await test('unpublish keeps historical publishedAt', async () => {
      const response = await route(unpublishArticle, plDraftId, 'POST')
      assert(response.status === 200, `Expected 200, received ${response.status}`)
      const payload = await response.json() as { article: { published: boolean; publishedAt: string | null } }
      assert(payload.article.published === false, 'Article remained published')
      assert(payload.article.publishedAt === publishedAt, 'Unpublish changed publishedAt')
    })

    await test('PL article creates one EN sibling in the same group', async () => {
      const source = await createDraft('PL', `translation-pl-${suffix}`)
      const response = await route(createTranslation, source.id, 'POST', { locale: 'EN' })
      assert(response.status === 201, `Expected 201, received ${response.status}`)
      const payload = await response.json() as { article: { id: string; locale: Locale; translationGroupId: string; published: boolean } }
      cleanupIds.push(payload.article.id)
      assert(payload.article.locale === 'EN', 'EN sibling was not created')
      assert(payload.article.translationGroupId === source.translationGroupId, 'Translation group differs')
      assert(payload.article.published === false, 'Translation must start as draft')

      const duplicate = await route(createTranslation, source.id, 'POST', { locale: 'EN' })
      assert(duplicate.status === 409, `Expected duplicate 409, received ${duplicate.status}`)
    })

    await test('EN article creates one PL sibling in the same group', async () => {
      const source = await createDraft('EN', `translation-en-${suffix}`)
      const response = await route(createTranslation, source.id, 'POST', { locale: 'PL' })
      assert(response.status === 201, `Expected 201, received ${response.status}`)
      const payload = await response.json() as { article: { id: string; locale: Locale; translationGroupId: string } }
      cleanupIds.push(payload.article.id)
      assert(payload.article.locale === 'PL', 'PL sibling was not created')
      assert(payload.article.translationGroupId === source.translationGroupId, 'Translation group differs')
    })

    await test('legacy article translation is rejected', async () => {
      const response = await route(createTranslation, legacyBefore[0].id, 'POST', { locale: 'EN' })
      assert(response.status === 422, `Expected 422, received ${response.status}`)
    })

    await test('duplicate slug in same locale is rejected and opposite locale is allowed', async () => {
      const sharedSlug = `shared-phase2-${suffix}`
      await createDraft('PL', sharedSlug)
      const duplicate = await createArticle(request('/api/articles', 'POST', draftData('PL', sharedSlug)))
      assert(duplicate.status === 409, `Expected duplicate 409, received ${duplicate.status}`)
      const opposite = await createDraft('EN', sharedSlug)
      assert(opposite.locale === 'EN', 'Same slug was not allowed in opposite locale')
    })

    await test('CMS allows only one featured article per public locale', async () => {
      await createDraft('PL', `featured-first-phase2-${suffix}`, { featured: true })
      const response = await createArticle(request('/api/articles', 'POST', draftData('PL', `featured-second-phase2-${suffix}`, {
        featured: true,
      })))
      assert(response.status === 409, `Expected featured conflict 409, received ${response.status}`)
    })
  } finally {
    await prisma.article.deleteMany({ where: { id: { in: cleanupIds } } })
    await prisma.adminUser.delete({ where: { id: testAdminId } })

    const legacyAfter = await prisma.article.findMany({
      where: { locale: null, translationGroupId: null },
      orderBy: { id: 'asc' },
      select: {
        id: true,
        slug: true,
        title: true,
        published: true,
        coverImage: true,
        locale: true,
        translationGroupId: true,
      },
    })
    await test('all 22 legacy records remain identical', () => {
      assert(legacyBefore.length === 22, `Expected 22 legacy records before, received ${legacyBefore.length}`)
      assert(legacyAfter.length === 22, `Expected 22 legacy records after, received ${legacyAfter.length}`)
      assert(JSON.stringify(legacyAfter) === JSON.stringify(legacyBefore), 'Legacy manifest changed')
    })
    await prisma.$disconnect()
  }

  if (failures > 0) process.exitCode = 1
}

void main()