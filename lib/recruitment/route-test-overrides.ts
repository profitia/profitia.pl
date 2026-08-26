import { processJobApplicationEmails } from '@/lib/recruitment/application-email'
import type { CareerApplyRouteDependencies } from '@/lib/recruitment/route-handler'

const RECRUITMENT_ROUTE_TEST_OVERRIDES_ENV = 'RECRUITMENT_ROUTE_TEST_OVERRIDES'

declare global {
  // eslint-disable-next-line no-var
  var __recruitmentRouteTestOverrides:
    | {
        processApplicationEmails?: typeof processJobApplicationEmails
        dependencies?: CareerApplyRouteDependencies
      }
    | undefined
}

export function areRecruitmentRouteTestOverridesEnabled(env: NodeJS.ProcessEnv = process.env) {
  return env[RECRUITMENT_ROUTE_TEST_OVERRIDES_ENV] === 'enabled' || env.NODE_ENV === 'test'
}

export function setRecruitmentRouteTestOverrides(overrides: {
  processApplicationEmails?: typeof processJobApplicationEmails
  dependencies?: CareerApplyRouteDependencies
}) {
  if (!areRecruitmentRouteTestOverridesEnabled()) {
    throw new Error('Recruitment route test overrides require an explicit test-only environment opt-in.')
  }

  globalThis.__recruitmentRouteTestOverrides = overrides
}

export function clearRecruitmentRouteTestOverrides() {
  globalThis.__recruitmentRouteTestOverrides = undefined
}

export function getRecruitmentRouteTestProcessApplicationEmails() {
  if (!areRecruitmentRouteTestOverridesEnabled()) {
    return processJobApplicationEmails
  }

  return globalThis.__recruitmentRouteTestOverrides?.processApplicationEmails ?? processJobApplicationEmails
}

export function getRecruitmentRouteTestDependencies(): CareerApplyRouteDependencies {
  if (!areRecruitmentRouteTestOverridesEnabled()) {
    return {}
  }

  return globalThis.__recruitmentRouteTestOverrides?.dependencies ?? {}
}