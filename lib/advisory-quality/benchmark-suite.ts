// ─────────────────────────────────────────────────────────
// ETAP 4.5 — Advisory Benchmark Suite
// 10 procurement scenarios for quality evaluation.
// Run: npx ts-node scripts/run-benchmarks.ts
// ─────────────────────────────────────────────────────────

export interface BenchmarkScenario {
  id: string;
  name: string;
  category: "supplier_increase" | "negotiation" | "sourcing" | "spend_visibility" | "transformation" | "supplier_risk" | "reactive" | "education" | "exploratory" | "executive";
  locale: "pl" | "en";
  urgency: "U1" | "U2" | "U3";
  phase: string;
  userMessage: string;
  expectedIntent: string;
  expectedUrgency: "U1" | "U2" | "U3";
  qualityThresholds: {
    procurementReasoning: number;   // min score 0–10
    recommendationQuality: number;
    escalationQuality: number;
    responseCompression: number;
    executiveTone: number;
    overallMin: number;             // min overall 0–100
  };
  mustContain: string[];            // patterns that MUST appear
  mustNotContain: string[];         // patterns that MUST NOT appear
}

export const BENCHMARK_SUITE: BenchmarkScenario[] = [
  // ── B1: Supplier Price Increase (PL, U1) ───────────────
  {
    id: "B1",
    name: "Supplier Price Increase — Urgent",
    category: "supplier_increase",
    locale: "pl",
    urgency: "U1",
    phase: "problem_framing",
    userMessage: "Dostawca zapowiedział podwyżkę o 18% od przyszłego kwartału. Nie mamy żadnych benchmarków ani argumentów.",
    expectedIntent: "I8_NEGOTIATIONS",
    expectedUrgency: "U1",
    qualityThresholds: {
      procurementReasoning: 7,
      recommendationQuality: 7,
      escalationQuality: 8,
      responseCompression: 6,
      executiveTone: 7,
      overallMin: 65,
    },
    mustContain: ["benchmark", "analiz", "negocj"],
    mustNotContain: ["jak mogę pomóc", "chętnie pomogę", "świetne pytanie"],
  },

  // ── B2: No Benchmarks (PL, U2) ────────────────────────
  {
    id: "B2",
    name: "No Pricing Benchmarks — Active Planning",
    category: "spend_visibility",
    locale: "pl",
    urgency: "U2",
    phase: "intent_discovery",
    userMessage: "Nie mamy benchmarków cenowych w żadnej kategorii. Kupujemy intuicyjnie.",
    expectedIntent: "I2_FORECASTING",
    expectedUrgency: "U2",
    qualityThresholds: {
      procurementReasoning: 7,
      recommendationQuality: 6,
      escalationQuality: 5,
      responseCompression: 7,
      executiveTone: 6,
      overallMin: 60,
    },
    mustContain: ["spend", "benchm", "kategori"],
    mustNotContain: ["jak mogę pomóc", "nasza platforma"],
  },

  // ── B3: Build Procurement Strategy (PL, U2) ───────────
  {
    id: "B3",
    name: "Build Procurement Strategy",
    category: "sourcing",
    locale: "pl",
    urgency: "U2",
    phase: "intent_discovery",
    userMessage: "Chcemy zbudować strategię zakupową. Nie wiemy, od czego zacząć.",
    expectedIntent: "I5_SOURCING",
    expectedUrgency: "U2",
    qualityThresholds: {
      procurementReasoning: 6,
      recommendationQuality: 7,
      escalationQuality: 5,
      responseCompression: 6,
      executiveTone: 6,
      overallMin: 60,
    },
    mustContain: ["kategori", "segment", "model"],
    mustNotContain: ["jak mogę pomóc", "chętnie pomogę"],
  },

  // ── B4: Spend Visibility (PL, U3) ─────────────────────
  {
    id: "B4",
    name: "Spend Visibility Need",
    category: "spend_visibility",
    locale: "pl",
    urgency: "U3",
    phase: "opening",
    userMessage: "Potrzebujemy lepszej widoczności wydatków. Mamy dużo systemów i nie wiemy, co naprawdę kupujemy.",
    expectedIntent: "I2_FORECASTING",
    expectedUrgency: "U3",
    qualityThresholds: {
      procurementReasoning: 6,
      recommendationQuality: 6,
      escalationQuality: 4,
      responseCompression: 7,
      executiveTone: 6,
      overallMin: 58,
    },
    mustContain: ["spend", "kategori"],
    mustNotContain: ["jak mogę pomóc", "z przyjemnością"],
  },

  // ── B5: Supplier Risk (EN, U2) ────────────────────────
  {
    id: "B5",
    name: "Supplier Dependency Risk — English",
    category: "supplier_risk",
    locale: "en",
    urgency: "U2",
    phase: "problem_framing",
    userMessage: "We have 80% of our spend with 3 suppliers. One of them is showing financial difficulties.",
    expectedIntent: "I3_SUPPLIER_RISK",
    expectedUrgency: "U2",
    qualityThresholds: {
      procurementReasoning: 7,
      recommendationQuality: 6,
      escalationQuality: 6,
      responseCompression: 6,
      executiveTone: 7,
      overallMin: 62,
    },
    mustContain: ["supplier", "risk", "benchmark"],
    mustNotContain: ["how can i help", "happy to help", "great question"],
  },

  // ── B6: Negotiation Preparation (EN, U1) ──────────────
  {
    id: "B6",
    name: "Negotiation Preparation — Urgent English",
    category: "negotiation",
    locale: "en",
    urgency: "U1",
    phase: "capability_recommendation",
    userMessage: "We have a major supplier negotiation in 3 weeks and no analytical preparation at all.",
    expectedIntent: "I8_NEGOTIATIONS",
    expectedUrgency: "U1",
    qualityThresholds: {
      procurementReasoning: 8,
      recommendationQuality: 7,
      escalationQuality: 8,
      responseCompression: 7,
      executiveTone: 7,
      overallMin: 70,
    },
    mustContain: ["SPOT", "benchmark", "cost"],
    mustNotContain: ["how can i help", "happy to help"],
  },

  // ── B7: Reactive Procurement (PL, U2) ─────────────────
  {
    id: "B7",
    name: "Reactive Procurement Firefighting",
    category: "reactive",
    locale: "pl",
    urgency: "U2",
    phase: "intent_discovery",
    userMessage: "Zakupy u nas zawsze działają na ostatnią chwilę. Nie mamy żadnego procesu.",
    expectedIntent: "I5_SOURCING",
    expectedUrgency: "U2",
    qualityThresholds: {
      procurementReasoning: 6,
      recommendationQuality: 6,
      escalationQuality: 5,
      responseCompression: 7,
      executiveTone: 6,
      overallMin: 58,
    },
    mustContain: ["proces", "kategori", "model"],
    mustNotContain: ["jak mogę pomóc", "nasza platforma"],
  },

  // ── B8: Procurement Transformation (EN, U2) ───────────
  {
    id: "B8",
    name: "Procurement Transformation — Executive",
    category: "transformation",
    locale: "en",
    urgency: "U2",
    phase: "intent_discovery",
    userMessage: "Our board is asking procurement to take a more strategic role. We don't know where to start.",
    expectedIntent: "I5_SOURCING",
    expectedUrgency: "U2",
    qualityThresholds: {
      procurementReasoning: 7,
      recommendationQuality: 6,
      escalationQuality: 5,
      responseCompression: 6,
      executiveTone: 8,
      overallMin: 62,
    },
    mustContain: ["operating model", "category", "maturity"],
    mustNotContain: ["how can i help", "great question"],
  },

  // ── B9: Education / Workshop Need (PL, U3) ────────────
  {
    id: "B9",
    name: "Education — Negotiation Skills",
    category: "education",
    locale: "pl",
    urgency: "U3",
    phase: "opening",
    userMessage: "Szukamy szkolenia z negocjacji dla zespołu zakupowego. Mamy 8 osób.",
    expectedIntent: "I6_EDUCATION",
    expectedUrgency: "U3",
    qualityThresholds: {
      procurementReasoning: 5,
      recommendationQuality: 7,
      escalationQuality: 4,
      responseCompression: 7,
      executiveTone: 6,
      overallMin: 58,
    },
    mustContain: ["warsztat", "Harvard", "negocj"],
    mustNotContain: ["jak mogę pomóc", "z przyjemnością"],
  },

  // ── B10: Margin Erosion Executive (EN, U1) ────────────
  {
    id: "B10",
    name: "Margin Erosion — CFO Executive Framing",
    category: "executive",
    locale: "en",
    urgency: "U1",
    phase: "problem_framing",
    userMessage: "Our EBIT has dropped 3 points this year. Half is from rising procurement costs and we have no visibility on where.",
    expectedIntent: "I1_SAVINGS",
    expectedUrgency: "U1",
    qualityThresholds: {
      procurementReasoning: 8,
      recommendationQuality: 7,
      escalationQuality: 8,
      responseCompression: 7,
      executiveTone: 8,
      overallMin: 72,
    },
    mustContain: ["EBIT", "spend", "benchmark", "category"],
    mustNotContain: ["how can i help", "happy to help", "our solutions"],
  },
];

// ── Benchmark runner (used by scripts/run-benchmarks.ts) ──
export function getBenchmarkById(id: string): BenchmarkScenario | undefined {
  return BENCHMARK_SUITE.find((b) => b.id === id);
}

export function getBenchmarksByCategory(category: BenchmarkScenario["category"]): BenchmarkScenario[] {
  return BENCHMARK_SUITE.filter((b) => b.category === category);
}

export function getBenchmarksByLocale(locale: "pl" | "en"): BenchmarkScenario[] {
  return BENCHMARK_SUITE.filter((b) => b.locale === locale);
}

export function getBenchmarksByUrgency(urgency: "U1" | "U2" | "U3"): BenchmarkScenario[] {
  return BENCHMARK_SUITE.filter((b) => b.urgency === urgency);
}
