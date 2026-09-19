"use client";

import Link from "next/link";
import { getPublicPath } from "@/lib/routing/public-routes";
import { WIDGET_COPY } from "@/lib/advisory-widget/config";
import { track } from "@/lib/analytics";
import { useAdvisorySession } from "@/stores/advisory-session.store";
import type { Locale } from "@/lib/i18n";

export function AssistantFooter({ locale }: { locale: Locale }) {
  const closeAssistant = useAdvisorySession((state) => state.closeAssistant);
  const href = getPublicPath("contact", locale);
  const copy = WIDGET_COPY[locale];

  const handleContact = () => {
    track.contactClicked(href, "widget_footer");
    closeAssistant();
  };

  return (
    <div className="flex items-center justify-between border-t border-gray-100 px-4 py-2.5">
      <span className="text-[0.625rem] text-gray-400">Profitia Advisory · CIC</span>
      <Link
        href={href}
        onClick={handleContact}
        className="rounded-md px-1.5 py-1 text-[0.6875rem] font-semibold text-[#006D9E] transition-colors hover:text-[#0092D9] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#006D9E]"
      >
        {copy.contactLabel}
      </Link>
    </div>
  );
}
