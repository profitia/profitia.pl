import { randomUUID } from 'node:crypto'
import { prepareContent } from '../components/blog/ArticleLayout'
import { signAdminToken, verifyActiveAdminTokenValue } from '../lib/auth'
import {
  buildArticleJsonLd,
  buildArticleMetadata,
  buildArticleSitemapEntries,
  getArticleAlternates,
  getArticleCanonical,
  getArticleSeoDescription,
  getArticleSeoTitle,
  serializeJsonLd,
} from '../lib/articles/article-seo'

let failures = 0

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

function article(locale: 'PL' | 'EN', overrides: Record<string, unknown> = {}) {
  return {
    locale,
    translationGroupId: randomUUID(),
    slug: locale === 'PL' ? 'polski-slug' : 'english-slug',
    title: locale === 'PL' ? 'Tytuł artykułu' : 'Article title',
    excerpt: 'Article excerpt',
    metaTitle: null,
    metaDescription: null,
    coverImage: null,
    coverImageAlt: null,
    published: true,
    publishedAt: new Date('2026-08-01T10:00:00.000Z'),
    updatedAt: new Date('2026-08-02T11:00:00.000Z'),
    ...overrides,
  }
}

async function main() {
  await test('preview authorization requires a valid token and active admin', async () => {
    process.env.JWT_SECRET = 'phase-5-test-secret'
    const token = signAdminToken('phase-5-admin')
    assert(await verifyActiveAdminTokenValue(null, async () => ({ active: true })) === null, 'Missing token was allowed')
    assert(await verifyActiveAdminTokenValue(token, async () => ({ active: false })) === null, 'Inactive admin was allowed')
    const session = await verifyActiveAdminTokenValue(token, async (id) => id === 'phase-5-admin' ? { active: true } : null)
    assert(session?.sub === 'phase-5-admin', 'Active admin was rejected')
  })

  await test('public renderer prepares draft TOC without removing rich content', () => {
    const content = [
      '<h2>Negotiation context</h2>',
      '<p>Draft paragraph</p>',
      '<h3>Cost drivers</h3>',
      '<table><tbody><tr><td>Steel</td><td>12%</td></tr></tbody></table>',
      '<figure><img src="https://media.example.com/blog/chart.webp" alt="Cost chart"><figcaption>Quarterly cost movement</figcaption></figure>',
    ].join('')
    const prepared = prepareContent(content)
    assert(prepared.tocItems.length === 2, 'H2/H3 TOC was not generated')
    assert(prepared.tocItems[0].level === 2 && prepared.tocItems[1].level === 3, 'TOC levels are incorrect')
    assert(prepared.processedHtml.includes('<table>'), 'Table was removed')
    assert(prepared.processedHtml.includes('https://media.example.com/blog/chart.webp'), 'Inline image was removed')
    assert(prepared.processedHtml.includes('<figcaption>Quarterly cost movement</figcaption>'), 'Caption was removed')
  })

  await test('localized canonicals use distinct PL and EN paths', () => {
    assert(getArticleCanonical('PL', 'polski-slug') === 'https://profitia.pl/blog/polski-slug', 'PL canonical is incorrect')
    assert(getArticleCanonical('EN', 'english-slug') === 'https://profitia.pl/en/blog/english-slug', 'EN canonical is incorrect')
  })

  await test('hreflang requires a real published sibling with the same group', () => {
    const group = randomUUID()
    const pl = article('PL', { translationGroupId: group })
    const en = article('EN', { translationGroupId: group })
    const alternates = getArticleAlternates(pl, en)
    assert(alternates?.pl.endsWith('/blog/polski-slug'), 'PL alternate is missing')
    assert(alternates?.en.endsWith('/en/blog/english-slug'), 'EN alternate is missing')
    assert(getArticleAlternates(pl, { ...en, published: false }) === undefined, 'Draft sibling created hreflang')
    assert(getArticleAlternates(pl, null) === undefined, 'Missing sibling created hreflang')
    assert(getArticleAlternates(pl, { ...en, translationGroupId: randomUUID() }) === undefined, 'Unrelated article created hreflang')
  })

  await test('SEO title and description use non-empty editorial fallbacks', () => {
    const base = article('PL')
    assert(getArticleSeoTitle({ ...base, metaTitle: 'Editorial meta title' }) === 'Editorial meta title', 'metaTitle was ignored')
    assert(getArticleSeoTitle({ ...base, metaTitle: '   ' }) === base.title, 'Empty metaTitle did not fall back')
    assert(getArticleSeoDescription({ ...base, metaDescription: 'Editorial description' }) === 'Editorial description', 'metaDescription was ignored')
    assert(getArticleSeoDescription({ ...base, metaDescription: ' ', excerpt: 'Fallback excerpt' }) === 'Fallback excerpt', 'Excerpt fallback failed')
  })

  await test('OpenGraph uses own canonical and optional cover metadata', () => {
    const metadata = buildArticleMetadata(article('EN', {
      authorName: 'Existing structured author',
      metaTitle: 'English SEO title',
      metaDescription: 'English SEO description',
      coverImage: '/images/blog/cover.jpg',
      coverImageAlt: 'Procurement team',
    }), null)
    const openGraph = metadata.openGraph
    assert((openGraph as { type?: string } | undefined)?.type === 'article', 'OpenGraph type is not article')
    assert(openGraph?.url === 'https://profitia.pl/en/blog/english-slug', 'OpenGraph URL is incorrect')
    assert(Array.isArray(openGraph?.images), 'OpenGraph image is missing')
    assert('authors' in openGraph && Array.isArray(openGraph.authors) && openGraph.authors[0] === 'Existing structured author', 'Existing OpenGraph author was not retained')
    const image = openGraph?.images?.[0]
    assert(typeof image === 'object' && image !== null && 'alt' in image && image.alt === 'Procurement team', 'OpenGraph image alt is missing')
  })

  await test('JSON-LD contains Article dates and own canonical without invented author', () => {
    const jsonLd = buildArticleJsonLd(article('PL', { coverImage: 'https://media.example.com/cover.webp' }))
    assert(jsonLd?.['@type'] === 'Article', 'JSON-LD type is incorrect')
    assert(jsonLd?.datePublished === '2026-08-01T10:00:00.000Z', 'datePublished is incorrect')
    assert(jsonLd?.dateModified === '2026-08-02T11:00:00.000Z', 'dateModified is incorrect')
    assert(!('author' in jsonLd), 'Structured author was invented')
    const page = jsonLd?.mainEntityOfPage as Record<string, unknown>
    assert(page['@id'] === 'https://profitia.pl/blog/polski-slug', 'JSON-LD canonical is incorrect')
  })

  await test('JSON-LD serialization prevents script breakout', () => {
    const serialized = serializeJsonLd({ headline: '</script><script>alert("x")</script>' })
    assert(!serialized.includes('<'), 'Serialized JSON-LD contains a literal less-than sign')
    assert(serialized.includes('\\u003c/script>'), 'Serialized JSON-LD did not escape markup')
  })

  await test('sitemap includes only published localized rows and uses updatedAt', () => {
    const localized = article('PL')
    const entries = buildArticleSitemapEntries([
      localized,
      article('EN', { published: false }),
      article('PL', { translationGroupId: null, slug: 'legacy-slug' }),
    ])
    assert(entries.length === 1, `Expected one sitemap entry, received ${entries.length}`)
    assert(entries[0].url === 'https://profitia.pl/blog/polski-slug', 'Sitemap URL is incorrect')
    assert(entries[0].lastModified === localized.updatedAt, 'Sitemap did not retain updatedAt')
  })

  if (failures > 0) process.exitCode = 1
  else console.log('Phase 5 Blog CMS checks passed')
}

void main()