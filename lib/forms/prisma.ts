import { PrismaClient } from '@/prisma/generated/forms-client'

const MISSING_FORMS_DATABASE_URL_ERROR =
  'Missing forms database connection string. Set DATABASE_FORMS_URL or legacy DATABASE_CONTACT_FORM_URL.'

declare global {
  // eslint-disable-next-line no-var
  var __formsPrisma: PrismaClient | undefined
}

function getFormsDatabaseUrl(): string {
  const url = process.env.DATABASE_FORMS_URL ?? process.env.DATABASE_CONTACT_FORM_URL

  if (!url) {
    throw new Error(MISSING_FORMS_DATABASE_URL_ERROR)
  }

  return url
}

function createFormsPrismaClient(): PrismaClient {
  return new PrismaClient({
    datasources: {
      db: {
        url: getFormsDatabaseUrl(),
      },
    },
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  })
}

export function getFormsPrisma(): PrismaClient {
  if (globalThis.__formsPrisma) {
    return globalThis.__formsPrisma
  }

  const client = createFormsPrismaClient()

  if (process.env.NODE_ENV !== 'production') {
    globalThis.__formsPrisma = client
  }

  return client
}

export function isMissingFormsDatabaseUrlError(error: unknown): boolean {
  return error instanceof Error && error.message === MISSING_FORMS_DATABASE_URL_ERROR
}