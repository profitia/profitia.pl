import type { Locale } from '@/lib/capabilities'
import type { TeamMember } from '@/lib/team/types'
import {
  HeroEditorial,
  FeatureGrid,
  FeatureStats,
  FeatureSplit,
  CTADark,
  CTAMinimal,
  StatsStrip,
} from '@/components/sections'
import { TeamSection, TeamGrid } from '@/components/team'

// ─── COPY ─────────────────────────────────────────────────────────────────────

const COPY = {
  pl: {
    hero: {
      label: 'CIPS · MCIPS · Akademia Zakupów',
      headline: 'Procurement Executive Development Programme',
      subtitle:
        'Zdobądź prestiżowy certyfikat MCIPS i dołącz do globalnej sieci ponad 200 000 profesjonalistów zakupowych. Programy budowane na realiach rynkowych - nie teorii akademickiej.',
      ctaPrimary: { label: 'Zobacz ofertę MCIPS', href: '/contact' },
      ctaSecondary: { label: 'Bezpłatna konsultacja', href: '/contact' },
    },
    stats: [
      { value: '200 000+', label: 'profesjonalistów CIPS na świecie' },
      { value: '150+', label: 'krajów w globalnej sieci' },
      { value: '93+', label: 'lat historii instytucji' },
      { value: '2x', label: 'wyższy wynik negocjacji po certyfikacji' },
    ],
    offer: {
      label: 'Nasza oferta edukacyjna',
      headline: 'Cztery ścieżki. Jeden standard.',
      body: 'Od certyfikacji MCIPS po warsztaty negocjacyjne i programy szyte na miarę organizacji - każdy format zaprojektowany z myślą o natychmiastowym zastosowaniu w praktyce.',
      items: [
        {
          title: 'Certyfikacja CIPS / MCIPS',
          body: 'Oficjalny program prowadzący do prestiżowej certyfikacji MCIPS - globalnego standardu w zakupach korporacyjnych.',
          icon: '◆',
        },
        {
          title: 'Certyfikacja Korporacyjna',
          body: 'Programy certyfikacyjne wdrażane wewnątrz organizacji - dla całych zespołów zakupowych budujących wspólny standard.',
          icon: '◈',
        },
        {
          title: 'Spend Academy',
          body: 'Intensywne szkolenia z analityki zakupowej, spend intelligence i decyzji opartych na danych rynkowych.',
          icon: '◉',
        },
        {
          title: 'Szkolenia dla Firm',
          body: 'Warsztaty in-company, coaching indywidualny i assessment dostosowane do specyfiki Twojej organizacji.',
          icon: '◎',
        },
      ],
    },
    mcips: {
      label: 'Certyfikacja MCIPS',
      headline: 'Zostań MCIPS. Dołącz do globalnej elity zakupów.',
      body: 'Chartered Institute of Procurement & Supply (CIPS) to największa na świecie organizacja certyfikująca profesjonalistów zakupowych. Certyfikat MCIPS otwiera drzwi do najważniejszych organizacji w Europie i na globalnych rynkach - i zmienia sposób prowadzenia negocjacji.',
      cta: { label: 'Zapytaj o program MCIPS', href: '/contact' },
      stats: [
        { value: '200k+', label: 'certyfikowanych profesjonalistów na świecie' },
        { value: '150+', label: 'krajów, w których obowiązuje standard CIPS' },
        { value: '90%', label: 'uczestników odnotowuje wyższą skuteczność negocjacji' },
        { value: '2x', label: 'wyższy wynik oszczędności po uzyskaniu certyfikatu' },
      ],
    },
    brochure: {
      headline: 'Pobierz bezpłatną broszurę programów edukacyjnych Profitii.',
      cta: { label: 'Pobierz PDF', href: '/contact' },
      note: 'Przegląd wszystkich ścieżek, terminów i cen programów',
    },
    trainers: {
      eyebrow: 'Nasi Trenerzy',
      heading: 'Eksperci z doświadczeniem rynkowym.',
      description:
        'Każdy trener to praktyk - nie akademicki wykładowca. Wszyscy posiadają wieloletnie doświadczenie w negocjacjach, zakupach korporacyjnych i transformacji funkcji zakupowej.',
    },
    advisory: {
      label: 'Badanie Potrzeb',
      headline: 'Zanim wybierzesz program - porozmawiajmy o tym, gdzie jesteś.',
      body: 'Każda organizacja jest inna. Zanim zarekomendujemy program, chcemy zrozumieć Twój punkt startowy - dojrzałość funkcji zakupowej, cele strategiczne i oczekiwane rezultaty.',
      bullets: [
        'Analiza aktualnych kompetencji zespołu zakupowego',
        'Identyfikacja luk kompetencyjnych względem benchmarku rynkowego',
        'Rekomendacja ścieżki edukacyjnej dopasowanej do organizacji',
      ],
      cta: { label: 'Umów bezpłatne badanie potrzeb', href: '/contact' },
      image: {
        src: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80',
        alt: 'Doradztwo edukacyjne Profitia',
      },
    },
    finalCta: {
      headline: 'Umów bezpłatną konsultację edukacyjną.',
      subtitle:
        'Porozmawiajmy o tym, który program najlepiej odpowiada potrzebom Twojej organizacji.',
      ctaPrimary: { label: 'Umów konsultację', href: '/contact' },
      ctaSecondary: { label: 'Pobierz broszurę', href: '/contact' },
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
    stats: [
      { value: '200,000+', label: 'CIPS professionals worldwide' },
      { value: '150+', label: 'countries in the global network' },
      { value: '93+', label: 'years of institutional history' },
      { value: '2x', label: 'better negotiation outcomes post-certification' },
    ],
    offer: {
      label: 'Our educational offer',
      headline: 'Four tracks. One standard.',
      body: 'From MCIPS certification to negotiation workshops and bespoke organisational programmes - every format designed for immediate practical application.',
      items: [
        {
          title: 'CIPS / MCIPS Certification',
          body: 'The official programme leading to MCIPS - the globally recognised standard for corporate procurement professionals.',
          icon: '◆',
        },
        {
          title: 'Corporate Certification',
          body: 'Certification programmes implemented inside your organisation - for entire procurement teams building a shared standard.',
          icon: '◈',
        },
        {
          title: 'Spend Academy',
          body: 'Intensive training in spend analytics, procurement intelligence and data-driven market decision making.',
          icon: '◉',
        },
        {
          title: 'Corporate Training',
          body: "In-company workshops, individual coaching and assessment tailored to your organisation's specific context.",
          icon: '◎',
        },
      ],
    },
    mcips: {
      label: 'MCIPS Certification',
      headline: 'Become MCIPS. Join the global procurement elite.',
      body: "The Chartered Institute of Procurement & Supply (CIPS) is the world's largest professional body for procurement. The MCIPS qualification opens doors to the most significant organisations across Europe and global markets - and fundamentally changes the way you negotiate.",
      cta: { label: 'Ask about MCIPS', href: '/en/contact' },
      stats: [
        { value: '200k+', label: 'certified professionals worldwide' },
        { value: '150+', label: 'countries where the CIPS standard applies' },
        { value: '90%', label: 'of participants report improved negotiation results' },
        { value: '2x', label: 'better savings outcomes post-certification' },
      ],
    },
    brochure: {
      headline: 'Download the Profitia education programmes brochure.',
      cta: { label: 'Download PDF', href: '/en/contact' },
      note: 'Overview of all tracks, dates and programme fees',
    },
    trainers: {
      eyebrow: 'Our Trainers',
      heading: 'Experts with market experience.',
      description:
        'Every trainer is a practitioner - not an academic lecturer. All hold extensive experience in negotiations, corporate procurement and procurement function transformation.',
    },
    advisory: {
      label: 'Needs Assessment',
      headline: "Before choosing a programme - let's talk about where you are.",
      body: 'Every organisation is different. Before we recommend a programme, we want to understand your starting point - procurement maturity, strategic objectives and expected outcomes.',
      bullets: [
        'Analysis of current procurement team competencies',
        'Identification of competency gaps vs market benchmark',
        'Recommended learning path tailored to your organisation',
      ],
      cta: { label: 'Book a free needs assessment', href: '/en/contact' },
      image: {
        src: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80',
        alt: 'Profitia education advisory',
      },
    },
    finalCta: {
      headline: 'Book a free education consultation.',
      subtitle: "Let's discuss which programme best fits your organisation's needs.",
      ctaPrimary: { label: 'Book consultation', href: '/en/contact' },
      ctaSecondary: { label: 'Download brochure', href: '/en/contact' },
    },
  },
} as const

// ─── TRAINERS DATA ─────────────────────────────────────────────────────────────

const TRAINERS: TeamMember[] = [
  {
    id: 'trainer-1',
    slug: 'anna-kowalska',
    name: 'Anna Kowalska',
    role: 'Ekspert CIPS, Lead Trainer MCIPS',
    roleEN: 'CIPS Expert, Lead MCIPS Trainer',
    credentials: 'MCIPS',
    yearsExperience: '18+',
    imageUrl:
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80',
    bio: 'Certyfikowany egzaminator CIPS z 18-letnim doświadczeniem w zakupach korporacyjnych. Prowadziła programy MCIPS dla ponad 300 uczestników w Polsce i regionie CEE.',
    bioEN:
      'Certified CIPS examiner with 18 years of corporate procurement experience. Has led MCIPS programmes for over 300 participants across Poland and the CEE region.',
    areas: ['Certyfikacja MCIPS', 'Strategia zakupowa', 'Category Management'],
    areasEN: ['MCIPS Certification', 'Procurement Strategy', 'Category Management'],
    type: 'trainer',
    order: 1,
  },
  {
    id: 'trainer-2',
    slug: 'marcin-wisniewski',
    name: 'Marcin Wiśniewski',
    role: 'Trener Negocjacyjny, Partner Merytoryczny',
    roleEN: 'Negotiation Trainer, Academic Partner',
    credentials: 'FCIPS',
    yearsExperience: '22+',
    imageUrl:
      'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80',
    bio: 'Trener i praktyk negocjacji zakupowych z certyfikacją FCIPS. Specjalizuje się w metodologii harwardzkiej i negocjacjach pod presją dostawcy. Autor programów negocjacyjnych dla rynku FMCG i retail.',
    bioEN:
      'Procurement negotiation trainer and practitioner with FCIPS accreditation. Specialises in Harvard methodology and high-pressure supplier negotiations. Author of negotiation programmes for FMCG and retail markets.',
    areas: ['Negocjacje zakupowe', 'Metodologia harwardzka', 'FMCG & Retail'],
    areasEN: ['Procurement Negotiation', 'Harvard Methodology', 'FMCG & Retail'],
    type: 'trainer',
    order: 2,
  },
  {
    id: 'trainer-3',
    slug: 'katarzyna-nowak',
    name: 'Katarzyna Nowak',
    role: 'Ekspert Spend Analytics i BI',
    roleEN: 'Spend Analytics & BI Expert',
    credentials: 'CIPS',
    yearsExperience: '14+',
    imageUrl:
      'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80',
    bio: 'Specjalistka spend analytics z doświadczeniem w finansach zakupowych i BI. Prowadziła warsztaty dla zespołów zakupowych w sektorze finansowym, produkcyjnym i usługowym.',
    bioEN:
      'Spend analytics specialist with a background in procurement finance and BI. Has delivered workshops for procurement teams across financial services, manufacturing and professional services.',
    areas: ['Spend Analytics', 'Analityka finansowa', 'Procurement BI'],
    areasEN: ['Spend Analytics', 'Financial Analysis', 'Procurement BI'],
    type: 'trainer',
    order: 3,
  },
  {
    id: 'trainer-4',
    slug: 'piotr-malinowski',
    name: 'Piotr Malinowski',
    role: 'Konsultant i Coach Zakupowy',
    roleEN: 'Procurement Consultant & Coach',
    credentials: 'MCIPS',
    yearsExperience: '20+',
    imageUrl:
      'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&q=80',
    bio: 'Doradca i coach zakupowy z 20-letnim doświadczeniem w transformacji funkcji procurement. Specjalizuje się w programach dedykowanych dla organizacji budujących dojrzałość zakupową.',
    bioEN:
      'Procurement consultant and coach with 20 years of experience in procurement function transformation. Specialises in bespoke programmes for organisations building procurement maturity.',
    areas: ['Transformacja zakupowa', 'Coaching', 'Programy dedykowane'],
    areasEN: ['Procurement Transformation', 'Coaching', 'Custom Programmes'],
    type: 'trainer',
    order: 4,
  },
]

// ─── PAGE ──────────────────────────────────────────────────────────────────────

interface Props {
  locale: Locale
}

/**
 * EducationPage
 * ─────────────────────────────────────────────────────────────
 * MCIPS / Procurement Academy - executive education architecture.
 * Server Component. Composes section library directly (no CapabilityLayout).
 *
 * Sections:
 *   1. HeroEditorial  — MCIPS headline + dual CTA
 *   2. StatsStrip     — 4 CIPS global stats
 *   3. FeatureGrid    — 4 programme tracks
 *   4. FeatureStats   — MCIPS deep-dive + 4 outcome stats
 *   5. CTAMinimal     — Brochure download
 *   6. TeamSection    — 4 trainers (2-col grid)
 *   7. FeatureSplit   — Needs assessment advisory
 *   8. CTADark        — Final CTA
 */
export default function EducationPage({ locale }: Props) {
  const c = COPY[locale]

  return (
    <>
      {/* 1 — Hero */}
      <HeroEditorial
        label={c.hero.label}
        headline={c.hero.headline}
        subtitle={c.hero.subtitle}
        ctaPrimary={c.hero.ctaPrimary}
        ctaSecondary={c.hero.ctaSecondary}
      />

      {/* 2 — Stats Strip */}
      <StatsStrip stats={[...c.stats]} />

      {/* 3 — Programme Offer Grid */}
      <FeatureGrid
        label={c.offer.label}
        headline={c.offer.headline}
        body={c.offer.body}
        items={[...c.offer.items]}
        columns={4}
        background="gray-50"
      />

      {/* 4 — MCIPS Deep-Dive + Stats */}
      <FeatureStats
        label={c.mcips.label}
        headline={c.mcips.headline}
        body={c.mcips.body}
        cta={c.mcips.cta}
        stats={[...c.mcips.stats]}
        background="white"
      />

      {/* 5 — Brochure Download CTA */}
      <CTAMinimal
        headline={c.brochure.headline}
        cta={c.brochure.cta}
        note={c.brochure.note}
        background="gray-50"
      />

      {/* 6 — Trainers */}
      <TeamSection
        eyebrow={c.trainers.eyebrow}
        heading={c.trainers.heading}
        description={c.trainers.description}
      >
        <TeamGrid members={TRAINERS} locale={locale} cols={2} />
      </TeamSection>

      {/* 7 — Needs Assessment / Advisory */}
      <FeatureSplit
        label={c.advisory.label}
        headline={c.advisory.headline}
        body={c.advisory.body}
        bullets={[...c.advisory.bullets]}
        cta={c.advisory.cta}
        image={c.advisory.image}
        imagePosition="right"
        background="gray-50"
      />

      {/* 8 — Final CTA */}
      <CTADark
        headline={c.finalCta.headline}
        subtitle={c.finalCta.subtitle}
        ctaPrimary={c.finalCta.ctaPrimary}
        ctaSecondary={c.finalCta.ctaSecondary}
      />
    </>
  )
}
