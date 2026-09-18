import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

const root = resolve(import.meta.dirname, '..')
const css = readFileSync(resolve(root, 'styles/globals.css'), 'utf8')
const designSystem = readFileSync(resolve(root, 'docs/design-system/VISUAL_CONTEXT_PROFITIA.md'), 'utf8')

const representativeFiles = [
  'components/pages/HomePageContent.tsx',
  'components/pages/HomePageV1Sections.tsx',
  'components/pages/AboutPage.tsx',
  'components/pages/SpotAnalysisPage.tsx',
  'components/pages/BlogListingPage.tsx',
  'components/pages/ContactPage.tsx',
  'components/pages/EducationPage.tsx',
  'components/careers/CareerValues.tsx',
  'components/careers/CareerRoles.tsx',
  'components/careers/CareerRoleCard.tsx',
  'components/careers/CareerWorkStyle.tsx',
  'components/careers/CareerProcess.tsx',
  'components/careers/CareerLife.tsx',
  'components/capabilities/CapabilityPage.tsx',
  'components/capabilities/CapabilityCard.tsx',
  'components/capabilities/CapabilityMethodology.tsx',
  'components/capabilities/CapabilityOutcome.tsx',
  'components/blog/PublicationHero.tsx',
  'components/blog/ArticleRelated.tsx',
  'components/sections/insights/FeaturedArticles.tsx',
  'components/sections/insights/FeaturedArticleCard.tsx',
  'components/team/TeamSection.tsx',
  'components/home/InteractiveTestimonials.tsx',
  'components/ui/LabelTag.tsx',
]

const source = representativeFiles
  .map((file) => readFileSync(resolve(root, file), 'utf8'))
  .join('\n')

assert.match(css, /\.editorial-label\s*\{[\s\S]*text-\[15px\]/)
assert.match(css, /\.editorial-index\s*\{[\s\S]*text-\[15px\]/)
assert.match(css, /\.editorial-box-title\s*\{[\s\S]*text-lg/)
assert.match(css, /\.editorial-action\s*\{[\s\S]*text-\[15px\]/)

assert.ok((source.match(/editorial-label/g) ?? []).length >= 35)
assert.ok((source.match(/editorial-index/g) ?? []).length >= 8)
assert.ok((source.match(/editorial-box-title/g) ?? []).length >= 10)
assert.match(source, /editorial-action/)

assert.doesNotMatch(
  source,
  /(?:text-\[(?:9|10|11)px\]|text-xs)\s+font-(?:medium|semibold|bold)\s+(?:tracking-\[[^\]]+\]\s+uppercase|uppercase\s+tracking-\[[^\]]+\])/
)

assert.match(designSystem, /Canonical editorial labels, numbering, box titles and disclosure actions/)
assert.match(designSystem, /single authority/)

console.log('EDITORIAL_TYPOGRAPHY_REGRESSION=PASS')
