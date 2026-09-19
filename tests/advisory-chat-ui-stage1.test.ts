import assert from "node:assert/strict";
import React, { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import type { AdvisoryDestinationId } from "@/types";

// The application uses Next.js' automatic JSX runtime. The lightweight tsx
// test runner compiles imported client components with the classic runtime.
(globalThis as typeof globalThis & { React: typeof React }).React = React;

async function main(): Promise<void> {
  const { RecommendationStrip } = await import(
    "@/features/advisory-assistant/RecommendationStrip"
  );
  const { handleRecommendationNavigation } = await import(
    "@/features/advisory-assistant/RecommendationStrip"
  );
  const { getAdvisoryDestinationById } = await import(
    "@/lib/advisory-chat/destination-registry"
  );
  const { useAdvisorySession } = await import(
    "@/stores/advisory-session.store"
  );

  const renderDestination = (destinationId: AdvisoryDestinationId): string =>
    renderToStaticMarkup(
      createElement(RecommendationStrip, {
        destinationId,
        locale: "pl",
        messages: [
          {
            id: "user-message",
            role: "user",
            content: "Potrzebujemy wsparcia w opisanym obszarze zakupowym.",
            timestamp: 0,
          },
        ],
      }),
    );

  const services = renderDestination("services");
  assert.match(services, /Jako pierwszy krok proponuję/);
  assert.match(services, /Potrzebujemy wsparcia w opisanym obszarze zakupowym/);
  assert.match(services, /Usługi doradcze/);
  assert.match(services, /href="\/doradztwo\/uslugi"/);

  const competence = renderDestination("competence");
  assert.match(competence, /Rozwój kompetencji/);
  assert.match(competence, /href="\/rozwoj-kompetencji"/);

  const digital = renderDestination("digital");
  assert.match(digital, /Digital i AI w zakupach/);
  assert.match(digital, /href="\/uslugi-digital\/digital-consulting"/);

  // The destination is independent from the "already shown" analytics state,
  // so a rerender cannot make it disappear.
  assert.equal(renderDestination("digital"), digital);

  useAdvisorySession.getState().openAssistant();
  assert.equal(useAdvisorySession.getState().isOpen, true);

  handleRecommendationNavigation(
    getAdvisoryDestinationById("digital", "pl"),
    useAdvisorySession.getState().closeAssistant,
  );
  assert.equal(
    useAdvisorySession.getState().isOpen,
    false,
    "Recommendation navigation should collapse the advisory panel",
  );

  console.log("Advisory chat stage 1 UI: all rendering tests passed");
}

void main();
