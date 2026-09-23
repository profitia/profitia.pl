import type { Locale } from '@/lib/capabilities'
import { CapabilityCTA, CapabilityHero } from '@/components/capabilities'
import { PublicJsonLd } from '@/components/seo/PublicJsonLd'
import ServicesContainer from './ServicesContainer'
import { SERVICES_CATALOG } from './servicesCatalog'
import { getPublicPath, type PublicRouteId } from '@/lib/routing/public-routes'
import type { CatalogDomain } from './catalogTypes'
import { PUBLIC_HERO_ASSETS } from '@/lib/presentation/public-hero-assets'
import {
  CaseStudyResult,
  CaseStudyScope,
  CaseStudyStartingPoint,
  type DiagnosisCaseStudyContent,
} from '@/components/sections/case-study/DiagnosisCaseStudySections'

interface Props {
  locale: Locale
  routeId?: PublicRouteId
  hero?: {
    eyebrow: string
    title: string
    subtitle: string
    imageSrc?: string
    imageAlt?: string
  }
  seo?: {
    title: string
    description: string
  }
  domains?: CatalogDomain[]
  caseStudy?: DiagnosisCaseStudyContent
}

const COPY = {
  pl: {
    hero: {
      eyebrow: 'Doradztwo · Oszczędności · Negocjacje',
      title: 'Budujemy przewagę zakupową poprzez dane, negocjacje i transformację funkcji zakupowej.',
      subtitle:
        'Pracujemy z organizacjami, które chcą odzyskać kontrolę nad kosztami, poprawić pozycję negocjacyjną i budować decyzje zakupowe w oparciu o dane, a nie intuicję.',
      imageSrc: PUBLIC_HERO_ASSETS.advisoryServices,
      imageAlt: 'Doradztwo zakupowe Profitia',
    },
    cta: {
      note: 'Następny krok',
      label: 'Umów rozmowę',
      href: getPublicPath('contact', 'pl'),
    },
  },
  en: {
    hero: {
      eyebrow: 'Advisory · Negotiations · Analytics',
      title: 'We help procurement teams build leverage through intelligence, negotiations and operating transformation.',
      subtitle:
        'We work with organisations that want to regain control over costs, improve their negotiation position and build procurement decisions on data - not intuition.',
      imageSrc: PUBLIC_HERO_ASSETS.advisoryServices,
      imageAlt: 'Profitia procurement advisory',
    },
    cta: {
      note: 'Next step',
      label: 'Schedule a conversation',
      href: getPublicPath('contact', 'en'),
    },
  },
} as const

const SEO = {
  pl: {
    title: 'Usługi | Profitia',
    description: 'Doradztwo zakupowe, negocjacje, analityka spend i transformacja funkcji zakupowej. Advisory capabilities dla organizacji budujących trwałą przewagę kosztową.',
  },
  en: {
    title: 'Services | Profitia',
    description: 'Procurement advisory, negotiations, spend analytics and procurement transformation. Advisory capabilities for organisations building lasting cost advantage.',
  },
} as const

export default function ServicesPage({ locale, routeId = 'services:index', hero, seo, domains, caseStudy }: Props) {
  const defaultCopy = COPY[locale]
  const copy = hero ? { ...defaultCopy, hero } : defaultCopy
  const resolvedSeo = seo ?? SEO[locale]
  const resolvedDomains = domains ?? SERVICES_CATALOG[locale]

  return (
    <>
      <PublicJsonLd routeId={routeId} locale={locale} title={resolvedSeo.title} description={resolvedSeo.description} />
      <CapabilityHero
        locale={locale}
        eyebrow={copy.hero.eyebrow}
        title={copy.hero.title}
        subtitle={copy.hero.subtitle}
        imageSrc={copy.hero.imageSrc}
        imageAlt={copy.hero.imageAlt}
        variant="services"
      />

      <div className="container-base pb-20">
        {caseStudy ? (
          <>
            <CaseStudyStartingPoint content={caseStudy.startingPoint} />
            <CaseStudyScope content={caseStudy.scope} />
            <ServicesContainer domains={resolvedDomains} variant="process" />
            <CaseStudyResult content={caseStudy.result} />
          </>
        ) : (
          <ServicesContainer domains={resolvedDomains} />
        )}

        <CapabilityCTA
          locale={locale}
          note={defaultCopy.cta.note}
          label={defaultCopy.cta.label}
          href={defaultCopy.cta.href}
        />
      </div>
    </>
  )
}
