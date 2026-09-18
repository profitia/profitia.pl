// ─────────────────────────────────────────────────────────
// ETAP 4.5 — Procurement Reasoning Snippets Library
// Konkretna wiedza procurementowa dla advisory quality.
// ─────────────────────────────────────────────────────────

// ── Supplier Increase Reasoning ───────────────────────────
export const SUPPLIER_INCREASE_REASONING = {
  pl: [
    "Jeśli dostawca argumentuje podwyżkę wzrostem kosztów energii lub surowców, warto sprawdzić, czy odpowiada ona rzeczywistym cost drivers danej kategorii.",
    "Podwyżka 10–15% bez przedstawienia struktury kosztów to często próba przeniesienia ogólnych kosztów operacyjnych, a nie skutek faktycznych zmian cen materiałów i energii.",
    "Benchmark rynkowy dla tej kategorii powinien pokazać, czy podobni dostawcy utrzymali ceny - to fundament rozmowy negocjacyjnej.",
    "Analiza uzasadnionego kosztu pozwala oddzielić zmianę kosztu wytworzenia od próby poprawy marży dostawcy.",
    "Jeśli nie macie historii cenowej ani struktury kosztów dostawcy, negocjacja często kończy się akceptacją jego narracji.",
  ],
  en: [
    "If the supplier justifies a price increase citing energy or raw material costs, verify whether the increase actually correlates with cost drivers in their category.",
    "A 10–15% increase without a cost breakdown often means the supplier is passing general operational costs, not actual input cost changes.",
    "A market benchmark for this category should show whether comparable suppliers held prices - that's the foundation of the negotiation.",
    "Should-cost analysis separates a justified manufacturing cost change from a supplier margin improvement attempt.",
    "Without pricing history and a supplier cost breakdown, negotiations often end with acceptance of the supplier's narrative.",
  ],
}

// ── No Benchmark Reasoning ────────────────────────────────
export const NO_BENCHMARK_REASONING = {
  pl: [
    "Brak benchmarków cenowych w kategorii oznacza, że negocjujesz bez punktu odniesienia - to fundamentalna słabość pozycji zakupowej.",
    "Kostka wydatków pozwala zobaczyć, co faktycznie kupujesz, od kogo i za ile - to punkt wyjścia do każdej analizy rynkowej.",
    "Bez widoczności wydatków kategoriami trudno priorytetyzować, gdzie jest największy potencjał oszczędnościowy.",
    "Menedżer kategorii bez benchmarków to jak dyrektor finansowy bez rachunku wyników - decyzje opierają się na intuicji, nie na danych.",
    "Analiza rynku dostawców pokazuje, kto oferuje co i za ile - to fundament decyzji o wyborze źródła dostaw.",
  ],
  en: [
    "Without pricing benchmarks in a category, you're negotiating without a reference point - a fundamental weakness in the buying position.",
    "Spend Cube shows what you're actually buying, from whom, and at what price - the starting point for any market analysis.",
    "Without category-level spend visibility, it's difficult to prioritize where the largest savings potential lies.",
    "A category manager without benchmarks is like a CFO without a P&L - decisions are based on intuition, not data.",
    "Supplier Intelligence gives visibility into who offers what and at what price - the foundation of a sourcing decision.",
  ],
}

// ── Procurement Strategy Reasoning ───────────────────────
export const PROCUREMENT_STRATEGY_REASONING = {
  pl: [
    "Strategia zakupowa bez segmentacji kategorii to plan bez priorytetów - nie wiadomo, gdzie skupić czas i zasoby.",
    "Projekt modelu operacyjnego ustala, jak zakupy są zorganizowane: kto decyduje, kto doradza, a kto realizuje działania - to fundament skuteczności.",
    "Strategia kategorii pozwala wyjść poza reaktywne kupowanie i zbudować długoterminową pozycję wobec dostawców.",
    "Biuro zarządzania projektami zakupowymi zapewnia realizację inicjatyw, a nie tylko ich zaplanowanie.",
    "Zarządzanie tymczasowe sprawdza się, gdy doświadczone wsparcie jest potrzebne natychmiast, bez wielomiesięcznej rekrutacji.",
  ],
  en: [
    "A procurement strategy without category segmentation is a plan without priorities - no clarity on where to focus time and resources.",
    "Operating Model Design establishes how procurement is organized: who decides, who advises, who operates - the foundation of effectiveness.",
    "Category Strategy allows moving beyond reactive buying and building a long-term position with suppliers.",
    "Procurement PMO ensures procurement initiatives are executed, not just planned.",
    "Interim Management works when immediate experienced presence is needed without months of recruitment.",
  ],
}

// ── Spend Visibility Reasoning ────────────────────────────
export const SPEND_VISIBILITY_REASONING = {
  pl: [
    "Jeśli nie wiesz, co kupujesz globalnie, nie możesz konsolidować, priorytetyzować ani negocjować z pozycji siły.",
    "Kostka wydatków to nie tylko narzędzie raportowe - to mapa decyzji zakupowych pokazująca, gdzie skupiają się ryzyko, marża i potencjał.",
    "Bez widoczności wydatków każda inicjatywa oszczędnościowa zaczyna się od żmudnego zbierania danych zamiast od analizy.",
    "Dashboardy zakupowe przekładają surowe dane transakcyjne na mierniki, które mogą śledzić dyrektorzy finansowi i zakupowi.",
    "Analiza rynku dostawców pozwala zrozumieć, czy baza dostawców jest skonsolidowana, zdywersyfikowana czy przypadkowa.",
  ],
  en: [
    "If you don't know what you're buying globally, you can't consolidate, prioritize, or negotiate from a position of strength.",
    "Spend Cube is not a reporting tool - it's a map of procurement decisions: where risk, margin, and potential are concentrated.",
    "Without spend visibility, every savings initiative starts with tedious data collection instead of analysis.",
    "Procurement Dashboards translate raw transaction data into KPIs that CFOs and CPOs can track.",
    "Supplier Intelligence reveals whether your supplier base is consolidated, diversified, or accidental.",
  ],
}

// ── Negotiation Reasoning ─────────────────────────────────
export const NEGOTIATION_REASONING = {
  pl: [
    "Skuteczna negocjacja zaczyna się przed spotkaniem - analiza kosztów, benchmarki rynkowe i BATNA są ważniejsze niż techniki negocjacyjne.",
    "Metodyka negocjacji harvardzkich odróżnia pozycje od interesów - dostawca chce wyższej marży, ale może zaakceptować inne warunki.",
    "Negocjacje oparte na faktach wykorzystują analizę cost drivers zamiast narracji - to fundamentalna różnica w poziomie zaawansowania.",
    "Wsparcie negocjacyjne zapewnia zewnętrzny zespół analityczny, który przygotuje strukturę kosztów i benchmarki przed kluczową rozmową.",
    "Negocjacja bez przygotowania analitycznego to rozmowa, w której dostawca ma więcej danych niż kupiec.",
  ],
  en: [
    "Effective negotiation starts before the meeting - cost analysis, market benchmarks, and BATNA matter more than negotiation techniques.",
    "Harvard Negotiation methodology separates positions from interests - the supplier wants higher margin but may accept different terms.",
    "Fact-Based Negotiation grounds arguments in cost drivers, not narrative - a fundamental difference in sophistication.",
    "Supplier Negotiation Support provides an external analytical team to prepare cost breakdowns and benchmarks before a key meeting.",
    "Negotiating without analytical preparation is a conversation where the supplier has more data than the buyer.",
  ],
}

// ── Supplier Risk Reasoning ───────────────────────────────
export const SUPPLIER_RISK_REASONING = {
  pl: [
    "Koncentracja na jednym dostawcy w kluczowej kategorii to ryzyko operacyjne i negocjacyjne jednocześnie.",
    "Analiza rynku pozwala zidentyfikować alternatywnych dostawców, zanim sytuacja wymusi pilne poszukiwanie nowego źródła dostaw.",
    "Ocena zdolności finansowej dostawcy to element zarządzania ryzykiem, nie opcja - szczególnie przy długich kontraktach.",
    "Dywersyfikacja bazy dostawców wymaga najpierw mapy obecnej zależności - bez tego nie wiadomo, gdzie jest rzeczywiste ryzyko.",
    "Zbyt wiele pojedynczych dostawców to ryzyko, ale zbyt szeroka baza to wyższe koszty zarządzania i słabsza pozycja w każdej relacji.",
  ],
  en: [
    "Single-source dependency in a critical category is both an operational and negotiation risk simultaneously.",
    "Supplier Intelligence identifies alternative suppliers before the situation forces urgent sourcing.",
    "Assessing supplier financial health is a risk management element, not an option - especially for long-term contracts.",
    "Supplier base diversification requires first mapping current dependency - without that, you don't know where the real risk lies.",
    "Too many single-source suppliers is a risk, but too wide a base means higher management costs and weaker positions in every relationship.",
  ],
}

// ── Procurement Transformation Reasoning ─────────────────
export const TRANSFORMATION_REASONING = {
  pl: [
    "Transformacja zakupów to nie projekt IT ani wdrożenie systemu - to zmiana sposobu decydowania i zarządzania wartością.",
    "Transformacja zakupów zaczyna się od diagnozy: jak dojrzałe są procesy, gdzie występują braki i co ogranicza efektywność.",
    "Zarządzanie tymczasowe w zakupach sprawdza się, gdy w okresie przejściowym potrzebny jest doświadczony dyrektor zakupów.",
    "Zarządzanie kategoriami to nie segment, lecz model operacyjny wymagający zmiany odpowiedzialności, narzędzi i kultury.",
    "Biuro zarządzania projektami zakupowymi koordynuje inicjatywy, które bez takiego wsparcia przegrywają z codziennymi priorytetami operacyjnymi.",
  ],
  en: [
    "Procurement transformation is not an IT project or a system implementation - it's a change in how decisions are made and value is managed.",
    "Procurement Transformation starts with a diagnostic: how mature are the processes, where are the gaps, what blocks effectiveness.",
    "Interim Management in procurement works when an experienced CPO or Director is needed for a transition period.",
    "Category Management is not a segment - it's an operating model that requires changes in accountability, tools, and culture.",
    "Procurement PMO coordinates initiatives that, without management, dissolve in day-to-day operational priorities.",
  ],
}

// ── EBIT / Business Impact Framing ───────────────────────
export const BUSINESS_IMPACT_FRAMING = {
  pl: [
    "Każde 1% oszczędności na kosztach zakupów to bezpośredni wpływ na EBIT - często wyższy niż 1% wzrostu przychodów przy tej samej marży.",
    "Warunki płatności wpływają na przepływy pieniężne, nie tylko na koszt - termin 30 zamiast 60 dni oznacza realną różnicę w kapitale obrotowym.",
    "Zmienność cen dostawców bez zabezpieczeń lub długoterminowych kontraktów tworzy ryzyko marżowe, które trudno zaplanować.",
    "Koszt zmiany dostawcy jest często niedoszacowany - to nie tylko cena, ale czas wdrożenia, jakość i ryzyko ciągłości.",
    "Zgodność z procesem zakupowym to nie tylko kwestia audytu - każda transakcja poza procesem tworzy mierzalne ryzyko finansowe.",
  ],
  en: [
    "Every 1% savings on procurement costs directly impacts EBIT - often more than 1% revenue growth at the same margin.",
    "Payment terms are cash flow, not just cost - 30 vs 60 day terms is a real difference in working capital.",
    "Supplier pricing volatility without hedging or long-term contracts is a margin risk that's hard to plan for.",
    "The cost of switching suppliers is often underestimated - it's not just price, but implementation time, quality, and continuity risk.",
    "Procurement compliance is not just an audit - it's measurable financial risk in every out-of-process transaction.",
  ],
}

// ── Reactive Procurement Reasoning ───────────────────────
export const REACTIVE_PROCUREMENT_REASONING = {
  pl: [
    "Reaktywne zakupy zawsze zaczynają się za późno - pozostaje za mało czasu na wybór źródła dostaw i za mało danych do negocjacji.",
    "Analiza SPOT porządkuje obraz całej funkcji zakupowej - pokazuje, czy źródło problemu leży w wyborze źródeł dostaw, procesach, organizacji czy narzędziach.",
    "Kupowanie ad hoc bez konsolidacji to najdroższy model zakupów - każda transakcja jest jednorazowa i pozycja negocjacyjna słaba.",
    "Strategia kategorii buduje długoterminową pozycję - nie tylko rozwiązuje bieżące problemy, ale również ogranicza ich powracanie.",
    "Ocena dojrzałości zakupowej pokazuje, gdzie organizacja znajduje się dziś i co realnie może osiągnąć w ciągu 12 miesięcy.",
  ],
  en: [
    "Reactive procurement always starts too late - not enough time for sourcing, not enough data for negotiation.",
    "SPOT Analysis structures the full procurement function picture - showing whether the root cause sits in sourcing, processes, organisation, or tools.",
    "Ad hoc buying without consolidation is the most expensive procurement model - every transaction is one-off and negotiating position is weak.",
    "Category Strategy builds a long-term position - it doesn't solve current problems but eliminates their recurrence.",
    "Procurement maturity assessment shows where the organization is today and what's realistically achievable in 12 months.",
  ],
}

// ── Escalation Framing ────────────────────────────────────
export const ESCALATION_FRAMING = {
  pl: [
    "Kolejny krok to 20-minutowa rozmowa - bez zobowiązań, tylko diagnoza sytuacji i ocena, co realnie można uzyskać.",
    "Analiza SPOT to dobry pierwszy etap wtedy, gdy organizacja potrzebuje obiektywnej diagnozy i ustalenia priorytetów dalszych działań.",
    "Możemy zacząć od diagnozy całej funkcji zakupowej - ogranicza to ryzyko źle ustawionego zakresu kolejnego etapu.",
    "Zanim zaangażujesz pełny projekt, warto uporządkować punkt startu diagnozą dojrzałości - to eliminuje większość niepewności co do priorytetów.",
  ],
  en: [
    "The next step is a 20-minute conversation - no commitment, just a situation diagnosis and an honest assessment of what's achievable.",
    "SPOT Analysis is a strong first phase when the organisation needs an objective diagnosis and a clear set of improvement priorities.",
    "We can start with a diagnosis of the full procurement function - reducing the risk of setting the wrong scope for the next phase.",
    "Before committing to a full project, a maturity assessment helps remove most of the uncertainty around priorities and scope.",
  ],
}

// ── Lookup: pick 1 reasoning snippet by intent ────────────
export type IntentCode =
  | "I1_SAVINGS" | "I2_FORECASTING" | "I3_SUPPLIER_RISK"
  | "I4_DIGITALIZATION" | "I5_SOURCING" | "I6_EDUCATION"
  | "I7_EXPLORATORY" | "I8_NEGOTIATIONS" | "UNKNOWN";

export function getProcurementReasoningSnippets(
  intent: IntentCode,
  locale: "pl" | "en",
  count: 1 | 2 = 1
): string[] {
  const map: Record<IntentCode, { pl: string[]; en: string[] }> = {
    I1_SAVINGS:         SUPPLIER_INCREASE_REASONING,
    I2_FORECASTING:     SPEND_VISIBILITY_REASONING,
    I3_SUPPLIER_RISK:   SUPPLIER_RISK_REASONING,
    I4_DIGITALIZATION:  SPEND_VISIBILITY_REASONING,
    I5_SOURCING:        PROCUREMENT_STRATEGY_REASONING,
    I6_EDUCATION:       TRANSFORMATION_REASONING,
    I7_EXPLORATORY:     REACTIVE_PROCUREMENT_REASONING,
    I8_NEGOTIATIONS:    NEGOTIATION_REASONING,
    UNKNOWN:            REACTIVE_PROCUREMENT_REASONING,
  };
  const pool = map[intent]?.[locale] ?? REACTIVE_PROCUREMENT_REASONING[locale];
  // deterministic pick — rotate by pool.length to avoid always same snippet
  const idx = Math.floor(Date.now() / 60_000) % pool.length;
  return pool.slice(idx, idx + count).concat(pool.slice(0, Math.max(0, count - (pool.length - idx))));
}

export function getEscalationFraming(locale: "pl" | "en"): string {
  const pool = ESCALATION_FRAMING[locale];
  return pool[Math.floor(Date.now() / 120_000) % pool.length];
}

export function getBusinessImpactFraming(locale: "pl" | "en"): string {
  const pool = BUSINESS_IMPACT_FRAMING[locale];
  return pool[Math.floor(Date.now() / 90_000) % pool.length];
}
