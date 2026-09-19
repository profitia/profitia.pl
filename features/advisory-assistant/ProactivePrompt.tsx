"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useAdvisorySession } from "@/stores/advisory-session.store";
import {
  FIRST_CONTACT_SESSION_KEY,
  WIDGET_COPY,
  WIDGET_MOTION,
} from "@/lib/advisory-widget/config";
import { track } from "@/lib/analytics";
import type { Locale } from "@/lib/i18n";

interface ProactivePromptProps {
  locale: Locale;
}

export function ProactivePrompt({ locale }: ProactivePromptProps) {
  const openAssistant = useAdvisorySession((state) => state.openAssistant);
  const reduceMotion = useReducedMotion();
  const [isVisible, setIsVisible] = useState(false);
  const [typedText, setTypedText] = useState("");
  const copy = WIDGET_COPY[locale];

  useEffect(() => {
    try {
      if (window.sessionStorage.getItem(FIRST_CONTACT_SESSION_KEY)) return;
    } catch {
      // A restricted storage context should not prevent the invitation.
    }

    const timer = window.setTimeout(() => {
      try {
        window.sessionStorage.setItem(FIRST_CONTACT_SESSION_KEY, "shown");
      } catch {
        // The invitation still works without persistence.
      }
      setIsVisible(true);
      track.invitationShown();
    }, WIDGET_MOTION.invitationDelayMs);

    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    if (reduceMotion) {
      setTypedText(copy.firstContact);
      return;
    }

    setTypedText("");
    let index = 0;
    const timer = window.setInterval(() => {
      index += 1;
      setTypedText(copy.firstContact.slice(0, index));
      if (index >= copy.firstContact.length) window.clearInterval(timer);
    }, WIDGET_MOTION.typewriterCharacterMs);

    return () => window.clearInterval(timer);
  }, [copy.firstContact, isVisible, reduceMotion]);

  useEffect(() => {
    if (!isVisible) return;
    const timer = window.setTimeout(
      () => setIsVisible(false),
      WIDGET_MOTION.invitationVisibleMs,
    );
    return () => window.clearTimeout(timer);
  }, [isVisible]);

  const handleOpen = () => {
    setIsVisible(false);
    openAssistant();
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.aside
          initial={reduceMotion ? false : { opacity: 0, y: 8, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 6, scale: 0.98 }}
          transition={{ duration: reduceMotion ? 0 : 0.2 }}
          className="fixed bottom-24 right-4 z-[9998] w-[min(20rem,calc(100vw-2rem))] rounded-2xl border border-gray-200 bg-white p-4 pr-10 shadow-[0_18px_45px_rgba(23,32,51,0.18)] sm:right-6"
          aria-label={copy.firstContact}
        >
          <button
            type="button"
            onClick={handleOpen}
            className="block w-full text-left text-sm font-medium leading-relaxed text-gray-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#006D9E] focus-visible:ring-offset-2"
          >
            <span aria-hidden="true">{typedText}</span>
            <span className="sr-only">{copy.firstContact}</span>
            {!reduceMotion && typedText.length < copy.firstContact.length && (
              <span aria-hidden="true" className="ml-0.5 inline-block h-4 w-px animate-pulse bg-gray-500" />
            )}
          </button>
          <button
            type="button"
            onClick={() => setIsVisible(false)}
            aria-label={copy.dismissInvitation}
            className="absolute right-2.5 top-2.5 flex h-7 w-7 items-center justify-center rounded-full text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#006D9E]"
          >
            ×
          </button>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
