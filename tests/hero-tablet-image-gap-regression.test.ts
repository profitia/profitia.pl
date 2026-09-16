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

const mobileHeroImageSource = readFileSync(new URL('../components/ui/MobileHeroImage.tsx', import.meta.url), 'utf8')
const educationHeroSource = readFileSync(new URL('../components/pages/EducationPage.tsx', import.meta.url), 'utf8')
const capabilityHeroSource = readFileSync(new URL('../components/capabilities/CapabilityHero.tsx', import.meta.url), 'utf8')
const careerHeroSource = readFileSync(new URL('../components/careers/CareerHero.tsx', import.meta.url), 'utf8')
const homeHeroSource = readFileSync(new URL('../components/pages/HomePageContent.tsx', import.meta.url), 'utf8')
const aboutHeroSource = readFileSync(new URL('../components/pages/AboutPage.tsx', import.meta.url), 'utf8')
const articleHeroSource = readFileSync(new URL('../components/blog/ArticleHero.tsx', import.meta.url), 'utf8')

const BREAKPOINTS = {
  md: 768,
  lg: 1024,
} as const

const SPLIT_BLEED_HEROES = [
  { name: 'EducationPage', source: educationHeroSource },
  { name: 'CapabilityHero', source: capabilityHeroSource },
  { name: 'CareerHero', source: careerHeroSource },
  { name: 'HomePageContent', source: homeHeroSource },
  { name: 'AboutPage', source: aboutHeroSource },
] as const

const SPLIT_BLEED_WIDTHS = [767, 768, 810, 834, 900, 1023, 1024, 1366] as const
const ARTICLE_WIDTHS = [767, 768, 1023, 1024] as const

function extractHideFromClass(source: string, key: 'md' | 'lg') {
  const match = source.match(new RegExp(`${key}: '([^']+)'`))

  assert.ok(match, `Expected HIDE_FROM_CLASS to define ${key}`)
  return match[1]
}

function extractSplitBleedDesktopWrapperClasses(source: string, name: string) {
  const match = source.match(/<(?:RevealWrapper|motion\.div|div)\b[^>]*className="([^"]*)"[^>]*aria-hidden="true"[^>]*>\s*(?:<div[^>]*>\s*)?<Image/)

  assert.ok(match, `Expected ${name} to expose a desktop hero image wrapper with aria-hidden and Image`)
  return match[1]
}

function extractArticleDesktopWrapperClasses(source: string) {
  const match = source.match(/\/\* Desktop cover image \*\/[\s\S]*?<div className="([^"]*)">\s*<Image/)

  assert.ok(match, 'Expected ArticleHero to expose a desktop cover image wrapper')
  return match[1]
}

function extractMobileHeroInvocation(source: string, name: string) {
  const match = source.match(/<MobileHeroImage[\s\S]*?\/>/)

  assert.ok(match, `Expected ${name} to render MobileHeroImage`)
  return match[0]
}

function isVisibleAtWidth(className: string, width: number) {
  const tokens = className.split(/\s+/).filter(Boolean)
  let visible = !tokens.includes('hidden')

  for (const token of tokens) {
    if (token === 'md:hidden' && width >= BREAKPOINTS.md) {
      visible = false
    }

    if (token === 'md:block' && width >= BREAKPOINTS.md) {
      visible = true
    }

    if (token === 'lg:hidden' && width >= BREAKPOINTS.lg) {
      visible = false
    }

    if (token === 'lg:block' && width >= BREAKPOINTS.lg) {
      visible = true
    }
  }

  return visible
}

test('MobileHeroImage uses a static Tailwind hide map with md default', () => {
  assert.match(mobileHeroImageSource, /const HIDE_FROM_CLASS = \{[\s\S]*md: 'md:hidden',[\s\S]*lg: 'lg:hidden',[\s\S]*\} as const/)
  assert.match(mobileHeroImageSource, /hideFrom = 'md'/)
  assert.match(mobileHeroImageSource, /HIDE_FROM_CLASS\[hideFrom\]/)
  assert.doesNotMatch(mobileHeroImageSource, /\$\{hideFrom\}:hidden/)
})

test('split-bleed heroes keep the mobile image until lg', () => {
  for (const hero of SPLIT_BLEED_HEROES) {
    const mobileHeroInvocation = extractMobileHeroInvocation(hero.source, hero.name)

    assert.match(mobileHeroInvocation, /hideFrom="lg"/, `${hero.name} should keep MobileHeroImage active until lg`)
  }
})

test('split-bleed desktop wrappers keep hidden and lg:block on the same hero image element', () => {
  for (const hero of SPLIT_BLEED_HEROES) {
    const desktopWrapperClasses = extractSplitBleedDesktopWrapperClasses(hero.source, hero.name)

    assert.match(desktopWrapperClasses, /\bhidden\b/, `${hero.name} desktop hero wrapper must include hidden`)
    assert.match(desktopWrapperClasses, /\blg:block\b/, `${hero.name} desktop hero wrapper must include lg:block`)
    assert.doesNotMatch(desktopWrapperClasses, /\bmd:block\b/, `${hero.name} desktop hero wrapper must not switch to md:block`)
    assert.doesNotMatch(desktopWrapperClasses, /\bxl:block\b/, `${hero.name} desktop hero wrapper must not switch to xl:block`)
  }
})

test('split-bleed handoff stays continuous with no gap and no overlap from 767px to 1366px', () => {
  const mobileWrapperClasses = extractHideFromClass(mobileHeroImageSource, 'lg')

  for (const hero of SPLIT_BLEED_HEROES) {
    const mobileHeroInvocation = extractMobileHeroInvocation(hero.source, hero.name)
    const desktopWrapperClasses = extractSplitBleedDesktopWrapperClasses(hero.source, hero.name)

    assert.match(mobileHeroInvocation, /hideFrom="lg"/, `${hero.name} must opt into the lg mobile handoff`)

    for (const width of SPLIT_BLEED_WIDTHS) {
      const mobileVisible = isVisibleAtWidth(mobileWrapperClasses, width)
      const desktopVisible = isVisibleAtWidth(desktopWrapperClasses, width)

      if (width < BREAKPOINTS.lg) {
        assert.equal(mobileVisible, true, `${hero.name} mobile hero should stay visible at ${width}px`)
        assert.equal(desktopVisible, false, `${hero.name} desktop hero should stay hidden at ${width}px`)
      } else {
        assert.equal(mobileVisible, false, `${hero.name} mobile hero should hide at ${width}px`)
        assert.equal(desktopVisible, true, `${hero.name} desktop hero should show at ${width}px`)
      }

      assert.notEqual(mobileVisible, desktopVisible, `${hero.name} should never hide both or show both at ${width}px`)
    }
  }
})

test('article hero keeps default md handoff', () => {
  const articleMobileInvocation = extractMobileHeroInvocation(articleHeroSource, 'ArticleHero')
  const articleDesktopWrapperClasses = extractArticleDesktopWrapperClasses(articleHeroSource)
  const articleMobileWrapperClasses = extractHideFromClass(mobileHeroImageSource, 'md')

  assert.doesNotMatch(articleMobileInvocation, /hideFrom=/, 'ArticleHero should rely on MobileHeroImage default md handoff')
  assert.doesNotMatch(articleHeroSource, /hideFrom="lg"/)
  assert.match(articleDesktopWrapperClasses, /\bhidden\b/, 'ArticleHero desktop wrapper must include hidden')
  assert.match(articleDesktopWrapperClasses, /\bmd:block\b/, 'ArticleHero desktop wrapper must include md:block')
  assert.doesNotMatch(articleDesktopWrapperClasses, /\blg:block\b/, 'ArticleHero desktop wrapper should not move to lg:block')

  for (const width of ARTICLE_WIDTHS) {
    const mobileVisible = isVisibleAtWidth(articleMobileWrapperClasses, width)
    const desktopVisible = isVisibleAtWidth(articleDesktopWrapperClasses, width)

    if (width < BREAKPOINTS.md) {
      assert.equal(mobileVisible, true, `ArticleHero mobile cover should stay visible at ${width}px`)
      assert.equal(desktopVisible, false, `ArticleHero desktop cover should stay hidden at ${width}px`)
    } else {
      assert.equal(mobileVisible, false, `ArticleHero mobile cover should hide at ${width}px`)
      assert.equal(desktopVisible, true, `ArticleHero desktop cover should show at ${width}px`)
    }

    assert.notEqual(mobileVisible, desktopVisible, `ArticleHero should never hide both or show both at ${width}px`)
  }
})