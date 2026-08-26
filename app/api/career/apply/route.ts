import { createCareerApplyPostHandler } from '@/lib/recruitment/route-handler'
import {
	getRecruitmentRouteTestDependencies,
	getRecruitmentRouteTestProcessApplicationEmails,
} from '@/lib/recruitment/route-test-overrides'

export const POST = createCareerApplyPostHandler({
	...getRecruitmentRouteTestDependencies(),
	processApplicationEmails: getRecruitmentRouteTestProcessApplicationEmails(),
})