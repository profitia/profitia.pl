// Shared TypeScript types for the Profitia application

import type { Locale } from '@/middleware'

// Re-export for convenience
export type { Locale }

// Dictionary type is derived from the PL file — keeps types in sync
export type Dictionary = typeof import('@/dictionaries/pl.json')

// API response wrappers
export interface ApiSuccess<T = undefined> {
  success: true
  data?: T
}

export interface ApiError {
  success: false
  message: string
  errors?: Array<{ message: string; path: (string | number)[] }>
}

export type ApiResponse<T = undefined> = ApiSuccess<T> | ApiError

// Prisma select types (lightweight, used in components)
export interface ArticlePreview {
  id: string
  slug: string
  title: string
  excerpt: string | null
  createdAt: Date
}

// Integrations (placeholder — not yet implemented)
export interface TeamsBookingConfig {
  organizerEmail: string
  meetingLink: string
}

export interface OpenAIChatConfig {
  model: string
  systemPrompt: string
}

export interface MailchimpConfig {
  listId: string
  audienceId: string
}
