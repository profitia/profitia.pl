import { createContactSubmissionWithOutbox } from '@/lib/forms/contact-email-outbox'
import type { ContactRouteDependencies } from '@/lib/forms/contact-route-handler'

const CONTACT_ROUTE_TEST_OVERRIDES_ENV = 'CONTACT_ROUTE_TEST_OVERRIDES'

declare global {
  // eslint-disable-next-line no-var
  var __contactRouteTestOverrides:
    | {
        persistSubmissionWithOutbox?: typeof createContactSubmissionWithOutbox
        dependencies?: ContactRouteDependencies
      }
    | undefined
}

export function areContactRouteTestOverridesEnabled(env: NodeJS.ProcessEnv = process.env) {
  return env[CONTACT_ROUTE_TEST_OVERRIDES_ENV] === 'enabled' || env.NODE_ENV === 'test'
}

export function setContactRouteTestOverrides(overrides: {
  persistSubmissionWithOutbox?: typeof createContactSubmissionWithOutbox
  dependencies?: ContactRouteDependencies
}) {
  if (!areContactRouteTestOverridesEnabled()) {
    throw new Error('Contact route test overrides require an explicit test-only environment opt-in.')
  }

  globalThis.__contactRouteTestOverrides = overrides
}

export function clearContactRouteTestOverrides() {
  globalThis.__contactRouteTestOverrides = undefined
}

export function getContactRouteTestPersistSubmissionWithOutbox() {
  if (!areContactRouteTestOverridesEnabled()) {
    return createContactSubmissionWithOutbox
  }

  return globalThis.__contactRouteTestOverrides?.persistSubmissionWithOutbox ?? createContactSubmissionWithOutbox
}

export function getContactRouteTestDependencies(): ContactRouteDependencies {
  if (!areContactRouteTestOverridesEnabled()) {
    return {}
  }

  return globalThis.__contactRouteTestOverrides?.dependencies ?? {}
}