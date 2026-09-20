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

function extractResponsiveClassMapValue(key: string): string {
  const pattern = new RegExp(`${key}:\\s*'([^']+)'`)
  const match = headerSource.match(pattern)
  assert.ok(match, `Missing responsive class for ${key}`)
  return match[1]
}

function inferDisplayAtWidth(classes: string, width: number): 'none' | 'flex' | 'inline-flex' | 'unknown' {
  const tokens = new Set(classes.split(/\s+/).filter(Boolean))
  let display: 'none' | 'flex' | 'inline-flex' | 'unknown' = 'unknown'

  if (tokens.has('hidden')) display = 'none'
  if (tokens.has('flex')) display = 'flex'
  if (tokens.has('inline-flex')) display = 'inline-flex'

  if (width >= 1024) {
    if (tokens.has('lg:hidden')) display = 'none'
    if (tokens.has('lg:flex')) display = 'flex'
    if (tokens.has('lg:inline-flex')) display = 'inline-flex'
  }

  return display
}

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
  assert.match(headerSource, /type DesktopMenuId = HeaderMenuId \| null/)
  assert.match(headerSource, /HEADER_MENU_CONTENT\[currentLocale\]/)
  assert.match(headerSource, /const desktopMenus: HeaderMenuDefinition\[] = \[/)
  assert.match(headerSource, /desktopMenus\.map\(\(menu\) => \{/)
  assert.match(headerSource, /activeDesktopMenu\.links\.map\(\(link, index\) =>/)
  assert.doesNotMatch(headerSource, /const \[digitalServicesOpen, setDigitalServicesOpen\]/)
})

test('header responsive classes stay static and analyzable by Tailwind', () => {
  assert.doesNotMatch(headerSource, /\$\{DESKTOP_NAV_BREAKPOINT\}:/)
  assert.doesNotMatch(headerSource, /DESKTOP_NAV_BREAKPOINT/)

  const desktopNav = extractResponsiveClassMapValue('desktopNav')
  const desktopLanguage = extractResponsiveClassMapValue('desktopLanguage')
  const desktopCta = extractResponsiveClassMapValue('desktopCta')
  const mobileToggle = extractResponsiveClassMapValue('mobileToggle')
  const mobilePanel = extractResponsiveClassMapValue('mobilePanel')

  assert.match(desktopNav, /hidden lg:flex/)
  assert.match(desktopLanguage, /hidden lg:flex/)
  assert.match(desktopCta, /hidden lg:inline-flex/)
  assert.match(mobileToggle, /lg:hidden/)
  assert.match(mobilePanel, /lg:hidden/)
})

test('header handoff stays gap-free at the actual class breakpoint', () => {
  const desktopNav = extractResponsiveClassMapValue('desktopNav')
  const desktopLanguage = extractResponsiveClassMapValue('desktopLanguage')
  const desktopCta = extractResponsiveClassMapValue('desktopCta')
  const mobileToggle = extractResponsiveClassMapValue('mobileToggle')
  const mobilePanel = extractResponsiveClassMapValue('mobilePanel')

  const desktop1023 = inferDisplayAtWidth(desktopNav, 1023)
  const desktopLanguage1023 = inferDisplayAtWidth(desktopLanguage, 1023)
  const desktopCta1023 = inferDisplayAtWidth(desktopCta, 1023)
  const mobileToggle1023 = inferDisplayAtWidth(mobileToggle, 1023)
  const mobilePanel1023 = inferDisplayAtWidth(mobilePanel, 1023)
  const desktopVisible1023 = desktop1023 !== 'none'
  const mobileToggleVisible1023 = mobileToggle1023 !== 'none'
  const mobilePanelVisible1023 = mobilePanel1023 !== 'none'

  assert.equal(desktop1023, 'none')
  assert.equal(desktopLanguage1023, 'none')
  assert.equal(desktopCta1023, 'none')
  assert.equal(mobileToggle1023, 'flex')
  assert.equal(mobilePanel1023, 'flex')
  assert.notEqual(desktopVisible1023, mobileToggleVisible1023)
  assert.notEqual(desktopVisible1023, mobilePanelVisible1023)

  const desktop1024 = inferDisplayAtWidth(desktopNav, 1024)
  const desktopLanguage1024 = inferDisplayAtWidth(desktopLanguage, 1024)
  const desktopCta1024 = inferDisplayAtWidth(desktopCta, 1024)
  const mobileToggle1024 = inferDisplayAtWidth(mobileToggle, 1024)
  const mobilePanel1024 = inferDisplayAtWidth(mobilePanel, 1024)
  const desktopVisible1024 = desktop1024 !== 'none'
  const mobileToggleVisible1024 = mobileToggle1024 !== 'none'
  const mobilePanelVisible1024 = mobilePanel1024 !== 'none'

  assert.equal(desktop1024, 'flex')
  assert.equal(desktopLanguage1024, 'flex')
  assert.equal(desktopCta1024, 'inline-flex')
  assert.equal(mobileToggle1024, 'none')
  assert.equal(mobilePanel1024, 'none')
  assert.notEqual(desktopVisible1024, mobileToggleVisible1024)
  assert.notEqual(desktopVisible1024, mobilePanelVisible1024)
})

test('services hero image source remains unchanged for reused pages', () => {
  assert.match(capabilityHeroSource, /imageSrc = '\/images\/website\/Profitia_10\.jpg'/)
})
