import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { test } from 'node:test'

const homePageSource = readFileSync('components/pages/HomePageContent.tsx', 'utf8')
const v1Source = readFileSync('components/pages/HomePageV1Sections.tsx', 'utf8')

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
  assert.match(homePageSource, /locale === 'pl' \? \([\s\S]*<HomePageV1Sections[\s\S]*\) : \([\s\S]*PROBLEM/)
  assert.match(homePageSource, /d\.problem\.items/)
  assert.match(homePageSource, /d\.process\.steps/)
  assert.match(homePageSource, /d\.impact\.cards/)
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
