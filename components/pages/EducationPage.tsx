import type { Locale } from '@/lib/capabilities'
import Link from 'next/link'
import Image from 'next/image'
import { CapabilityCTA } from '@/components/capabilities'
import { RevealWrapper } from '@/components/ui'
import MobileHeroImage from '@/components/ui/MobileHeroImage'
import EducationCatalogAccordion from '@/components/pages/EducationCatalogAccordion'

interface Props {
  locale: Locale
}

type LocalizedString = {
  pl: string
  en: string
}

type EducationTraining = {
  id: string
  title: LocalizedString
  description: LocalizedString
  brochureHref?: Partial<Record<Locale, string>>
}

type EducationDomain = {
  id: string
  title: LocalizedString
  trainings: EducationTraining[]
}

const PAGE_COPY = {
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
  },
} as const

const EDUCATION_CATALOGUE: EducationDomain[] = [
  {
    id: 'procurement-training',
    title: {
      pl: 'Szkolenia zakupowe',
      en: 'Procurement Training',
    },
    trainings: [
      {
        id: 'procurement-strategies',
        title: {
          pl: 'Strategie zakupowe',
          en: 'Procurement Strategies',
        },
        description: {
          pl: 'Szkolenie dostarcza wiedzy z zakresu budowania strategii zakupowych, a ćwiczenia praktyczne pomagają uczestnikom przełożyć metodykę na konkretne kategorie zakupowe.',
          en: 'This training provides knowledge on developing procurement strategies, while practical exercises help participants apply the methodology to specific procurement categories.',
        },
        brochureHref: {
          pl: '/brochures/education/pl/CATEGORY%20MANAGEMENT.pdf',
        },
      },
      {
        id: 'supplier-management',
        title: {
          pl: 'Zarządzanie dostawcami',
          en: 'Supplier Management',
        },
        description: {
          pl: 'Szkolenie rozwija wiedzę z zakresu najlepszych praktyk zarządzania dostawcami oraz analizy obecnych relacji, wspierając budowę bardziej efektywnej współpracy z rynkiem dostawców.',
          en: 'This training develops knowledge of supplier management best practices and the analysis of existing relationships, supporting the development of more effective cooperation with the supplier market.',
        },
        brochureHref: {
          pl: '/brochures/education/pl/SRM%20-%20ZARZA%CC%A8DZANIE%20RELACJAMI%20Z%20DOSTAWCAMI.pdf',
        },
      },
      {
        id: 'specification-management',
        title: {
          pl: 'Zarządzanie specyfikacją',
          en: 'Specification Management',
        },
        description: {
          pl: 'Szkolenie omawia elementy procesu zakupowego związane ze specyfikacją, pokazując na przykładach projektowych, jak lepiej definiować potrzeby i wymagania zakupowe.',
          en: 'This training covers elements of the procurement process related to specifications, using project examples to show how to define procurement needs and requirements more effectively.',
        },
        brochureHref: {
          pl: '/brochures/education/pl/CATEGORY%20MANAGEMENT.pdf',
        },
      },
      {
        id: 'abc-zakupowca',
        title: {
          pl: 'ABC zakupowca',
          en: 'The ABC of Procurement',
        },
        description: {
          pl: 'Szkolenie obejmuje kluczowe aspekty zakupów – od organizacji funkcji zakupowej po negocjacje – i jest szczególnie przydatne dla osób rozpoczynających pracę w zakupach lub wspierających kupców wiodących.',
          en: 'This training covers key aspects of procurement – from organizing the procurement function to negotiations – and is particularly useful for people starting their careers in procurement or supporting lead buyers.',
        },
        brochureHref: {
          pl: '/brochures/education/pl/ABC%20ZAKUPOWCA.pdf',
        },
      },
      {
        id: 'ai-w-zakupach',
        title: {
          pl: 'AI w zakupach',
          en: 'AI in Procurement',
        },
        description: {
          pl: 'Szkolenie dostarcza wiedzy i praktyki w zakresie wykorzystania sztucznej inteligencji w zakupach na poziomie strategicznym, taktycznym i operacyjnym.',
          en: 'This training provides knowledge and practical experience in using artificial intelligence in procurement at strategic, tactical and operational levels.',
        },
        brochureHref: {
          pl: '/brochures/education/pl/SZKOLENIE%20AI%20W%20ZAKUPACH.pdf',
        },
      },
      {
        id: 'proces-zakupowy',
        title: {
          pl: 'Proces zakupowy',
          en: 'Procurement Process',
        },
        description: {
          pl: 'Szkolenie daje kompleksową wiedzę i praktyczne umiejętności w zakresie skutecznego prowadzenia procesu zakupowego, mapowania interesariuszy, analizy kategorii oraz określania całkowitego kosztu posiadania.',
          en: 'This training provides comprehensive knowledge and practical skills in effectively managing the procurement process, stakeholder mapping, category analysis and determining the total cost of ownership.',
        },
        brochureHref: {
          pl: '/brochures/education/pl/PROCES%20ZAKUPOWY.pdf',
        },
      },
      {
        id: 'negocjacje-zakupowe',
        title: {
          pl: 'Negocjacje zakupowe',
          en: 'Procurement Negotiations',
        },
        description: {
          pl: 'Szkolenie koncentruje się na praktycznym zastosowaniu zaawansowanych technik negocjacyjnych z dostawcami, z wykorzystaniem metody harvardzkiej, ćwiczeń praktycznych i pracy na realnych sytuacjach zakupowych.',
          en: 'This training focuses on the practical application of advanced negotiation techniques with suppliers, using the Harvard method, practical exercises and work on real-life procurement scenarios.',
        },
        brochureHref: {
          pl: '/brochures/education/pl/NEGOCJACJE%20ZAKUPOWE.pdf',
        },
      },
      {
        id: 'narzedzia-pracy-zakupowca',
        title: {
          pl: 'Narzędzia pracy zakupowca',
          en: 'Tools for Procurement Professionals',
        },
        description: {
          pl: 'Szkolenie uczy praktycznego wykorzystania narzędzi zakupowych do usprawnienia pracy, m.in. w zakresie baz dostawców, RFP, aukcji, analiz finansowych, platform zakupowych i rozwiązań AI.',
          en: 'This training teaches the practical use of procurement tools to streamline work, including supplier databases, RFPs, auctions, financial analyses, procurement platforms and AI solutions.',
        },
        brochureHref: {
          pl: '/brochures/education/pl/NARZE%CC%A8DZIA%20PRACY%20ZAKUPOWCA.pdf',
        },
      },
      {
        id: 'excel-praktyczne-wykorzystanie',
        title: {
          pl: 'Excel – praktyczne wykorzystanie w pracy zakupowca',
          en: 'Excel – Practical Applications in Procurement',
        },
        description: {
          pl: 'Warsztat pokazuje krok po kroku, jak tworzyć i wykorzystywać narzędzia oraz analizy w Excelu przydatne w codziennej pracy zakupowca.',
          en: 'This workshop demonstrates step by step how to create and use Excel tools and analyses that are useful in the daily work of procurement professionals.',
        },
        brochureHref: {
          pl: '/brochures/education/pl/PRAKTYCZNE%20WYKORZYSTANIE%20EXCELA%20_W%20PRACY%20ZAKUPOWCA.pdf',
        },
      },
      {
        id: 'esg-w-zakupach',
        title: {
          pl: 'ESG w zakupach i łańcuchu dostaw',
          en: 'ESG in Procurement and the Supply Chain',
        },
        description: {
          pl: 'Szkolenie pokazuje, jak uwzględniać wymagania ESG w zakupach i łańcuchu dostaw oraz jak przekładać je na decyzje zakupowe, kryteria współpracy i zarządzanie dostawcami.',
          en: 'This training shows how to incorporate ESG requirements into procurement and the supply chain and how to translate them into procurement decisions, cooperation criteria and supplier management.',
        },
      },
    ],
  },
  {
    id: 'strategic-communication',
    title: {
      pl: 'Komunikacja strategiczna',
      en: 'Strategic Communication',
    },
    trainings: [
      {
        id: 'communication-c-level',
        title: {
          pl: 'Komunikacja C-level',
          en: 'C-Level Communication',
        },
        description: {
          pl: 'Szkolenie rozwija umiejętność przekładania języka zakupów na język biznesu, finansów i strategii, tak aby skuteczniej komunikować wartość zakupów z zarządem, C-level i kluczowymi interesariuszami.',
          en: 'This training develops the ability to translate the language of procurement into the language of business, finance and strategy in order to communicate the value of procurement more effectively to the board, C-level executives and key stakeholders.',
        },
      },
    ],
  },
]

// ─── HERO IMAGE ───────────────────────────────────────────────────────────────

const HERO_IMAGE = {
  src: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&q=85',
  alt: 'Kameralne szkolenie zakupowe przy biurku',
}

function getLocalizedString(value: LocalizedString, locale: Locale) {
  return value[locale]
}

export default function EducationPage({ locale }: Props) {
  const c = PAGE_COPY[locale]
  const localizedCatalogue = EDUCATION_CATALOGUE.map((domain) => ({
    id: domain.id,
    title: getLocalizedString(domain.title, locale),
    trainings: domain.trainings.map((training) => ({
      id: training.id,
      title: getLocalizedString(training.title, locale),
      description: getLocalizedString(training.description, locale),
      brochureHref: training.brochureHref?.[locale],
    })),
  }))

  return (
    <>
      {/* 1 — Hero: full-height right-bleed layout matching homepage/career pattern */}
      <section className="relative bg-white overflow-hidden min-h-[620px] lg:min-h-[calc(100vh-140px)] 2xl:min-h-[calc(100vh-80px)]">
        {/* Content — left half, inside container */}
        <div className="container mx-auto max-w-7xl px-6 relative z-10 py-16 lg:py-10 2xl:py-20 lg:min-h-[calc(100vh-140px)] 2xl:min-h-[calc(100vh-80px)] lg:flex lg:flex-col lg:justify-center">
          <div className="lg:max-w-[50%] lg:pr-16">
            <RevealWrapper delay={0}>
              <div className="space-y-8 md:space-y-5 2xl:space-y-8">
                <p className="text-xs font-medium tracking-[0.25em] uppercase text-[rgba(0,109,158,0.8)]">{c.hero.label}</p>
                <h1 className="font-semibold text-[rgb(36,47,68)] tracking-[-0.05em] leading-[1.02] text-[2.5rem] sm:text-[3rem] md:text-[2.85rem] lg:text-[3.05rem] 2xl:text-[3.9rem]">
                  {c.hero.headline}
                </h1>
              </div>
            </RevealWrapper>
            <RevealWrapper delay={1}>
              <div className="mt-8 md:mt-5 2xl:mt-8 space-y-8 md:space-y-5 2xl:space-y-8">
                <p className="text-lg md:text-[0.92rem] lg:text-[0.96rem] 2xl:text-lg text-[rgb(59,56,56)] leading-relaxed md:leading-[1.55] 2xl:leading-relaxed max-w-lg">
                  {c.hero.subtitle}
                </p>
              <div className="flex flex-wrap items-center gap-4">
                <Link href={c.hero.ctaPrimary.href} className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl bg-[rgb(36,47,68)] text-white text-sm font-medium transition-colors duration-[250ms] hover:bg-[rgb(72,94,136)]">
                  {c.hero.ctaPrimary.label}
                </Link>
                <Link href={c.hero.ctaSecondary.href} className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl border border-[rgb(0,109,158)] bg-white text-[rgb(0,109,158)] text-sm font-medium transition-colors duration-[250ms] hover:bg-[rgba(199,237,251,0.2)] hover:text-[rgb(0,109,158)]">
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

        <MobileHeroImage
          src={HERO_IMAGE.src}
          alt={HERO_IMAGE.alt}
          priority
          overlayClassName="bg-[#f3e8dc]/18"
        />
      </section>

      <div className="container-base">
        <EducationCatalogAccordion domains={localizedCatalogue} />

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
