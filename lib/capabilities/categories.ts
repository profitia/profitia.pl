import type { CapabilitySectionDef } from './types'

// ─────────────────────────────────────────────────────────────────────────────
// SERVICES — 4 canonical sections
// ─────────────────────────────────────────────────────────────────────────────

export const SERVICE_SECTIONS: CapabilitySectionDef[] = [
  {
    id: 'advisory',
    type: 'service',
    order: 1,
    eyebrow: { pl: 'Sekcja I', en: 'Section I' },
    title: {
      pl: 'Doradztwo i Transformacja',
      en: 'Advisory & Transformation',
    },
    description: {
      pl: 'Projekty doradcze, interim management i transformacja funkcji zakupowej — dla organizacji, które chcą zbudować trwałą przewagę zakupową.',
      en: 'Advisory projects, interim management and procurement transformation — for organisations that want to build lasting procurement advantage.',
    },
  },
  {
    id: 'negotiations',
    type: 'service',
    order: 2,
    eyebrow: { pl: 'Sekcja II', en: 'Section II' },
    title: {
      pl: 'Negocjacje i Cost Intelligence',
      en: 'Negotiation & Cost Intelligence',
    },
    description: {
      pl: 'Przygotowanie negocjacyjne oparte na danych, should-cost, analizie SPOT i benchmarkach rynkowych.',
      en: 'Data-driven negotiation preparation: should-cost, SPOT analysis and market benchmarking.',
    },
  },
  {
    id: 'analytics',
    type: 'service',
    order: 3,
    eyebrow: { pl: 'Sekcja III', en: 'Section III' },
    title: {
      pl: 'Dane i Analityka',
      en: 'Data & Analytics',
    },
    description: {
      pl: 'Spend cube, dashboardy zakupowe, systemy KPI i supplier intelligence — fundament decyzji opartych na danych.',
      en: 'Spend cube, procurement dashboards, KPI systems and supplier intelligence — the foundation of data-driven decisions.',
    },
  },
  {
    id: 'development',
    type: 'service',
    order: 4,
    eyebrow: { pl: 'Sekcja IV', en: 'Section IV' },
    title: {
      pl: 'Rozwój Kompetencji',
      en: 'Capability Development',
    },
    description: {
      pl: 'Coaching, warsztaty i programy executive dla zespołów zakupowych.',
      en: 'Coaching, workshops and executive programmes for procurement teams.',
    },
  },
]

// ─────────────────────────────────────────────────────────────────────────────
// EDUCATION — 4 canonical sections
// ─────────────────────────────────────────────────────────────────────────────

export const EDUCATION_SECTIONS: CapabilitySectionDef[] = [
  {
    id: 'executive',
    type: 'education',
    order: 1,
    eyebrow: { pl: 'Ścieżka I', en: 'Track I' },
    title: {
      pl: 'Programy Executive',
      en: 'Executive Programmes',
    },
    description: {
      pl: 'Zaawansowane programy dla dyrektorów i liderów funkcji zakupowej — strategia, transformacja i przywództwo.',
      en: 'Advanced programmes for procurement directors and function leaders — strategy, transformation and leadership.',
    },
  },
  {
    id: 'negotiation',
    type: 'education',
    order: 2,
    eyebrow: { pl: 'Ścieżka II', en: 'Track II' },
    title: {
      pl: 'Warsztaty Negocjacyjne',
      en: 'Negotiation Workshops',
    },
    description: {
      pl: 'Praktyczne warsztaty oparte na metodzie harvardzkiej i realnych case studies — od technik po presję dostawcy.',
      en: 'Practical workshops grounded in Harvard methodology and real case studies — from technique to supplier pressure.',
    },
  },
  {
    id: 'analytics-edu',
    type: 'education',
    order: 3,
    eyebrow: { pl: 'Ścieżka III', en: 'Track III' },
    title: {
      pl: 'Analityka i Intelligence',
      en: 'Analytics & Intelligence',
    },
    description: {
      pl: 'Spend analytics, analiza finansowa dostawców i procurement intelligence — dla zespołów gotowych na decyzje oparte na danych.',
      en: 'Spend analytics, supplier financial analysis and procurement intelligence — for teams ready to make data-driven decisions.',
    },
  },
  {
    id: 'custom',
    type: 'education',
    order: 4,
    eyebrow: { pl: 'Ścieżka IV', en: 'Track IV' },
    title: {
      pl: 'Programy Dedykowane',
      en: 'Custom Programmes',
    },
    description: {
      pl: 'Warsztaty in-company, coaching indywidualny i assessment dostosowane do specyfiki organizacji.',
      en: 'In-company workshops, individual coaching and assessment tailored to the organisation.',
    },
  },
]

// ─── Category display labels ───────────────────────────────────────────────

export const CATEGORY_LABELS: Record<string, { pl: string; en: string }> = {
  advisory: { pl: 'Doradztwo', en: 'Advisory' },
  negotiations: { pl: 'Negocjacje', en: 'Negotiations' },
  analytics: { pl: 'Analityka', en: 'Analytics' },
  transformation: { pl: 'Transformacja', en: 'Transformation' },
  coaching: { pl: 'Coaching', en: 'Coaching' },
  'executive-education': { pl: 'Program Executive', en: 'Executive Programme' },
  workshops: { pl: 'Warsztaty', en: 'Workshop' },
  intelligence: { pl: 'Intelligence', en: 'Intelligence' },
}

// ─── Section → capability category mapping ────────────────────────────────

export const SECTION_CATEGORIES: Record<string, string[]> = {
  // Services
  advisory: ['advisory', 'transformation'],
  negotiations: ['negotiations', 'intelligence'],
  analytics: ['analytics', 'intelligence'],
  development: ['coaching', 'workshops'],
  // Education
  executive: ['executive-education'],
  negotiation: ['workshops', 'negotiations'],
  'analytics-edu': ['analytics', 'intelligence'],
  custom: ['coaching'],
}
