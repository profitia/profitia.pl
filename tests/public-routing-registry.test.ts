import {
  PUBLIC_ROUTE_ENTRIES,
  getCanonicalPublicPaths,
  getDynamicStaticParams,
  getPublicPath,
  getRedirectEntries,
  resolveCapabilityIdFromSlug,
  resolveCareerIdFromSlug,
  validatePublicRouteRegistry,
} from '@/lib/routing/public-routes'

function assert(condition: boolean, message: string): void {
  if (!condition) throw new Error(message)
}

function assertEqual<T>(actual: T, expected: T, message: string): void {
  if (actual !== expected) {
    throw new Error(`${message}: expected ${String(expected)}, received ${String(actual)}`)
  }
}

function run(): void {
  const validation = validatePublicRouteRegistry()

  const plPaths = PUBLIC_ROUTE_ENTRIES.map((entry) => entry.paths.pl).filter(Boolean)
  const enPaths = PUBLIC_ROUTE_ENTRIES.map((entry) => entry.paths.en).filter(Boolean)

  assertEqual(new Set(plPaths).size, plPaths.length, 'Each PL path must be unique')
  assertEqual(new Set(enPaths).size, enPaths.length, 'Each EN path must be unique')

  assert(validation.duplicateCanonicalPaths.length === 0, `Duplicate canonical paths: ${validation.duplicateCanonicalPaths.join(', ')}`)
  assert(validation.duplicateLegacySources.length === 0, `Duplicate legacy sources: ${validation.duplicateLegacySources.join(', ')}`)
  assert(validation.redirectChains.length === 0, `Redirect chains detected: ${validation.redirectChains.map((entry) => entry.source).join(', ')}`)
  assert(validation.invalidRedirectTargets.length === 0, `Invalid redirect targets: ${validation.invalidRedirectTargets.map((entry) => `${entry.source} -> ${entry.destination}`).join(', ')}`)

  assertEqual(getPublicPath('services:index', 'pl'), '/uslugi', 'PL services listing path')
  assertEqual(getPublicPath('services:index', 'en'), '/en/services', 'EN services listing path')
  assertEqual(getPublicPath('service:analiza-spot', 'pl'), '/uslugi/analiza-spot', 'PL SPOT path')
  assertEqual(getPublicPath('service:analiza-spot', 'en'), '/en/services/spot-analysis', 'EN SPOT path')
  assertEqual(getPublicPath('education:akademia-zakupow', 'en'), '/en/education/procurement-academy', 'EN academy path')
  assertEqual(getPublicPath('job:procurement-consultant', 'pl'), '/kariera/konsultant-zakupowy', 'PL job path')

  assertEqual(resolveCapabilityIdFromSlug('service', 'pl', 'analiza-spot'), 'analiza-spot', 'PL service slug resolves to stable ID')
  assertEqual(resolveCapabilityIdFromSlug('service', 'en', 'spot-analysis'), 'analiza-spot', 'EN service slug resolves to stable ID')
  assertEqual(resolveCapabilityIdFromSlug('education', 'pl', 'negocjacje-zakupowe'), 'warsztaty-negocjacyjne', 'PL education slug resolves to stable ID')
  assertEqual(resolveCapabilityIdFromSlug('education', 'en', 'procurement-academy'), 'akademia-zakupow', 'EN education slug resolves to stable ID')
  assertEqual(resolveCareerIdFromSlug('pl', 'konsultant-zakupowy'), 'procurement-consultant', 'PL job slug resolves to stable ID')
  assertEqual(resolveCareerIdFromSlug('en', 'procurement-consultant'), 'procurement-consultant', 'EN job slug resolves to stable ID')

  const redirects = getRedirectEntries()
  const redirectMap = new Map(redirects.map((entry) => [entry.source, entry.destination]))
  assertEqual(redirectMap.get('/services'), '/uslugi', 'Legacy services listing redirects directly')
  assertEqual(redirectMap.get('/services/subpage-services-1'), '/uslugi/projekty-doradcze', 'Legacy technical PL service path redirects directly')
  assertEqual(redirectMap.get('/services/coaching-zakupowy'), '/uslugi/coaching-zakupowy', 'Legacy PL procurement coaching path redirects directly')
  assertEqual(redirectMap.get('/en/services/subpage-services-1'), '/en/services/advisory-projects', 'Legacy technical EN service path redirects directly')
  assertEqual(redirectMap.get('/career/apply'), '/kariera/aplikuj', 'Legacy application path redirects directly')

  for (const redirect of redirects) {
    assert(!redirectMap.has(redirect.destination), `Redirect destination must not be another legacy path: ${redirect.source} -> ${redirect.destination}`)
  }

  const serviceParamsPl = getDynamicStaticParams('service', 'pl')
  const serviceParamsEn = getDynamicStaticParams('service', 'en')
  const educationParamsPl = getDynamicStaticParams('education', 'pl')
  const careerParamsPl = getDynamicStaticParams('career', 'pl')
  assert(serviceParamsPl.some((entry) => entry.slug === 'analiza-spot'), 'PL service params include localized SPOT slug')
  assert(serviceParamsEn.some((entry) => entry.slug === 'spot-analysis'), 'EN service params include localized SPOT slug')
  assert(educationParamsPl.some((entry) => entry.slug === 'negocjacje-zakupowe'), 'PL education params include localized slug')
  assert(careerParamsPl.some((entry) => entry.slug === 'konsultant-zakupowy'), 'PL career params include localized job slug')

  assert(PUBLIC_ROUTE_ENTRIES.every((entry) => entry.kind !== 'article'), 'Blog/article routes must not be part of this migration registry')

  const canonicalPaths = getCanonicalPublicPaths()
  assert(canonicalPaths.some((entry) => entry.path === '/uslugi'), 'Canonical routes include PL services listing')
  assert(canonicalPaths.some((entry) => entry.path === '/en/services/spot-analysis'), 'Canonical routes include EN SPOT path')
  assert(canonicalPaths.every((entry) => !entry.path.startsWith('/blog') && !entry.path.startsWith('/en/blog')), 'Canonical route feed excludes blog paths')

  const duplicateCrossTypePath = canonicalPaths.find((entry) => entry.path === '/uslugi')
  assert(Boolean(duplicateCrossTypePath), 'Static and dynamic path namespaces should not collide at /uslugi')

  console.log('PUBLIC_ROUTING_REGISTRY=PASS')
}

run()