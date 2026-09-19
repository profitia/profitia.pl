"use client";

import { useEffect, useRef, useState } from "react";
import { useAdvisorySession } from "@/stores/advisory-session.store";
import { getAdvisor, WIDGET_COPY } from "@/lib/advisory-widget/config";
import type { Locale } from "@/lib/i18n";
import { AdvisorAvatar } from "./AdvisorAvatar";

interface AdvisorMenuProps {
  locale: Locale;
}

export function AdvisorMenu({ locale }: AdvisorMenuProps) {
  const { advisor, setAdvisor } = useAdvisorySession();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const copy = WIDGET_COPY[locale];
  const otherAdvisor = advisor === "adam" ? "anna" : "adam";
  const otherProfile = getAdvisor(otherAdvisor);

  useEffect(() => {
    if (!isOpen) return;

    const closeOnOutsidePress = (event: PointerEvent) => {
      if (!menuRef.current?.contains(event.target as Node)) setIsOpen(false);
    };

    window.addEventListener("pointerdown", closeOnOutsidePress);
    return () => window.removeEventListener("pointerdown", closeOnOutsidePress);
  }, [isOpen]);

  const handleChange = () => {
    setAdvisor(otherAdvisor);
    setIsOpen(false);
  };

  return (
    <div ref={menuRef} className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        aria-label={copy.moreOptions}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        className="flex h-8 w-8 items-center justify-center rounded-full text-lg leading-none text-white/80 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
      >
        ⋯
      </button>

      {isOpen && (
        <div
          role="menu"
          className="absolute right-0 top-10 z-20 min-w-48 rounded-xl border border-gray-200 bg-white p-1.5 text-gray-900 shadow-xl"
        >
          <p className="px-2 py-1 text-[0.625rem] font-semibold uppercase tracking-wider text-gray-400">
            {copy.changeAdvisor}
          </p>
          <button
            type="button"
            role="menuitem"
            onClick={handleChange}
            className="flex w-full items-center gap-2 rounded-lg px-2 py-2 text-left text-xs font-semibold text-gray-700 transition-colors hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#006D9E]"
          >
            <AdvisorAvatar advisor={otherAdvisor} size="menu" decorative />
            <span>{copy.changeTo(otherProfile.name)}</span>
          </button>
        </div>
      )}
    </div>
  );
}
