import { readFileSync } from 'node:fs'
import { strict as assert } from 'node:assert'

function test(name: string, run: () => void) {
  try {
    run()
    console.log(`PASS ${name}`)
  } catch (error) {
    console.error(`FAIL ${name}`)
    throw error
  }
}

const servicesPageSource = readFileSync(new URL('../components/pages/ServicesPage.tsx', import.meta.url), 'utf8')
const digitalServicesCatalogSource = readFileSync(new URL('../components/pages/digitalServicesCatalog.ts', import.meta.url), 'utf8')
const digitalServicesPagePlSource = readFileSync(new URL('../app/(public)/uslugi-digital/[slug]/page.tsx', import.meta.url), 'utf8')
const digitalServicesPageEnSource = readFileSync(new URL('../app/(public)/en/digital-services/[slug]/page.tsx', import.meta.url), 'utf8')
const headerSource = readFileSync(new URL('../components/layout/Header.tsx', import.meta.url), 'utf8')
const capabilityHeroSource = readFileSync(new URL('../components/capabilities/CapabilityHero.tsx', import.meta.url), 'utf8')

test('digital services pages reuse shared ServicesPage renderer', () => {
  assert.match(digitalServicesPagePlSource, /<ServicesPage[\s\S]*routeId=\{getCapabilityRouteId\('digital-service', capabilityId\)\}/)
  assert.match(digitalServicesPageEnSource, /<ServicesPage[\s\S]*routeId=\{getCapabilityRouteId\('digital-service', capabilityId\)\}/)
})

test('shared ServicesPage keeps canonical services composition', () => {
  assert.match(servicesPageSource, /<PublicJsonLd[\s\S]*<CapabilityHero[\s\S]*<ServicesContainer domains=\{resolvedDomains\}[\s\S]*<CapabilityCTA/)
})

test('digital services catalog stays in shared accordion data model', () => {
  assert.match(digitalServicesCatalogSource, /type DigitalServicesPageContent = \{[\s\S]*domains: CatalogDomain\[\]/)
  assert.match(digitalServicesCatalogSource, /'ai-agents'/)
})

test('header reuses one desktop menu mechanism for advisory and digital services', () => {
  assert.match(headerSource, /type DesktopMenuId = 'advisory' \| 'digital-services' \| null/)
  assert.match(headerSource, /const desktopMenus: HeaderMenuDefinition\[] = \[/)
  assert.match(headerSource, /desktopMenus\.map\(\(menu\) => \{/)
  assert.doesNotMatch(headerSource, /const \[digitalServicesOpen, setDigitalServicesOpen\]/)
})

test('services hero image source remains unchanged for reused pages', () => {
  assert.match(capabilityHeroSource, /imageSrc = '\/images\/website\/Profitia_10\.jpg'/)
})