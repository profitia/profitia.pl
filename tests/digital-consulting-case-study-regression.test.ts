import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { test } from 'node:test'

const source = (path: string) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8')

test('SPOT and Digital Consulting reuse the same three case-study sections', () => {
  const sharedSections = source('components/sections/case-study/DiagnosisCaseStudySections.tsx')
  const spot = source('components/pages/SpotAnalysisPage.tsx')
  const services = source('components/pages/ServicesPage.tsx')

  for (const component of ['CaseStudyStartingPoint', 'CaseStudyScope', 'CaseStudyResult']) {
    assert.match(sharedSections, new RegExp(`export function ${component}`))
    assert.match(spot, new RegExp(`<${component}`))
    assert.match(services, new RegExp(`<${component}`))
  }
})

test('starting-point title uses the full width of its content column', () => {
  const sharedSections = source('components/sections/case-study/DiagnosisCaseStudySections.tsx')
  const startingPoint = sharedSections.match(
    /export function CaseStudyStartingPoint[\s\S]*?export function CaseStudyScope/,
  )?.[0] ?? ''

  const titleTag = startingPoint.match(/<h2 className="[^"]+">/)?.[0] ?? ''

  assert.match(titleTag, /className="w-full /)
  assert.doesNotMatch(titleTag, /max-w-\[/)
})

test('Digital Consulting alone receives the bilingual case study', () => {
  const catalog = source('components/pages/digitalServicesCatalog.ts')
  const plPage = source('app/(public)/uslugi-digital/[slug]/page.tsx')
  const enPage = source('app/(public)/en/digital-services/[slug]/page.tsx')

  assert.equal((catalog.match(/caseStudy:\s*\{/g) ?? []).length, 2)
  assert.match(catalog, /Punkt wyjścia/)
  assert.match(catalog, /Zakres diagnozy/)
  assert.match(catalog, /Rezultat/)
  assert.match(catalog, /Starting point/)
  assert.match(catalog, /Assessment scope/)
  assert.match(catalog, /Outcome/)
  assert.match(catalog, /Source-to-Contract \(S2C\)/)
  assert.match(plPage, /caseStudy=\{content\.caseStudy\}/)
  assert.match(enPage, /caseStudy=\{content\.caseStudy\}/)
})

test('diagnosis scope cards are explicitly static without hover affordance', () => {
  const sharedSections = source('components/sections/case-study/DiagnosisCaseStudySections.tsx')
  const premiumCard = source('components/ui/PremiumCard.tsx')

  assert.match(sharedSections, /<PremiumCard[\s\S]*interactive=\{false\}/)
  assert.match(premiumCard, /interactive\?: boolean/)
  assert.match(premiumCard, /interactive = true/)
  assert.match(premiumCard, /interactive[\s\S]*hover:bg-/)
  assert.match(premiumCard, /: ''/)
})

test('technology advisory sits between assessment scope and outcome in static process cards', () => {
  const services = source('components/pages/ServicesPage.tsx')
  const container = source('components/pages/ServicesContainer.tsx')
  const catalog = source('components/pages/digitalServicesCatalog.ts')

  assert.match(
    services,
    /<CaseStudyScope[\s\S]*<ServicesContainer domains=\{resolvedDomains\} variant="process" \/>[\s\S]*<CaseStudyResult/,
  )
  assert.match(container, /variant\?: 'accordion' \| 'process'/)
  assert.match(container, /variant === 'process'/)
  assert.match(container, /lg:grid-cols-3/)
  assert.match(container, /editorial-index/)

  const processVariant = container.match(/if \(variant === 'process'\)[\s\S]*?\n  return \(/)?.[0] ?? ''
  assert.doesNotMatch(processVariant, /<button/)

  for (const title of ['Przegląd', 'Strategie', 'Wdrożenie', 'Review', 'Strategy', 'Implementation']) {
    assert.match(catalog, new RegExp(`title: '${title}'`))
  }
})
