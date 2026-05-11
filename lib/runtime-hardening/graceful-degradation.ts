// ─────────────────────────────────────────────────────────
// ETAP 5 — Graceful Degradation + Fallback Architecture
// Emergency static advisory responses when LLM/runtime fails.
// Maintains advisory quality even without AI backend.
// ─────────────────────────────────────────────────────────

import type { IntentCode } from "@/types";

// ── Degradation Levels ────────────────────────────────────
export type DegradationLevel =
  | "healthy"         // Full AI advisory
  | "partial"         // AI available but slow — use smaller model
  | "degraded"        // AI unavailable — use static advisory
  | "emergency";      // Total failure — show emergency message + contact

// ── Static Fallback Responses ─────────────────────────────
// Enterprise-grade static advisory — procurement knowledge, NOT chatbot phrases
interface FallbackResponse {
  pl: string;
  en: string;
}

const FALLBACK_BY_INTENT: Record<string, FallbackResponse> = {
  I1_SAVINGS: {
    pl: "Identyfikacja oszczędności zakupowych wymaga najpierw analizy spend — benchmarki rynkowe, should-cost i analiza kategorii pozwalają ustalić, gdzie marża jest tracona. Najszybsza ścieżka to [SPOT Analysis](/services/analiza-spot) — 5-10 dni roboczych, wynik: konkretne kategorie i argumenty do negocjacji.\n\nProszę opisać, jakie kategorie zakupowe są priorytetem — lub skontaktować się bezpośrednio: [kontakt](/contact).",
    en: "Identifying procurement savings requires spend analysis first — market benchmarks, should-cost modeling, and category analysis pinpoint where margin is being lost. The fastest path is [SPOT Analysis](/services/analiza-spot) — 5-10 business days, output: specific categories and negotiation arguments.\n\nPlease describe your priority spend categories — or contact us directly: [contact](/contact).",
  },
  I2_FORECASTING: {
    pl: "Widoczność wydatków to fundament każdej decyzji zakupowej. Bez spend cube nie wiadomo, co się kupuje, od kogo i za ile — co uniemożliwia porównanie z rynkiem. [Spend Analytics](/services/spend-analytics) pozwala ustrukturyzować dane z wielu systemów i wyciągnąć kategorie priorytetowe.\n\nJaki jest główny problem z widocznością — systemy, kategorie, geografia?",
    en: "Spend visibility is the foundation of every procurement decision. Without a spend cube, you don't know what you're buying, from whom, and at what price — making market comparison impossible. [Spend Analytics](/services/spend-analytics) structures data from multiple systems and identifies priority categories.\n\nWhat is the core visibility problem — systems, categories, or geography?",
  },
  I3_SUPPLIER_RISK: {
    pl: "Koncentracja spend u kilku dostawców to ryzyko operacyjne i negocjacyjne. Gdy jeden z nich ma problemy finansowe, łańcuch dostaw jest zagrożony. [Supplier Intelligence](/services/supplier-intelligence) pozwala monitorować kondycję dostawców i zidentyfikować alternatywy zanim stanie się to problemem.\n\nW jakich kategoriach koncentracja jest największa?",
    en: "Spend concentration with few suppliers is both an operational and negotiation risk. When one faces financial difficulties, your supply chain is threatened. [Supplier Intelligence](/services/supplier-intelligence) monitors supplier health and identifies alternatives before problems escalate.\n\nIn which categories is concentration highest?",
  },
  I8_NEGOTIATIONS: {
    pl: "Negocjacje bez przygotowania analitycznego kończą się akceptacją warunków dostawcy. Kluczowe narzędzia: benchmarki rynkowe, should-cost i analiza historii zakupowej. [SPOT Analysis](/services/analiza-spot) dostarcza te dane w 5-10 dni — wystarczający czas przed większością negocjacji.\n\nKiedy negocjacje? Proszę podać termin — ustalimy, czy SPOT zdążymy.",
    en: "Negotiations without analytical preparation end with accepting supplier terms. Key tools: market benchmarks, should-cost modeling, and purchase history analysis. [SPOT Analysis](/services/analiza-spot) delivers these in 5-10 business days — enough time before most negotiations.\n\nWhen is the negotiation? Please share the timeline — we'll confirm if SPOT is feasible.",
  },
  I5_SOURCING: {
    pl: "Budowa strategii zakupowej zaczyna się od segmentacji kategorii — które wymagają pełnego sourcingu, które renegocjacji, a które są poza zakresem wpływu. [Procurement Transformation](/services/procurement-transformation) zapewnia strukturę metodyczną i wsparcie wdrożeniowe.\n\nIle kategorii zakupowych obejmuje Państwa firma i które są priorytetem?",
    en: "Building a procurement strategy starts with category segmentation — which require full sourcing, which renegotiation, and which are outside your influence. [Procurement Transformation](/services/procurement-transformation) provides the methodical framework and implementation support.\n\nHow many spend categories does your company cover and which are the priority?",
  },
  I6_EDUCATION: {
    pl: "Warsztaty negocjacyjne oparte na metodyce Harvardzkiej skupiają się na przygotowaniu opartym na danych — BATNA, should-cost, benchmarki — zamiast technikach perswazji. [Negotiation Workshops](/services/warsztaty-negocjacji) dostępne jako in-company, od 1 do 3 dni, dopasowane do kontekstu branżowego.\n\nIlu uczestników i jaki poziom doświadczenia zakupowego?",
    en: "Negotiation workshops based on the Harvard methodology focus on data-based preparation — BATNA, should-cost, benchmarks — rather than persuasion techniques. [Negotiation Workshops](/services/warsztaty-negocjacji) available as in-company, 1-3 days, adapted to industry context.\n\nHow many participants and what procurement experience level?",
  },
  UNKNOWN: {
    pl: "Profitia Management Consultants specjalizuje się w doradztwie zakupowym, negocjacjach i analityce spend. Najszybszą ścieżką do rozmowy jest [kontakt bezpośredni](/contact) lub umówienie spotkania przez formularz.\n\nCo jest głównym wyzwaniem zakupowym Państwa firmy?",
    en: "Profitia Management Consultants specializes in procurement advisory, negotiations, and spend analytics. The fastest path to a conversation is [direct contact](/contact) or scheduling via the form.\n\nWhat is your company's primary procurement challenge?",
  },
};

// ── Emergency Response (total failure) ───────────────────
const EMERGENCY_RESPONSE: FallbackResponse = {
  pl: "Doradca chwilowo niedostępny. Proszę skontaktować się bezpośrednio:\n\n**kontakt@profitia.pl** | **+48 533 747 340**\n\nZespół Profitia odpowie w ciągu 1 dnia roboczego.",
  en: "Advisor temporarily unavailable. Please contact us directly:\n\n**kontakt@profitia.pl** | **+48 533 747 340**\n\nThe Profitia team will respond within 1 business day.",
};

// ── Degradation State ──────────────────────────────────────
let currentDegradationLevel: DegradationLevel = "healthy";
let degradationSince: number | null = null;
let consecutiveFailures = 0;

export function reportFailure(): void {
  consecutiveFailures++;
  if (consecutiveFailures >= 5) {
    currentDegradationLevel = "emergency";
  } else if (consecutiveFailures >= 3) {
    currentDegradationLevel = "degraded";
    degradationSince = degradationSince ?? Date.now();
  } else if (consecutiveFailures >= 1) {
    currentDegradationLevel = "partial";
  }
}

export function reportSuccess(): void {
  consecutiveFailures = Math.max(0, consecutiveFailures - 1);
  if (consecutiveFailures === 0) {
    currentDegradationLevel = "healthy";
    degradationSince = null;
  }
}

export function getCurrentDegradationLevel(): DegradationLevel {
  return currentDegradationLevel;
}

export function isDegraded(): boolean {
  return currentDegradationLevel === "degraded" || currentDegradationLevel === "emergency";
}

// ── Fallback Response Selection ────────────────────────────
export function getFallbackResponse(
  intent: string,
  locale: "pl" | "en",
  level: DegradationLevel = currentDegradationLevel
): string {
  if (level === "emergency") {
    return EMERGENCY_RESPONSE[locale];
  }

  const fallback = FALLBACK_BY_INTENT[intent] ?? FALLBACK_BY_INTENT["UNKNOWN"];
  return fallback[locale];
}

// ── Recommendation Fallbacks ──────────────────────────────
const STATIC_RECOMMENDATIONS: Record<string, Array<{ slug: string; title: { pl: string; en: string } }>> = {
  I1_SAVINGS: [
    { slug: "analiza-spot", title: { pl: "SPOT Analysis", en: "SPOT Analysis" } },
    { slug: "supplier-benchmarking", title: { pl: "Supplier Benchmarking", en: "Supplier Benchmarking" } },
  ],
  I8_NEGOTIATIONS: [
    { slug: "analiza-spot", title: { pl: "SPOT Analysis", en: "SPOT Analysis" } },
    { slug: "negocjacje-z-dostawcami", title: { pl: "Wsparcie Negocjacyjne", en: "Negotiation Support" } },
  ],
  I5_SOURCING: [
    { slug: "procurement-transformation", title: { pl: "Transformacja Zakupów", en: "Procurement Transformation" } },
    { slug: "category-strategy", title: { pl: "Category Strategy", en: "Category Strategy" } },
  ],
  UNKNOWN: [
    { slug: "analiza-spot", title: { pl: "SPOT Analysis", en: "SPOT Analysis" } },
    { slug: "projekty-doradcze", title: { pl: "Projekty Doradcze", en: "Advisory Projects" } },
  ],
};

export function getStaticRecommendations(intent: string, locale: "pl" | "en") {
  const recs = STATIC_RECOMMENDATIONS[intent] ?? STATIC_RECOMMENDATIONS["UNKNOWN"];
  return recs.map((r) => ({
    slug: r.slug,
    title: r.title[locale],
    href: `/services/${r.slug}`,
  }));
}

// ── CTA Fallback ──────────────────────────────────────────
export function getFallbackCTA(locale: "pl" | "en"): { label: string; href: string } {
  return locale === "pl"
    ? { label: "Umów rozmowę", href: "/contact" }
    : { label: "Schedule a conversation", href: "/contact" };
}

// ── Degradation Status ────────────────────────────────────
export function getDegradationStatus() {
  return {
    level: currentDegradationLevel,
    consecutiveFailures,
    degradedSinceMs: degradationSince ? Date.now() - degradationSince : null,
  };
}
