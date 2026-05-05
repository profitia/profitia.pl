import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { prisma } from '@/lib/prisma'

const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
})

// POST /api/admin/login
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password } = LoginSchema.parse(body)

    const user = await prisma.adminUser.findUnique({ where: { email } })
    if (!user) {
      // Constant-time response to prevent user enumeration
      await bcrypt.compare(password, '$2a$12$invalidhashplaceholderXXXXXXXXXXXXXXXXXX')
      return NextResponse.json({ success: false, message: 'Invalid credentials' }, { status: 401 })
    }

    const valid = await bcrypt.compare(password, user.passwordHash)
    if (!valid) {
      return NextResponse.json({ success: false, message: 'Invalid credentials' }, { status: 401 })
    }

    const secret = process.env.JWT_SECRET
    if (!secret) throw new Error('JWT_SECRET not set')

    const token = jwt.sign(
      { sub: user.id, email: user.email, role: 'admin' },
      secret,
      { expiresIn: '8h' }
    )

    const response = NextResponse.json({ success: true })
    response.cookies.set('admin_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 8,
      path: '/admin',
    })

    return response
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ success: false, errors: error.errors }, { status: 422 })
    }
    console.error('[API /admin/login]', error)
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 })
  }
}
