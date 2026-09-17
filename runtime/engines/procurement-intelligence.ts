// ─────────────────────────────────────────────────────────
// CIC Runtime — Procurement Intelligence Engine
// Domain knowledge graph for procurement advisory reasoning.
// Pure functions — no state, no side effects.
// ─────────────────────────────────────────────────────────

// ── Procurement domain taxonomy ──────────────────────────
export type ProcurementDomain =
  | "cost_reduction"
  | "sourcing_strategy"
  | "supplier_management"
  | "negotiations"
  | "analytics_visibility"
  | "procurement_transformation"
  | "category_management"
  | "supplier_risk"
  | "procurement_education"
  | "digital_procurement"
  | "benchmarking"
  | "operating_model";

// ── Domain → intent mapping ───────────────────────────────
export const DOMAIN_INTENT_MAP: Record<ProcurementDomain, string[]> = {
  cost_reduction: ["I1_SAVINGS", "I8_NEGOTIATIONS"],
  sourcing_strategy: ["I5_SOURCING", "I1_SAVINGS"],
  supplier_management: ["I3_SUPPLIER_RISK", "I5_SOURCING"],
  negotiations: ["I8_NEGOTIATIONS", "I1_SAVINGS"],
  analytics_visibility: ["I2_FORECASTING", "I5_SOURCING"],
  procurement_transformation: ["I5_SOURCING", "I4_DIGITALIZATION"],
  category_management: ["I5_SOURCING", "I1_SAVINGS"],
  supplier_risk: ["I3_SUPPLIER_RISK", "I8_NEGOTIATIONS"],
  procurement_education: ["I6_EDUCATION", "I8_NEGOTIATIONS"],
  digital_procurement: ["I4_DIGITALIZATION", "I2_FORECASTING"],
  benchmarking: ["I1_SAVINGS", "I3_SUPPLIER_RISK", "I8_NEGOTIATIONS"],
  operating_model: ["I5_SOURCING", "I4_DIGITALIZATION"],
};

// ── Business impact vocabulary ────────────────────────────
export interface BusinessImpact {
  domain: ProcurementDomain;
  kpi: string;
  typicalRange: string;
  timeToValue: string;
  executiveRelevance: string[];
  evidenceType: "benchmark" | "case_study" | "research" | "calculation";
}

export const BUSINESS_IMPACTS: BusinessImpact[] = [
  {
    domain: "cost_reduction",
    kpi: "Direct cost savings",
    typicalRange: "8-15% of addressable spend",
    timeToValue: "3-12 months",
    executiveRelevance: ["CFO", "CEO", "procurement_director"],
    evidenceType: "benchmark",
  },
  {
    domain: "negotiations",
    kpi: "Negotiation outcome improvement",
    typicalRange: "5-20% vs. opening offer",
    timeToValue: "1-3 months",
    executiveRelevance: ["CFO", "CEO", "procurement_director", "category_manager"],
    evidenceType: "case_study",
  },
  {
    domain: "analytics_visibility",
    kpi: "Spend under management",
    typicalRange: "60-95% of total spend",
    timeToValue: "1-6 months",
    executiveRelevance: ["CFO", "CPO", "procurement_director"],
    evidenceType: "benchmark",
  },
  {
    domain: "supplier_risk",
    kpi: "Supply disruption risk reduction",
    typicalRange: "30-60% fewer unplanned events",
    timeToValue: "6-18 months (early warning)",
    executiveRelevance: ["CEO", "CFO", "CPO", "procurement_director"],
    evidenceType: "research",
  },
  {
    domain: "category_management",
    kpi: "Category margin improvement",
    typicalRange: "10-25% over 2 years",
    timeToValue: "6-18 months",
    executiveRelevance: ["CPO", "procurement_director", "category_manager"],
    evidenceType: "benchmark",
  },
  {
    domain: "benchmarking",
    kpi: "Price position improvement",
    typicalRange: "5-15% vs. market",
    timeToValue: "1-3 months",
    executiveRelevance: ["CFO", "procurement_director", "category_manager"],
    evidenceType: "calculation",
  },
  {
    domain: "procurement_transformation",
    kpi: "EBIT impact from procurement excellence",
    typicalRange: "2-3 percentage points",
    timeToValue: "12-36 months",
    executiveRelevance: ["CEO", "CFO", "CPO"],
    evidenceType: "research",
  },
  {
    domain: "procurement_education",
    kpi: "Negotiation success rate improvement",
    typicalRange: "15-40% after training",
    timeToValue: "1-6 months post-training",
    executiveRelevance: ["CPO", "procurement_director"],
    evidenceType: "case_study",
  },
];

// ── Procurement reasoning patterns ───────────────────────
export interface ReasoningPattern {
  trigger: string; // keyword/signal that activates this pattern
  domain: ProcurementDomain;
  hypothesis: Record<"pl" | "en", string>;
  businessConsequence: Record<"pl" | "en", string>;
  diagnosticQuestion: Record<"pl" | "en", string>;
}

export const REASONING_PATTERNS: ReasoningPattern[] = [
  {
    trigger: "oszczędności|savings|cost|koszty|redukcja",
    domain: "cost_reduction",
    hypothesis: {
      pl: "Organizacja szuka szybkich oszczędności w zakupach.",
      en: "The organisation is seeking rapid procurement cost savings.",
    },
    businessConsequence: {
      pl: "Bez diagnozy struktury zakupów, potencjał oszczędności pozostaje ukryty.",
      en: "Without a procurement spend diagnostic, savings potential remains hidden.",
    },
    diagnosticQuestion: {
      pl: "Ile procent Waszych zakupów jest dziś aktywnie negocjowanych?",
      en: "What percentage of your procurement spend is actively negotiated today?",
    },
  },
  {
    trigger: "negocjacje|negotiation|dostawca|supplier|warunki|terms",
    domain: "negotiations",
    hypothesis: {
      pl: "Firma chce poprawić wyniki negocjacji z dostawcami.",
      en: "The company wants to improve negotiation outcomes with suppliers.",
    },
    businessConsequence: {
      pl: "Słabe przygotowanie do negocjacji to bezpośredni koszt marży - średnio 8-15% nieodzyskanych oszczędności.",
      en: "Poor negotiation preparation is a direct margin cost - on average 8-15% in unrecovered savings.",
    },
    diagnosticQuestion: {
      pl: "Jak wygląda dziś Wasze przygotowanie do negocjacji z kluczowymi dostawcami?",
      en: "How does your current preparation for key supplier negotiations look?",
    },
  },
  {
    trigger: "ryzyko|risk|disruption|zakłócenia|dostawca",
    domain: "supplier_risk",
    hypothesis: {
      pl: "Organizacja ma ekspozycję na ryzyko dostawców bez systemu wczesnego ostrzegania.",
      en: "The organisation has supplier risk exposure without an early warning system.",
    },
    businessConsequence: {
      pl: "Nieoczekiwane problemy z dostawcami kosztują średnio 3-7x więcej niż prewencja.",
      en: "Unexpected supplier issues cost on average 3-7x more than prevention.",
    },
    diagnosticQuestion: {
      pl: "Czy macie system monitorowania kondycji finansowej kluczowych dostawców?",
      en: "Do you have a system for monitoring the financial health of key suppliers?",
    },
  },
  {
    trigger: "dane|data|analytics|spend|wydatki|visibility|widoczność",
    domain: "analytics_visibility",
    hypothesis: {
      pl: "Firma potrzebuje widoczności wydatków, aby podejmować decyzje oparte na danych.",
      en: "The company needs spend visibility to make data-driven decisions.",
    },
    businessConsequence: {
      pl: "Bez widoczności 100% wydatków, decyzje zakupowe są oparte na szacunkach, nie faktach.",
      en: "Without 100% spend visibility, procurement decisions are based on estimates, not facts.",
    },
    diagnosticQuestion: {
      pl: "Jaki procent Waszych wydatków jest dziś widoczny w jednym miejscu?",
      en: "What percentage of your total spend is visible in one place today?",
    },
  },
  {
    trigger: "transformacja|transformation|zmiana|change|kompetencje|capabilities",
    domain: "procurement_transformation",
    hypothesis: {
      pl: "Organizacja chce zbudować lub zrestrukturyzować funkcję zakupową.",
      en: "The organisation wants to build or restructure the procurement function.",
    },
    businessConsequence: {
      pl: "Dojrzałe funkcje zakupowe generują 2-3 pp więcej EBIT niż reaktywne.",
      en: "Mature procurement functions generate 2-3 percentage points more EBIT than reactive ones.",
    },
    diagnosticQuestion: {
      pl: "Czy Wasze zakupy są dziś funkcją kosztową czy centrum wartości?",
      en: "Is your procurement function today a cost center or a value center?",
    },
  },
];

// ── Domain lookup ─────────────────────────────────────────
export function getBusinessImpacts(domain: ProcurementDomain): BusinessImpact[] {
  return BUSINESS_IMPACTS.filter((b) => b.domain === domain);
}

export function getReasoningPattern(
  intentOrKeyword: string
): ReasoningPattern | null {
  // First try direct intent match
  for (const pattern of REASONING_PATTERNS) {
    const intentMap = DOMAIN_INTENT_MAP[pattern.domain];
    if (intentMap.includes(intentOrKeyword)) return pattern;
  }
  // Then keyword match
  const kw = intentOrKeyword.toLowerCase();
  for (const pattern of REASONING_PATTERNS) {
    const triggers = pattern.trigger.split("|");
    if (triggers.some((t) => kw.includes(t))) return pattern;
  }
  return null;
}

export function getDomainForIntent(intent: string): ProcurementDomain | null {
  for (const [domain, intents] of Object.entries(DOMAIN_INTENT_MAP)) {
    if (intents.includes(intent)) return domain as ProcurementDomain;
  }
  return null;
}

// ── Procurement knowledge context builder ─────────────────
export function buildProcurementContext(
  intent: string,
  locale: "pl" | "en"
): string {
  const domain = getDomainForIntent(intent);
  if (!domain) return "";

  const impacts = getBusinessImpacts(domain);
  const pattern = getReasoningPattern(intent);

  const lines: string[] = [];

  if (pattern) {
    lines.push(`PROCUREMENT HYPOTHESIS: ${pattern.hypothesis[locale]}`);
    lines.push(`BUSINESS CONSEQUENCE: ${pattern.businessConsequence[locale]}`);
    lines.push(`DIAGNOSTIC ANGLE: ${pattern.diagnosticQuestion[locale]}`);
  }

  if (impacts.length > 0) {
    const primary = impacts[0]!;
    lines.push(
      `BUSINESS IMPACT REFERENCE: ${primary.kpi} - ${primary.typicalRange} (${primary.timeToValue})`
    );
  }

  return lines.join("\n");
}
