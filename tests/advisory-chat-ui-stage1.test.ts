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

  const renderDestination = (destinationId: AdvisoryDestinationId): string =>
    renderToStaticMarkup(
      createElement(RecommendationStrip, { destinationId, locale: "pl" }),
    );

  const services = renderDestination("services");
  assert.match(services, /Rekomendowany kierunek/);
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

  console.log("Advisory chat stage 1 UI: all rendering tests passed");
}

void main();
