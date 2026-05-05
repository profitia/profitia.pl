import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'
import { buildSystemPrompt } from '@/lib/ai/context'

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { message } = body

    if (!message || typeof message !== 'string') {
      return NextResponse.json({ error: 'Brak wiadomości' }, { status: 400 })
    }

    const systemPrompt = buildSystemPrompt()

    const response = await client.chat.completions.create({
      model: process.env.OPENAI_PRIMARY_MODEL || 'gpt-4.1',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: message },
      ],
      temperature: 0.7,
    })

    const reply = response.choices?.[0]?.message?.content || 'Brak odpowiedzi'

    return NextResponse.json({ reply })
  } catch (error) {
    console.error('Błąd API chat:', error)
    return NextResponse.json({ error: 'Błąd serwera' }, { status: 500 })
  }
}
