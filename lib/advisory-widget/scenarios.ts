import type {
  AdvisoryWidgetPrompt,
  AdvisoryWidgetQuickReplyGroup,
} from "@profitia/advisory-widget";
import type { IntentCode } from "@profitia/cic-procurement";
import type { Locale } from "@/lib/i18n";

export type OpeningScenarioId =
  | "supplier-price-increase"
  | "price-validation"
  | "category-strategy"
  | "digital-solutions"
  | "capability-development";

export interface OpeningScenario {
  id: OpeningScenarioId;
  prompt: AdvisoryWidgetPrompt;
  question: string;
  quickReplies: AdvisoryWidgetQuickReplyGroup;
  intent: IntentCode;
  destinationId: "services" | "competence" | "digital";
}

const SCENARIOS: Record<Locale, readonly OpeningScenario[]> = {
  pl: [
    {
      id: "supplier-price-increase",
      prompt: { id: "supplier-price-increase", label: "Mój dostawca zamierza podnieść ceny." },
      question: "Co jest teraz najważniejsze?",
      quickReplies: {
        selectionMode: "multiple",
        ariaLabel: "Wybierz cel rozmowy o podwyżce",
        submitLabel: "Wyślij wybór",
        options: [
          { id: "prepare-negotiation", label: "Przygotowanie do negocjacji" },
          { id: "validate-increase", label: "Ocena zasadności podwyżki" },
          { id: "supplier-risk", label: "Ograniczenie ryzyka dostaw" },
        ],
      },
      intent: "I8_NEGOTIATIONS",
      destinationId: "services",
    },
    {
      id: "price-validation",
      prompt: { id: "price-validation", label: "Nie mam jak zweryfikować, czy cena dostawcy jest zasadna." },
      question: "Które kategorie zakupowe generują największe wydatki?",
      quickReplies: {
        selectionMode: "multiple",
        ariaLabel: "Wybierz kategorie o największych wydatkach",
        submitLabel: "Wyślij wybór",
        options: [
          { id: "materials", label: "Surowce i materiały" },
          { id: "services", label: "Usługi" },
          { id: "logistics", label: "Transport i logistyka" },
          { id: "technology", label: "IT i technologia" },
          { id: "unknown", label: "Nie wiem / wiele kategorii" },
        ],
      },
      intent: "I8_NEGOTIATIONS",
      destinationId: "services",
    },
    {
      id: "category-strategy",
      prompt: { id: "category-strategy", label: "Chcę zbudować lub poprawić strategię kategorii." },
      question: "Co ma być najważniejszym celem strategii kategorii?",
      quickReplies: {
        selectionMode: "multiple",
        ariaLabel: "Wybierz cele strategii kategorii",
        submitLabel: "Wyślij wybór",
        options: [
          { id: "savings", label: "Oszczędności" },
          { id: "supplier-risk", label: "Ograniczenie ryzyka dostawców" },
          { id: "benchmarks", label: "Weryfikacja cen i benchmarki" },
          { id: "all", label: "Wszystkie powyższe" },
        ],
      },
      intent: "I5_SOURCING",
      destinationId: "services",
    },
    {
      id: "digital-solutions",
      prompt: { id: "digital-solutions", label: "Potrzebuję wsparcia w doborze rozwiązań IT i digital." },
      question: "Jakiego wsparcia potrzebujesz najbardziej?",
      quickReplies: {
        selectionMode: "multiple",
        ariaLabel: "Wybierz obszary wsparcia Digital i IT",
        submitLabel: "Wyślij wybór",
        options: [
          { id: "requirements", label: "Określenie wymagań" },
          { id: "solution-selection", label: "Wybór rozwiązania" },
          { id: "spend-visibility", label: "Widoczność wydatków" },
          { id: "automation-ai", label: "Automatyzacja i AI" },
        ],
      },
      intent: "I4_DIGITALIZATION",
      destinationId: "digital",
    },
    {
      id: "capability-development",
      prompt: { id: "capability-development", label: "Chcę podnieść kompetencje swoje i mojego zespołu." },
      question: "Które kompetencje chcesz rozwinąć w pierwszej kolejności?",
      quickReplies: {
        selectionMode: "multiple",
        ariaLabel: "Wybierz kompetencje do rozwoju",
        submitLabel: "Wyślij wybór",
        options: [
          { id: "negotiations", label: "Negocjacje" },
          { id: "category-management", label: "Zarządzanie kategorią" },
          { id: "analytics", label: "Analiza danych i wydatków" },
          { id: "supplier-management", label: "Zarządzanie dostawcami" },
        ],
      },
      intent: "I6_EDUCATION",
      destinationId: "competence",
    },
  ],
  en: [
    {
      id: "supplier-price-increase",
      prompt: { id: "supplier-price-increase", label: "My supplier intends to raise prices." },
      question: "What matters most right now?",
      quickReplies: {
        selectionMode: "multiple", ariaLabel: "Choose the objective for the price increase", submitLabel: "Send selection",
        options: [
          { id: "prepare-negotiation", label: "Prepare for negotiations" },
          { id: "validate-increase", label: "Validate the increase" },
          { id: "supplier-risk", label: "Reduce supply risk" },
        ],
      },
      intent: "I8_NEGOTIATIONS", destinationId: "services",
    },
    {
      id: "price-validation",
      prompt: { id: "price-validation", label: "I cannot verify whether the supplier's price is justified." },
      question: "Which procurement categories generate the highest spend?",
      quickReplies: {
        selectionMode: "multiple", ariaLabel: "Choose the highest-spend categories", submitLabel: "Send selection",
        options: [
          { id: "materials", label: "Raw materials" },
          { id: "services", label: "Services" },
          { id: "logistics", label: "Transport and logistics" },
          { id: "technology", label: "IT and technology" },
          { id: "unknown", label: "Not sure / several categories" },
        ],
      },
      intent: "I8_NEGOTIATIONS", destinationId: "services",
    },
    {
      id: "category-strategy",
      prompt: { id: "category-strategy", label: "I want to build or improve a category strategy." },
      question: "What should be the primary objective of the category strategy?",
      quickReplies: {
        selectionMode: "multiple", ariaLabel: "Choose category strategy objectives", submitLabel: "Send selection",
        options: [
          { id: "savings", label: "Savings" },
          { id: "supplier-risk", label: "Reduce supplier risk" },
          { id: "benchmarks", label: "Price validation and benchmarks" },
          { id: "all", label: "All of the above" },
        ],
      },
      intent: "I5_SOURCING", destinationId: "services",
    },
    {
      id: "digital-solutions",
      prompt: { id: "digital-solutions", label: "I need support selecting IT and digital solutions." },
      question: "Which kind of support do you need most?",
      quickReplies: {
        selectionMode: "multiple", ariaLabel: "Choose Digital and IT support areas", submitLabel: "Send selection",
        options: [
          { id: "requirements", label: "Define requirements" },
          { id: "solution-selection", label: "Select a solution" },
          { id: "spend-visibility", label: "Spend visibility" },
          { id: "automation-ai", label: "Automation and AI" },
        ],
      },
      intent: "I4_DIGITALIZATION", destinationId: "digital",
    },
    {
      id: "capability-development",
      prompt: { id: "capability-development", label: "I want to develop my own and my team's capabilities." },
      question: "Which capabilities do you want to develop first?",
      quickReplies: {
        selectionMode: "multiple", ariaLabel: "Choose capabilities to develop", submitLabel: "Send selection",
        options: [
          { id: "negotiations", label: "Negotiations" },
          { id: "category-management", label: "Category management" },
          { id: "analytics", label: "Spend and data analysis" },
          { id: "supplier-management", label: "Supplier management" },
        ],
      },
      intent: "I6_EDUCATION", destinationId: "competence",
    },
  ],
};

export function getOpeningScenarios(locale: Locale): readonly OpeningScenario[] {
  return SCENARIOS[locale];
}

export function getOpeningScenario(
  locale: Locale,
  id: string | undefined,
): OpeningScenario | undefined {
  return id ? SCENARIOS[locale].find((scenario) => scenario.id === id) : undefined;
}
