export type PublicLocale = 'pl' | 'en'

export type PublicRouteKind =
  | 'static'
  | 'service'
  | 'digital-service'
  | 'education'
  | 'career'
  | 'legal'
  | 'article'

export type PublicRouteId = string

type PublicPathMap = Partial<Record<PublicLocale, string>>

export interface PublicRouteEntry {
  id: PublicRouteId
  kind: PublicRouteKind
  paths: PublicPathMap
  entityId?: string
  legacyPaths?: string[]
  indexable?: boolean
}

export interface PublicRedirectEntry {
  source: string
  destination: string
}

const ROOT_PATH = '/'

function normalizePath(path: string): string {
  if (!path) return ROOT_PATH
  if (path === ROOT_PATH) return ROOT_PATH
  const withSlash = path.startsWith('/') ? path : `/${path}`
  return withSlash.length > 1 ? withSlash.replace(/\/+$/, '') : ROOT_PATH
}

function joinPath(...parts: string[]): string {
  return normalizePath(parts.filter(Boolean).join('/').replace(/\/+/g, '/'))
}

const PL_LISTING_PATHS = {
  advisory: '/doradztwo',
  services: '/doradztwo/uslugi',
  digitalServices: '/uslugi-digital',
  products: '/doradztwo/produkty',
  education: '/rozwoj-kompetencji',
  career: '/kariera',
} as const

const EN_LISTING_PATHS = {
  advisory: '/en/advisory',
  services: '/en/advisory/services',
  digitalServices: '/en/digital-services',
  products: '/en/advisory/products',
  education: '/en/education',
  career: '/en/career',
} as const

const STATIC_ROUTE_ENTRIES: PublicRouteEntry[] = [
  {
    id: 'home',
    kind: 'static',
    paths: { pl: '/', en: '/en' },
    indexable: true,
  },
  {
    id: 'services:index',
    kind: 'static',
    paths: { pl: '/doradztwo/uslugi', en: '/en/advisory/services' },
    legacyPaths: ['/services', '/uslugi', '/en/services'],
    indexable: true,
  },
  {
    id: 'products:index',
    kind: 'static',
    paths: { pl: '/doradztwo/produkty', en: '/en/advisory/products' },
    legacyPaths: ['/products', '/produkty', '/en/products'],
    indexable: true,
  },
  {
    id: 'education:index',
    kind: 'static',
    paths: { pl: '/rozwoj-kompetencji', en: '/en/education' },
    legacyPaths: ['/education'],
    indexable: true,
  },
  {
    id: 'career:index',
    kind: 'career',
    paths: { pl: '/kariera', en: '/en/career' },
    legacyPaths: ['/career'],
    indexable: true,
  },
  {
    id: 'career:apply',
    kind: 'career',
    paths: { pl: '/kariera/aplikuj', en: '/en/career/apply' },
    legacyPaths: ['/career/apply'],
    indexable: false,
  },
  {
    id: 'about',
    kind: 'static',
    paths: { pl: '/o-nas', en: '/en/about' },
    legacyPaths: ['/about'],
    indexable: true,
  },
  {
    id: 'contact',
    kind: 'static',
    paths: { pl: '/kontakt', en: '/en/contact' },
    legacyPaths: ['/contact'],
    indexable: true,
  },
  {
    id: 'privacy',
    kind: 'legal',
    paths: { pl: '/polityka-prywatnosci', en: '/en/privacy' },
    legacyPaths: ['/privacy'],
    indexable: true,
  },
  {
    id: 'cookies',
    kind: 'legal',
    paths: { pl: '/polityka-plikow-cookies', en: '/en/cookies' },
    legacyPaths: ['/cookies'],
    indexable: true,
  },
  {
    id: 'terms',
    kind: 'legal',
    paths: { pl: '/regulamin', en: '/en/terms' },
    legacyPaths: ['/terms'],
    indexable: true,
  },
]

type CapabilityRouteSeed = {
  entityId: string
  plSlug: string
  enSlug: string
  kind: 'service' | 'education' | 'digital-service'
  placement?: 'listing' | 'advisory-root'
  legacyPaths?: string[]
}

const CAPABILITY_ROUTE_SEEDS: CapabilityRouteSeed[] = [
  {
    entityId: 'projekty-doradcze',
    kind: 'service',
    plSlug: 'projekty-doradcze',
    enSlug: 'advisory-projects',
    legacyPaths: ['/services/projekty-doradcze', '/services/subpage-services-1', '/uslugi/projekty-doradcze', '/en/services/projekty-doradcze', '/en/services/subpage-services-1', '/en/advisory-projects'],
  },
  { entityId: 'interim-management', kind: 'service', plSlug: 'zarzadzanie-tymczasowe-zakupami', enSlug: 'interim-management', legacyPaths: ['/services/interim-management', '/uslugi/zarzadzanie-tymczasowe-zakupami', '/en/services/interim-management'] },
  { entityId: 'procurement-transformation', kind: 'service', plSlug: 'transformacja-funkcji-zakupowej', enSlug: 'procurement-transformation', legacyPaths: ['/services/procurement-transformation', '/uslugi/transformacja-funkcji-zakupowej', '/en/services/procurement-transformation'] },
  { entityId: 'category-strategy', kind: 'service', plSlug: 'strategia-kategorii-zakupowej', enSlug: 'category-strategy', legacyPaths: ['/services/category-strategy', '/uslugi/strategia-kategorii-zakupowej', '/en/services/category-strategy'] },
  { entityId: 'operating-model-design', kind: 'service', plSlug: 'model-operacyjny-zakupow', enSlug: 'operating-model-design', legacyPaths: ['/services/operating-model-design', '/uslugi/model-operacyjny-zakupow', '/en/services/operating-model-design'] },
  { entityId: 'procurement-pmo', kind: 'service', plSlug: 'pmo-zakupowe', enSlug: 'procurement-pmo', legacyPaths: ['/services/procurement-pmo', '/uslugi/pmo-zakupowe', '/en/services/procurement-pmo'] },
  { entityId: 'analiza-spot', kind: 'service', placement: 'advisory-root', plSlug: 'analiza-spot', enSlug: 'spot-analysis', legacyPaths: ['/services/analiza-spot', '/uslugi/analiza-spot', '/en/services/analiza-spot', '/en/services/spot-analysis'] },
  { entityId: 'should-cost-analysis', kind: 'service', plSlug: 'analiza-kosztow-should-cost', enSlug: 'should-cost-analysis', legacyPaths: ['/services/should-cost-analysis', '/uslugi/analiza-kosztow-should-cost', '/en/services/should-cost-analysis'] },
  { entityId: 'negotiation-preparation', kind: 'service', plSlug: 'przygotowanie-do-negocjacji', enSlug: 'negotiation-preparation', legacyPaths: ['/services/negotiation-preparation', '/uslugi/przygotowanie-do-negocjacji', '/en/services/negotiation-preparation'] },
  { entityId: 'supplier-benchmarking', kind: 'service', plSlug: 'benchmarking-dostawcow', enSlug: 'supplier-benchmarking', legacyPaths: ['/services/supplier-benchmarking', '/uslugi/benchmarking-dostawcow', '/en/services/supplier-benchmarking'] },
  { entityId: 'supplier-negotiation-support', kind: 'service', plSlug: 'wsparcie-negocjacji-z-dostawcami', enSlug: 'supplier-negotiation-support', legacyPaths: ['/services/supplier-negotiation-support', '/uslugi/wsparcie-negocjacji-z-dostawcami', '/en/services/supplier-negotiation-support'] },
  { entityId: 'spend-cube', kind: 'service', plSlug: 'analiza-wydatkow-spend-cube', enSlug: 'spend-cube', legacyPaths: ['/services/spend-cube', '/uslugi/analiza-wydatkow-spend-cube', '/en/services/spend-cube'] },
  { entityId: 'spend-analytics', kind: 'service', plSlug: 'analityka-wydatkow', enSlug: 'spend-analytics', legacyPaths: ['/services/spend-analytics', '/uslugi/analityka-wydatkow', '/en/services/spend-analytics'] },
  { entityId: 'procurement-dashboards', kind: 'service', plSlug: 'dashboardy-zakupowe', enSlug: 'procurement-dashboards', legacyPaths: ['/services/procurement-dashboards', '/uslugi/dashboardy-zakupowe', '/en/services/procurement-dashboards'] },
  { entityId: 'supplier-intelligence', kind: 'service', plSlug: 'analiza-dostawcow', enSlug: 'supplier-intelligence', legacyPaths: ['/services/supplier-intelligence', '/uslugi/analiza-dostawcow', '/en/services/supplier-intelligence'] },
  { entityId: 'procurement-kpi-systems', kind: 'service', plSlug: 'systemy-kpi-zakupow', enSlug: 'procurement-kpi-systems', legacyPaths: ['/services/procurement-kpi-systems', '/uslugi/systemy-kpi-zakupow', '/en/services/procurement-kpi-systems'] },
  { entityId: 'coaching-zakupowy', kind: 'service', plSlug: 'coaching-zakupowy', enSlug: 'procurement-coaching', legacyPaths: ['/services/coaching-zakupowy', '/uslugi/coaching-zakupowy', '/en/services/coaching-zakupowy', '/en/services/procurement-coaching'] },
  { entityId: 'akademia-zakupow', kind: 'education', plSlug: 'akademia-zakupow', enSlug: 'procurement-academy', legacyPaths: ['/education/akademia-zakupow', '/en/education/akademia-zakupow'] },
  { entityId: 'procurement-excellence', kind: 'education', plSlug: 'doskonalosc-zakupowa', enSlug: 'procurement-excellence', legacyPaths: ['/education/procurement-excellence'] },
  { entityId: 'strategic-sourcing', kind: 'education', plSlug: 'strategiczny-sourcing', enSlug: 'strategic-sourcing', legacyPaths: ['/education/strategic-sourcing'] },
  { entityId: 'warsztaty-negocjacyjne', kind: 'education', plSlug: 'negocjacje-zakupowe', enSlug: 'procurement-negotiations', legacyPaths: ['/education/warsztaty-negocjacyjne', '/en/education/warsztaty-negocjacyjne'] },
  { entityId: 'advanced-negotiations', kind: 'education', plSlug: 'zaawansowane-negocjacje', enSlug: 'advanced-negotiations', legacyPaths: ['/education/advanced-negotiations'] },
  { entityId: 'fact-based-negotiation', kind: 'education', plSlug: 'negocjacje-oparte-na-faktach', enSlug: 'fact-based-negotiation', legacyPaths: ['/education/fact-based-negotiation'] },
  { entityId: 'spend-analytics-training', kind: 'education', plSlug: 'analityka-wydatkow', enSlug: 'spend-analytics-training', legacyPaths: ['/education/spend-analytics-training'] },
  { entityId: 'supplier-financial-analysis', kind: 'education', plSlug: 'analiza-finansowa-dostawcow', enSlug: 'supplier-financial-analysis', legacyPaths: ['/education/supplier-financial-analysis'] },
  { entityId: 'in-company-workshops', kind: 'education', plSlug: 'warsztaty-dla-firm', enSlug: 'in-company-workshops', legacyPaths: ['/education/in-company-workshops'] },
  { entityId: 'procurement-mentoring', kind: 'education', plSlug: 'mentoring-zakupowy', enSlug: 'procurement-mentoring', legacyPaths: ['/education/procurement-mentoring'] },
  { entityId: 'digital-consulting', kind: 'digital-service', plSlug: 'digital-consulting', enSlug: 'digital-consulting' },
  { entityId: 'spend-analytics', kind: 'digital-service', plSlug: 'spend-analytics', enSlug: 'spend-analytics' },
  { entityId: 'custom-applications', kind: 'digital-service', plSlug: 'dedykowane-aplikacje', enSlug: 'custom-applications' },
  { entityId: 'ai-agents', kind: 'digital-service', plSlug: 'agenci-ai', enSlug: 'ai-agents' },
]

const JOB_ROUTE_ENTRIES: PublicRouteEntry[] = [
  {
    id: 'job:procurement-consultant',
    kind: 'career',
    entityId: 'procurement-consultant',
    paths: { pl: '/kariera/konsultant-zakupowy', en: '/en/career/procurement-consultant' },
    legacyPaths: ['/career/procurement-consultant'],
    indexable: true,
  },
  {
    id: 'job:junior-business-analyst',
    kind: 'career',
    entityId: 'junior-business-analyst',
    paths: { pl: '/kariera/mlodszy-analityk-biznesowy', en: '/en/career/junior-business-analyst' },
    legacyPaths: ['/career/junior-business-analyst'],
    indexable: true,
  },
  {
    id: 'job:manager',
    kind: 'career',
    entityId: 'manager',
    paths: { pl: '/kariera/manager', en: '/en/career/manager' },
    indexable: true,
  },
]

function buildCapabilityRouteEntry(seed: CapabilityRouteSeed): PublicRouteEntry {
  const isService = seed.kind === 'service'
  const isDigitalService = seed.kind === 'digital-service'
  const servicePlacement = seed.placement ?? 'listing'
  const plBasePath = isDigitalService
    ? PL_LISTING_PATHS.digitalServices
    : isService
    ? (servicePlacement === 'advisory-root' ? PL_LISTING_PATHS.advisory : PL_LISTING_PATHS.services)
    : PL_LISTING_PATHS.education
  const enBasePath = isDigitalService
    ? EN_LISTING_PATHS.digitalServices
    : isService
    ? (servicePlacement === 'advisory-root' ? EN_LISTING_PATHS.advisory : EN_LISTING_PATHS.services)
    : EN_LISTING_PATHS.education
  return {
    id: `${seed.kind}:${seed.entityId}`,
    kind: seed.kind,
    entityId: seed.entityId,
    paths: {
      pl: joinPath(plBasePath, seed.plSlug),
      en: joinPath(enBasePath, seed.enSlug),
    },
    legacyPaths: seed.legacyPaths,
    indexable: true,
  }
}

export const PUBLIC_ROUTE_ENTRIES: PublicRouteEntry[] = [
  ...STATIC_ROUTE_ENTRIES,
  ...CAPABILITY_ROUTE_SEEDS.map(buildCapabilityRouteEntry),
  ...JOB_ROUTE_ENTRIES,
]

const ENTRIES_BY_ID = new Map(PUBLIC_ROUTE_ENTRIES.map((entry) => [entry.id, entry]))

type LocalizedRouteMatch = {
  entry: PublicRouteEntry
  locale: PublicLocale
  path: string
}

const CANONICAL_MATCHES: LocalizedRouteMatch[] = PUBLIC_ROUTE_ENTRIES.flatMap((entry) => (
  (Object.entries(entry.paths) as Array<[PublicLocale, string | undefined]>)
    .filter(([, path]) => Boolean(path))
    .map(([locale, path]) => ({ entry, locale, path: normalizePath(path!) }))
))

const CANONICAL_MATCHES_BY_PATH = new Map(CANONICAL_MATCHES.map((match) => [match.path, match]))

const REDIRECT_ENTRIES: PublicRedirectEntry[] = PUBLIC_ROUTE_ENTRIES.flatMap((entry) => (
  (entry.legacyPaths ?? []).map((legacyPath) => {
    const normalizedLegacyPath = normalizePath(legacyPath)
    const locale: PublicLocale = normalizedLegacyPath === '/en' || normalizedLegacyPath.startsWith('/en/') ? 'en' : 'pl'
    const destination = entry.paths[locale]
    if (!destination) {
      throw new Error(`Missing ${locale} path for route ${entry.id}`)
    }
    return {
      source: normalizedLegacyPath,
      destination: normalizePath(destination),
    }
  })
))

const REDIRECTS_BY_SOURCE = new Map(REDIRECT_ENTRIES.map((entry) => [entry.source, entry.destination]))

export function getPublicRouteById(id: PublicRouteId): PublicRouteEntry | undefined {
  return ENTRIES_BY_ID.get(id)
}

export function getCapabilityRouteId(kind: 'service' | 'education' | 'digital-service', entityId: string): PublicRouteId {
  return `${kind}:${entityId}`
}

export function getCareerRouteId(entityId: string): PublicRouteId {
  return `job:${entityId}`
}

export function getPublicPath(id: PublicRouteId, locale: PublicLocale): string {
  const entry = getPublicRouteById(id)
  if (!entry) {
    throw new Error(`Unknown public route ID: ${id}`)
  }

  const path = entry.paths[locale]
  if (!path) {
    throw new Error(`Route ${id} has no ${locale} path`)
  }

  return normalizePath(path)
}

export function getCapabilityPath(
  kind: 'service' | 'education' | 'digital-service',
  entityId: string,
  locale: PublicLocale,
): string {
  return getPublicPath(getCapabilityRouteId(kind, entityId), locale)
}

export function getCareerPath(entityId: string, locale: PublicLocale): string {
  return getPublicPath(getCareerRouteId(entityId), locale)
}

export function getPublicRouteByPath(pathname: string): LocalizedRouteMatch | undefined {
  return CANONICAL_MATCHES_BY_PATH.get(normalizePath(pathname))
}

export function getLocalizedSiblingPath(pathname: string, locale: PublicLocale): string | undefined {
  const normalizedPath = normalizePath(pathname)
  const directMatch = getPublicRouteByPath(normalizedPath)
  if (directMatch) {
    return directMatch.entry.paths[locale]
  }

  const redirectDestination = REDIRECTS_BY_SOURCE.get(normalizedPath)
  if (!redirectDestination) return undefined
  const redirectedMatch = getPublicRouteByPath(redirectDestination)
  return redirectedMatch?.entry.paths[locale]
}

export function getStablePublicRoutePath(pathname: string): string | undefined {
  const normalizedPath = normalizePath(pathname)
  const directMatch = getPublicRouteByPath(normalizedPath)
  const redirectedMatch = directMatch
    ? directMatch
    : (() => {
        const redirectDestination = REDIRECTS_BY_SOURCE.get(normalizedPath)
        return redirectDestination ? getPublicRouteByPath(redirectDestination) : undefined
      })()

  if (!redirectedMatch) return undefined

  const preferredPath = redirectedMatch.entry.legacyPaths?.find((path) => !normalizePath(path).startsWith('/en/'))
    ?? redirectedMatch.entry.paths.pl
    ?? redirectedMatch.entry.paths.en

  return preferredPath ? normalizePath(preferredPath) : undefined
}

export function localizePublicHref(href: string, locale: PublicLocale): string {
  if (!href || /^(?:[a-z]+:|#|\?)/i.test(href)) {
    return href
  }

  const match = href.match(/^([^?#]+)([?#].*)?$/)
  const pathname = match?.[1] ?? href
  const suffix = match?.[2] ?? ''
  const localizedPath = getLocalizedSiblingPath(pathname, locale)
  return `${localizedPath ?? normalizePath(pathname)}${suffix}`
}

export function resolveCapabilityIdFromSlug(
  kind: 'service' | 'education' | 'digital-service',
  locale: PublicLocale,
  slug: string,
): string | undefined {
  const normalizedSlug = slug.replace(/^\/+|\/+$/g, '')
  return PUBLIC_ROUTE_ENTRIES.find((entry) => {
    if (entry.kind !== kind || !entry.entityId) return false
    const path = entry.paths[locale]
    return Boolean(path) && path!.split('/').filter(Boolean).at(-1) === normalizedSlug
  })?.entityId
}

export function resolveCareerIdFromSlug(locale: PublicLocale, slug: string): string | undefined {
  const normalizedSlug = slug.replace(/^\/+|\/+$/g, '')
  return JOB_ROUTE_ENTRIES.find((entry) => {
    const path = entry.paths[locale]
    return Boolean(path) && path!.split('/').filter(Boolean).at(-1) === normalizedSlug
  })?.entityId
}

export function getDynamicStaticParams(
  kind: 'service' | 'education' | 'digital-service' | 'career',
  locale: PublicLocale,
): Array<{ slug: string }> {
  const sourceEntries = PUBLIC_ROUTE_ENTRIES.filter((entry) => {
    if (kind === 'career') return entry.kind === 'career' && Boolean(entry.entityId) && entry.id.startsWith('job:')
    if (entry.kind !== kind || !entry.entityId) return false
    if (kind !== 'service') return true

    const path = entry.paths[locale]
    const listingBase = locale === 'pl' ? PL_LISTING_PATHS.services : EN_LISTING_PATHS.services
    return Boolean(path) && normalizePath(path!).startsWith(`${listingBase}/`)
  })

  return sourceEntries.flatMap((entry) => {
    const path = entry.paths[locale]
    if (!path) return []
    const slug = path.split('/').filter(Boolean).at(-1)
    return slug ? [{ slug }] : []
  })
}

export function isPublicPathOfKind(pathname: string, kind: PublicRouteKind): boolean {
  const normalizedPath = normalizePath(pathname)
  const directMatch = getPublicRouteByPath(normalizedPath)
  if (directMatch) {
    return directMatch.entry.kind === kind
  }

  const redirectDestination = getRedirectDestination(normalizedPath)
  if (!redirectDestination) return false
  return getPublicRouteByPath(redirectDestination)?.entry.kind === kind
}

export function getCanonicalPublicPaths(): Array<{ id: PublicRouteId; kind: PublicRouteKind; locale: PublicLocale; path: string }> {
  return CANONICAL_MATCHES.map((match) => ({
    id: match.entry.id,
    kind: match.entry.kind,
    locale: match.locale,
    path: match.path,
  }))
}

export function getIndexablePublicPaths(): Array<{ id: PublicRouteId; locale: PublicLocale; path: string }> {
  return CANONICAL_MATCHES
    .filter((match) => match.entry.indexable !== false)
    .map((match) => ({ id: match.entry.id, locale: match.locale, path: match.path }))
}

export function getRedirectEntries(): PublicRedirectEntry[] {
  return [...REDIRECT_ENTRIES]
}

export function getRedirectDestination(pathname: string): string | undefined {
  return REDIRECTS_BY_SOURCE.get(normalizePath(pathname))
}

export function validatePublicRouteRegistry() {
  const duplicateCanonicalPaths: string[] = []
  const duplicateLegacySources: string[] = []
  const redirectChains: PublicRedirectEntry[] = []
  const invalidRedirectTargets: PublicRedirectEntry[] = []

  const canonicalPathCounts = new Map<string, number>()
  for (const match of CANONICAL_MATCHES) {
    canonicalPathCounts.set(match.path, (canonicalPathCounts.get(match.path) ?? 0) + 1)
  }
  for (const [path, count] of canonicalPathCounts.entries()) {
    if (count > 1) duplicateCanonicalPaths.push(path)
  }

  const legacySourceCounts = new Map<string, number>()
  for (const redirectEntry of REDIRECT_ENTRIES) {
    legacySourceCounts.set(redirectEntry.source, (legacySourceCounts.get(redirectEntry.source) ?? 0) + 1)
    if (REDIRECTS_BY_SOURCE.has(redirectEntry.destination)) {
      redirectChains.push(redirectEntry)
    }
    if (!CANONICAL_MATCHES_BY_PATH.has(redirectEntry.destination)) {
      invalidRedirectTargets.push(redirectEntry)
    }
  }
  for (const [path, count] of legacySourceCounts.entries()) {
    if (count > 1) duplicateLegacySources.push(path)
  }

  return {
    duplicateCanonicalPaths,
    duplicateLegacySources,
    redirectChains,
    invalidRedirectTargets,
  }
}
