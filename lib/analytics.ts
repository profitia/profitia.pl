// ─────────────────────────────────────────────────────────
// CI-Profitia — Analytics Engine
// Event tracking, session telemetry, recommendation analytics
// ─────────────────────────────────────────────────────────

import { nanoid } from "nanoid";
import type { AnalyticsEvent, AnalyticsEventType, Locale, PageSlug } from "@/types";

type EventPayload = Record<string, unknown>;

class AnalyticsEngine {
  private sessionId: string;
  private locale: Locale;
  private pageSlug: PageSlug;

  constructor() {
    this.sessionId = nanoid();
    this.locale = "en";
    this.pageSlug = "/";
  }

  init(sessionId: string, locale: Locale, pageSlug: PageSlug) {
    this.sessionId = sessionId;
    this.locale = locale;
    this.pageSlug = pageSlug;

    this.track("session_start", {});
  }

  updateContext(locale: Locale, pageSlug: PageSlug) {
    this.locale = locale;
    this.pageSlug = pageSlug;
  }

  track(type: AnalyticsEventType, payload: EventPayload = {}) {
    const event: AnalyticsEvent = {
      id: nanoid(),
      type,
      sessionId: this.sessionId,
      timestamp: Date.now(),
      locale: this.locale,
      pageSlug: this.pageSlug,
      payload,
    };

    this.deliver(event);
  }

  private deliver(event: AnalyticsEvent) {
    if (typeof window === "undefined") return;

    window.dispatchEvent(
      new CustomEvent("profitia:advisory-analytics", { detail: event }),
    );

    const analyticsWindow = window as typeof window & {
      dataLayer?: Array<Record<string, unknown>>;
    };
    analyticsWindow.dataLayer?.push({
      event: `profitia_${event.type}`,
      advisorySessionId: event.sessionId,
      advisoryLocale: event.locale,
      advisoryPage: event.pageSlug,
      ...event.payload,
    });
  }

}

// Singleton — one engine per page session
export const analytics = new AnalyticsEngine();

// Typed tracker helpers
export const track = {
  assistantOpened: () => analytics.track("assistant_opened"),
  assistantClosed: () => analytics.track("assistant_closed"),
  invitationShown: () => analytics.track("invitation_shown"),
  advisorSelected: (advisor: string) =>
    analytics.track("advisor_selected", { advisor }),
  openingPromptSelected: (promptIndex: number) =>
    analytics.track("opening_prompt_selected", { promptIndex }),
  messageSent: (content: string, source: "prompt" | "custom") =>
    analytics.track("message_sent", { contentLength: content.length, source }),
  intentDetected: (intent: string, confidence: number) =>
    analytics.track("intent_detected", { intent, confidence }),
  recommendationShown: (id: string, title: string) =>
    analytics.track("recommendation_shown", { id, title }),
  recommendationClicked: (id: string, url: string) =>
    analytics.track("recommendation_clicked", { id, url }),
  contactClicked: (url: string, source: string) =>
    analytics.track("contact_clicked", { url, source }),
  conversationReset: () => analytics.track("conversation_reset"),
  ctaShown: (id: string, type: string) =>
    analytics.track("cta_shown", { id, type }),
  ctaClicked: (id: string, type: string, url: string) =>
    analytics.track("cta_clicked", { id, type, url }),
  journeyStarted: (journeyId: string) =>
    analytics.track("journey_started", { journeyId }),
  escalationTriggered: (escalationType: string) =>
    analytics.track("escalation_triggered", { escalationType }),
  behavioralSignal: (signalType: string, pageSlug: string) =>
    analytics.track("behavioral_signal", { signalType, pageSlug }),
  pageContextChange: (from: string, to: string) =>
    analytics.track("page_context_change", { from, to }),
  engagementScore: (score: number) =>
    analytics.track("engagement_score_update", { score }),

  // ── ETAP 2: Intelligence engine events ────────────────
  maturityDetected: (persona: string, score: number) =>
    analytics.track("maturity_detected", { persona, score }),
  routingDecision: (reason: string, escalationScore: number) =>
    analytics.track("routing_decision", { reason, escalationScore }),
  journeyStep: (journeyId: string, stepIndex: number, stepType: string) =>
    analytics.track("journey_step", { journeyId, stepIndex, stepType }),
  journeyCompleted: (journeyId: string) =>
    analytics.track("journey_completed", { journeyId }),
  proactiveTriggered: (triggerType: string, score: number) =>
    analytics.track("proactive_triggered", { triggerType, score }),
  proactiveDismissed: () =>
    analytics.track("proactive_dismissed"),
  proactiveConverted: () =>
    analytics.track("proactive_converted"),
  fatigueDetected: (level: string, ctaCount: number, recCount: number) =>
    analytics.track("fatigue_detected", { level, ctaCount, recCount }),
  sessionHealthUpdate: (depth: string, escalationLikelihood: number, conversionProbability: number) =>
    analytics.track("session_health_update", { depth, escalationLikelihood, conversionProbability }),
  advisoryReadinessUpdate: (score: number, isReady: boolean) =>
    analytics.track("advisory_readiness_update", { score, isReady }),
  stateTransition: (from: string, to: string, trigger: string) =>
    analytics.track("state_transition", { from, to, trigger }),
};
