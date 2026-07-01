import type { Locale } from '@/lib/capabilities'
import Link from 'next/link'
import Image from 'next/image'
import { CapabilityCTA } from '@/components/capabilities'
import { RevealWrapper } from '@/components/ui'

interface Props {
  locale: Locale
}

type EducationSectionItem = {
  title: string
  eyebrow: string
  href: string
}

type EducationSection = {
  eyebrow: string
  title: string
  description: string
  items: EducationSectionItem[]
  dominant?: boolean
  featured?: boolean
}

const COPY = {
  pl: {
    hero: {
      label: 'CIPS · MCIPS · Akademia Zakupów',
      headline: 'Executive Development Programme w zakupach',
      subtitle:
        'Zdobądź prestiżowy certyfikat MCIPS i dołącz do globalnej sieci ponad 200 000 profesjonalistów zakupowych. Programy budowane na realiach rynkowych - nie teorii akademickiej.',
      ctaPrimary: { label: 'Zobacz ofertę MCIPS', href: '/contact' },
      ctaSecondary: { label: 'Bezpłatna konsultacja', href: '/contact' },
    },
    contactCta: {
      invitation: 'Porozmawiajmy o tym, jak zbudować właściwą ścieżkę rozwoju zakupów w Państwa organizacji.',
      label: 'Umów rozmowę',
      href: '/contact',
    },
    sections: [
      {
        eyebrow: 'Certyfikacja',
        title: 'Produkty CIPS',
        description:
          'Programy certyfikacyjne i rozwojowe oparte na standardzie CIPS - dla osób indywidualnych i organizacji budujących kompetencje zakupowe w uporządkowany sposób.',
        items: [
          { title: 'CIPS / MCIPS', eyebrow: 'CIPS', href: '/contact' },
          { title: 'Certyfikacja korporacyjna', eyebrow: 'CIPS', href: '/contact' },
        ],
        dominant: true,
      },
      {
        eyebrow: 'Akademia',
        title: 'Spend Academy',
        description:
          'Autorskie programy rozwojowe Profitii budujące praktyczne kompetencje zakupowe - od fundamentów po poziom strategiczny.',
        items: [
          { title: 'Akademia Zakupów', eyebrow: 'Spend Academy', href: '/education/akademia-zakupow' },
          { title: 'Procurement Excellence', eyebrow: 'Spend Academy', href: '/education/procurement-excellence' },
          { title: 'Strategic Sourcing', eyebrow: 'Spend Academy', href: '/education/strategic-sourcing' },
        ],
        featured: true,
      },
      {
        eyebrow: 'Rozwój',
        title: 'Szkolenia',
        description:
          'Programy warsztatowe i szkolenia dla zespołów zakupowych - od negocjacji po analitykę i rozwój kompetencji funkcjonalnych.',
        items: [
          { title: 'Negocjacje Zakupowe', eyebrow: 'Szkolenie', href: '/education/warsztaty-negocjacyjne' },
          { title: 'Advanced Negotiations', eyebrow: 'Szkolenie', href: '/education/advanced-negotiations' },
          { title: 'Fact-Based Negotiation', eyebrow: 'Szkolenie', href: '/education/fact-based-negotiation' },
          { title: 'Analiza Finansowa Dostawców', eyebrow: 'Szkolenie', href: '/education/supplier-financial-analysis' },
          { title: 'Warsztaty In-Company', eyebrow: 'Szkolenie', href: '/education/in-company-workshops' },
        ],
        featured: true,
      },
      {
        eyebrow: 'Wsparcie',
        title: 'Mentoring',
        description:
          'Długoterminowe wsparcie rozwojowe dla liderów i specjalistów zakupowych, którzy chcą przyspieszyć rozwój w oparciu o doświadczenie praktyków.',
        items: [
          { title: 'Procurement Mentoring', eyebrow: 'Mentoring', href: '/education/procurement-mentoring' },
        ],
      },
      {
        eyebrow: 'Diagnoza',
        title: 'Badanie Kompetencji Zakupowych',
        description:
          'Ocena dojrzałości i kompetencji zespołu zakupowego jako punkt wyjścia do wyboru właściwej ścieżki rozwoju.',
        items: [
          { title: 'Assessment kompetencji zakupowych', eyebrow: 'Diagnoza', href: '/contact' },
        ],
      },
      {
        eyebrow: 'Wydarzenie',
        title: 'Konferencja CIPS',
        description:
          'Konferencja łącząca liderów zakupów, praktyków i organizacje rozwijające nowoczesne podejście do procurementu w Polsce.',
        items: [
          { title: 'CIPS Poland Conference - 26 listopada 2026', eyebrow: 'Konferencja', href: '/docs/26.11.26_Conference_CIPS_Profitia_EN.pdf' },
        ],
      },
    ] satisfies EducationSection[],
  },
  en: {
    hero: {
      label: 'CIPS · MCIPS · Spend Academy',
      headline: 'Procurement Executive Development Programme',
      subtitle:
        'Earn the prestigious MCIPS qualification and join a global network of 200,000+ procurement professionals. Programmes built on market realities - not academic theory.',
      ctaPrimary: { label: 'Explore MCIPS', href: '/en/contact' },
      ctaSecondary: { label: 'Free consultation', href: '/en/contact' },
    },
    contactCta: {
      invitation: "Let's talk about how to build the right procurement development path in your organisation.",
      label: 'Schedule a conversation',
      href: '/en/contact',
    },
    sections: [
      {
        eyebrow: 'Certification',
        title: 'CIPS Products',
        description:
          'Certification and development programmes based on the CIPS standard - for individuals and organisations building procurement capabilities in a structured way.',
        items: [
          { title: 'CIPS / MCIPS', eyebrow: 'CIPS', href: '/en/contact' },
          { title: 'Corporate Certification', eyebrow: 'CIPS', href: '/en/contact' },
        ],
        dominant: true,
      },
      {
        eyebrow: 'Academy',
        title: 'Spend Academy',
        description:
          'Profitia proprietary development programmes building practical procurement capabilities - from fundamentals to strategic level.',
        items: [
          { title: 'Procurement Academy', eyebrow: 'Spend Academy', href: '/en/education/akademia-zakupow' },
          { title: 'Procurement Excellence', eyebrow: 'Spend Academy', href: '/en/education/procurement-excellence' },
          { title: 'Strategic Sourcing', eyebrow: 'Spend Academy', href: '/en/education/strategic-sourcing' },
        ],
        featured: true,
      },
      {
        eyebrow: 'Training',
        title: 'Training',
        description:
          'Workshop programmes and training formats for procurement teams - from negotiation to analytics and functional capability building.',
        items: [
          { title: 'Procurement Negotiations', eyebrow: 'Training', href: '/en/education/warsztaty-negocjacyjne' },
          { title: 'Advanced Negotiations', eyebrow: 'Training', href: '/en/education/advanced-negotiations' },
          { title: 'Fact-Based Negotiation', eyebrow: 'Training', href: '/en/education/fact-based-negotiation' },
          { title: 'Supplier Financial Analysis', eyebrow: 'Training', href: '/en/education/supplier-financial-analysis' },
          { title: 'In-Company Workshops', eyebrow: 'Training', href: '/en/education/in-company-workshops' },
        ],
        featured: true,
      },
      {
        eyebrow: 'Support',
        title: 'Mentoring',
        description:
          'Long-term development support for procurement leaders and specialists who want to accelerate progress through practitioner guidance.',
        items: [
          { title: 'Procurement Mentoring', eyebrow: 'Mentoring', href: '/en/education/procurement-mentoring' },
        ],
      },
      {
        eyebrow: 'Diagnosis',
        title: 'Procurement Capability Assessment',
        description:
          'Assessment of procurement team maturity and competencies as the starting point for choosing the right development path.',
        items: [
          { title: 'Procurement capability assessment', eyebrow: 'Diagnosis', href: '/en/contact' },
        ],
      },
      {
        eyebrow: 'Event',
        title: 'CIPS Conference',
        description:
          'A conference bringing together procurement leaders, practitioners and organisations building a modern procurement approach in Poland.',
        items: [
          { title: 'CIPS Poland Conference - 26 November 2026', eyebrow: 'Conference', href: '/docs/26.11.26_Conference_CIPS_Profitia_EN.pdf' },
        ],
      },
    ] satisfies EducationSection[],
  },
} as const

// ─── HERO IMAGE ───────────────────────────────────────────────────────────────

const HERO_IMAGE = {
  src: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&q=85',
  alt: 'Kameralne szkolenie zakupowe przy biurku',
}

function EducationListingSection({ section, locale }: { section: EducationSection; locale: Locale }) {
  const isDominant = section.dominant === true
  const isFeatured = section.featured === true && !isDominant
  const gridClass = 'grid lg:grid-cols-[320px_1fr] gap-10 lg:gap-16'

  return (
    <section
      className={
        isDominant
          ? 'border-t border-gray-100 pt-28 pb-16'
          : isFeatured
          ? 'border-t border-gray-100 pt-20 pb-10'
          : 'border-t border-gray-100 pt-12 pb-4'
      }
    >
      <div
        className={gridClass}
      >
        <div className="lg:pt-1">
          <p
            className={
              isDominant
                ? 'text-[10px] font-semibold tracking-[0.3em] uppercase text-gray-400 mb-5'
                : 'text-[10px] font-semibold tracking-[0.25em] uppercase text-gray-400 mb-4'
            }
          >
            {section.eyebrow}
          </p>
          <h2
            className={
              isDominant
                ? 'text-3xl font-semibold tracking-tight text-gray-900 leading-snug mb-6'
                : isFeatured
                ? 'text-xl font-semibold tracking-tight text-gray-900 leading-snug mb-5'
                : 'text-lg font-semibold tracking-tight text-gray-900 leading-snug mb-4'
            }
          >
            {section.title}
          </h2>
          <p
            className={
              isDominant
                ? 'text-[15px] text-gray-500 leading-relaxed max-w-[26rem]'
                : 'text-sm text-gray-400 leading-relaxed'
            }
          >
            {section.description}
          </p>
        </div>

        <div className={isDominant ? 'lg:pt-4' : isFeatured ? 'lg:pt-2' : ''}>
          {section.items.map((item, index) => {
            const isExternalDocument = item.href.endsWith('.pdf')

            return (
              <div
                key={`${section.title}-${item.title}`}
                className={`group border-b border-gray-100 flex items-start justify-between gap-6 ${index === 0 ? 'pt-6 pb-9' : 'py-6'}`}
              >
                <div className="min-w-0">
                  <h3 className={`text-[15px] tracking-tight text-gray-900 leading-snug ${index === 0 ? 'font-semibold' : 'font-medium'}`}>
                    {item.title}
                  </h3>
                  <p className="text-[11px] font-medium tracking-[0.2em] uppercase text-gray-400 mt-1">
                    {item.eyebrow}
                  </p>
                </div>
                <Link
                  href={item.href}
                  target={isExternalDocument ? '_blank' : undefined}
                  rel={isExternalDocument ? 'noopener noreferrer' : undefined}
                  className={`flex-shrink-0 text-xs hover:text-brand-blue transition-colors duration-200 whitespace-nowrap pt-0.5 ${index === 0 ? 'text-gray-500' : 'text-gray-400'}`}
                  aria-label={`${item.title} - ${locale === 'pl' ? 'zobacz' : 'explore'}`}
                >
                  {locale === 'pl' ? 'Zobacz' : 'Explore'} →
                </Link>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default function EducationPage({ locale }: Props) {
  const c = COPY[locale]

  return (
    <>
      {/* 1 — Hero: full-height right-bleed layout matching homepage/career pattern */}
      <section className="relative bg-white overflow-hidden min-h-[620px] lg:min-h-[calc(100vh-140px)] 2xl:min-h-[calc(100vh-80px)]">
        {/* Content — left half, inside container */}
        <div className="container mx-auto max-w-7xl px-6 relative z-10 py-16 lg:py-10 2xl:py-20 lg:min-h-[calc(100vh-140px)] 2xl:min-h-[calc(100vh-80px)] lg:flex lg:flex-col lg:justify-center">
          <div className="lg:max-w-[50%] lg:pr-16">
            <RevealWrapper delay={0}>
              <div className="space-y-8 md:space-y-5 2xl:space-y-8">
                <p className="label-tag">{c.hero.label}</p>
                <h1 className="font-semibold text-gray-900 tracking-[-0.05em] leading-[1.02] text-[2.5rem] sm:text-[3rem] md:text-[2.85rem] lg:text-[3.05rem] 2xl:text-[3.9rem]">
                  {c.hero.headline}
                </h1>
              </div>
            </RevealWrapper>
            <RevealWrapper delay={1}>
              <div className="mt-8 md:mt-5 2xl:mt-8 space-y-8 md:space-y-5 2xl:space-y-8">
                <p className="text-lg md:text-[0.92rem] lg:text-[0.96rem] 2xl:text-lg text-gray-600 leading-relaxed md:leading-[1.55] 2xl:leading-relaxed max-w-lg">
                  {c.hero.subtitle}
                </p>
              <div className="flex flex-wrap items-center gap-4">
                <Link href={c.hero.ctaPrimary.href} className="btn-primary">
                  {c.hero.ctaPrimary.label}
                </Link>
                <Link href={c.hero.ctaSecondary.href} className="btn-secondary">
                  {c.hero.ctaSecondary.label}
                </Link>
              </div>
              </div>
            </RevealWrapper>
          </div>
        </div>

        {/* Image — absolute, right half, bleeds to edge (desktop only) */}
        <div className="hidden lg:block absolute right-0 top-0 bottom-0 w-[50%]" aria-hidden="true">
          <Image
            src={HERO_IMAGE.src}
            alt={HERO_IMAGE.alt}
            fill
            className="object-cover"
            sizes="50vw"
            priority
          />
          <div className="absolute inset-0 bg-[#f3e8dc]/18" />
        </div>

        {/* Mobile: image below content, rounded */}
        <div className="relative lg:hidden mt-8 mx-6 aspect-[16/9] rounded-xl overflow-hidden bg-gray-100">
          <Image
            src={HERO_IMAGE.src}
            alt={HERO_IMAGE.alt}
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-[#f3e8dc]/18" />
        </div>
      </section>

      <div className="container-base">
        {c.sections.map((section) => (
          <EducationListingSection
            key={section.title}
            section={section}
            locale={locale}
          />
        ))}

        <CapabilityCTA
          locale={locale}
          label={c.contactCta.label}
          href={c.contactCta.href}
          invitation={c.contactCta.invitation}
        />
      </div>
    </>
  )
}
