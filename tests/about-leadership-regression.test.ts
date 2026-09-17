import { strict as assert } from 'node:assert'
import { existsSync, readFileSync } from 'node:fs'

function source(path: string) {
  return readFileSync(new URL(`../${path}`, import.meta.url), 'utf8')
}

const data = source('lib/team/data.ts')
const row = source('components/team/TeamMemberRow.tsx')
const image = source('components/team/TeamProfileImage.tsx')
const meta = source('components/team/TeamMeta.tsx')
const types = source('lib/team/types.ts')
const about = source('components/pages/AboutPage.tsx')

const featuredNames = [
  'Łukasz Mazurowski',
  'Mariusz Turek',
  'Monika Osiecka',
  'Rafał Gilatowski',
  'Krzysztof Sołtys',
]

for (const name of featuredNames) {
  assert.match(data, new RegExp(`name: '${name}'[\\s\\S]*?featured: true`))
}

for (const path of [
  'public/images/website/Łukasz Mazurowski.png',
  'public/images/website/Mariusz Turek.png',
  'public/images/website/Monika Osiecka.png',
  'public/images/website/Rafał Gilatowski.png',
  'public/images/website/Krzysztof Sołtys bz.png',
]) {
  assert.equal(existsSync(new URL(`../${path}`, import.meta.url)), true, `Missing portrait: ${path}`)
}

assert.match(types, /selectedExperience\?: string\[\]/)
assert.match(types, /professionalBackground\?: string\[\]/)
assert.match(row, /<ul[\s\S]*<li/)
assert.match(row, /aria-label=\{`LinkedIn - \$\{member\.name\}`\}/)
assert.match(row, /target="_blank"/)
assert.match(row, /rel="noopener noreferrer"/)
assert.match(image, /aspect-\[3\/4\] rounded-none/)
assert.match(meta, /locale === 'pl' \? 'lat' : 'years'/)
assert.match(about, /<LeadershipSection members=\{FEATURED_TEAM\} locale=\{locale\}/)
assert.doesNotMatch(`${data}\n${row}\n${image}\n${meta}`, new RegExp(String.fromCodePoint(0x2014)))

console.log('ABOUT_LEADERSHIP_REGRESSION=PASS')
