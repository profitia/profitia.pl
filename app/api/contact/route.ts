import { createContactPostHandler } from '@/lib/forms/contact-route-handler'
import {
  getContactRouteTestDependencies,
  getContactRouteTestPersistSubmissionWithOutbox,
} from '@/lib/forms/contact-route-test-overrides'

export const POST = createContactPostHandler({
  ...getContactRouteTestDependencies(),
  persistSubmissionWithOutbox: getContactRouteTestPersistSubmissionWithOutbox(),
})
