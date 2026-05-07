import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'

/**
 * POST /api/contact
 *
 * Accepts canonical ContactSubmissionPayload from lib/forms/payload.ts.
 * Validates with Zod (server-side boundary), enforces GDPR consent,
 * persists to database.
 *
 * Future CRM integration points:
 *   - HubSpot: hubspot.createContact(data)
 *   - Pipedrive: pipedrive.createLead(data)
 *   - Notification email via Office365 Graph API
 */

const ContactSchema = z.object({
  formType: z.literal('contact'),
  locale: z.enum(['pl', 'en']).optional(),
  submittedAt: z.string().optional(),
  source: z.string().max(500).optional(),
  name: z.string().min(2).max(100),
  email: z.string().email().max(254),
  company: z.string().max(200).optional(),
  topic: z.string().max(50).optional(),
  message: z.string().min(10).max(2000),
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
    const data = ContactSchema.parse(body)

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

    const contact = await prisma.contact.create({
      data: {
        name: data.name,
        email: data.email,
        company: data.company ?? null,
        topic: data.topic ?? null,
        message: data.message,
        locale: data.locale ?? null,
        source: data.source ?? null,
        consentGdpr: data.consent.gdpr,
        consentNewsletter: data.consent.newsletter,
        consentVersion: data.consent.consentVersion ?? null,
        consentAt: data.consent.consentAt ? new Date(data.consent.consentAt) : null,
        lawfulBasis: data.consent.lawfulBasis ?? 'consent',
      },
    })

    // TODO: CRM integrations
    // await hubspot.createContact({ name: data.name, email: data.email, ... })
    // await pipedrive.createLead({ name: data.name, email: data.email, ... })
    // await sendNotificationEmail(contact)

    return NextResponse.json({ success: true, id: contact.id }, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, errors: error.errors },
        { status: 422 }
      )
    }
    console.error('[API /contact]', error)
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    )
  }
}
