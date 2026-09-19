"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useAdvisorySession } from "@/stores/advisory-session.store";
import { AssistantTrigger } from "./AssistantTrigger";
import { AssistantPanel } from "./AssistantPanel";
import { ProactivePrompt } from "./ProactivePrompt";
import { usePageContext } from "@/hooks/usePageContext";
import { analytics } from "@/lib/analytics";
import { WIDGET_MOTION } from "@/lib/advisory-widget/config";
import type { Locale } from "@/lib/i18n";

interface AdvisoryAssistantProps {
  locale: Locale;
}

export function AdvisoryAssistant({ locale }: AdvisoryAssistantProps) {
  const { isOpen, isInitialized, initSession } = useAdvisorySession();
  const initialized = useRef(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const wasOpen = useRef(false);
  const reduceMotion = useReducedMotion();
  usePageContext(locale);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    const slug = window.location.pathname.replace(`/${locale}`, "") || "/";
    initSession(locale, slug);
    const currentSession = useAdvisorySession.getState().session;
    if (currentSession) analytics.init(currentSession.id, locale, slug);
  }, [locale, initSession]);

  useEffect(() => {
    if (wasOpen.current && !isOpen) triggerRef.current?.focus();
    wasOpen.current = isOpen;
  }, [isOpen]);

  if (!isInitialized) return null;

  return (
    <>
      {/* Proactive prompt — shows before assistant is opened */}
      {!isOpen && <ProactivePrompt locale={locale} />}

      {/* Floating trigger button */}
      <AssistantTrigger ref={triggerRef} locale={locale} />

      {/* Advisory panel — slides up when open */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="advisory-panel"
            initial={reduceMotion ? false : { opacity: 0, y: 12, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 8, scale: 0.97 }}
            transition={{
              duration: reduceMotion ? 0 : WIDGET_MOTION.panelDurationSeconds,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="advisory-panel"
            id="profitia-advisory-panel"
            role="dialog"
            aria-modal="false"
            aria-labelledby="profitia-advisory-title"
          >
            <AssistantPanel locale={locale} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
