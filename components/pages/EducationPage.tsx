import type { Locale } from '@/lib/capabilities'
import Link from 'next/link'
import Image from 'next/image'
import { CapabilityCTA } from '@/components/capabilities'
import { PublicJsonLd } from '@/components/seo/PublicJsonLd'
import { RevealWrapper } from '@/components/ui'
import MobileHeroImage from '@/components/ui/MobileHeroImage'
import EducationCatalogAccordion from '@/components/pages/EducationCatalogAccordion'
import { getPublicPath } from '@/lib/routing/public-routes'

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
      ctaPrimary: { label: 'Zobacz ofertę MCIPS', href: '/docs/PEDP%202026.pdf' },
      ctaSecondary: { label: 'Bezpłatna konsultacja', href: getPublicPath('contact', 'pl') },
    },
    contactCta: {
      invitation: 'Porozmawiajmy o tym, jak zbudować właściwą ścieżkę rozwoju zakupów w Państwa organizacji.',
      label: 'Umów rozmowę',
      href: getPublicPath('contact', 'pl'),
    },
  },
  en: {
    hero: {
      label: 'CIPS · MCIPS · Spend Academy',
      headline: 'Procurement Executive Development Programme',
      subtitle:
        'Earn the prestigious MCIPS qualification and join a global network of 200,000+ procurement professionals. Programmes built on market realities - not academic theory.',
      ctaPrimary: { label: 'Explore MCIPS', href: getPublicPath('contact', 'en') },
      ctaSecondary: { label: 'Free consultation', href: getPublicPath('contact', 'en') },
    },
    contactCta: {
      invitation: "Let's talk about how to build the right procurement development path in your organisation.",
      label: 'Schedule a conversation',
      href: getPublicPath('contact', 'en'),
    },
  },
} as const

const CIPS_SECTION_COPY = {
  pl: {
    eyebrow: 'CIPS · ŚWIATOWY STANDARD ZAKUPÓW',
    title: 'Rozwój kompetencji oparty na globalnych standardach profesji zakupowej',
    imageAlt: 'Zespół Profitia podczas programu rozwoju kompetencji zakupowych',
    blocks: [
      {
        title: 'CIPS wyznacza standard profesji zakupowej',
        description: 'CIPS to największa na świecie organizacja zrzeszająca profesjonalistów zakupów i łańcucha dostaw. Działa jako organizacja non-profit od 1932 roku, a od 1992 roku na mocy Royal Charter. Nadaje kwalifikacje i akredytacje, rozwija kompetencje osób i organizacji oraz łączy globalną sieć ekspertów z najważniejszych branż gospodarki. Profitia jest wyłącznym partnerem CIPS w Polsce i Europie Środkowej.',
      },
      {
        title: 'Certyfikacja Korporacyjna CIPS',
        description: 'To jedyna globalnie rozpoznawalna akredytacja doskonałości w obszarze zakupów korporacyjnych i łańcucha dostaw. Potwierdza profesjonalne strategie, procesy i praktyki funkcji zakupowej, a jednocześnie wyznacza ścieżkę dojścia do światowej klasy. Proces wspiera obniżanie kosztów, zarządzanie ryzykiem, pomiar efektywności, budowanie silniejszych relacji z interesariuszami oraz rozwój etycznego i odpowiedzialnego modelu działania.',
      },
      {
        title: 'MCIPS i Procurement Executive Development Programme',
        description: 'MCIPS jest międzynarodowym potwierdzeniem najwyższego poziomu wiedzy zakupowej i doświadczenia menedżerskiego, porównywalnym z profesjonalnymi kwalifikacjami takimi jak CFA czy ACCA. Niezależne badania wskazują, że posiadacze MCIPS zarabiają około 15% więcej niż osoby na porównywalnych stanowiskach bez tej kwalifikacji. Program PEDP przygotowuje doświadczonych menedżerów zakupowych do ścieżki Management Entry Route prowadzącej do uzyskania tytułu MCIPS.',
      },
    ],
  },
  en: {
    eyebrow: 'CIPS · THE GLOBAL PROCUREMENT STANDARD',
    title: 'Capability development grounded in the global standard for the procurement profession',
    imageAlt: 'The Profitia team delivering a procurement capability development programme',
    blocks: [
      {
        title: 'CIPS sets the standard for the profession',
        description: 'CIPS is the world’s largest professional body for procurement and supply chain professionals. Founded as a not-for-profit organisation in 1932 and granted a Royal Charter in 1992, it awards qualifications and accreditations, develops capability at both individual and organisational level, and brings together a global network of experts across major industries. Profitia is the exclusive CIPS partner in Poland and Central Europe.',
      },
      {
        title: 'CIPS Corporate Certification',
        description: 'This is the only globally recognised accreditation for excellence in corporate procurement and supply. It validates the strategies, processes and professional practices of the procurement function while providing a clear route towards world-class performance. The process supports cost reduction, risk management, performance measurement, stronger stakeholder relationships, and a more ethical and responsible operating model.',
      },
      {
        title: 'MCIPS and the Procurement Executive Development Programme',
        description: 'MCIPS is an internationally recognised mark of advanced procurement knowledge and management experience, comparable with professional qualifications such as CFA or ACCA. Independent research indicates that MCIPS holders earn around 15% more than peers in comparable roles without the qualification. PEDP prepares experienced procurement leaders for the Management Entry Route towards achieving MCIPS status.',
      },
    ],
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
  src: '/images/website/Profitia_41.jpg',
  alt: 'Kameralne szkolenie zakupowe przy biurku',
}

const SEO = {
  pl: {
    title: 'Szkolenia zakupowe',
    description: 'Szkolenia zakupowe Profitia: warsztaty negocjacyjne, programy rozwojowe i certyfikacja CIPS. Rozwijaj kompetencje zespołu w praktyce.',
  },
  en: {
    title: 'Procurement Training',
    description: 'Profitia procurement training: negotiation workshops, development programmes and CIPS qualifications. Build practical skills across your team.',
  },
} as const

function getLocalizedString(value: LocalizedString, locale: Locale) {
  return value[locale]
}

export default function EducationPage({ locale }: Props) {
  const c = PAGE_COPY[locale]
  const cips = CIPS_SECTION_COPY[locale]
  const seo = SEO[locale]
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
      <PublicJsonLd routeId="education:index" locale={locale} title={seo.title} description={seo.description} />
      {/* 1 — Hero: full-height right-bleed layout matching homepage/career pattern */}
      <section className="relative bg-white overflow-hidden min-h-[620px] lg:min-h-[calc(100vh-140px)] 2xl:min-h-[calc(100vh-80px)]">
        {/* Content — left half, inside container */}
        <div className="container-base relative z-10 py-16 lg:py-10 2xl:py-20 lg:min-h-[calc(100vh-140px)] 2xl:min-h-[calc(100vh-80px)] lg:flex lg:flex-col lg:justify-center">
          <div className="lg:max-w-[52%] lg:pr-16">
            <RevealWrapper delay={0}>
              <div className="space-y-8 md:space-y-5 2xl:space-y-8">
                <p className="editorial-label text-[rgba(0,109,158,0.8)]">{c.hero.label}</p>
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
                <Link
                  href={c.hero.ctaPrimary.href}
                  target={locale === 'pl' ? '_blank' : undefined}
                  rel={locale === 'pl' ? 'noopener noreferrer' : undefined}
                  className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl bg-[rgb(36,47,68)] text-white text-sm font-medium transition-colors duration-[250ms] hover:bg-[rgb(72,94,136)]"
                >
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
        <div className="hidden lg:block absolute right-0 top-0 bottom-0 w-[48%]" aria-hidden="true">
          <Image
            src={HERO_IMAGE.src}
            alt={HERO_IMAGE.alt}
            fill
            className="object-cover"
            sizes="48vw"
            priority
          />
          <div className="absolute inset-0 bg-[#f3e8dc]/18" />
        </div>

        <MobileHeroImage
          src={HERO_IMAGE.src}
          alt={HERO_IMAGE.alt}
          priority
          hideFrom="lg"
          overlayClassName="bg-[#f3e8dc]/18"
        />
      </section>

      <section className="bg-gray-50 py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-14 max-w-3xl">
            <p className="editorial-label mb-5 text-[rgba(0,109,158,0.8)]">{cips.eyebrow}</p>
            <h2 className="text-3xl font-semibold leading-tight tracking-tight text-gray-900 md:text-4xl">
              {cips.title}
            </h2>
          </div>

          <div className="grid gap-12 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:items-stretch lg:gap-20">
            <div className="relative aspect-[4/3] w-full overflow-hidden shadow-sm lg:aspect-auto lg:self-stretch">
              <Image
                src="/images/website/Profitia_38.jpg"
                alt={cips.imageAlt}
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 46vw"
              />
            </div>

            <div className="divide-y divide-gray-200 border-y border-gray-200">
              {cips.blocks.map((block) => (
                <div key={block.title} className="py-7">
                  <h3 className="editorial-box-title text-brand-blue">{block.title}</h3>
                  <p className="mt-3 text-base leading-relaxed text-gray-700">{block.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
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
