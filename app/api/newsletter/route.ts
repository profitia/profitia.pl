import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { CONSENT_VERSION, NEWSLETTER_CONSENT_COPY } from '@/lib/forms/constants'
import { formsPrisma } from '@/lib/forms/prisma'

/**
 * POST /api/newsletter
 *
 * Accepts canonical NewsletterSubmissionPayload from lib/forms/payload.ts.
 * Validates with Zod, enforces GDPR consent, persists to database.
 * Handles already-subscribed gracefully (idempotent).
 *
 * Future CRM integration points:
 *   - Mailchimp: mailchimp.addSubscriber(data.email)
 *   - Brevo: brevo.createContact(data.email)
 *   - Mailerlite: mailerlite.addSubscriber(data.email)
 */

const NewsletterSchema = z.object({
  formType: z.literal('newsletter'),
  locale: z.enum(['pl', 'en']).optional(),
  submittedAt: z.string().optional(),
  source: z.string().max(500).optional(),
  email: z.string().email().max(254),
  consent: z
    .object({
      gdpr: z.boolean(),
      newsletter: z.boolean(),
      consentVersion: z.string().optional(),
      consentAt: z.string().optional(),
      lawfulBasis: z.string().optional(),
    })
    .optional(),
})

export async function POST(request: NextRequest) {
  try {
    const body: unknown = await request.json()
    const data = NewsletterSchema.parse(body)
    const locale = data.locale ?? 'pl'
    const subscribedAt = data.consent?.consentAt ? new Date(data.consent.consentAt) : new Date()
    const consentVersion = data.consent?.consentVersion ?? CONSENT_VERSION

    // GDPR: require explicit consent before persisting any data
    if (!data.consent?.gdpr) {
      return NextResponse.json(
        {
          success: false,
          errorCode: 'CONSENT_REQUIRED',
          message: 'GDPR consent is required.',
        },
        { status: 422 }
      )
    }

    // Idempotent - already subscribed returns success
    const existing = await formsPrisma.newsletterSubscription.findUnique({
      where: { email: data.email },
    })

    if (existing) {
      return NextResponse.json({ success: true, alreadySubscribed: true }, { status: 200 })
    }

    await formsPrisma.newsletterSubscription.create({
      data: {
        email: data.email,
        locale,
        sourcePage: data.source ?? null,
        privacyConsent: data.consent.gdpr,
        privacyConsentText: NEWSLETTER_CONSENT_COPY[locale].privacyConsentText,
        privacyConsentVersion: consentVersion,
        lawfulBasis: data.consent.lawfulBasis ?? 'consent',
        subscribedAt,
      },
    })

    // TODO: Email platform integrations
    // await mailchimp.addSubscriber(data.email, { locale: data.locale })
    // await brevo.createContact(data.email)

    return NextResponse.json({ success: true }, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, errors: error.errors },
        { status: 422 }
      )
    }
    console.error('[API /newsletter]', error)
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    )
  }
}
