import { createNewsletterPostHandler } from '@/lib/forms/newsletter-route-handler'
import {
	getNewsletterRouteTestDependencies,
	getNewsletterRouteTestProcessSubscription,
} from '@/lib/forms/newsletter-route-test-overrides'

export const POST = createNewsletterPostHandler(
	getNewsletterRouteTestProcessSubscription(),
	getNewsletterRouteTestDependencies()
)
