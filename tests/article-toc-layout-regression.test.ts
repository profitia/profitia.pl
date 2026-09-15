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

const tocSource = readFileSync(new URL('../components/blog/ArticleTOCSidebar.tsx', import.meta.url), 'utf8')

test('desktop sticky lives on the outer aside', () => {
  assert.match(tocSource, /<aside className="lg:sticky lg:top-28 lg:self-start">/)
})

test('desktop nav stays visual only without sticky or fixed classes', () => {
  assert.match(tocSource, /<nav\s+aria-label=\{navigationLabel\}\s+className="hidden lg:block"/)
  assert.doesNotMatch(tocSource, /className="hidden lg:block[^"]*sticky/)
  assert.doesNotMatch(tocSource, /className="hidden lg:block[^"]*fixed/)
})

test('toc positioning does not use manual scroll listeners or fixed fallback', () => {
  assert.doesNotMatch(tocSource, /addEventListener\('scroll'/)
  assert.doesNotMatch(tocSource, /position:\s*['"]fixed['"]/)
})