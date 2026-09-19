"use client";

import { useCallback, useRef, useState, useEffect } from "react";
import { useAdvisorySession } from "@/stores/advisory-session.store";
import { WIDGET_COPY } from "@/lib/advisory-widget/config";
import { MessageList } from "./MessageList";
import { MessageInput } from "./MessageInput";
import { RecommendationStrip } from "./RecommendationStrip";
import { SSEDataParser } from "@/lib/advisory-chat/sse-data-parser";
import type { Locale } from "@/lib/i18n";
import type { ConversationRecoveryDecision } from "@profitia/cic-core";
import { track } from "@/lib/analytics";
import { AdvisorMenu } from "./AdvisorMenu";
import { AssistantFooter } from "./AssistantFooter";

interface AssistantPanelProps {
  locale: Locale;
}

// Phase label for header
const PHASE_LABELS: Record<string, { pl: string; en: string }> = {
  idle: { pl: "Gotowy do rozmowy", en: "Ready to advise" },
  opening: { pl: "Słucham...", en: "Listening..." },
  intent_discovery: { pl: "Diagnozuję sytuację", en: "Understanding your situation" },
  problem_framing: { pl: "Precyzuję problem", en: "Framing the challenge" },
  capability_recommendation: { pl: "Rekomendacja gotowa", en: "Recommendation ready" },
  objection_handling: { pl: "Omawiam wątpliwości", en: "Addressing concerns" },
  escalation: { pl: "Gotowy do rozmowy z ekspertem", en: "Ready for expert conversation" },
  post_escalation: { pl: "Do usłyszenia wkrótce", en: "Talk soon" },
};

export function AssistantPanel({ locale }: AssistantPanelProps) {
  const {
    session,
    lastDecision,
    isTyping,
    isStreaming,
    closeAssistant,
    addMessage,
    setTyping,
    setStreaming,
    updateIntent,
    updateUrgency,
    setPhase,
    incrementEngagement,
    runOrchestration,
    applyConversationRecovery,
    resetConversationRecovery,
  } = useAdvisorySession();

  const conversationLocale = session?.state.conversationRecovery?.responseLanguage ?? locale;
  const strings = WIDGET_COPY[conversationLocale];
  const [streamingContent, setStreamingContent] = useState("");
  const abortRef = useRef<AbortController | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // Send message to advisory API
  const handleSend = useCallback(
    async (content: string, source: "prompt" | "custom" = "custom") => {
      if (!session || !content.trim()) return;

      // Add user message
      track.messageSent(content, source);
      if (source === "prompt") {
        const promptIndex = strings.openingPrompts.indexOf(content);
        track.openingPromptSelected(Math.max(0, promptIndex));
      }
      addMessage("user", content);
      incrementEngagement(5);
      setTyping(true);
      setStreamingContent("");

      // Abort previous request
      abortRef.current?.abort();
      abortRef.current = new AbortController();

      // Run orchestration before sending to get fresh decision
      const freshDecision = runOrchestration();
      const currentSession = useAdvisorySession.getState().session;
      if (!currentSession) return;

      try {
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            sessionId: currentSession.id,
            messages: currentSession.messages.map((message) => ({
              role: message.role,
              content: message.content,
            })),
            locale: currentSession.state.conversationRecovery?.responseLanguage ?? locale,
            pageContext: currentSession.pageContext,
            sessionState: currentSession.state,
            advisoryDecision: freshDecision ?? lastDecision,
          }),
          signal: abortRef.current.signal,
        });

        if (!response.ok) throw new Error("API error");

        let accumulated = "";
        let recoveryMetadata: {
          decision: ConversationRecoveryDecision;
          contact: { href: string; label: string } | null;
        } | null = null;
        const contentType = response.headers.get("content-type") ?? "";

        if (contentType.includes("application/json")) {
          const payload = await response.json();
          if (typeof payload.content === "string") {
            accumulated = payload.content;
          }
          if (payload.type === "recovery" && payload.recovery) {
            recoveryMetadata = {
              decision: payload.recovery as ConversationRecoveryDecision,
              contact: payload.contact ?? null,
            };
            applyConversationRecovery(recoveryMetadata.decision, content);
          }
        } else {
          setTyping(false);
          setStreaming(true);

          const reader = response.body?.getReader();
          const decoder = new TextDecoder();
          const parser = new SSEDataParser();
          let streamDone = false;

          const consumePayload = (data: string) => {
            if (data === "[DONE]") {
              streamDone = true;
              return;
            }

            const parsed = JSON.parse(data);
            if (parsed.type === "text" && typeof parsed.content === "string") {
              accumulated += parsed.content;
              setStreamingContent(accumulated);
            } else if (parsed.type === "metadata") {
              if (parsed.intent) updateIntent(parsed.intent, parsed.confidence ?? 0.7);
              if (parsed.urgency) updateUrgency(parsed.urgency);
              if (parsed.phase) setPhase(parsed.phase);
            }
          };

          if (reader) {
            while (!streamDone) {
              const { done, value } = await reader.read();
              if (done) break;

              for (const data of parser.push(decoder.decode(value, { stream: true }))) {
                consumePayload(data);
                if (streamDone) break;
              }
            }

            if (!streamDone) {
              const finalText = decoder.decode();
              const finalPayloads = [
                ...parser.push(finalText),
                ...parser.finish(),
              ];
              for (const data of finalPayloads) consumePayload(data);
            }
          }
        }

        if (accumulated) {
          if (!recoveryMetadata) resetConversationRecovery();
          addMessage("assistant", accumulated, recoveryMetadata
            ? {
                recovery: {
                  primarySignal: recoveryMetadata.decision.primarySignal,
                  confidence: recoveryMetadata.decision.confidence,
                  strategy: recoveryMetadata.decision.strategy,
                  nextState: recoveryMetadata.decision.nextState,
                  terminal: recoveryMetadata.decision.terminal,
                  contact: recoveryMetadata.contact,
                },
              }
            : undefined);
          setStreamingContent("");
          incrementEngagement(10);
          runOrchestration();
        }
      } catch (err: unknown) {
        if (err instanceof Error && err.name !== "AbortError") {
          setTyping(false);
          addMessage("assistant", strings.errorMessage);
        }
      } finally {
        setTyping(false);
        setStreaming(false);
      }
    },
    [
      session,
      locale,
      addMessage,
      setTyping,
      setStreaming,
      updateIntent,
      updateUrgency,
      setPhase,
      incrementEngagement,
      runOrchestration,
      strings,
      lastDecision,
      applyConversationRecovery,
      resetConversationRecovery,
    ]
  );

  useEffect(() => {
    return () => abortRef.current?.abort();
  }, []);

  useEffect(() => {
    panelRef.current?.focus();
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeAssistant();
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [closeAssistant]);

  const phase = session?.state.phase ?? "idle";
  const phaseLabel = PHASE_LABELS[phase]?.[conversationLocale] ?? PHASE_LABELS.idle[conversationLocale];

  // Use orchestrator decision for recommendation visibility
  const destinationId = lastDecision?.conversation.action === "recommend"
    ? lastDecision.conversation.destinationId
    : null;

  // Urgency indicator color
  const urgencyColor =
    session?.state.urgency === "U1"
      ? "bg-red-400"
      : session?.state.urgency === "U2"
      ? "bg-amber-400"
      : "bg-green-400";

  return (
    <div
      ref={panelRef}
      tabIndex={-1}
      className="flex flex-col flex-1 min-h-0 outline-none"
    >
      {/* Header */}
      <div className="flex flex-shrink-0 items-center justify-between bg-[#242F44] px-4 py-2.5 text-white">
        <div>
            <p id="profitia-advisory-title" className="text-xs font-semibold leading-none">
              {strings.title}
            </p>
            <div className="flex items-center gap-1.5 mt-0.5">
              {session?.state.urgency && session.state.intentConfidence > 0.4 && (
                <span className={`w-1.5 h-1.5 rounded-full ${urgencyColor}`} />
              )}
              <p className="text-[0.625rem] text-white/60 leading-none">
                {phaseLabel}
              </p>
            </div>
        </div>
        <div className="flex items-center gap-1">
          <AdvisorMenu locale={conversationLocale} />
          <button
            type="button"
            onClick={closeAssistant}
            aria-label={strings.closeAriaLabel}
            className="flex h-8 w-8 items-center justify-center rounded-full text-white/70 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M10.5 3.5L3.5 10.5M3.5 3.5l7 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </div>

      {/* Message list */}
      <MessageList
        messages={session?.messages ?? []}
        streamingContent={streamingContent}
        locale={conversationLocale}
        onPromptSelect={(prompt) => handleSend(prompt, "prompt")}
      />

      {/* Recommendation strip — orchestrator-driven */}
      {destinationId && session &&
        (session.state.conversationRecovery?.state ?? "normal") === "normal" && (
        <RecommendationStrip
          destinationId={destinationId}
          locale={conversationLocale}
          messages={session.messages}
        />
      )}

      {/* Input */}
      <MessageInput
        onSend={(content) => handleSend(content, "custom")}
        placeholder={strings.placeholder}
        helperText={session?.messages.length ? undefined : strings.customMessageHint}
        inputAriaLabel={strings.messageAriaLabel}
        sendAriaLabel={strings.sendAriaLabel}
        disabled={isTyping || isStreaming}
      />
      <AssistantFooter locale={conversationLocale} />
    </div>
  );
}
