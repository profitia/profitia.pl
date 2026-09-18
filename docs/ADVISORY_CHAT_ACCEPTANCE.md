# Advisory chat acceptance

The Stage 3 acceptance suite verifies the product-facing conversation contract
on the same controller, prompt builder, output gate and destination registry
used by the website chat.

## Reference journeys

Run the deterministic suite before merging any chat change:

```bash
npm run test:advisory-stage3
```

The scenarios in `tests/fixtures/advisory-chat-acceptance.ts` cover:

- Polish and English conversations;
- services, capability development and Digital destinations;
- an ambiguous conversation that must recommend a destination by turn four;
- the one-question discovery limit and zero-question recommendation limit;
- verified CTA paths;
- accepted Polish procurement vocabulary: `cost drivers`, `sourcing`,
  `procurement`, `savings` and `spend`.

## Live acceptance

Run the same journeys against the temporary Render domain:

```bash
npm run test:advisory-stage3:live
```

To verify another deployment without changing the suite:

```bash
ADVISORY_ACCEPTANCE_BASE_URL=https://example.test npm run test:advisory-stage3:live
```

The live runner uses the public `/api/chat` path, parses the real SSE stream and
fails when a response is degraded, empty, too long, exposes internal metadata,
contains a model-generated link or violates the question limit.

`scripts/run-benchmarks.ts` remains a language-model quality experiment. It
uses a separate minimal prompt and does not replace this product acceptance
suite.
