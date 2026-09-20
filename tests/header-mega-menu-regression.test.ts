import assert from 'node:assert/strict'
import { existsSync, readFileSync } from 'node:fs'
import { test } from 'node:test'
import { HEADER_MENU_CONTENT } from '../lib/navigation/header-menu-content'

const source = (path: string) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8')

test('header menu registry is bilingual and uses the canonical child counts', () => {
  for (const locale of ['pl', 'en'] as const) {
    const content = HEADER_MENU_CONTENT[locale]

    assert.equal(content.advisory.items.length, 3)
    assert.equal(content.advisory.desktopColumns, 3)
    assert.equal(content['digital-services'].items.length, 4)
    assert.equal(content['digital-services'].desktopColumns, 2)

    const routeIds = Object.values(content).flatMap((menu) => menu.items.map((item) => item.routeId))
    assert.equal(new Set(routeIds).size, routeIds.length, `${locale} menu routes must be unique`)

    for (const menu of Object.values(content)) {
      assert.ok(menu.heading.length > 0)

      for (const item of menu.items) {
        assert.ok(item.label.length > 0)
        assert.ok(item.description.length >= 40, `${locale} ${item.label} needs a useful summary`)
        assert.ok(item.imageAlt.length > 0)
        assert.equal(existsSync(new URL(`../public${item.imageSrc}`, import.meta.url)), true, `Missing ${item.imageSrc}`)
      }
    }
  }
})

test('desktop mega menu uses disclosure navigation semantics and lazy-mounted hero previews', () => {
  const header = source('components/layout/Header.tsx')

  assert.match(header, /HEADER_MENU_CONTENT\[currentLocale\]/)
  assert.match(header, /aria-expanded=\{menuOpen\}/)
  assert.match(header, /aria-controls=\{`desktop-menu-\$\{menu\.id\}`\}/)
  assert.match(header, /activeDesktopMenu &&/)
  assert.match(header, /activeDesktopMenu\.desktopColumns === 3 \? 'grid-cols-3' : 'grid-cols-2'/)
  assert.match(header, /max-w-\[216px\]/)
  assert.match(header, /<Image[\s\S]*?src=\{link\.imageSrc\}[\s\S]*?fill[\s\S]*?sizes="216px"/)
  assert.doesNotMatch(header, /sizes=\{activeDesktopMenu\.desktopColumns/)
  assert.doesNotMatch(header, /role="menu"/)
  assert.doesNotMatch(header, /role="menuitem"/)
})

test('mobile menu exposes the same summaries without rendering preview images', () => {
  const header = source('components/layout/Header.tsx')
  const mobileSection = header.split('MOBILE - fullscreen overlay')[1]

  assert.ok(mobileSection)
  assert.match(mobileSection, /\{link\.description\}/)
  assert.doesNotMatch(mobileSection, /src=\{link\.imageSrc\}/)
})

test('page heroes and menu previews share one asset registry', () => {
  assert.match(source('components/pages/ServicesPage.tsx'), /PUBLIC_HERO_ASSETS\.advisoryServices/)
  assert.match(source('components/pages/ProductsPage.tsx'), /PUBLIC_HERO_ASSETS\.advisoryProducts/)
  assert.match(source('components/pages/SpotAnalysisPage.tsx'), /PUBLIC_HERO_ASSETS\.spotAnalysis/)

  const digitalCatalog = source('components/pages/digitalServicesCatalog.ts')
  assert.match(digitalCatalog, /PUBLIC_HERO_ASSETS\.digitalConsulting/)
  assert.match(digitalCatalog, /PUBLIC_HERO_ASSETS\.digitalSpendAnalytics/)
  assert.match(digitalCatalog, /PUBLIC_HERO_ASSETS\.digitalCustomApplications/)
  assert.match(digitalCatalog, /PUBLIC_HERO_ASSETS\.digitalAiAgents/)
})
