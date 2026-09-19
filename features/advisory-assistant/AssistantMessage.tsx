"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { AdvisorId } from "@/lib/advisory-widget/config";
import { WIDGET_MOTION } from "@/lib/advisory-widget/config";
import { AdvisorAvatar } from "./AdvisorAvatar";

interface AssistantMessageProps {
  advisor: AdvisorId;
  children: ReactNode;
  className?: string;
  statusLabel?: string;
}

export function AssistantMessage({
  advisor,
  children,
  className = "",
  statusLabel,
}: AssistantMessageProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: reduceMotion ? 0 : WIDGET_MOTION.messageDurationSeconds }}
      className="flex items-end gap-2 justify-start max-w-[94%]"
      role={statusLabel ? "status" : undefined}
      aria-label={statusLabel}
    >
      <AdvisorAvatar advisor={advisor} decorative className="flex-shrink-0" />
      <div className={`msg-assistant min-w-0 ${className}`}>{children}</div>
    </motion.div>
  );
}
