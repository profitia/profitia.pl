"use client";

import { useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { useAdvisorySession } from "@/stores/advisory-session.store";
import { getAdvisoryDestinationById } from "@/lib/advisory-chat/destination-registry";
import { track } from "@/lib/analytics";
import { buildRecommendationRationale } from "@/lib/advisory-widget/recommendation-rationale";
import { WIDGET_MOTION } from "@/lib/advisory-widget/config";
import { AssistantMessage } from "./AssistantMessage";
import type { AdvisoryDestinationId, Locale, Message } from "@/types";

interface RecommendationStripProps {
  destinationId: AdvisoryDestinationId;
  locale: Locale;
  messages: readonly Message[];
}

export function handleRecommendationNavigation(
  destination: ReturnType<typeof getAdvisoryDestinationById>,
  onNavigate: () => void,
) {
  track.recommendationClicked(destination.analyticsId, destination.href);
  onNavigate();
}

export function RecommendationStrip({
  destinationId,
  locale,
  messages,
}: RecommendationStripProps) {
  const { markRecommendationShown, closeAssistant, advisor } = useAdvisorySession();
  const destination = getAdvisoryDestinationById(destinationId, locale);
  const rationale = buildRecommendationRationale(messages, destinationId, locale);

  useEffect(() => {
    markRecommendationShown(destination.analyticsId);
    track.recommendationShown(destination.analyticsId, destination.title);
  }, [destination.analyticsId, destination.title, markRecommendationShown]);

  return (
    <div className="px-4 py-3 border-t border-gray-100 flex-shrink-0 space-y-2.5">
      <AssistantMessage advisor={advisor}>
        <p>{rationale.context}</p>
        <p className="mt-1 font-medium">{rationale.summary}</p>
        <p className="mt-2 font-semibold">{rationale.lead}</p>
      </AssistantMessage>
      <div className="ml-11">
        <DestinationCard
          destination={destination}
          onNavigate={closeAssistant}
        />
      </div>
    </div>
  );
}

function DestinationCard({
  destination,
  onNavigate,
}: {
  destination: ReturnType<typeof getAdvisoryDestinationById>;
  onNavigate: () => void;
}) {
  const reduceMotion = useReducedMotion();
  const handleClick = () => {
    handleRecommendationNavigation(destination, onNavigate);
  };

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: reduceMotion ? 0 : WIDGET_MOTION.recommendationDurationSeconds,
      }}
    >
      <Link
        href={destination.href}
        onClick={handleClick}
        className="rec-card flex items-start gap-3 group block"
      >
        <div
          className="w-1 rounded-full flex-shrink-0 mt-1 self-stretch bg-[#242F44]"
          style={{ minHeight: "2rem" }}
        />
        <div className="flex-1 min-w-0">
          <p className="text-xs font-semibold text-gray-900 leading-snug group-hover:text-[#006D9E] transition-colors">
            {destination.title}
          </p>
          <p className="text-2xs text-gray-500 mt-0.5 leading-snug line-clamp-2">
            {destination.description}
          </p>
          <p className="text-2xs font-semibold text-[#006D9E] mt-1">
            {destination.action}
          </p>
        </div>
        <span className="text-gray-300 group-hover:text-gray-500 transition-colors flex-shrink-0 mt-1">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M2.5 6h7M7 3.5L9.5 6 7 8.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </Link>
    </motion.div>
  );
}
