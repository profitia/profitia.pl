"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useAdvisorySession } from "@/stores/advisory-session.store";
import { getAdvisoryDestinationById } from "@/lib/advisory-chat/destination-registry";
import { track } from "@/lib/analytics";
import type { AdvisoryDestinationId, Locale } from "@/types";

interface RecommendationStripProps {
  destinationId: AdvisoryDestinationId;
  locale: Locale;
}

export function RecommendationStrip({
  destinationId,
  locale,
}: RecommendationStripProps) {
  const { markRecommendationShown } = useAdvisorySession();
  const destination = getAdvisoryDestinationById(destinationId, locale);

  useEffect(() => {
    markRecommendationShown(destination.analyticsId);
    track.recommendationShown(destination.analyticsId, destination.title);
  }, [destination.analyticsId, destination.title, markRecommendationShown]);

  return (
    <div className="px-4 py-3 border-t border-gray-100 flex-shrink-0 space-y-2">
      <p className="advisory-label">
        {locale === "pl" ? "Rekomendowany kierunek" : "Recommended direction"}
      </p>
      <DestinationCard destination={destination} />
    </div>
  );
}

function DestinationCard({
  destination,
}: {
  destination: ReturnType<typeof getAdvisoryDestinationById>;
}) {
  const handleClick = () => {
    track.recommendationClicked(destination.analyticsId, destination.href);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
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
