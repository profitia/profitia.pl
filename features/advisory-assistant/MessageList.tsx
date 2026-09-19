"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useAdvisorySession } from "@/stores/advisory-session.store";
import { WIDGET_COPY, WIDGET_MOTION } from "@/lib/advisory-widget/config";
import { track } from "@/lib/analytics";
import { AssistantMessage } from "./AssistantMessage";
import type { Message, Locale } from "@/types";

interface MessageListProps {
  messages: Message[];
  streamingContent: string;
  locale: Locale;
  onPromptSelect?: (prompt: string) => void;
}

export function MessageList({ messages, streamingContent, locale, onPromptSelect }: MessageListProps) {
  const bottomRef = useRef<HTMLDivElement>(null);
  const closeAssistant = useAdvisorySession((state) => state.closeAssistant);
  const advisor = useAdvisorySession((state) => state.advisor);
  const isTyping = useAdvisorySession((state) => state.isTyping);
  const reduceMotion = useReducedMotion();
  const copy = WIDGET_COPY[locale];

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
  }, [messages, streamingContent, reduceMotion]);

  const isEmpty = messages.length === 0 && !streamingContent;

  return (
    <div
      className="flex-1 overflow-y-auto advisory-scroll px-4 py-4 space-y-3 min-h-0"
      aria-live="polite"
      aria-relevant="additions text"
    >
      {isEmpty && (
        <EmptyState locale={locale} onSelect={onPromptSelect} />
      )}

      <AnimatePresence initial={false}>
        {messages.map((msg) =>
          msg.role === "user" ? (
            <motion.div
              key={msg.id}
              initial={reduceMotion ? false : { opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: reduceMotion ? 0 : WIDGET_MOTION.messageDurationSeconds,
                ease: "easeOut",
              }}
              className="flex justify-end"
            >
              <div className="msg-user max-w-[85%]">{msg.content}</div>
            </motion.div>
          ) : msg.role === "assistant" ? (
            <AssistantMessage key={msg.id} advisor={advisor}>
              {msg.content}
              {msg.metadata?.recovery?.contact && (
                <a
                  href={msg.metadata.recovery.contact.href}
                  onClick={() => {
                    track.contactClicked(
                      msg.metadata!.recovery!.contact!.href,
                      "conversation_recovery",
                    );
                    closeAssistant();
                  }}
                  className="mt-3 inline-flex rounded-lg bg-[#242F44] px-3 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#33415c] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#006D9E]"
                >
                  {msg.metadata.recovery.contact.label}
                </a>
              )}
            </AssistantMessage>
          ) : null,
        )}
      </AnimatePresence>

      {/* Streaming content */}
      {streamingContent && (
        <AssistantMessage advisor={advisor}>
            {streamingContent}
            <span className="inline-block w-0.5 h-3.5 bg-gray-400 ml-0.5 animate-pulse" />
        </AssistantMessage>
      )}

      {/* Typing indicator */}
      {!streamingContent && isTyping && (
        <AssistantMessage
          advisor={advisor}
          className="flex items-center gap-1 py-3"
          statusLabel={locale === "pl" ? "Asystent przygotowuje odpowiedź" : "Assistant is preparing a response"}
        >
            <div className="flex gap-1">
              <span className="typing-dot" />
              <span className="typing-dot" />
              <span className="typing-dot" />
            </div>
        </AssistantMessage>
      )}

      <div ref={bottomRef} />
    </div>
  );
}

function EmptyState({ locale, onSelect }: { locale: Locale; onSelect?: (prompt: string) => void }) {
  const copy = WIDGET_COPY[locale];
  const advisor = useAdvisorySession((state) => state.advisor);

  return (
    <div className="space-y-4 pt-1">
      {/* Advisory intro */}
      <AssistantMessage advisor={advisor}>{copy.intro}</AssistantMessage>

      {/* Situation prompts */}
      <div className="space-y-2">
        <p className="text-2xs font-medium tracking-widest uppercase text-gray-400">
          {locale === "pl" ? "Typowe sytuacje" : "Common situations"}
        </p>
        <div className="space-y-1.5">
          {copy.openingPrompts.map((prompt) => (
            <button
              key={prompt}
              onClick={() => onSelect?.(prompt)}
              className="w-full text-left text-sm text-gray-600 px-3 py-2.5 rounded-xl border border-gray-100 hover:border-gray-200 hover:bg-gray-50 transition-all duration-150 leading-snug"
            >
              {prompt}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
