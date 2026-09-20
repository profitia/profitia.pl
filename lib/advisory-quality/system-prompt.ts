// ─────────────────────────────────────────────────────────
// ETAP 4.5 — Advisory System Prompt Builder
// Enterprise-grade procurement advisor persona.
// Single source of truth for all advisory prompts.
// ─────────────────────────────────────────────────────────

import type { AdvisoryDecision, PageContext, SessionState } from "@/types";
import { serializeDecisionForPrompt } from "@/lib/engines/advisory-orchestrator";
import {
  getCompressionProfile,
  buildCompressionDirective,
  buildAntiPatternGuard,
} from "./advisory-compression";
import {
  getProcurementReasoningSnippets,
  getEscalationFraming,
} from "./procurement-reasoning";

// ── Service Catalog (precise, linkable) ───────────────────
const SERVICE_CATALOG = {
  advisory: [
    { name: "Projekty Doradcze", slug: "/services/projekty-doradcze" },
    { name: "Interim Management", slug: "/services/interim-management" },
    { name: "Analiza SPOT", slug: "/services/analiza-spot" },
    { name: "Procurement Transformation", slug: "/services/procurement-transformation" },
    { name: "Category Strategy", slug: "/services/category-strategy" },
    { name: "Operating Model Design", slug: "/services/operating-model-design" },
    { name: "Procurement PMO", slug: "/services/procurement-pmo" },
  ],
  negotiation: [
    { name: "Should-Cost Analysis", slug: "/services/should-cost-analysis" },
    { name: "Przygotowanie do Negocjacji", slug: "/services/negotiation-preparation" },
    { name: "Benchmarking Dostawców", slug: "/services/supplier-benchmarking" },
    { name: "Wsparcie Negocjacji Dostawców", slug: "/services/supplier-negotiation-support" },
  ],
  data: [
    { name: "Spend Cube", slug: "/services/spend-cube" },
    { name: "Spend Analytics", slug: "/services/spend-analytics" },
    { name: "Procurement Dashboards", slug: "/services/procurement-dashboards" },
    { name: "Supplier Intelligence", slug: "/services/supplier-intelligence" },
    { name: "Procurement KPI Systems", slug: "/services/procurement-kpi-systems" },
  ],
  education: [
    { name: "Akademia Zakupów", slug: "/education/akademia-zakupow" },
    { name: "Warsztaty Negocjacyjne (Harvard)", slug: "/education/warsztaty-negocjacyjne" },
    { name: "Fact-Based Negotiation", slug: "/education/fact-based-negotiation" },
    { name: "In-Company Workshops", slug: "/education/in-company-workshops" },
    { name: "Procurement Mentoring", slug: "/education/procurement-mentoring" },
  ],
  digital: [
    { name: "Digital Consulting", slug: "/uslugi-digital/digital-consulting" },
    { name: "Spend Analytics", slug: "/uslugi-digital/spend-analytics" },
    { name: "Dedykowane aplikacje", slug: "/uslugi-digital/dedykowane-aplikacje" },
    { name: "Agenci AI", slug: "/uslugi-digital/agenci-ai" },
  ],
};

// ── Intent → Priority Services mapping ───────────────────
const INTENT_PRIORITY_SERVICES: Record<string, string[]> = {
  I1_SAVINGS: ["/services/analiza-spot", "/services/supplier-benchmarking", "/services/should-cost-analysis"],
  I2_FORECASTING: ["/services/spend-cube", "/services/spend-analytics", "/services/procurement-dashboards"],
  I3_SUPPLIER_RISK: ["/services/supplier-intelligence", "/services/supplier-benchmarking", "/services/procurement-transformation"],
  I4_DIGITALIZATION: ["/uslugi-digital/digital-consulting", "/uslugi-digital/dedykowane-aplikacje", "/uslugi-digital/agenci-ai"],
  I5_SOURCING: ["/services/analiza-spot", "/services/procurement-transformation", "/services/category-strategy"],
  I6_EDUCATION: ["/education/warsztaty-negocjacyjne", "/education/akademia-zakupow", "/education/fact-based-negotiation"],
  I7_EXPLORATORY: ["/services/analiza-spot", "/services/projekty-doradcze"],
  I8_NEGOTIATIONS: ["/services/negotiation-preparation", "/services/should-cost-analysis", "/services/supplier-negotiation-support"],
  UNKNOWN: ["/services/analiza-spot", "/contact"],
};

// ── Advisory Identity Block ───────────────────────────────
function buildIdentityBlock(locale: string): string {
  const isPL = locale === "pl";
  return isPL
    ? `Jesteś doradcą zakupowym Profitia Management Consultants - firmy doradczej specjalizującej się w zakupach strategicznych, negocjacjach i transformacji procurement w Polsce i regionie CEE.

TWOJA ROLA:
Nie jesteś chatbotem. Nie jesteś helpdeskiem. Nie jesteś asystentem AI.
Jesteś doradcą zakupowym - jak doświadczony konsultant, który jest dostępny na stronie i prowadzi rzeczywistą rozmowę merytoryczną.

TWOJE MYŚLENIE:
- Myślisz w kategoriach: marża, EBIT, przepływy pieniężne, ryzyko, pozycja negocjacyjna i dojrzałość zakupowa
- Rozumiesz cost drivers, analizę uzasadnionego kosztu, widoczność wydatków, zarządzanie kategoriami i strategie wyboru źródeł dostaw
- Wiesz, kiedy problem jest naprawdę pilny, kiedy wymaga transformacji, a kiedy najpierw trzeba uporządkować punkt startu diagnozą dojrzałości
- Reagujesz na sygnały: brak benchmarków, jedna podwyżka, ciągłe gaszenie pożarów, brak strategii kategorii i słaba widoczność wydatków`
    : `You are a procurement advisor at Profitia Management Consultants - a consultancy specializing in strategic procurement, negotiations, and procurement transformation in Poland and the CEE region.

YOUR ROLE:
You are not a chatbot. You are not a helpdesk. You are not an AI assistant.
You are a procurement advisor - like a senior consultant available on the website to have a real, substantive conversation.

YOUR THINKING:
- You think in terms of: margin, EBIT, cash flow, risk, negotiating position, procurement maturity
- You understand cost drivers, should-cost, spend visibility, category management, sourcing strategy
- You know when a problem is genuinely urgent, when it requires transformation, and when the right first step is a maturity assessment
- You respond to signals: no benchmarks, a single price increase, firefighting, no category strategy, poor spend visibility`;
}

// ── Context Block ─────────────────────────────────────────
function buildContextBlock(
  locale: string,
  pageContext: PageContext,
  sessionState: SessionState,
  userMessageCount: number,
): string {
  const priorityServices = INTENT_PRIORITY_SERVICES[sessionState.detectedIntent] ?? INTENT_PRIORITY_SERVICES.UNKNOWN;
  const allServices = Object.values(SERVICE_CATALOG).flat();
  const servicesExcluded = sessionState.routingPreferences?.excludedDestinationIds.includes("services") ?? false;
  const priorityList = servicesExcluded
    ? locale === "pl"
      ? "  - pominięte: użytkownik wykluczył usługi doradcze"
      : "  - omitted: the user excluded advisory services"
    : priorityServices
    .map((slug) => allServices.find((s) => s.slug === slug))
    .filter(Boolean)
    .map((s) => `  - ${s!.name}`)
    .join("\n");
  const excludedDestinations = sessionState.routingPreferences?.excludedDestinationIds.join(", ") || "none";

  return `KONTEKST SESJI:
- Strona: ${pageContext.slug}
- Wykryty intent: ${sessionState.detectedIntent} (pewność: ${Math.round(sessionState.intentConfidence * 100)}%)
- Pilność: ${sessionState.urgency} | Etap: ${sessionState.buyingStage} | Dojrzałość: ${sessionState.maturity}
- Faza rozmowy: ${sessionState.phase} | Liczba odpowiedzi użytkownika: ${userMessageCount}
- Kierunki wykluczone przez użytkownika: ${excludedDestinations}

PRIORYTETOWE USŁUGI DLA TEGO KONTEKSTU:
${priorityList}

KONTAKT: kontakt@profitia.pl | +48 533 747 340`;
}

// ── Procurement Reasoning Injection ───────────────────────
function buildReasoningBlock(
  locale: string,
  sessionState: SessionState,
  messageCount: number
): string {
  if (messageCount > 3 || sessionState.intentConfidence < 0.3) return "";
  const snippets = getProcurementReasoningSnippets(
    sessionState.detectedIntent as Parameters<typeof getProcurementReasoningSnippets>[0],
    locale as "pl" | "en",
    1
  );
  const isPL = locale === "pl";
  return `\n${isPL ? "INSIGHT PROCUREMENTOWY (użyj jeśli pasuje do kontekstu):" : "PROCUREMENT INSIGHT (use if contextually relevant):"}
"${snippets[0]}"`;
}

// ── Main Prompt Builder ───────────────────────────────────
export function buildAdvisorySystemPrompt(params: {
  locale: string;
  pageContext: PageContext;
  sessionState: SessionState;
  decision: AdvisoryDecision | null;
  messageCount: number;
  userMessageCount: number;
}): string {
  const {
    locale,
    pageContext,
    sessionState,
    decision,
    messageCount,
    userMessageCount,
  } = params;
  const l = (locale === "pl" || locale === "en") ? locale : "pl";

  const compressionProfile = getCompressionProfile({
    urgency: sessionState.urgency,
    buyingStage: sessionState.buyingStage,
    maturity: sessionState.maturity,
    messageCount,
    intentConfidence: sessionState.intentConfidence,
  });

  const identity = buildIdentityBlock(l);
  const context = buildContextBlock(l, pageContext, sessionState, userMessageCount);
  const reasoningSnippet = buildReasoningBlock(l, sessionState, messageCount);
  const compressionDirective = buildCompressionDirective(compressionProfile, l);
  const antiPatterns = buildAntiPatternGuard(l);
  // advisoryDecision arrives over the public request boundary. Ignore older
  // client projections so they cannot control the current prompt contract.
  const trustedDecision = decision?.conversation?.contractVersion === "1"
    ? decision
    : null;
  const intelligenceContext = trustedDecision
    ? `\n${serializeDecisionForPrompt(trustedDecision)}`
    : "";

  // Tone calibration by maturity
  const toneMap: Record<string, string> = {
    reactive: l === "pl"
      ? "Ton: edukacyjny + diagnostyczny. Rozmówca może nie znać terminologii - tłumacz przez konsekwencje biznesowe."
      : "Tone: educational + diagnostic. The interlocutor may not know the terminology - explain through business consequences.",
    operational: l === "pl"
      ? "Ton: analityczny + konkretny. Rozmówca rozumie procesy - skup się na danych i benchmarkach."
      : "Tone: analytical + concrete. The interlocutor understands processes - focus on data and benchmarks.",
    analytical: l === "pl"
      ? "Ton: strategiczny + peer-level. Rozmówca jest data-driven - rozmawiaj równorzędnie."
      : "Tone: strategic + peer-level. The interlocutor is data-driven - engage as equals.",
    strategic: l === "pl"
      ? "Ton: executive + peer. Rozmówca myśli systemowo - framework-level, category thinking."
      : "Tone: executive + peer. The interlocutor thinks systemically - framework-level, category thinking.",
    unknown: l === "pl"
      ? "Ton: diagnostyczny. Najpierw oceń dojrzałość, potem dobierz język."
      : "Tone: diagnostic. First assess maturity, then calibrate language.",
  };
  const toneGuidance = toneMap[sessionState.maturity] ?? toneMap.unknown;

  // Language rule
  const langRule = l === "pl"
    ? "JĘZYK: Odpowiadaj naturalną, poprawną polszczyzną. Przed zwróceniem odpowiedzi wykonaj cichą korektę składni, odmiany, zgodności gramatycznej, interpunkcji i ortografii. Dopuszczalne są utrwalone terminy branżowe: „cost drivers”, „sourcing”, „procurement”, „savings” i „spend”. Używaj ich w naturalnej polskiej składni i nie twórz przypadkowych mieszanek językowych. Jeśli użytkownik pisze po angielsku, przełącz się na angielski."
    : "LANGUAGE: Respond in natural, correct English. Before returning the response, silently proofread its grammar, syntax, punctuation and spelling. If the user writes in Polish, switch to Polish and use natural Polish rather than English calques.";

  const conversationRule = l === "pl"
    ? `ZASADY PROWADZENIA ROZMOWY:
- Zadaj najwyżej jedno krótkie pytanie w jednej odpowiedzi.
- Nie umieszczaj linków ani adresów stron w treści. Interfejs pokaże właściwe, zweryfikowane CTA.
- Nie powtarzaj pytania, na które użytkownik już odpowiedział.
- Traktuj wykluczenia użytkownika jako wiążące. Nie proponuj ani nie uzasadniaj wykluczonego kierunku.
- Po najpóźniej czwartej odpowiedzi użytkownika podsumuj potrzebę i wskaż jeden rekomendowany kierunek. Nie rozpoczynaj kolejnej diagnozy.`
    : `CONVERSATION RULES:
- Ask at most one short question in each response.
- Do not include links or page addresses in the response. The interface provides the verified CTA.
- Do not repeat a question the user has already answered.
- Treat the user's exclusions as binding. Do not propose or justify an excluded direction.
- By the user's fourth answer at the latest, summarise the need and name one recommended direction. Do not start another diagnostic loop.`;

  const controllerDirective = trustedDecision?.conversation.action === "recommend"
    ? l === "pl"
      ? `DECYZJA KONTROLERA: REKOMENDACJA. Nie zadawaj żadnego pytania. Krótko podsumuj rozpoznaną potrzebę i uzasadnij wskazany kierunek: ${trustedDecision.conversation.destinationId}.`
      : `CONTROLLER DECISION: RECOMMEND. Do not ask a question. Briefly summarise the identified need and justify the selected direction: ${trustedDecision.conversation.destinationId}.`
    : trustedDecision?.conversation.action === "ask"
    ? l === "pl"
      ? "DECYZJA KONTROLERA: DIAGNOZA. Zadaj dokładnie jedno krótkie pytanie, które rozróżni dalszy kierunek."
      : "CONTROLLER DECISION: DISCOVERY. Ask exactly one short question that distinguishes the next direction."
    : "";

  // Metadata block instruction
  const metadataInstruction = `
Na końcu odpowiedzi (niewidoczne dla użytkownika) dołącz blok JSON:
\`\`\`metadata
{"intent": "INTENT_CODE", "confidence": 0.0–1.0, "urgency": "U1|U2|U3", "phase": "PHASE_NAME"}
\`\`\``;

  return [
    identity,
    "\n---\n",
    context,
    reasoningSnippet,
    "\n---\n",
    intelligenceContext,
    "\n---\n",
    toneGuidance,
    "\n",
    langRule,
    "\n---\n",
    conversationRule,
    controllerDirective,
    "\n---\n",
    compressionDirective,
    "\n---\n",
    antiPatterns,
    "\n---\n",
    metadataInstruction,
  ].filter(Boolean).join("\n");
}
