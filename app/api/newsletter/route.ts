import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'

const NewsletterSchema = z.object({
  email: z.string().email(),
  name: z.string().max(100).optional(),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const data = NewsletterSchema.parse(body)

    const existing = await prisma.subscriber.findUnique({ where: { email: data.email } })
    if (existing) {
      return NextResponse.json({ success: true, alreadySubscribed: true }, { status: 200 })
    }

    await prisma.subscriber.create({
      data: {
        email: data.email,
        name: data.name ?? null,
      },
    })

    // TODO: Trigger Mailchimp sync when integration is ready

    return NextResponse.json({ success: true }, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ success: false, errors: error.errors }, { status: 422 })
    }
    console.error('[API /newsletter]', error)
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 })
  }
}
