import type { AdvisoryDestinationId, IntentCode, Locale, Message } from "@/types";
import { WIDGET_COPY } from "./config";

const INTENT_SUMMARY: Record<Locale, Record<IntentCode, string>> = {
  pl: {
    I1_SAVINGS: "chcesz obniżyć koszty i oprzeć decyzje zakupowe na konkretnych danych",
    I2_FORECASTING: "potrzebujesz lepszej widoczności wydatków, danych i prognoz",
    I3_SUPPLIER_RISK: "chcesz ograniczyć ryzyko dostawców i podejmować decyzje na podstawie danych rynkowych",
    I4_DIGITALIZATION: "szukasz narzędzi, automatyzacji lub rozwiązań cyfrowych dla zakupów",
    I5_SOURCING: "chcesz uporządkować sourcing lub strategię kategorii zakupowej",
    I6_EDUCATION: "chcesz rozwinąć kompetencje swoje lub zespołu zakupowego",
    I7_EXPLORATORY: "szukasz właściwego pierwszego kroku dla wyzwania zakupowego",
    I8_NEGOTIATIONS: "chcesz porównać warunki z rynkiem i wzmocnić pozycję negocjacyjną",
    UNKNOWN: "szukasz właściwego pierwszego kroku dla wyzwania zakupowego",
  },
  en: {
    I1_SAVINGS: "you want to reduce costs and base procurement decisions on concrete data",
    I2_FORECASTING: "you need better visibility of spend, data and forecasts",
    I3_SUPPLIER_RISK: "you want to reduce supplier risk and make decisions using market data",
    I4_DIGITALIZATION: "you are looking for tools, automation or digital procurement solutions",
    I5_SOURCING: "you want to structure sourcing or improve a category strategy",
    I6_EDUCATION: "you want to develop your own or your procurement team's capabilities",
    I7_EXPLORATORY: "you are looking for the right first step for a procurement challenge",
    I8_NEGOTIATIONS: "you want to compare terms with the market and strengthen your negotiating position",
    UNKNOWN: "you are looking for the right first step for a procurement challenge",
  },
};

export interface RecommendationRationale {
  context: string;
  summary: string;
  lead: string;
}

export function buildRecommendationRationale(
  messages: readonly Message[],
  destinationId: AdvisoryDestinationId,
  locale: Locale,
  intent: IntentCode = "UNKNOWN",
): RecommendationRationale {
  const copy = WIDGET_COPY[locale];
  const fallback =
    copy.recommendationFallback[
      destinationId as keyof typeof copy.recommendationFallback
    ] ?? copy.recommendationFallback.services;
  const userContext = messages
    .filter((message) => message.role === "user")
    .map((message) => message.content)
    .join(" ")
    .toLocaleLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
  const supplierRiskWithBenchmark = /ryzyk\w*.{0,80}dostawc\w*/.test(userContext)
    && /benchmark|porownan\w*.{0,24}rynk/.test(userContext);
  const summary = supplierRiskWithBenchmark
    ? locale === "pl"
      ? "chcesz ograniczyć ryzyko dostawców i porównać warunki z rynkiem"
      : "you want to reduce supplier risk and compare terms with the market"
    : INTENT_SUMMARY[locale][intent] ?? fallback;

  return {
    context: copy.recommendationContext,
    summary,
    lead: copy.recommendationLead,
  };
}
