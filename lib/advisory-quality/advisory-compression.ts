// ─────────────────────────────────────────────────────────
// ETAP 4.5 — Advisory Compression Engine
// Controls response length, tone, and advisory density.
// ─────────────────────────────────────────────────────────

import type { IntentCode, UrgencyLevel, BuyingStage, ProcurementMaturity } from "@/types";

// ── Compression Profile ───────────────────────────────────
export interface CompressionProfile {
  maxTokens: number;
  temperature: number;
  responseStyle: "diagnostic" | "direct" | "concise" | "escalation";
  allowMultiParagraph: boolean;
  maxRecommendations: 1 | 2;
  requiresQuestion: boolean;
  requiresEscalation: boolean;
}

// ── Derive Compression Profile from session context ───────
export function getCompressionProfile(params: {
  urgency: UrgencyLevel;
  buyingStage: BuyingStage;
  maturity: ProcurementMaturity;
  messageCount: number;
  intentConfidence: number;
}): CompressionProfile {
  const { urgency, buyingStage, messageCount, intentConfidence } = params;

  // U1 — urgent: direct, fast, escalate
  if (urgency === "U1") {
    return {
      maxTokens: 300,
      temperature: 0.25,
      responseStyle: "escalation",
      allowMultiParagraph: false,
      maxRecommendations: 1,
      requiresQuestion: false,
      requiresEscalation: true,
    };
  }

  // Early conversation (0–2 messages) — diagnose first
  if (messageCount <= 2) {
    return {
      maxTokens: 280,
      temperature: 0.3,
      responseStyle: "diagnostic",
      allowMultiParagraph: false,
      maxRecommendations: 1,
      requiresQuestion: true,
      requiresEscalation: false,
    };
  }

  // High confidence + active buying stage — recommend
  if (intentConfidence >= 0.7 && (buyingStage === "S3" || buyingStage === "S4" || buyingStage === "S5")) {
    return {
      maxTokens: 380,
      temperature: 0.28,
      responseStyle: "direct",
      allowMultiParagraph: true,
      maxRecommendations: 2,
      requiresQuestion: false,
      requiresEscalation: urgency === "U2",
    };
  }

  // Default — concise advisory
  return {
    maxTokens: 320,
    temperature: 0.3,
    responseStyle: "concise",
    allowMultiParagraph: false,
    maxRecommendations: 1,
    requiresQuestion: messageCount < 4,
    requiresEscalation: false,
  };
}

// ── Compression Directives (injected into prompt) ─────────
export function buildCompressionDirective(profile: CompressionProfile, locale: "pl" | "en"): string {
  const isPL = locale === "pl";

  const styleInstructions: Record<CompressionProfile["responseStyle"], string> = {
    diagnostic: isPL
      ? "Zidentyfikuj 1 konkretny problem lub pytanie diagnostyczne. NIE dawaj jeszcze rekomendacji. Maksymalnie 2 zdania + jedno ostre pytanie."
      : "Identify 1 specific problem or diagnostic question. Do NOT give recommendations yet. Maximum 2 sentences + one sharp question.",
    direct: isPL
      ? "Daj 1 konkretną rekomendację z uzasadnieniem biznesowym. Zakończ jasnym next step lub CTA. Maksymalnie 3 krótkie akapity."
      : "Give 1 concrete recommendation with business justification. End with a clear next step or CTA. Maximum 3 short paragraphs.",
    concise: isPL
      ? "Odpowiedz zwięźle, jedno zdanie insightu + jedno pytanie lub next step. Bez elaboracji."
      : "Respond concisely — one insight sentence + one question or next step. No elaboration.",
    escalation: isPL
      ? "Potwierdź problem, daj 1 rekomendację, natychmiast zaproponuj rozmowę. Maks 2 zdania + CTA."
      : "Acknowledge the problem, give 1 recommendation, immediately propose a call. Max 2 sentences + CTA.",
  };

  const multiParaRule = profile.allowMultiParagraph
    ? ""
    : isPL
    ? "\nODPOWIEDZ W JEDNYM AKAPICIE. Nie używaj punktorów ani list."
    : "\nRESPOND IN ONE PARAGRAPH. Do not use bullet points or lists.";

  const questionRule = profile.requiresQuestion
    ? isPL
      ? "\nZakończ jednym ostrym pytaniem diagnostycznym — konkretnym, nie ogólnym."
      : "\nEnd with one sharp diagnostic question — specific, not generic."
    : "";

  const escalationRule = profile.requiresEscalation
    ? isPL
      ? "\nZaproponuj konkretnie: 20-minutową rozmowę lub SPOT Analysis. Podaj link /contact lub /services/analiza-spot."
      : "\nPropose specifically: a 20-minute conversation or SPOT Analysis. Include link /contact or /services/analiza-spot."
    : "";

  const recRule = isPL
    ? `\nMaksymalnie ${profile.maxRecommendations} rekomendacja(e) — najlepiej dopasowana do sytuacji, nie lista wszystkich możliwości.`
    : `\nMaximum ${profile.maxRecommendations} recommendation(s) — best fit for the situation, not a list of all options.`;

  return [
    `RESPONSE STYLE: ${profile.responseStyle.toUpperCase()}`,
    styleInstructions[profile.responseStyle],
    multiParaRule,
    questionRule,
    escalationRule,
    recRule,
  ].filter(Boolean).join("\n");
}

// ── Anti-patterns guard (injected into prompt) ────────────
export function buildAntiPatternGuard(locale: "pl" | "en"): string {
  const isPL = locale === "pl";
  return isPL
    ? `ZAKAZANE ZACHOWANIA (nigdy nie rób):
- Nie mów "Jak mogę pomóc?", "Chętnie pomogę", "Świetne pytanie", "Rozumiem Twoje potrzeby"
- Nie twórz list 5+ elementów — max 2 punkty jeśli musisz
- Nie używaj ogólnych słów: "zoptymalizować", "usprawnić", "poprawić efektywność" bez konkretnego kontekstu
- Nie zaczynaj od opisywania siebie ani Profitia
- Nie powtarzaj pytania użytkownika
- Nie pisz disclaimerów ani ostrzeżeń
- Nie używaj emotikonów
- Nie linkuj metodą breadcrumb (Usługi > Kategoria > Podkategoria) — tylko naturalne linki`
    : `FORBIDDEN BEHAVIORS (never do):
- Do not say "How can I help?", "Happy to help", "Great question", "I understand your needs"
- Do not create lists of 5+ items — max 2 bullet points if necessary
- Do not use generic words: "optimize", "improve", "enhance efficiency" without concrete context
- Do not start by describing yourself or Profitia
- Do not repeat the user's question
- Do not write disclaimers or caveats
- Do not use emojis
- Do not use breadcrumb links (Services > Category > Subcategory) — natural links only`;
}
