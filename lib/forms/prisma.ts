import { PrismaClient } from '@/prisma/generated/forms-client'

declare global {
  // eslint-disable-next-line no-var
  var __formsPrisma: PrismaClient | undefined
}

function getFormsDatabaseUrl(): string {
  const url = process.env.DATABASE_FORMS_URL ?? process.env.DATABASE_CONTACT_FORM_URL

  if (!url) {
    throw new Error(
      'Missing forms database connection string. Set DATABASE_FORMS_URL or legacy DATABASE_CONTACT_FORM_URL.'
    )
  }

  return url
}

export const formsPrisma: PrismaClient =
  globalThis.__formsPrisma ??
  new PrismaClient({
    datasources: {
      db: {
        url: getFormsDatabaseUrl(),
      },
    },
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  })

if (process.env.NODE_ENV !== 'production') {
  globalThis.__formsPrisma = formsPrisma
}