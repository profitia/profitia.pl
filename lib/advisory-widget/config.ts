import type { Locale } from "@/lib/i18n";

export type AdvisorId = "adam" | "anna";

export interface AdvisorProfile {
  id: AdvisorId;
  name: string;
  image: {
    src: string;
    srcSet: string;
  };
}

export const DEFAULT_ADVISOR: AdvisorId = "adam";
export const ADVISOR_PREFERENCE_KEY = "profitia.advisory.advisor.v1";
export const FIRST_CONTACT_SESSION_KEY = "profitia.advisory.invitation.v1";
export const TRIGGER_ATTENTION_SESSION_KEY = "profitia.advisory.attention.v1";

export const ADVISORS: Record<AdvisorId, AdvisorProfile> = {
  adam: {
    id: "adam",
    name: "Adam",
    image: {
      src: "/images/advisory/adam-128.webp",
      srcSet:
        "/images/advisory/adam-128.webp 1x, /images/advisory/adam-256.webp 2x",
    },
  },
  anna: {
    id: "anna",
    name: "Anna",
    image: {
      src: "/images/advisory/anna-128.webp",
      srcSet:
        "/images/advisory/anna-128.webp 1x, /images/advisory/anna-256.webp 2x",
    },
  },
};

export const WIDGET_MOTION = {
  panelDurationSeconds: 0.22,
  messageDurationSeconds: 0.18,
  recommendationDurationSeconds: 0.22,
  attentionDurationSeconds: 0.9,
  invitationDelayMs: 650,
  invitationVisibleMs: 12_000,
  typewriterCharacterMs: 32,
  typingIndicatorSeconds: 1.2,
} as const;

export interface AdvisoryWidgetCopy {
  title: string;
  advisorTitle: (name: string) => string;
  ready: string;
  moreOptions: string;
  changeAdvisor: string;
  changeTo: (name: string) => string;
  firstContact: string;
  dismissInvitation: string;
  intro: string;
  customMessageHint: string;
  scenarioResolved: string;
  placeholder: string;
  messageAriaLabel: string;
  sendAriaLabel: string;
  closeAriaLabel: string;
  triggerAriaLabel: string;
  contactLabel: string;
  resetLabel: string;
  historyLabel: string;
  historyTitle: string;
  historyEmpty: string;
  historyLoading: string;
  historyError: string;
  historyCloseLabel: string;
  historyBackLabel: string;
  recommendationLead: string;
  recommendationContext: string;
  recommendationFallback: Record<"services" | "competence" | "digital", string>;
  errorMessage: string;
}

export const WIDGET_COPY: Record<Locale, AdvisoryWidgetCopy> = {
  pl: {
    title: "Profitia Advisory",
    advisorTitle: (name) => `Jestem ${name}, ${name === "Anna" ? "Twoja doradczyni" : "Twój doradca"}`,
    ready: "Gotowy do rozmowy",
    moreOptions: "Więcej opcji",
    changeAdvisor: "Zmień doradcę",
    changeTo: (name) => `Zmień na ${name === "Anna" ? "Annę" : "Adama"}`,
    firstContact:
      "Cześć! Jestem Twoim doradcą. Pomogę Ci szybko znaleźć informacje i rozwiązania dopasowane do Twojej sytuacji.",
    dismissInvitation: "Zamknij powitanie",
    intro:
      "Poniżej znajdziesz najczęstsze wyzwania zakupowe. Czy któreś z nich pasuje do Twojej sytuacji?",
    customMessageHint: "Inny temat? Opisz go własnymi słowami.",
    scenarioResolved: "Dziękuję — to wystarczy, aby wskazać właściwy kierunek.",
    placeholder: "Napisz wiadomość…",
    messageAriaLabel: "Twoja wiadomość",
    sendAriaLabel: "Wyślij wiadomość",
    closeAriaLabel: "Zamknij asystenta",
    triggerAriaLabel: "Otwórz doradcę zakupowego",
    contactLabel: "Wolę porozmawiać z człowiekiem",
    resetLabel: "Zacznij od nowa",
    historyLabel: "Historia rozmów",
    historyTitle: "Historia rozmów",
    historyEmpty: "Nie masz jeszcze zapisanych rozmów.",
    historyLoading: "Wczytuję historię…",
    historyError: "Nie udało się wczytać historii. Spróbuj ponownie.",
    historyCloseLabel: "Zamknij historię",
    historyBackLabel: "Wróć do listy rozmów",
    recommendationLead: "Jako pierwszy krok proponuję:",
    recommendationContext: "Rozumiem z tego, co piszesz, że:",
    recommendationFallback: {
      services: "potrzebujesz wsparcia w rozwiązaniu konkretnego wyzwania zakupowego",
      competence: "chcesz rozwinąć kompetencje swoje lub zespołu zakupowego",
      digital: "szukasz lepszej widoczności danych lub wsparcia Digital i AI",
    },
    errorMessage: "Wystąpił błąd. Spróbuj ponownie.",
  },
  en: {
    title: "Profitia Advisory",
    advisorTitle: (name) => `I’m ${name}, your advisor`,
    ready: "Ready to talk",
    moreOptions: "More options",
    changeAdvisor: "Change advisor",
    changeTo: (name) => `Switch to ${name}`,
    firstContact:
      "Hi! I’m your advisor. I’ll help you quickly find information and solutions suited to your situation.",
    dismissInvitation: "Dismiss greeting",
    intro:
      "Below are the most common procurement challenges. Does one of them match your situation?",
    customMessageHint: "Something else? Describe it in your own words.",
    scenarioResolved: "Thank you — that is enough to identify the right direction.",
    placeholder: "Type your message…",
    messageAriaLabel: "Your message",
    sendAriaLabel: "Send message",
    closeAriaLabel: "Close advisor",
    triggerAriaLabel: "Open procurement advisor",
    contactLabel: "I prefer to talk to a person",
    resetLabel: "Start again",
    historyLabel: "Conversation history",
    historyTitle: "Conversation history",
    historyEmpty: "You do not have any saved conversations yet.",
    historyLoading: "Loading history…",
    historyError: "History could not be loaded. Please try again.",
    historyCloseLabel: "Close history",
    historyBackLabel: "Back to conversation list",
    recommendationLead: "As a first step, I recommend:",
    recommendationContext: "From what you have written, I understand that:",
    recommendationFallback: {
      services: "you need support with a specific procurement challenge",
      competence: "you want to develop your own or your procurement team's capabilities",
      digital: "you need better data visibility or Digital and AI support",
    },
    errorMessage: "Something went wrong. Please try again.",
  },
};

export function getAdvisor(id: AdvisorId): AdvisorProfile {
  return ADVISORS[id];
}

export function isAdvisorId(value: string | null): value is AdvisorId {
  return value === "adam" || value === "anna";
}
