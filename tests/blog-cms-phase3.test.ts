import { randomUUID } from 'node:crypto'
import { PrismaClient } from '@prisma/client'
import { NextRequest } from 'next/server'
import { POST as createArticle } from '../app/api/articles/route'
import { PATCH as updateArticle } from '../app/api/articles/[id]/route'
import { POST as publishArticle } from '../app/api/articles/[id]/publish/route'
import { getSchema } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { TableKit } from '@tiptap/extension-table'
import { articleContentExtensions } from '../components/admin/RichTextEditor'
import { prepareContent } from '../components/blog/ArticleLayout'
import {
  hasMeaningfulArticleContent,
  sanitizeArticleHtml,
} from '../lib/articles/article-content'
import { findPublishedArticleBySlug } from '../lib/articles/queries'
import { signAdminToken } from '../lib/auth'

const prisma = new PrismaClient()
const cleanupIds: string[] = []
const testAdminId = `phase-3-admin-${randomUUID()}`
let failures = 0

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
  process.env.JWT_SECRET ??= 'phase-3-test-secret'
  return `admin_token=${signAdminToken(testAdminId)}`
}

function request(url: string, method: string, body?: Record<string, unknown>) {
  return new NextRequest(`http://localhost${url}`, {
    method,
    headers: {
      ...(body && { 'content-type': 'application/json' }),
      cookie: authCookie(),
      origin: 'http://localhost',
    },
    ...(body && { body: JSON.stringify(body) }),
  })
}

function route(handler: RouteHandler, id: string, method: string, body?: Record<string, unknown>) {
  return handler(request(`/api/articles/${id}`, method, body), {
    params: Promise.resolve({ id }),
  })
}

function draftData(slug: string, content: string) {
  return {
    locale: 'PL',
    title: 'Phase 3 security article',
    slug,
    excerpt: 'Phase 3 excerpt',
    content,
    publishedAt: null,
    metaTitle: null,
    metaDescription: null,
    category: null,
    readingTime: null,
    coverImage: null,
    featured: false,
  }
}

async function createDraft(slug: string, content: string) {
  const response = await createArticle(request('/api/articles', 'POST', draftData(slug, content)))
  assert(response.status === 201, `Expected create 201, received ${response.status}`)
  const payload = await response.json() as { article: { id: string; content: string } }
  cleanupIds.push(payload.article.id)
  return payload.article
}

async function main() {
  const suffix = randomUUID()
  const legacyBefore = await prisma.article.findMany({
    where: { locale: null, translationGroupId: null },
    orderBy: { id: 'asc' },
  })

  await prisma.adminUser.create({
    data: {
      id: testAdminId,
      email: `${testAdminId}@example.invalid`,
      name: 'Phase 3 Admin',
      passwordHash: 'test-only',
      active: true,
    },
  })

  try {
    await test('semantic article HTML survives sanitization', () => {
      const source = '<h2 id="overview">Overview</h2><h3>Details</h3><p><strong>Bold</strong> and <em>italic</em></p><ul><li>One</li></ul><ol><li>Two</li></ol><blockquote>Quote</blockquote><table><tbody><tr><th scope="col">A</th><td colspan="2">B</td></tr></tbody></table>'
      const clean = sanitizeArticleHtml(source)
      for (const fragment of ['<h2 id="overview">', '<h3>', '<strong>', '<em>', '<ul>', '<ol>', '<blockquote>', '<table>', '<th scope="col">', '<td colspan="2">']) {
        assert(clean.includes(fragment), `Sanitizer removed semantic fragment ${fragment}`)
      }
    })

    await test('XSS tags attributes and protocols are removed', () => {
      const clean = sanitizeArticleHtml('<p class="x" style="color:red" onclick="alert(1)">Safe</p><script>alert(1)</script><iframe src="https://www.youtube.com/embed/x"></iframe><object data="x"></object><a href="javascript:alert(1)">Bad</a><img src="data:image/svg+xml,x" onerror="alert(1)">')
      for (const unsafe of ['class=', 'style=', 'onclick=', '<script', '<iframe', '<object', 'javascript:', 'data:image', 'onerror=']) {
        assert(!clean.includes(unsafe), `Unsafe HTML survived: ${unsafe}`)
      }
      assert(clean.includes('<p>Safe</p>'), 'Safe paragraph was removed')
    })

    await test('safe links and future image markup are normalized', () => {
      const clean = sanitizeArticleHtml('<a href="https://profitia.pl" target="_blank">Profitia</a><img src="/images/chart.png" alt="Chart">')
      assert(clean.includes('rel="noopener noreferrer"'), 'Blank target was not hardened')
      assert(clean.includes('src="/images/chart.png"'), 'Relative image path was removed')
      assert(clean.includes('loading="lazy"'), 'Image loading default was not added')
    })

    await test('empty editor documents are not meaningful content', () => {
      for (const empty of ['', '<p></p>', '<p><br></p>', '<p>&nbsp;</p>', '<p>&#173;</p>', '<p>&#847;</p>', '<p>&#1564;</p>', '<p>&#8203;</p>', '<p>&#8238;</p>', '<p>&#65039;</p>', '<img src="   ">', '<script>alert(1)</script>']) {
        assert(!hasMeaningfulArticleContent(empty), `Empty HTML was accepted: ${empty}`)
      }
      assert(hasMeaningfulArticleContent('<p>Article text</p>'), 'Text content was rejected')
      assert(hasMeaningfulArticleContent('<img src="/images/chart.png" alt="Chart">'), 'Image content was rejected')
    })

    await test('editor schema preserves sanitizer-approved rich content', () => {
      const schema = getSchema([
        StarterKit.configure({ heading: { levels: [2, 3] } }),
        TableKit.configure({ table: { resizable: false } }),
        ...articleContentExtensions,
      ])
      assert(schema.nodes.image !== undefined, 'Editor schema is missing images')
      assert(schema.nodes.figure !== undefined, 'Editor schema is missing figures')
      assert(schema.nodes.figcaption !== undefined, 'Editor schema is missing figure captions')
      assert(schema.nodes.heading.spec.attrs?.id !== undefined, 'Editor schema drops heading IDs')
      assert(schema.nodes.tableHeader.spec.attrs?.scope !== undefined, 'Editor schema drops table header scope')
    })

    let maliciousDraftId = ''
    await test('create API stores sanitized content', async () => {
      const article = await createDraft(
        `phase3-malicious-${suffix}`,
        '<h2 onclick="alert(1)">Safe heading</h2><script>alert(1)</script><p>Body</p>',
      )
      maliciousDraftId = article.id
      assert(article.content === '<h2>Safe heading</h2><p>Body</p>', `Unexpected stored HTML: ${article.content}`)
      const stored = await prisma.article.findUniqueOrThrow({ where: { id: article.id } })
      assert(stored.content === article.content, 'API response differs from stored sanitized HTML')
    })

    await test('update API cannot bypass server sanitization', async () => {
      const response = await route(
        updateArticle,
        maliciousDraftId,
        'PATCH',
        draftData(`phase3-malicious-${suffix}`, '<p onmouseover="x()">Updated</p><iframe src="https://evil.example"></iframe>'),
      )
      assert(response.status === 200, `Expected update 200, received ${response.status}`)
      const payload = await response.json() as { article: { content: string } }
      assert(payload.article.content === '<p>Updated</p>', `Update stored unsafe HTML: ${payload.article.content}`)
    })

    await test('publish rejects content emptied by sanitization', async () => {
      const article = await createDraft(`phase3-empty-${suffix}`, '<script>alert(1)</script><iframe src="https://evil.example"></iframe>')
      assert(article.content === '', 'Dangerous-only draft was not reduced to empty content')
      const response = await route(publishArticle, article.id, 'POST')
      assert(response.status === 422, `Expected publish 422, received ${response.status}`)
    })

    await test('semantic HTML round-trips to the public article query', async () => {
      const html = '<h2 id="results">Results</h2><p><strong>Better</strong> preparation.</p><table><tbody><tr><th>Metric</th><td>Value</td></tr></tbody></table>'
      const article = await createDraft(`phase3-round-trip-${suffix}`, html)
      const publishResponse = await route(publishArticle, article.id, 'POST')
      assert(publishResponse.status === 200, `Expected publish 200, received ${publishResponse.status}`)
      const publicArticle = await findPublishedArticleBySlug(`phase3-round-trip-${suffix}`, 'PL')
      assert(publicArticle?.content === html, 'Public query changed sanitized semantic HTML')
    })

    await test('H2 and H3 continue to generate the table of contents', () => {
      const prepared = prepareContent('<h2>First section</h2><p>Body</p><h3 id="detail">Detail</h3>')
      assert(prepared.tocItems.length === 2, 'Expected two TOC entries')
      assert(prepared.tocItems[0].id === 'first-section', 'H2 generated an unexpected ID')
      assert(prepared.tocItems[0].level === 2, 'H2 generated an unexpected level')
      assert(prepared.tocItems[1].id === 'detail', 'Existing H3 ID was not preserved')
      assert(prepared.processedHtml.includes('<h2 id="first-section">'), 'Processed HTML is missing the H2 ID')
    })
  } finally {
    if (cleanupIds.length > 0) {
      await prisma.article.deleteMany({ where: { id: { in: cleanupIds } } })
    }

    const legacyAfter = await prisma.article.findMany({
      where: { locale: null, translationGroupId: null },
      orderBy: { id: 'asc' },
    })
    await test('all legacy records remain byte-for-byte unchanged', () => {
      assert(legacyBefore.length === 22, `Expected 22 legacy records, received ${legacyBefore.length}`)
      assert(JSON.stringify(legacyAfter) === JSON.stringify(legacyBefore), 'Legacy records changed')
    })
    await prisma.adminUser.delete({ where: { id: testAdminId } })
    await prisma.$disconnect()
  }

  if (failures > 0) {
    process.exitCode = 1
  } else {
    console.log('Phase 3 Blog CMS checks passed')
  }
}

void main()