import assert from 'node:assert/strict'
import { existsSync, readFileSync } from 'node:fs'
import { test } from 'node:test'
import { PUBLIC_HERO_ASSETS } from '../lib/presentation/public-hero-assets'

const source = (path: string) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8')

test('digital service heroes use the four approved local assets', () => {
  const catalog = source('components/pages/digitalServicesCatalog.ts')
  const servicesPage = source('components/pages/ServicesPage.tsx')
  const assets = [
    PUBLIC_HERO_ASSETS.digitalConsulting,
    PUBLIC_HERO_ASSETS.digitalSpendAnalytics,
    PUBLIC_HERO_ASSETS.digitalCustomApplications,
    PUBLIC_HERO_ASSETS.digitalAiAgents,
  ]

  for (const asset of assets) {
    assert.equal(existsSync(new URL(`../public${asset}`, import.meta.url)), true, `Missing ${asset}`)
  }

  assert.match(catalog, /PUBLIC_HERO_ASSETS\.digitalConsulting/)
  assert.match(catalog, /PUBLIC_HERO_ASSETS\.digitalSpendAnalytics/)
  assert.match(catalog, /PUBLIC_HERO_ASSETS\.digitalCustomApplications/)
  assert.match(catalog, /PUBLIC_HERO_ASSETS\.digitalAiAgents/)
  assert.match(servicesPage, /imageSrc=\{copy\.hero\.imageSrc/)
  assert.match(servicesPage, /imageAlt=\{copy\.hero\.imageAlt/)
})

test('advisory services and products heroes use their approved local assets', () => {
  const services = source('components/pages/ServicesPage.tsx')
  const products = source('components/pages/ProductsPage.tsx')

  assert.equal(existsSync(new URL(`../public${PUBLIC_HERO_ASSETS.advisoryServices}`, import.meta.url)), true)
  assert.equal(existsSync(new URL(`../public${PUBLIC_HERO_ASSETS.advisoryProducts}`, import.meta.url)), true)
  assert.match(services, /PUBLIC_HERO_ASSETS\.advisoryServices/)
  assert.match(products, /PUBLIC_HERO_ASSETS\.advisoryProducts/)
})

test('the Polish MCIPS hero button opens the approved PEDP document', () => {
  const education = source('components/pages/EducationPage.tsx')

  assert.equal(existsSync(new URL('../public/docs/PEDP 2026.pdf', import.meta.url)), true)
  assert.match(education, /Zobacz ofertę MCIPS[\s\S]*?\/docs\/PEDP%202026\.pdf/)
  assert.match(education, /target=\{locale === 'pl' \? '_blank'/)
  assert.match(education, /rel=\{locale === 'pl' \? 'noopener noreferrer'/)
})

test('Friendly Workplace section reuses ContentSplit and keeps an accessible external link', () => {
  const career = source('components/pages/CareerListingPage.tsx')
  const contentSplit = source('components/sections/content/ContentSplit.tsx')
  const button = source('components/ui/Button.tsx')

  assert.equal(existsSync(new URL('../public/images/website/Friendly Workspace Profitia.webp', import.meta.url)), true)
  assert.match(career, /<ContentSplit/)
  assert.match(career, /imageLayout="stretch"/)
  assert.doesNotMatch(career, /At PROFITIA/)
  assert.match(career, /At Profitia/)
  assert.match(contentSplit, /imageLayout\?: 'card' \| 'stretch'/)
  assert.match(contentSplit, /lg:items-stretch/)
  assert.match(contentSplit, /lg:aspect-auto lg:h-full lg:min-h-full/)
  assert.match(career, /imagePosition="left"/)
  assert.match(career, /target: '_blank'/)
  assert.match(contentSplit, /noopener noreferrer/)
  assert.match(button, /target=\{target\}/)
  assert.match(button, /rel=\{rel\}/)
})
