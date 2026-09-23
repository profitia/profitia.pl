'use client'

type FormEventName = 'newsletter_signup' | 'generate_lead' | 'job_application_submit'

type AnalyticsWindow = Window & {
  gtag?: (...args: unknown[]) => void
}

/** Track only confirmed form submissions on the public production site. */
export function trackGa4FormSuccess(
  eventName: FormEventName,
  locale: 'pl' | 'en',
  formLocation: string,
) {
  if (typeof window === 'undefined') return
  if (!['profitia.pl', 'www.profitia.pl'].includes(window.location.hostname)) return
  if (window.location.pathname.startsWith('/admin')) return

  try {
    (window as AnalyticsWindow).gtag?.('event', eventName, {
      send_to: 'G-5TQDR26KT5',
      form_language: locale,
      form_location: formLocation,
    })
  } catch {
    // Analytics must never interfere with a successful form submission.
  }
}
