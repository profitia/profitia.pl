# Advisory chat CIC dual-run record

Status: Stage 7 passed  
Date: 2026-09-18

## Purpose

This record verifies that replacing the website-owned copies of stabilized
conversation policy with versioned CIC packages preserves the user-facing
product contract.

The comparison uses two isolated, tracked-only application states:

| Lane | Commit | Decision implementation |
| --- | --- | --- |
| Legacy baseline | `525fddaa8dbd90911203748a41255ea5bd40ee98` | Website-local conversation, intent and destination policy |
| CIC consumer | `3114fef763ac71267083eda06fe204d000a70150` | `@profitia/cic-*` packages version `1.0.0` |

The local user checkout and its untracked files were not used or modified.

## Method

Both lanes were installed from their lockfiles and executed the same product
acceptance command:

```bash
npm ci
npm run test:advisory-stage3
```

The Stage 3 suite asserts the decision on every user turn, including intent,
action, question limit, destination identifier, public URL, prompt mode,
metadata removal and the final visible-question count. UI rendering regression
checks run in the same command.

## Outcome matrix

| Journey | Legacy | CIC consumer | Final route |
| --- | --- | --- | --- |
| PL urgent supplier negotiation | Pass | Pass | `/doradztwo/uslugi` |
| EN supplier negotiation | Pass | Pass | `/en/advisory/services` |
| PL team capability development | Pass | Pass | `/rozwoj-kompetencji` |
| EN team capability development | Pass | Pass | `/en/education` |
| PL procurement automation and AI | Pass | Pass | `/uslugi-digital/digital-consulting` |
| EN procurement automation and AI | Pass | Pass | `/en/digital-services/digital-consulting` |
| PL ambiguous four-turn journey | Pass | Pass | `/doradztwo/uslugi` |
| PL accepted domain vocabulary | Pass | Pass | `/doradztwo/uslugi` |

Both lanes reported:

- 8 reference journeys passed;
- stable conversation-contract tests passed;
- Stage 1 UI rendering tests passed.

No product-contract divergence was found. The CIC consumer retains the hard
four-user-turn exit, at most one question per discovery response and
deterministic routing to all three Profitia destinations.

## Cutover and rollback decision

Package adoption had already been deployed in Stage 4. Stage 7 therefore ran
as an independent post-adoption dual-run instead of introducing a second
production feature flag. Adding a parallel runtime solely to repeat the
comparison would create the legacy this migration is intended to remove.

The Last Known Good before package adoption is the immutable Git commit
`525fddaa8dbd90911203748a41255ea5bd40ee98`. Rollback remains a normal Git
revert of the package-consumer change; package versions are pinned exactly and
no database or public API migration is involved.

Stage 8 may remove only the unused `/api/runtime` execution surface. The active
`/api/chat` path, the package-backed orchestrator and application-owned route
registry remain protected by the acceptance suite.
