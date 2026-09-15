import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { getFormsPrisma } from '@/lib/forms/prisma'
import {
  createPrismaContactEmailOutboxRepository,
  processContactEmailOutboxBatch,
} from '@/lib/forms/contact-email-outbox'

export interface ContactEmailOutboxScriptDependencies {
  getFormsClient?: typeof getFormsPrisma
  createRepository?: typeof createPrismaContactEmailOutboxRepository
  processBatch?: typeof processContactEmailOutboxBatch
  logger?: Pick<Console, 'log' | 'info' | 'warn' | 'error'>
  argv?: string[]
  env?: NodeJS.ProcessEnv
}

function parseBatchSize(raw: string | undefined): number | undefined {
  if (!raw) {
    return undefined
  }

  const parsed = Number(raw)
  if (!Number.isFinite(parsed) || parsed < 1) {
    throw new Error('BATCH_SIZE_INVALID')
  }

  return Math.trunc(parsed)
}

export async function runContactEmailOutboxScript(
  dependencies: ContactEmailOutboxScriptDependencies = {}
) {
  const getFormsClient = dependencies.getFormsClient ?? getFormsPrisma
  const createRepository = dependencies.createRepository ?? createPrismaContactEmailOutboxRepository
  const processBatch = dependencies.processBatch ?? processContactEmailOutboxBatch
  const logger = dependencies.logger ?? console
  const argv = dependencies.argv ?? process.argv
  const env = dependencies.env ?? process.env
  const prisma = getFormsClient()
  const repository = createRepository(prisma)

  try {
    const batchSize = parseBatchSize(
      (argv.includes('--batch-size') ? argv[argv.indexOf('--batch-size') + 1] : undefined)
      ?? env.CONTACT_EMAIL_OUTBOX_BATCH_SIZE
    )
    const result = await processBatch({
      batchSize,
      repository,
      logger,
    })

    logger.log(JSON.stringify(result, null, 2))
    process.exitCode = result.fatalError || result.technicalFailures > 0 ? 1 : 0

    return result
  } finally {
    await prisma.$disconnect()
  }
}

const entryPath = process.argv[1] ? path.resolve(process.argv[1]) : null
const currentPath = fileURLToPath(import.meta.url)

if (entryPath && currentPath === entryPath) {
  runContactEmailOutboxScript().catch((error) => {
    console.error('[contact-email-outbox-dispatch]', error instanceof Error ? error.message : 'Unknown dispatcher failure.')
    process.exitCode = 1
  })
}