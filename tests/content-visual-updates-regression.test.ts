import assert from 'node:assert/strict'
import { existsSync, readFileSync } from 'node:fs'
import { test } from 'node:test'

const source = (path: string) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8')

test('ProfiNews copy and enlarged announcement strip are canonical in PL and EN', () => {
  const strip = source('components/layout/NewsletterStrip.tsx')
  const pl = source('dictionaries/pl.json')
  const en = source('dictionaries/en.json')

  assert.match(strip, /Zapisz się na ProfiNews - jedyny taki profesjonalny newsletter zakupowy/)
  assert.match(strip, /Chcę otrzymywać ProfiNews/)
  assert.match(strip, /Subscribe to ProfiNews - a one-of-a-kind professional procurement newsletter/)
  assert.match(strip, /Send me ProfiNews/)
  assert.match(strip, /min-h-\[57px\]/)
  assert.match(strip, /sm:text-\[16\.5px\]/)
  assert.match(pl, /Newsletter ProfiNews/)
  assert.match(pl, /comiesięczny newsletter ProfiNews/)
  assert.match(en, /ProfiNews Newsletter/)
  assert.match(en, /monthly ProfiNews newsletter/)
})

test('homepage imagery, process layout and next-step copy follow the approved scope', () => {
  const v1 = source('components/pages/HomePageV1Sections.tsx')
  const home = source('components/pages/HomePageContent.tsx')
  const pl = source('dictionaries/pl.json')
  const en = source('dictionaries/en.json')

  assert.match(pl, /\/images\/website\/Profitia_8\.jpg/)
  assert.match(pl, /\/images\/website\/Profitia_40\.jpg/)
  assert.match(en, /\/images\/website\/Profitia_8\.jpg/)
  assert.match(en, /\/images\/website\/Profitia_40\.jpg/)
  assert.match(v1, /\/images\/website\/Profitia_25\.jpg/)
  assert.match(home, /\/images\/website\/Profitia_25\.jpg/)
  assert.match(v1, /problem z dostawcą/)
  assert.match(v1, /najszybsze mierzalne rezultaty/)
  assert.match(en, /fastest measurable results/)
})

test('education CIPS narrative is bilingual and reuses the project-section layout', () => {
  const education = source('components/pages/EducationPage.tsx')

  assert.match(education, /\/images\/website\/Profitia_38\.jpg/)
  assert.match(education, /CIPS wyznacza standard profesji zakupowej/)
  assert.match(education, /Certyfikacja Korporacyjna CIPS/)
  assert.match(education, /MCIPS i Procurement Executive Development Programme/)
  assert.match(education, /CIPS sets the standard for the profession/)
  assert.match(education, /CIPS Corporate Certification/)
  assert.match(education, /MCIPS and the Procurement Executive Development Programme/)
  assert.match(education, /lg:grid-cols-\[minmax\(0,0\.92fr\)_minmax\(0,1\.08fr\)\]/)
})

test('career gallery contains the nine approved unique local images', () => {
  const career = source('components/careers/CareerLife.tsx')
  const expected = [2, 25, 26, 29, 33, 34, 35, 7, 9].map((number) => `/images/website/Profitia_${number}.jpg`)

  for (const path of expected) {
    assert.equal(existsSync(new URL(`../public${path}`, import.meta.url)), true, `Missing ${path}`)
    assert.equal(career.split(path).length - 1, 1, `${path} should appear exactly once`)
  }
  assert.doesNotMatch(career, /Profitia_30\.jpg/)
})

test('about, contact, CIPS logo and EN navigation changes stay within shared architecture', () => {
  const team = source('lib/team/data.ts')
  const contact = source('components/pages/ContactPage.tsx')
  const footer = source('components/layout/Footer.tsx')
  const header = source('components/layout/Header.tsx')

  assert.match(team, /Krzysztof Sołtys'[\s\S]*?yearsExperience: '16\+'/)
  assert.match(team, /Specjalizuje się w przekładaniu strategii biznesowej/)
  assert.doesNotMatch(team.match(/id: 'krzysztof-soltys'[\s\S]*?order: 5/)?.[0] ?? '', /\bwspieram\b|\bProwadziłem\b/)
  assert.match(contact, /\/images\/website\/Profitia_39\.jpg/)
  assert.match(footer, /\/images\/website\/CIPS LOGO\.png/)
  assert.doesNotMatch(footer, /cips-footer\.png/)
  assert.match(header, /\.\.\.\(!isEN \? \[\{ href: blogHref, label: dict\.nav\.blog \}\] : \[\]\)/)
  assert.match(footer, /\.\.\.\(!isEN \? \[\{ href: blogHref, label: dict\.nav\.blog \}\] : \[\]\)/)
})

test('article previous/next navigation is canonical for both public locales', () => {
  const navigation = source('components/blog/ArticleNavigation.tsx')
  const page = source('components/pages/BlogArticlePage.tsx')
  const queries = source('lib/articles/queries.ts')
  const plRoute = source('app/(public)/blog/[slug]/page.tsx')
  const enRoute = source('app/(public)/en/blog/[slug]/page.tsx')

  assert.match(navigation, /Poprzedni artykuł/)
  assert.match(navigation, /Następny artykuł/)
  assert.match(navigation, /Previous article/)
  assert.match(navigation, /Next article/)
  assert.match(page, /<ArticleLayout[\s\S]*<ArticleNavigation[\s\S]*<ArticleAuthor/)
  assert.match(queries, /findPublishedArticleNeighbors/)
  assert.match(queries, /publishedAt: 'desc'/)
  assert.match(plRoute, /findPublishedArticleNeighbors\(article\.id, 'PL'\)/)
  assert.match(enRoute, /findPublishedArticleNeighbors\(article\.id, 'EN'\)/)
})
