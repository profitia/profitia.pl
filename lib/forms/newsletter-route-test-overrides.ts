import { processNewsletterSubscription } from '@/lib/forms/newsletter-subscription'
import type { NewsletterRouteDependencies } from '@/lib/forms/newsletter-route-handler'

const NEWSLETTER_ROUTE_TEST_OVERRIDES_ENV = 'NEWSLETTER_ROUTE_TEST_OVERRIDES'

declare global {
  // eslint-disable-next-line no-var
  var __newsletterRouteTestOverrides:
    | {
      processSubscription?: typeof processNewsletterSubscription
      dependencies?: NewsletterRouteDependencies
    }
    | undefined
}

export function areNewsletterRouteTestOverridesEnabled(env: NodeJS.ProcessEnv = process.env) {
  return env[NEWSLETTER_ROUTE_TEST_OVERRIDES_ENV] === 'enabled' || env.NODE_ENV === 'test'
}

export function setNewsletterRouteTestOverrides(overrides: {
  processSubscription?: typeof processNewsletterSubscription
  dependencies?: NewsletterRouteDependencies
}) {
  if (!areNewsletterRouteTestOverridesEnabled()) {
    throw new Error('Newsletter route test overrides require an explicit test-only environment opt-in.')
  }

  globalThis.__newsletterRouteTestOverrides = overrides
}

export function clearNewsletterRouteTestOverrides() {
  globalThis.__newsletterRouteTestOverrides = undefined
}

export function getNewsletterRouteTestProcessSubscription() {
  if (!areNewsletterRouteTestOverridesEnabled()) {
    return processNewsletterSubscription
  }

  return globalThis.__newsletterRouteTestOverrides?.processSubscription ?? processNewsletterSubscription
}

export function getNewsletterRouteTestDependencies(): NewsletterRouteDependencies {
  if (!areNewsletterRouteTestOverridesEnabled()) {
    return {}
  }

  return globalThis.__newsletterRouteTestOverrides?.dependencies ?? {}
}