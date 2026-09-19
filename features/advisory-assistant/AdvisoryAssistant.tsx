"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  AdvisoryWidget,
  type AdvisoryWidgetCopy,
  type AdvisoryWidgetEvent,
  type AdvisoryWidgetMessage,
  type AdvisoryWidgetRecommendation,
} from "@profitia/advisory-widget";
import type { ConversationRecoveryDecision } from "@profitia/cic-core";
import { useAdvisorySession } from "@/stores/advisory-session.store";
import { usePageContext } from "@/hooks/usePageContext";
import { analytics, track } from "@/lib/analytics";
import { SSEDataParser } from "@/lib/advisory-chat/sse-data-parser";
import { getAdvisoryDestinationById } from "@/lib/advisory-chat/destination-registry";
import { buildRecommendationRationale } from "@/lib/advisory-widget/recommendation-rationale";
import { ADVISORS, WIDGET_COPY } from "@/lib/advisory-widget/config";
import { getPublicPath } from "@/lib/routing/public-routes";
import type { Message } from "@/types";
import type { Locale } from "@/lib/i18n";

interface AdvisoryAssistantProps {
  locale: Locale;
}

const PHASE_LABELS: Record<string, Record<Locale, string>> = {
  idle: { pl: "Gotowy do rozmowy", en: "Ready to advise" },
  opening: { pl: "Słucham...", en: "Listening..." },
  intent_discovery: { pl: "Diagnozuję sytuację", en: "Understanding your situation" },
  problem_framing: { pl: "Precyzuję problem", en: "Framing the challenge" },
  capability_recommendation: { pl: "Rekomendacja gotowa", en: "Recommendation ready" },
  objection_handling: { pl: "Omawiam wątpliwości", en: "Addressing concerns" },
  escalation: { pl: "Gotowy do rozmowy z ekspertem", en: "Ready for expert conversation" },
  post_escalation: { pl: "Do usłyszenia wkrótce", en: "Talk soon" },
};

export function buildProfitiaWidgetRecommendation(
  destinationId: "services" | "competence" | "digital",
  locale: Locale,
  messages: readonly Message[],
): AdvisoryWidgetRecommendation {
  const destination = getAdvisoryDestinationById(destinationId, locale);
  const rationale = buildRecommendationRationale(messages, destinationId, locale);
  return {
    id: destination.analyticsId,
    href: destination.href,
    title: destination.title,
    description: destination.description,
    actionLabel: destination.action,
    contextLabel: rationale.context,
    summary: rationale.summary,
    lead: rationale.lead,
  };
}

export function AdvisoryAssistant({ locale }: AdvisoryAssistantProps) {
  const router = useRouter();
  const initialized = useRef(false);
  const abortRef = useRef<AbortController | null>(null);
  const [streamingContent, setStreamingContent] = useState("");
  const {
    session,
    lastDecision,
    isInitialized,
    isTyping,
    isStreaming,
    advisor,
    initSession,
    openAssistant,
    closeAssistant,
    setAdvisor,
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
    markRecommendationShown,
  } = useAdvisorySession();

  usePageContext(locale);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;
    const slug = window.location.pathname.replace(`/${locale}`, "") || "/";
    initSession(locale, slug);
    const currentSession = useAdvisorySession.getState().session;
    if (currentSession) analytics.init(currentSession.id, locale, slug);
  }, [initSession, locale]);

  useEffect(() => () => abortRef.current?.abort(), []);

  const conversationLocale = session?.state.conversationRecovery?.responseLanguage ?? locale;
  const strings = WIDGET_COPY[conversationLocale];

  const handleSend = useCallback(async (content: string, source: "prompt" | "custom") => {
    if (!session || !content.trim()) return;

    track.messageSent(content, source);
    if (source === "prompt") track.openingPromptSelected(Math.max(0, strings.openingPrompts.indexOf(content)));
    addMessage("user", content);
    incrementEngagement(5);
    setTyping(true);
    setStreamingContent("");
    abortRef.current?.abort();
    abortRef.current = new AbortController();

    const freshDecision = runOrchestration();
    const currentSession = useAdvisorySession.getState().session;
    if (!currentSession) return;

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId: currentSession.id,
          messages: currentSession.messages.map((message) => ({ role: message.role, content: message.content })),
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
        if (typeof payload.content === "string") accumulated = payload.content;
        if (payload.type === "recovery" && payload.recovery) {
          recoveryMetadata = { decision: payload.recovery, contact: payload.contact ?? null };
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
            for (const data of [...parser.push(decoder.decode()), ...parser.finish()]) consumePayload(data);
          }
        }
      }

      if (accumulated) {
        if (!recoveryMetadata) resetConversationRecovery();
        addMessage("assistant", accumulated, recoveryMetadata ? {
          recovery: {
            primarySignal: recoveryMetadata.decision.primarySignal,
            confidence: recoveryMetadata.decision.confidence,
            strategy: recoveryMetadata.decision.strategy,
            nextState: recoveryMetadata.decision.nextState,
            terminal: recoveryMetadata.decision.terminal,
            contact: recoveryMetadata.contact,
          },
        } : undefined);
        setStreamingContent("");
        incrementEngagement(10);
        runOrchestration();
      }
    } catch (error: unknown) {
      if (error instanceof Error && error.name !== "AbortError") addMessage("assistant", strings.errorMessage);
    } finally {
      setTyping(false);
      setStreaming(false);
    }
  }, [addMessage, applyConversationRecovery, incrementEngagement, lastDecision, locale, resetConversationRecovery, runOrchestration, session, setPhase, setStreaming, setTyping, strings, updateIntent, updateUrgency]);

  const copy = useMemo<AdvisoryWidgetCopy>(() => ({
    title: strings.title,
    status: PHASE_LABELS[session?.state.phase ?? "idle"]?.[conversationLocale] ?? strings.ready,
    moreOptions: strings.moreOptions,
    changeAdvisor: strings.changeAdvisor,
    changeTo: strings.changeTo,
    firstContact: strings.firstContact,
    dismissInvitation: strings.dismissInvitation,
    intro: strings.intro,
    promptsLabel: conversationLocale === "pl" ? "Typowe sytuacje" : "Common situations",
    prompts: strings.openingPrompts,
    customMessageHint: strings.customMessageHint,
    placeholder: strings.placeholder,
    messageAriaLabel: strings.messageAriaLabel,
    sendAriaLabel: strings.sendAriaLabel,
    closeAriaLabel: strings.closeAriaLabel,
    triggerAriaLabel: strings.triggerAriaLabel,
    typingAriaLabel: conversationLocale === "pl" ? "Asystent przygotowuje odpowiedź" : "Assistant is preparing a response",
    contactLabel: strings.contactLabel,
    footerLabel: "Profitia Advisory · CIC",
    errorMessage: strings.errorMessage,
  }), [conversationLocale, session?.state.phase, strings]);

  const widgetMessages = useMemo<AdvisoryWidgetMessage[]>(() => (session?.messages ?? []).map((message) => ({
    id: message.id,
    role: message.role === "user" ? "user" : "assistant",
    content: message.content,
    ...(message.metadata?.recovery?.contact ? { action: message.metadata.recovery.contact } : {}),
  })), [session?.messages]);

  const destinationId = lastDecision?.conversation.action === "recommend" ? lastDecision.conversation.destinationId : null;
  const recommendation = destinationId && session && (session.state.conversationRecovery?.state ?? "normal") === "normal"
    ? buildProfitiaWidgetRecommendation(destinationId, conversationLocale, session.messages)
    : null;

  const handleEvent = useCallback((event: AdvisoryWidgetEvent) => {
    switch (event.type) {
      case "invitation_view": track.invitationShown(); break;
      case "recommendation_view":
        markRecommendationShown(event.recommendationId);
        if (recommendation) track.recommendationShown(event.recommendationId, recommendation.title);
        break;
      case "recommendation_click": track.recommendationClicked(event.recommendationId, event.href); break;
      case "contact_click": track.contactClicked(event.href, event.source === "footer" ? "widget_footer" : "conversation_recovery"); break;
      default: break;
    }
  }, [markRecommendationShown, recommendation]);

  if (!isInitialized) return null;

  return (
    <AdvisoryWidget
      id="profitia-advisory"
      locale={conversationLocale}
      copy={copy}
      advisors={Object.values(ADVISORS)}
      activeAdvisorId={advisor}
      onAdvisorChange={(id) => setAdvisor(id === "anna" ? "anna" : "adam")}
      messages={widgetMessages}
      isTyping={isTyping}
      streamingContent={streamingContent}
      disabled={isStreaming}
      recommendation={recommendation}
      contact={{ href: getPublicPath("contact", conversationLocale), label: strings.contactLabel }}
      onSend={handleSend}
      onOpenChange={(open) => open ? openAssistant() : closeAssistant()}
      onNavigate={(href) => router.push(href)}
      onEvent={handleEvent}
      preferences={{
        advisorKey: "profitia.advisory.advisor.v1",
        invitationKey: "profitia.advisory.invitation.v1",
        attentionKey: "profitia.advisory.attention.v1",
      }}
    />
  );
}
