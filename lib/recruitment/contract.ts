import { z } from 'zod'

import { TURNSTILE_TOKEN_MAX_LENGTH } from '@/lib/forms/constants'

export const RECRUITMENT_REQUEST_BODY_MAX_BYTES = 12 * 1024 * 1024
export const RECRUITMENT_SUPPORTED_LOCALES = ['pl', 'en'] as const
export const RECRUITMENT_SOURCE_PAGE_PATTERN = /^\/[A-Za-z0-9\-._~\/]*$/
export const RECRUITMENT_ALLOWED_SOURCE_HOSTS = new Set([
  'profitia.pl',
  'www.profitia.pl',
  'profitia-pl.onrender.com',
])

export const RECRUITMENT_FIELD_LIMITS = {
  fullName: 120,
  email: 254,
  phone: 30,
  availableFrom: 120,
  financialExpectations: 200,
  motivation: 2000,
  sourcePage: 200,
  website: 200,
  formStartedAt: 32,
  turnstileToken: TURNSTILE_TOKEN_MAX_LENGTH,
} as const

export const JOB_POSITION_BY_ROLE_SLUG = {
  'procurement-consultant': 'PROCUREMENT_CONSULTANT',
  'junior-business-analyst': 'JUNIOR_BUSINESS_ANALYST',
} as const

export const JOB_POSITION_LABELS = {
  PROCUREMENT_CONSULTANT: {
    pl: 'Konsultant Zakupowy',
    en: 'Procurement Consultant',
  },
  JUNIOR_BUSINESS_ANALYST: {
    pl: 'Młodszy Analityk Biznesowy',
    en: 'Junior Business Analyst',
  },
} as const

export const WEEKLY_AVAILABILITY_BY_VALUE = {
  '20-30h': 'HOURS_20_30',
  '30-40h': 'HOURS_30_40',
  '40h': 'HOURS_40',
} as const

export const EXCEL_LEVEL_BY_VALUE = {
  podstawowy: 'BASIC',
  sredniozaawansowany: 'INTERMEDIATE',
  zaawansowany: 'ADVANCED',
} as const

export const ENGLISH_LEVEL_BY_VALUE = {
  podstawowy: 'BASIC',
  sredniozaawansowany: 'INTERMEDIATE',
  zaawansowany: 'ADVANCED',
  biegly: 'FLUENT',
} as const

export const BOOLEAN_ANSWER_BY_VALUE = {
  tak: true,
  nie: false,
} as const

export const RECRUITMENT_ALLOWED_MULTIPART_FIELDS = [
  'roleSlug',
  'fullName',
  'email',
  'phone',
  'availableFrom',
  'weeklyAvailability',
  'hybridAccepted',
  'businessTravel',
  'excelLevel',
  'englishLevel',
  'financialExpectations',
  'motivation',
  'consentCurrent',
  'consentFuture',
  'locale',
  'sourcePage',
  'cv',
  'website',
  'formStartedAt',
  'turnstileToken',
] as const

export const RecruitmentTransportSchema = z.object({
  roleSlug: z.enum(['procurement-consultant', 'junior-business-analyst']),
  fullName: z.string(),
  email: z.string(),
  phone: z.string(),
  availableFrom: z.string(),
  weeklyAvailability: z.enum(['20-30h', '30-40h', '40h']).optional(),
  hybridAccepted: z.enum(['tak', 'nie']),
  businessTravel: z.enum(['tak', 'nie']),
  excelLevel: z.enum(['podstawowy', 'sredniozaawansowany', 'zaawansowany']),
  englishLevel: z.enum(['podstawowy', 'sredniozaawansowany', 'zaawansowany', 'biegly']),
  financialExpectations: z.string().optional(),
  motivation: z.string(),
  consentCurrent: z.boolean(),
  consentFuture: z.boolean(),
  locale: z.enum(RECRUITMENT_SUPPORTED_LOCALES),
  sourcePage: z.string().optional(),
}).strict()

export type RecruitmentTransportInput = z.infer<typeof RecruitmentTransportSchema>
export type RecruitmentRoleSlug = keyof typeof JOB_POSITION_BY_ROLE_SLUG
export type RecruitmentLocale = (typeof RECRUITMENT_SUPPORTED_LOCALES)[number]

export function parseFormBoolean(value: string | undefined): boolean | undefined {
  if (value === 'true') {
    return true
  }

  if (value === 'false') {
    return false
  }

  return undefined
}

export function normalizeInternalSourcePage(value: string | undefined): string | null {
  if (typeof value !== 'string') {
    return null
  }

  const trimmed = value.trim()
  if (!trimmed) {
    return null
  }

  let input = trimmed

  if (/^https?:\/\//i.test(trimmed)) {
    try {
      const parsed = new URL(trimmed)
      if (!RECRUITMENT_ALLOWED_SOURCE_HOSTS.has(parsed.hostname)) {
        return '__invalid_external_source__'
      }
      input = parsed.pathname
    } catch {
      return '__invalid_external_source__'
    }
  }

  const pathOnly = input.split(/[?#]/, 1)[0]?.trim() ?? ''
  return pathOnly || null
}

export function trimToNull(value: string | undefined): string | null {
  if (typeof value !== 'string') {
    return null
  }

  const trimmed = value.trim()
  return trimmed ? trimmed : null
}