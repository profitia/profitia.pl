import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { test } from 'node:test'

const homePageSource = readFileSync('components/pages/HomePageContent.tsx', 'utf8')
const v1Source = readFileSync('components/pages/HomePageV1Sections.tsx', 'utf8')
const rootLayoutSource = readFileSync('app/layout.tsx', 'utf8')
const robotsSource = readFileSync('app/robots.ts', 'utf8')
const middlewareSource = readFileSync('middleware.ts', 'utf8')
const originalDraftSource = readFileSync(
  'app/(public)/draft/homepage-original/page.tsx',
  'utf8',
)

test('Polish homepage V1 starts after the unchanged hero and CIPS modules', () => {
  const heroIndex = homePageSource.indexOf('HERO')
  const cipsIndex = homePageSource.indexOf('CIPS FUTURES EUROPE')
  const v1Index = homePageSource.indexOf("locale === 'pl'")

  assert.ok(heroIndex >= 0)
  assert.ok(cipsIndex > heroIndex)
  assert.ok(v1Index > cipsIndex)
  assert.match(homePageSource, /<HomePageV1Sections dict=\{dict\} \/>/)
})

test('English homepage remains on the existing content path', () => {
  assert.match(homePageSource, /locale === 'pl' && variant === 'current' \? \([\s\S]*<HomePageV1Sections[\s\S]*\) : \([\s\S]*PROBLEM/)
  assert.match(homePageSource, /d\.problem\.items/)
  assert.match(homePageSource, /d\.process\.steps/)
  assert.match(homePageSource, /d\.impact\.cards/)
})

test('the original Polish homepage remains available as a noindex draft', () => {
  assert.match(homePageSource, /variant = 'current'/)
  assert.match(homePageSource, /locale === 'pl' && variant === 'current'/)
  assert.match(originalDraftSource, /variant="original"/)
  assert.match(originalDraftSource, /index: false/)
  assert.match(originalDraftSource, /follow: false/)
  assert.match(originalDraftSource, /nocache: true/)
})

test('V1 reuses the existing offer, blog and testimonial components', () => {
  assert.match(v1Source, /<HomePillars /)
  assert.match(v1Source, /<FeaturedArticles/)
  assert.match(v1Source, /articles=\{d\.insights\.articles\}/)
  assert.match(v1Source, /<InteractiveTestimonials/)
  assert.match(v1Source, /items=\{d\.testimonial\.items\}/)
})

test('V1 links the three offer areas and final CTA through the canonical route registry', () => {
  assert.match(v1Source, /getPublicPath\('services:index', 'pl'\)/)
  assert.match(v1Source, /getCapabilityPath\('digital-service', 'digital-consulting', 'pl'\)/)
  assert.match(v1Source, /getPublicPath\('education:index', 'pl'\)/)
  assert.match(v1Source, /href=\{getPublicPath\('contact', 'pl'\)\}/)
  assert.doesNotMatch(v1Source, /mailto:/)
})

test('V1 contains the presentation-backed identity, operating model and proof', () => {
  assert.match(v1Source, /Strategiczna perspektywa\. Butikowy sposób pracy\. Odpowiedzialność za wynik\./)
  assert.match(v1Source, /Trwały wynik wymaga więcej niż jednej udanej negocjacji/)
  assert.match(v1Source, /Od diagnozy do wdrożonego wyniku/)
  assert.match(v1Source, /val: '15\+'/)
  assert.match(v1Source, /val: '>7 mln EUR'/)
  assert.match(v1Source, /val: '~2 mln EUR'/)
})

test('the public V1 service can block duplicate-content indexing without changing production defaults', () => {
  assert.match(rootLayoutSource, /process\.env\.PROFITIA_PREVIEW_SITE === 'true'/)
  assert.match(rootLayoutSource, /index: false/)
  assert.match(rootLayoutSource, /follow: false/)
  assert.match(robotsSource, /process\.env\.PROFITIA_PREVIEW_SITE === 'true'/)
  assert.match(robotsSource, /disallow: '\/'/)
  assert.match(robotsSource, /allow: '\/'/)
})

test('preview hands data-backed blog and contact routes to production', () => {
  assert.match(middlewareSource, /PROFITIA_PREVIEW_SITE === 'true'/)
  assert.match(middlewareSource, /https:\/\/profitia-pl\.onrender\.com/)
  for (const path of ['/blog', '/kontakt', '/en/blog', '/en/contact']) {
    assert.ok(
      middlewareSource.includes(`'${path}'`),
      `preview production handoff should cover ${path}`,
    )
  }
  assert.match(middlewareSource, /productionUrl\.search = request\.nextUrl\.search/)
})
