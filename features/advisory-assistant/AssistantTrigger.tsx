"use client";

import { forwardRef, useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useAdvisorySession } from "@/stores/advisory-session.store";
import {
  TRIGGER_ATTENTION_SESSION_KEY,
  WIDGET_COPY,
  WIDGET_MOTION,
} from "@/lib/advisory-widget/config";
import type { Locale } from "@/lib/i18n";
import { AdvisorAvatar } from "./AdvisorAvatar";

interface AssistantTriggerProps {
  locale: Locale;
}

export const AssistantTrigger = forwardRef<HTMLButtonElement, AssistantTriggerProps>(
  function AssistantTrigger({ locale }, ref) {
    const { isOpen, openAssistant, closeAssistant, session, advisor } =
      useAdvisorySession();
    const reduceMotion = useReducedMotion();
    const [attention, setAttention] = useState(false);
    const copy = WIDGET_COPY[locale];
    const hasActivity = Boolean(session?.messages.length);

    useEffect(() => {
      if (reduceMotion) return;
      try {
        if (window.sessionStorage.getItem(TRIGGER_ATTENTION_SESSION_KEY)) return;
        window.sessionStorage.setItem(TRIGGER_ATTENTION_SESSION_KEY, "shown");
      } catch {
        // The one-off animation can still run without persistence.
      }
      setAttention(true);
    }, [reduceMotion]);

    return (
      <motion.button
        ref={ref}
        type="button"
        className="advisory-trigger"
        onClick={isOpen ? closeAssistant : openAssistant}
        aria-label={isOpen ? copy.closeAriaLabel : copy.triggerAriaLabel}
        aria-expanded={isOpen}
        aria-controls="profitia-advisory-panel"
        animate={
          attention
            ? { scale: [1, 1.14, 0.97, 1.06, 1] }
            : { scale: 1 }
        }
        transition={{
          duration: attention ? WIDGET_MOTION.attentionDurationSeconds : 0.12,
          ease: [0.2, 0.85, 0.3, 1],
        }}
        onAnimationComplete={() => setAttention(false)}
        whileTap={reduceMotion ? undefined : { scale: 0.96 }}
      >
        {attention && (
          <motion.span
            aria-hidden="true"
            className="pointer-events-none absolute inset-[-0.4rem] rounded-full border-2 border-[#63bdd8]/50"
            initial={{ opacity: 0.65, scale: 0.9 }}
            animate={{ opacity: 0, scale: 1.18 }}
            transition={{ duration: WIDGET_MOTION.attentionDurationSeconds }}
          />
        )}
        <AdvisorAvatar advisor={advisor} size="trigger" decorative />
        {hasActivity && !isOpen && (
          <span
            aria-hidden="true"
            className="absolute right-0.5 top-0.5 h-2.5 w-2.5 rounded-full border-2 border-[#242F44] bg-[#53d39b]"
          />
        )}
      </motion.button>
    );
  },
);
