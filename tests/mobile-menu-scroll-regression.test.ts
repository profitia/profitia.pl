import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

const headerSource = readFileSync(resolve(process.cwd(), 'components/layout/Header.tsx'), 'utf8')

assert.match(
  headerSource,
  /mobilePanel:\s*\n\s*'[^']*overflow-y-auto[^']*overscroll-contain[^']*touch-pan-y[^']*\[-webkit-overflow-scrolling:touch\][^']*'/,
  'The mobile navigation panel must own vertical touch scrolling, contain overscroll, and preserve iOS momentum scrolling.',
)

assert.match(
  headerSource,
  /className=\{`min-h-full flex-none flex flex-col px-6 pt-\[100px\] pb-10/,
  'The mobile navigation content must be allowed to exceed the viewport and create a scroll range.',
)

assert.match(
  headerSource,
  /document\.body\.style\.overflow = mobileOpen \? 'hidden' : ''/,
  'The document behind the open mobile navigation must remain scroll-locked.',
)

assert.doesNotMatch(
  headerSource,
  /touchmove[\s\S]{0,160}preventDefault\(/,
  'The header must not globally cancel touchmove events needed by the mobile navigation scroller.',
)

console.log('MOBILE_MENU_SCROLL_REGRESSION=PASS')
