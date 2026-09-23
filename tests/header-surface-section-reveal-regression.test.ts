import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { test } from 'node:test'

const source = (path: string) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8')

test('desktop submenu is flush with the header and has no separate outline', () => {
  const header = source('components/layout/Header.tsx')

  assert.match(header, /desktopNav} relative h-full/)
  assert.match(header, /className="flex h-full items-center"/)
  assert.match(header, /className="absolute left-0 top-full z-50"/)
  assert.match(header, /overflow-hidden rounded-b-2xl \$\{HEADER_SURFACE_CLASS\}/)
  assert.doesNotMatch(header, /top-full z-50 pt-/)
  assert.doesNotMatch(header, /overflow-hidden rounded-2xl border \$\{HEADER_SURFACE_CLASS\}/)
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
