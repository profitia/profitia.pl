import {
  PUBLIC_ROUTE_ENTRIES,
  getCanonicalPublicPaths,
  getDynamicStaticParams,
  getLocalizedSiblingPath,
  getPublicPath,
  getRedirectEntries,
  getStablePublicRoutePath,
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

const PL_SERVICE_PATHS = [
  ['projekty-doradcze', '/doradztwo/uslugi/projekty-doradcze', '/services/projekty-doradcze', '/en/advisory/services/advisory-projects'],
  ['interim-management', '/doradztwo/uslugi/zarzadzanie-tymczasowe-zakupami', '/services/interim-management', '/en/advisory/services/interim-management'],
  ['procurement-transformation', '/doradztwo/uslugi/transformacja-funkcji-zakupowej', '/services/procurement-transformation', '/en/advisory/services/procurement-transformation'],
  ['category-strategy', '/doradztwo/uslugi/strategia-kategorii-zakupowej', '/services/category-strategy', '/en/advisory/services/category-strategy'],
  ['operating-model-design', '/doradztwo/uslugi/model-operacyjny-zakupow', '/services/operating-model-design', '/en/advisory/services/operating-model-design'],
  ['procurement-pmo', '/doradztwo/uslugi/pmo-zakupowe', '/services/procurement-pmo', '/en/advisory/services/procurement-pmo'],
  ['should-cost-analysis', '/doradztwo/uslugi/analiza-kosztow-should-cost', '/services/should-cost-analysis', '/en/advisory/services/should-cost-analysis'],
  ['negotiation-preparation', '/doradztwo/uslugi/przygotowanie-do-negocjacji', '/services/negotiation-preparation', '/en/advisory/services/negotiation-preparation'],
  ['supplier-benchmarking', '/doradztwo/uslugi/benchmarking-dostawcow', '/services/supplier-benchmarking', '/en/advisory/services/supplier-benchmarking'],
  ['supplier-negotiation-support', '/doradztwo/uslugi/wsparcie-negocjacji-z-dostawcami', '/services/supplier-negotiation-support', '/en/advisory/services/supplier-negotiation-support'],
  ['spend-cube', '/doradztwo/uslugi/analiza-wydatkow-spend-cube', '/services/spend-cube', '/en/advisory/services/spend-cube'],
  ['spend-analytics', '/doradztwo/uslugi/analityka-wydatkow', '/services/spend-analytics', '/en/advisory/services/spend-analytics'],
  ['procurement-dashboards', '/doradztwo/uslugi/dashboardy-zakupowe', '/services/procurement-dashboards', '/en/advisory/services/procurement-dashboards'],
  ['supplier-intelligence', '/doradztwo/uslugi/analiza-dostawcow', '/services/supplier-intelligence', '/en/advisory/services/supplier-intelligence'],
  ['procurement-kpi-systems', '/doradztwo/uslugi/systemy-kpi-zakupow', '/services/procurement-kpi-systems', '/en/advisory/services/procurement-kpi-systems'],
  ['coaching-zakupowy', '/doradztwo/uslugi/coaching-zakupowy', '/services/coaching-zakupowy', '/en/advisory/services/procurement-coaching'],
] as const

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

  assertEqual(getPublicPath('services:index', 'pl'), '/doradztwo/uslugi', 'PL services listing path')
  assertEqual(getPublicPath('services:index', 'en'), '/en/advisory/services', 'EN services listing path')
  assertEqual(getPublicPath('products:index', 'pl'), '/doradztwo/produkty', 'PL products listing path')
  assertEqual(getPublicPath('products:index', 'en'), '/en/advisory/products', 'EN products listing path')
  assertEqual(getPublicPath('service:analiza-spot', 'pl'), '/doradztwo/analiza-spot', 'PL SPOT path')
  assertEqual(getPublicPath('service:analiza-spot', 'en'), '/en/advisory/spot-analysis', 'EN SPOT path')
  assertEqual(getPublicPath('education:akademia-zakupow', 'en'), '/en/education/procurement-academy', 'EN academy path')
  assertEqual(getPublicPath('job:procurement-consultant', 'pl'), '/kariera/konsultant-zakupowy', 'PL job path')

  for (const [entityId, plPath, stablePath, enPath] of PL_SERVICE_PATHS) {
    assertEqual(getPublicPath(`service:${entityId}`, 'pl'), plPath, `PL service path for ${entityId}`)
    assertEqual(getPublicPath(`service:${entityId}`, 'en'), enPath, `EN service path for ${entityId}`)
    assertEqual(getStablePublicRoutePath(plPath), stablePath, `Stable key from PL path for ${entityId}`)
    assertEqual(getStablePublicRoutePath(enPath), stablePath, `Stable key from EN path for ${entityId}`)
  }

  assertEqual(getLocalizedSiblingPath('/doradztwo/analiza-spot', 'en'), '/en/advisory/spot-analysis', 'SPOT PL maps to EN sibling')
  assertEqual(getLocalizedSiblingPath('/en/advisory/spot-analysis', 'pl'), '/doradztwo/analiza-spot', 'SPOT EN maps to PL sibling')
  assertEqual(getLocalizedSiblingPath('/doradztwo/uslugi/projekty-doradcze', 'en'), '/en/advisory/services/advisory-projects', 'Service PL maps to EN sibling')
  assertEqual(getLocalizedSiblingPath('/en/advisory/services/procurement-coaching', 'pl'), '/doradztwo/uslugi/coaching-zakupowy', 'Service EN maps to PL sibling')

  assertEqual(resolveCapabilityIdFromSlug('service', 'pl', 'analiza-spot'), 'analiza-spot', 'PL service slug resolves to stable ID')
  assertEqual(resolveCapabilityIdFromSlug('service', 'en', 'spot-analysis'), 'analiza-spot', 'EN service slug resolves to stable ID')
  assertEqual(resolveCapabilityIdFromSlug('service', 'pl', 'coaching-zakupowy'), 'coaching-zakupowy', 'PL coaching slug resolves to stable ID')
  assertEqual(resolveCapabilityIdFromSlug('service', 'en', 'procurement-coaching'), 'coaching-zakupowy', 'EN coaching slug resolves to stable ID')
  assertEqual(resolveCapabilityIdFromSlug('education', 'pl', 'negocjacje-zakupowe'), 'warsztaty-negocjacyjne', 'PL education slug resolves to stable ID')
  assertEqual(resolveCapabilityIdFromSlug('education', 'en', 'procurement-academy'), 'akademia-zakupow', 'EN education slug resolves to stable ID')
  assertEqual(resolveCareerIdFromSlug('pl', 'konsultant-zakupowy'), 'procurement-consultant', 'PL job slug resolves to stable ID')
  assertEqual(resolveCareerIdFromSlug('en', 'procurement-consultant'), 'procurement-consultant', 'EN job slug resolves to stable ID')

  const redirects = getRedirectEntries()
  const redirectMap = new Map(redirects.map((entry) => [entry.source, entry.destination]))
  assertEqual(redirectMap.get('/services'), '/doradztwo/uslugi', 'Legacy services listing redirects directly')
  assertEqual(redirectMap.get('/uslugi'), '/doradztwo/uslugi', 'Current PL services listing redirects directly')
  assertEqual(redirectMap.get('/products'), '/doradztwo/produkty', 'Legacy products listing redirects directly')
  assertEqual(redirectMap.get('/produkty'), '/doradztwo/produkty', 'Current PL products listing redirects directly')
  assertEqual(redirectMap.get('/en/services'), '/en/advisory/services', 'Current EN services listing redirects directly')
  assertEqual(redirectMap.get('/en/products'), '/en/advisory/products', 'Current EN products listing redirects directly')
  assertEqual(redirectMap.get('/services/subpage-services-1'), '/doradztwo/uslugi/projekty-doradcze', 'Legacy technical PL service path redirects directly')
  assertEqual(redirectMap.get('/services/coaching-zakupowy'), '/doradztwo/uslugi/coaching-zakupowy', 'Legacy PL procurement coaching path redirects directly')
  assertEqual(redirectMap.get('/uslugi/coaching-zakupowy'), '/doradztwo/uslugi/coaching-zakupowy', 'Current PL procurement coaching path redirects directly')
  assertEqual(redirectMap.get('/en/services/subpage-services-1'), '/en/advisory/services/advisory-projects', 'Legacy technical EN service path redirects directly')
  assertEqual(redirectMap.get('/uslugi/analiza-spot'), '/doradztwo/analiza-spot', 'Current PL SPOT path redirects directly')
  assertEqual(redirectMap.get('/en/services/spot-analysis'), '/en/advisory/spot-analysis', 'Current EN SPOT path redirects directly')
  assertEqual(redirectMap.get('/career/apply'), '/kariera/aplikuj', 'Legacy application path redirects directly')

  assertEqual(getStablePublicRoutePath('/doradztwo/analiza-spot'), '/services/analiza-spot', 'Stable key preserved for PL SPOT')
  assertEqual(getStablePublicRoutePath('/en/advisory/spot-analysis'), '/services/analiza-spot', 'Stable key preserved for EN SPOT')
  assertEqual(getStablePublicRoutePath('/doradztwo/uslugi/coaching-zakupowy'), '/services/coaching-zakupowy', 'Stable key preserved for PL coaching')
  assertEqual(getStablePublicRoutePath('/en/advisory/services/procurement-coaching'), '/services/coaching-zakupowy', 'Stable key preserved for EN coaching')
  assertEqual(getStablePublicRoutePath('/doradztwo/produkty'), '/products', 'Stable key preserved for products listing')

  for (const redirect of redirects) {
    assert(!redirectMap.has(redirect.destination), `Redirect destination must not be another legacy path: ${redirect.source} -> ${redirect.destination}`)
  }

  const serviceParamsPl = getDynamicStaticParams('service', 'pl')
  const serviceParamsEn = getDynamicStaticParams('service', 'en')
  const educationParamsPl = getDynamicStaticParams('education', 'pl')
  const careerParamsPl = getDynamicStaticParams('career', 'pl')
  assertEqual(serviceParamsPl.length, 16, 'PL service params contain only regular services')
  assertEqual(serviceParamsEn.length, 16, 'EN service params contain only regular services')
  assert(!serviceParamsPl.some((entry) => entry.slug === 'analiza-spot'), 'PL service params exclude SPOT slug')
  assert(!serviceParamsEn.some((entry) => entry.slug === 'spot-analysis'), 'EN service params exclude SPOT slug')
  assert(serviceParamsPl.some((entry) => entry.slug === 'projekty-doradcze'), 'PL service params include regular service slug')
  assert(serviceParamsEn.some((entry) => entry.slug === 'advisory-projects'), 'EN service params include regular service slug')
  assert(educationParamsPl.some((entry) => entry.slug === 'negocjacje-zakupowe'), 'PL education params include localized slug')
  assert(careerParamsPl.some((entry) => entry.slug === 'konsultant-zakupowy'), 'PL career params include localized job slug')

  assert(PUBLIC_ROUTE_ENTRIES.every((entry) => entry.kind !== 'article'), 'Blog/article routes must not be part of this migration registry')

  const canonicalPaths = getCanonicalPublicPaths()
  assertEqual(canonicalPaths.length, 80, 'Canonical route count stays unchanged')
  assert(canonicalPaths.some((entry) => entry.path === '/doradztwo/uslugi'), 'Canonical routes include PL services listing')
  assert(canonicalPaths.some((entry) => entry.path === '/doradztwo/produkty'), 'Canonical routes include PL products listing')
  assert(canonicalPaths.some((entry) => entry.path === '/doradztwo/analiza-spot'), 'Canonical routes include PL SPOT path')
  assert(canonicalPaths.some((entry) => entry.path === '/en/advisory/services'), 'Canonical routes include EN services listing')
  assert(canonicalPaths.some((entry) => entry.path === '/en/advisory/products'), 'Canonical routes include EN products listing')
  assert(canonicalPaths.some((entry) => entry.path === '/en/advisory/spot-analysis'), 'Canonical routes include EN SPOT path')
  assert(!canonicalPaths.some((entry) => entry.path === '/doradztwo'), 'Canonical routes exclude advisory namespace root in PL')
  assert(!canonicalPaths.some((entry) => entry.path === '/en/advisory'), 'Canonical routes exclude advisory namespace root in EN')
  assert(!canonicalPaths.some((entry) => entry.path === '/doradztwo/uslugi/analiza-spot'), 'Canonical routes exclude nested SPOT duplicate in PL')
  assert(!canonicalPaths.some((entry) => entry.path === '/en/advisory/services/spot-analysis'), 'Canonical routes exclude nested SPOT duplicate in EN')
  assert(canonicalPaths.every((entry) => !entry.path.startsWith('/blog') && !entry.path.startsWith('/en/blog')), 'Canonical route feed excludes blog paths')
  assertEqual(redirects.length, 84, 'Redirect count reflects previous legacy plus moved canonicals')

  console.log('PUBLIC_ROUTING_REGISTRY=PASS')
}

run()