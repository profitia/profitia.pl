import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { test } from 'node:test'

const source = (path: string) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8')

test('desktop submenu is flush with the header and uses one canonical opaque surface', () => {
  const header = source('components/layout/Header.tsx')

  assert.match(header, /const MEGA_MENU_SURFACE_CLASS = 'bg-white'/)
  assert.match(header, /desktopNav} relative h-full/)
  assert.match(header, /className="flex h-full items-center"/)
  assert.match(header, /className="absolute left-0 top-full z-50"/)
  assert.match(header, /overflow-hidden rounded-b-2xl \$\{MEGA_MENU_SURFACE_CLASS\}/)
  assert.match(header, /<div className="px-5 py-4">/)
  assert.doesNotMatch(header, /top-full z-50 pt-/)
  assert.doesNotMatch(header, /overflow-hidden rounded-b-2xl \$\{HEADER_SURFACE_CLASS\}/)
  assert.doesNotMatch(header, /border-b border-gray-100 px-5 py-4/)
  assert.doesNotMatch(header, /overflow-hidden rounded-2xl border \$\{MEGA_MENU_SURFACE_CLASS\}/)
})

test('opening a desktop submenu does not change the header surface', () => {
  const header = source('components/layout/Header.tsx')

  assert.match(header, /const showScrolled = scrolled \|\| isLegalPage/)
  assert.match(header, /showScrolled\s*\? `\$\{HEADER_SURFACE_CLASS\}/)
  assert.doesNotMatch(header, /showStableHeaderSurface/)
  assert.doesNotMatch(header, /showScrolled \|\| Boolean\(activeDesktopMenu\)/)
})

test('public pages use one canonical reveal authority per semantic section', () => {
  const shell = source('components/layout/PublicShell.tsx')
  const controller = source('components/layout/SectionRevealController.tsx')
  const wrapper = source('components/ui/RevealWrapper.tsx')
  const styles = source('styles/globals.css')

  assert.match(shell, /<main className="min-h-screen" data-section-reveal-root>/)
  assert.match(shell, /<SectionRevealController \/>/)
  assert.match(controller, /main\[data-section-reveal-root\] section/)
  assert.match(controller, /section\.classList\.add\('section-reveal'\)/)
  assert.match(controller, /entry\.target\.classList\.add\('section-reveal-active'\)/)
  assert.match(controller, /prefers-reduced-motion: reduce/)

  assert.doesNotMatch(wrapper, /IntersectionObserver/)
  assert.doesNotMatch(wrapper, /reveal-delay-/)
  assert.doesNotMatch(wrapper, /classList\.add\('active'\)/)

  assert.match(styles, /\.section-reveal > \*/)
  assert.match(styles, /\.section-reveal\.section-reveal-active > \*/)
  assert.match(styles, /@media \(prefers-reduced-motion: reduce\)/)
  assert.doesNotMatch(styles, /\.reveal-delay-/)
})
