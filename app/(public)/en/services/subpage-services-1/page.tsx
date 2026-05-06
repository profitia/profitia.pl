import type { Metadata } from 'next'

import HeroSection from '@/components/services/subpage-services-1/HeroSection'
import OverviewSection from '@/components/services/subpage-services-1/OverviewSection'
import ExpectSection from '@/components/services/subpage-services-1/ExpectSection'
import FocusAreasSection from '@/components/services/subpage-services-1/FocusAreasSection'
import ImageContentSection from '@/components/services/subpage-services-1/ImageContentSection'
import TestimonialSection from '@/components/services/subpage-services-1/TestimonialSection'
import RelatedServicesSection from '@/components/services/subpage-services-1/RelatedServicesSection'
import CtaSection from '@/components/services/subpage-services-1/CtaSection'

// ─────────────────────────────────────────────────────────────────────────────
// CONTENT — English version of subpage-services-1
// ─────────────────────────────────────────────────────────────────────────────

const PAGE_CONTENT = {
  meta: {
    title: 'Procurement Advisory | Profitia',
    description:
      'We help organisations identify savings potential, prepare for negotiations and implement procurement recommendations in practice.',
  },
  hero: {
    breadcrumb: 'Procurement Advisory',
    label: 'Service',
    headline: 'Procurement that genuinely improves results',
    subtitle:
      'We analyse your procurement categories, identify hidden potential and help you realise it — from diagnosis to implementation.',
    ctaPrimary: { label: 'Schedule a conversation', href: '/en/contact' },
    ctaSecondary: { label: 'See our approach', href: '#overview' },
    imageSrc: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=1200&q=80',
    imageAlt: 'Strategic meeting — procurement advisory',
  },
  overview: {
    label: 'What this service is',
    headline: 'Diagnosis, strategy and implementation — in one project',
    paragraphs: [
      'Most procurement teams lose 8 to 15% of potential savings because they lack an external reference point, market data or time to properly prepare for negotiations.',
      'We come in as an external partner — with experience, tools and benchmarks your team doesn\'t have. We work with your data, but with an independent perspective.',
      'The result is not just a report, but concrete outcomes: better terms, faster decisions and a team that knows how to proceed next time.',
    ],
    stats: [
      { value: '+20%', label: 'average improvement in procurement terms in the first renegotiation cycle' },
      { value: '3–6 wks.', label: 'time from diagnosis to first concrete results' },
      { value: '100%', label: 'of clients implement at least 2 recommendations within 3 months' },
    ],
  },
  expect: {
    label: 'How we work',
    headline: 'What you can expect',
    items: [
      {
        number: '01',
        headline: 'Category diagnosis',
        description:
          'We analyse your spend structure, suppliers and contract terms. We identify where the real leverage lies.',
      },
      {
        number: '02',
        headline: 'Market benchmarks',
        description:
          'We compare your terms against the market. You\'ll know where you\'re overpaying and by how much terms can be improved.',
      },
      {
        number: '03',
        headline: 'Negotiation strategy',
        description:
          'We prepare the negotiation position, argumentation and action plan tailored to each specific supplier.',
      },
      {
        number: '04',
        headline: 'Implementation & follow-up',
        description:
          'We support the implementation of recommendations and verify that the agreed terms are actually in effect.',
      },
    ],
  },
  focusAreas: {
    label: 'Focus areas',
    headline: 'Where we concentrate attention',
    items: [
      {
        icon: (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        ),
        headline: 'Cost category analysis',
        description: 'Spend mapping, identification of key suppliers and savings potential.',
      },
      {
        icon: (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        ),
        headline: 'Bargaining power vs suppliers',
        description: 'Assessment of negotiating position and identification of factors that increase your leverage.',
      },
      {
        icon: (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        ),
        headline: 'Contract terms & pricing',
        description: 'Analysis of pricing structure, payment terms, discounts and renegotiation clauses.',
      },
      {
        icon: (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
          </svg>
        ),
        headline: 'Implementation plan',
        description: 'Prioritisation of actions taking into account resources, timeline and operational dependencies.',
      },
      {
        icon: (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        ),
        headline: 'Quick wins',
        description: 'Identification of actions that deliver results within 30–60 days without significant organisational effort.',
      },
      {
        icon: (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        ),
        headline: 'Supplier risk management',
        description: 'Assessment of concentration risk and recommendations for diversifying the supplier base.',
      },
    ],
  },
  imageContent1: {
    label: 'How the project works',
    headline: 'We work on your data. Not on generic recommendations.',
    description:
      'Every project starts with an analysis of real procurement data — invoices, contracts, transaction history. Not from a presentation with benchmarks for a different industry.',
    bullets: [
      { text: 'Analysis of historical transaction data (12–24 months)' },
      { text: 'Interviews with buyers and operational stakeholders' },
      { text: 'Mapping of risks and dependencies in the supply chain' },
    ],
    imageSrc: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80',
    imageAlt: 'Procurement data analysis',
  },
  imageContent2: {
    label: 'Results',
    headline: 'Outcomes you can present to the board.',
    description:
      'We deliver not just recommendations, but ready presentation materials — with data, rationale and an implementation plan. So the decision is easy to make.',
    bullets: [
      { text: 'Executive summary presentation with key figures' },
      { text: 'Implementation roadmap with priorities and owners' },
      { text: 'Support in communication with suppliers' },
    ],
    imageSrc: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80',
    imageAlt: 'Project results presentation',
  },
  testimonial: {
    quote:
      'Within 6 weeks they identified savings that were right in front of us, but we didn\'t have the time or tools to see them. Professional approach and real results.',
    author: 'Mark Kowalski',
    role: 'Procurement Director, FMCG sector company',
    metric: '+18%',
    metricLabel: 'improvement in terms in the renegotiated category',
  },
  relatedServices: {
    label: 'Other services',
    headline: 'Discover more possibilities',
    services: [
      {
        icon: (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        ),
        title: 'Procurement training',
        description: 'Negotiation workshops and training for procurement teams based on real case studies.',
        href: '/en/services',
      },
      {
        icon: (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
          </svg>
        ),
        title: 'SpendGuru — analytical tool',
        description: 'A platform for spend analysis and real-time market monitoring.',
        href: '/en/services',
      },
      {
        icon: (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        ),
        title: 'Sourcing strategy',
        description: 'Building a long-term procurement strategy tailored to your scale and business model.',
        href: '/en/services',
      },
    ],
  },
  cta: {
    headline: 'Ready for better procurement results?',
    subtitle: 'Let\'s start with one category. We\'ll show the potential before you make a decision.',
    ctaPrimary: { label: 'Book a free consultation', href: '/en/contact' },
    ctaSecondary: { label: 'Write to us', href: 'mailto:kontakt@profitia.pl' },
    note: 'No commitment. We respond within 24 hours.',
  },
} as const

// ─────────────────────────────────────────────────────────────────────────────

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: PAGE_CONTENT.meta.title,
    description: PAGE_CONTENT.meta.description,
    alternates: {
      canonical: 'https://www.profitia.pl/en/services/subpage-services-1',
      languages: {
        'pl': 'https://www.profitia.pl/services/subpage-services-1',
        'en': 'https://www.profitia.pl/en/services/subpage-services-1',
      },
    },
  }
}

export default function SubpageServices1EN() {
  const c = PAGE_CONTENT

  return (
    <>
      <HeroSection
        breadcrumb={c.hero.breadcrumb}
        label={c.hero.label}
        headline={c.hero.headline}
        subtitle={c.hero.subtitle}
        ctaPrimary={c.hero.ctaPrimary}
        ctaSecondary={c.hero.ctaSecondary}
        imageSrc={c.hero.imageSrc}
        imageAlt={c.hero.imageAlt}
      />

      <OverviewSection
        label={c.overview.label}
        headline={c.overview.headline}
        paragraphs={[...c.overview.paragraphs]}
        stats={[...c.overview.stats]}
      />

      <ExpectSection
        label={c.expect.label}
        headline={c.expect.headline}
        items={[...c.expect.items]}
      />

      <FocusAreasSection
        label={c.focusAreas.label}
        headline={c.focusAreas.headline}
        items={[...c.focusAreas.items]}
      />

      <ImageContentSection
        imageLeft={true}
        background="gray"
        label={c.imageContent1.label}
        headline={c.imageContent1.headline}
        description={c.imageContent1.description}
        bullets={[...c.imageContent1.bullets]}
        imageSrc={c.imageContent1.imageSrc}
        imageAlt={c.imageContent1.imageAlt}
      />

      <ImageContentSection
        imageLeft={false}
        background="white"
        label={c.imageContent2.label}
        headline={c.imageContent2.headline}
        description={c.imageContent2.description}
        bullets={[...c.imageContent2.bullets]}
        imageSrc={c.imageContent2.imageSrc}
        imageAlt={c.imageContent2.imageAlt}
      />

      <TestimonialSection
        quote={c.testimonial.quote}
        author={c.testimonial.author}
        role={c.testimonial.role}
        metric={c.testimonial.metric}
        metricLabel={c.testimonial.metricLabel}
      />

      <RelatedServicesSection
        label={c.relatedServices.label}
        headline={c.relatedServices.headline}
        services={[...c.relatedServices.services]}
      />

      <CtaSection
        headline={c.cta.headline}
        subtitle={c.cta.subtitle}
        ctaPrimary={c.cta.ctaPrimary}
        ctaSecondary={c.cta.ctaSecondary}
        note={c.cta.note}
      />
    </>
  )
}
