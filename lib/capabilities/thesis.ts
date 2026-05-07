/**
 * Institutional thesis statements - one per capability.
 *
 * These are not marketing slogans. They are expert observations:
 * concise, authoritative, editorial. Rendered on detail pages between
 * the hero lede and the problem section.
 *
 * Format: 1-2 sentences. No superlatives. No promises. No italics.
 * Tone: research paper / executive briefing / institutional report.
 */
export const CAPABILITY_THESIS: Record<string, { pl: string; en: string }> = {

  // ─── Services - Advisory ──────────────────────────────────────────────

  'projekty-doradcze': {
    pl: 'Większość organizacji nie traci na złych decyzjach zakupowych. Traci na braku zewnętrznego punktu odniesienia, który umożliwia ocenę, czy decyzja jest dobra.',
    en: 'Most organisations do not lose on bad procurement decisions. They lose on the absence of an external reference point that makes it possible to judge whether a decision is sound.',
  },

  'interim-management': {
    pl: 'Luka kompetencyjna w funkcji zakupowej rzadko jest problemem tymczasowym. Zazwyczaj odsłania głębszą niezdolność organizacji do utrzymania wiedzy operacyjnej.',
    en: 'A capability gap in the procurement function is rarely a temporary problem. It usually reveals a deeper organisational inability to retain operational knowledge.',
  },

  'procurement-transformation': {
    pl: 'Większość transformacji zakupowych nie kończy się niepowodzeniem z powodu strategii. Kończy się na poziomie modelu operacyjnego.',
    en: 'Most procurement transformations do not fail because of strategy. They fail at the level of the operating model.',
  },

  'category-strategy': {
    pl: 'Kategoria zakupowa bez strategii to zbiór transakcji. Dopiero architektura kategorii przekształca funkcję zakupową w dźwignię biznesową.',
    en: 'A procurement category without a strategy is a collection of transactions. Only category architecture transforms procurement into a business lever.',
  },

  'operating-model-design': {
    pl: 'Organizacja zakupowa bez jasno zdefiniowanego modelu operacyjnego nieustannie reaktywuje te same dyskusje zamiast podejmować decyzje.',
    en: 'A procurement organisation without a clearly defined operating model continuously reactivates the same discussions instead of making decisions.',
  },

  'procurement-pmo': {
    pl: 'Programy transformacyjne w zakupach zawodzą rzadko z powodu złej strategii. Zawodzą z powodu braku dyscypliny wykonania.',
    en: 'Procurement transformation programmes rarely fail because of poor strategy. They fail because of lack of execution discipline.',
  },

  // ─── Services - Negotiations ──────────────────────────────────────────

  'analiza-spot': {
    pl: 'Rynek nie negocjuje. Dostarcza informacji tym, którzy wiedzą, jak je czytać i kiedy działać.',
    en: 'The market does not negotiate. It supplies information to those who know how to read it and when to act.',
  },

  'should-cost-analysis': {
    pl: 'Negocjacje oparte wyłącznie na doświadczeniu stają się nieprzewidywalne w miarę wzrostu zmienności rynku.',
    en: 'Negotiations based solely on experience become unpredictable as market volatility increases.',
  },

  'negotiation-preparation': {
    pl: 'Przewaga negocjacyjna nie rodzi się przy stole. Rodzi się w tygodniach analizy, które poprzedzają spotkanie.',
    en: 'Negotiating advantage is not created at the table. It is created in the weeks of analysis that precede the meeting.',
  },

  'supplier-benchmarking': {
    pl: 'Bez zewnętrznego punktu odniesienia każda cena wygląda jak rynkowa. Benchmarking to jedyna metoda weryfikacji tej oceny.',
    en: 'Without an external reference point, every price looks like market rate. Benchmarking is the only method for verifying that judgement.',
  },

  'supplier-negotiation-support': {
    pl: 'Doświadczony negocjator po stronie kupującego zmienia nie tylko wynik rozmowy. Zmienia jej dynamikę od pierwszej chwili.',
    en: 'An experienced negotiator on the buyer side changes not only the outcome of the conversation. It changes the dynamic from the very first moment.',
  },

  // ─── Services - Analytics ─────────────────────────────────────────────

  'spend-cube': {
    pl: 'Dane zakupowe mają wartość dopiero wtedy, gdy zmieniają decyzje operacyjne.',
    en: 'Procurement data has value only when it changes operational decisions.',
  },

  'spend-analytics': {
    pl: 'Organizacja, która nie rozumie struktury własnego wydatku, nie jest w stanie nim zarządzać - niezależnie od tego, ile narzędzi posiada.',
    en: 'An organisation that does not understand the structure of its own spending cannot manage it - regardless of how many tools it has.',
  },

  'procurement-dashboards': {
    pl: 'Zarządzanie zakupami bez danych w czasie rzeczywistym to zarządzanie z opóźnieniem, które zawsze ma koszt.',
    en: 'Managing procurement without real-time data means managing with a delay that always has a cost.',
  },

  'supplier-intelligence': {
    pl: 'Dostawca, którego sytuacji finansowej nie rozumiemy, jest dostawcą, którego nie kontrolujemy.',
    en: 'A supplier whose financial situation we do not understand is a supplier we do not control.',
  },

  'procurement-kpi-systems': {
    pl: 'Organizacja mierzy to, czym zarządza. To, czego nie mierzy, wymyka się spod kontroli bez względu na deklarowaną wagę.',
    en: 'An organisation measures what it manages. What it does not measure escapes control regardless of its stated importance.',
  },

  // ─── Services - Development ───────────────────────────────────────────

  'coaching-zakupowy': {
    pl: 'Zmiana kompetencji negocjacyjnych wymaga zmiany nawyków decyzyjnych. Wiedza bez zmiany zachowania nie przekłada się na wyniki.',
    en: 'Changing negotiation competence requires changing decision-making habits. Knowledge without behavioural change does not translate into results.',
  },

  // ─── Education - Executive ───────────────────────────────────────────

  'akademia-zakupow': {
    pl: 'Zakupy strategiczne to dyscyplina zarządzania - nie funkcja wsparcia. Ta różnica w pozycjonowaniu zmienia wszystko.',
    en: 'Strategic procurement is a management discipline - not a support function. That difference in positioning changes everything.',
  },

  'procurement-excellence': {
    pl: 'Doskonałość operacyjna w zakupach nie jest stanem docelowym. Jest zdolnością do ciągłego podnoszenia standardu w zmieniającym się środowisku.',
    en: 'Operational excellence in procurement is not a destination. It is the capacity to continuously raise the standard in a changing environment.',
  },

  'strategic-sourcing': {
    pl: 'Strategiczny sourcing wymaga zdolności do analizy rynków dostawców - nie tylko do zarządzania relacjami z pojedynczymi dostawcami.',
    en: 'Strategic sourcing requires the ability to analyse supplier markets - not just to manage relationships with individual suppliers.',
  },

  // ─── Education - Negotiation ─────────────────────────────────────────

  'warsztaty-negocjacyjne': {
    pl: 'Negocjacje zakupowe są zbyt często traktowane jako sztuka improwizacji. Są nauką strukturalnego przygotowania.',
    en: 'Procurement negotiations are too often treated as the art of improvisation. They are the science of structural preparation.',
  },

  'advanced-negotiations': {
    pl: 'Zaawansowane negocjacje wymagają nie tylko techniki. Wymagają zdolności do budowania pozycji w warunkach niepełnej informacji i asymetrycznej presji.',
    en: 'Advanced negotiations require more than technique. They require the capacity to build position under conditions of incomplete information and asymmetric pressure.',
  },

  'fact-based-negotiation': {
    pl: 'Argumentacja oparta na faktach zmienia naturę negocjacji - z walki pozycyjnej w dialog oparty na logice kosztów.',
    en: 'Fact-based argumentation changes the nature of negotiations - from positional combat to a dialogue grounded in cost logic.',
  },

  // ─── Education - Analytics ───────────────────────────────────────────

  'spend-analytics-training': {
    pl: 'Analityk zakupowy, który nie rozumie struktury kosztów, produkuje raporty. Ten, który rozumie - produkuje wnioski.',
    en: 'A procurement analyst who does not understand cost structure produces reports. One who understands it produces insights.',
  },

  'supplier-financial-analysis': {
    pl: 'Ocena ryzyka dostawcy bez analizy jego sytuacji finansowej to ocena niepełna - niezależnie od liczby lat współpracy.',
    en: 'Assessing supplier risk without analysing its financial position is an incomplete assessment - regardless of how many years of partnership exist.',
  },

  // ─── Education - Custom ──────────────────────────────────────────────

  'in-company-workshops': {
    pl: 'Programy in-company są skuteczne wtedy, gdy odpowiadają na rzeczywiste wyzwania organizacji - a nie na ustandaryzowany curriculum.',
    en: 'In-company programmes are effective when they address the actual challenges of the organisation - not a standardised curriculum.',
  },

  'procurement-mentoring': {
    pl: 'Mentoring zakupowy ma wartość wtedy, gdy jest zakorzeniony w realnych decyzjach mentee. Abstrakcyjne case studies budują wiedzę. Własne decyzje budują kompetencje.',
    en: 'Procurement mentoring has value when rooted in the actual decisions of the mentee. Abstract case studies build knowledge. Real decisions build competence.',
  },
}
