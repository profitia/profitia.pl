import type { AdvisoryDestinationId, Locale, Message } from "@/types";
import { WIDGET_COPY } from "./config";

const MAX_SUMMARY_LENGTH = 180;

function compactMessage(content: string): string {
  const normalized = content.replace(/\s+/g, " ").trim();
  if (normalized.length <= MAX_SUMMARY_LENGTH) return normalized;
  return `${normalized.slice(0, MAX_SUMMARY_LENGTH - 1).trimEnd()}…`;
}

export interface RecommendationRationale {
  context: string;
  summary: string;
  lead: string;
}

export function buildRecommendationRationale(
  messages: readonly Message[],
  destinationId: AdvisoryDestinationId,
  locale: Locale,
): RecommendationRationale {
  const copy = WIDGET_COPY[locale];
  const fallback =
    copy.recommendationFallback[
      destinationId as keyof typeof copy.recommendationFallback
    ] ?? copy.recommendationFallback.services;
  const latestUserMessage = [...messages]
    .reverse()
    .find((message) => message.role === "user" && message.content.trim());

  return {
    context: copy.recommendationContext,
    summary: latestUserMessage
      ? `„${compactMessage(latestUserMessage.content)}”`
      : fallback,
    lead: copy.recommendationLead,
  };
}
