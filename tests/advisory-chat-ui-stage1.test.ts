import assert from "node:assert/strict";
import React, { createElement } from "react";
import { readFileSync } from "node:fs";
import path from "node:path";
import { renderToStaticMarkup } from "react-dom/server";
import { AdvisoryWidget, type AdvisoryWidgetCopy } from "@profitia/advisory-widget";
import { WIDGET_COPY, ADVISORS } from "@/lib/advisory-widget/config";
import { getOpeningScenarios } from "@/lib/advisory-widget/scenarios";
import { buildProfitiaWidgetRecommendation } from "@/features/advisory-assistant/AdvisoryAssistant";
import type { AdvisoryDestinationId } from "@/types";

(globalThis as typeof globalThis & { React: typeof React }).React = React;

const strings = WIDGET_COPY.pl;
const copy: AdvisoryWidgetCopy = {
  title: strings.title,
  status: strings.ready,
  moreOptions: strings.moreOptions,
  changeAdvisor: strings.changeAdvisor,
  changeTo: strings.changeTo,
  firstContact: strings.firstContact,
  dismissInvitation: strings.dismissInvitation,
  intro: strings.intro,
  promptsLabel: "Wybierz swoją sytuację",
  prompts: getOpeningScenarios("pl").map(({ prompt }) => prompt),
  customMessageHint: strings.customMessageHint,
  placeholder: strings.placeholder,
  messageAriaLabel: strings.messageAriaLabel,
  sendAriaLabel: strings.sendAriaLabel,
  closeAriaLabel: strings.closeAriaLabel,
  triggerAriaLabel: strings.triggerAriaLabel,
  typingAriaLabel: "Asystent przygotowuje odpowiedź",
  contactLabel: strings.contactLabel,
  footerLabel: "Profitia Advisory · CIC",
};

function renderDestination(destinationId: AdvisoryDestinationId) {
  const messages = [{ id: "user-message", role: "user" as const, content: "Potrzebujemy wsparcia w opisanym obszarze zakupowym.", timestamp: 0 }];
  return renderToStaticMarkup(createElement(AdvisoryWidget, {
    locale: "pl",
    copy,
    advisors: Object.values(ADVISORS),
    messages,
    defaultOpen: true,
    recommendation: buildProfitiaWidgetRecommendation(destinationId, "pl", messages),
    contact: { href: "/kontakt", label: strings.contactLabel },
    onSend: () => undefined,
  }));
}

const services = renderDestination("services");
assert.match(services, /Jako pierwszy krok proponuję/);
assert.match(services, /Potrzebujemy wsparcia w opisanym obszarze zakupowym/);
assert.match(services, /Usługi doradcze/);
assert.match(services, /href="\/doradztwo\/uslugi"/);
assert.match(renderDestination("competence"), /href="\/rozwoj-kompetencji"/);
assert.match(renderDestination("digital"), /href="\/uslugi-digital\/digital-consulting"/);

const packageSource = readFileSync(path.join(process.cwd(), "node_modules/@profitia/advisory-widget/dist/AdvisoryWidget.js"), "utf8");
assert.match(packageSource, /recommendation_click/);
assert.match(packageSource, /setOpen\(false\)/);

console.log("Advisory chat stage 1 UI: package-backed rendering tests passed");
