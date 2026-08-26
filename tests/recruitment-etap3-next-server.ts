import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { createServer } from 'node:http'
import { mkdtempSync } from 'node:fs'

import next from 'next'

import type { HomeplSmtpEmailInput, HomeplSmtpSendResult } from '@/lib/email/homepl-smtp'
import { processJobApplicationEmails } from '@/lib/recruitment/application-email'
import {
  clearRecruitmentRouteTestOverrides,
  setRecruitmentRouteTestOverrides,
} from '@/lib/recruitment/route-test-overrides'

const HOSTNAME = '127.0.0.1'
const PORT = 3301
const EVENT_LOG_PATH = path.join(os.tmpdir(), `profitia-recruitment-etap3-browser-${Date.now()}.json`)

function loadEnvFile(filePath: string) {
  if (!fs.existsSync(filePath)) {
    return
  }

  for (const rawLine of fs.readFileSync(filePath, 'utf8').split(/\r?\n/)) {
    const line = rawLine.trim()
    if (!line || line.startsWith('#')) {
      continue
    }

    const separatorIndex = line.indexOf('=')
    if (separatorIndex === -1) {
      continue
    }

    const key = line.slice(0, separatorIndex).trim()
    let value = line.slice(separatorIndex + 1).trim()
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1)
    }

    if (!(key in process.env)) {
      process.env[key] = value
    }
  }
}

function record(eventLog: { emails: Array<Record<string, unknown>> }, event: Record<string, unknown>) {
  eventLog.emails.push(event)
  fs.writeFileSync(EVENT_LOG_PATH, JSON.stringify(eventLog, null, 2))
}

async function main() {
  loadEnvFile('.env')
  loadEnvFile('.env.local')

  process.env.RECRUITMENT_ROUTE_TEST_OVERRIDES = 'enabled'
  process.env.RECRUITMENT_NOTIFICATION_TO = 'tomasz.uscinski@profitia.pl'
  process.env.RECRUITMENT_CV_STORAGE_PATH = mkdtempSync(path.join(os.tmpdir(), 'profitia-recruitment-etap3-browser-storage-'))

  const eventLog = { emails: [] as Array<Record<string, unknown>> }
  fs.writeFileSync(EVENT_LOG_PATH, JSON.stringify(eventLog, null, 2))

  const sendEmail = async (input: HomeplSmtpEmailInput): Promise<HomeplSmtpSendResult> => {
    const recipient = String(Array.isArray(input.to) ? input.to[0] : input.to).trim().toLowerCase()
    const branch = input.attachments?.length ? 'internal' : 'candidate'
    record(eventLog, {
      branch,
      recipient,
      subject: input.subject,
      hasAttachment: Boolean(input.attachments?.length),
    })

    return {
      success: true,
      accepted: [recipient],
      rejected: [],
      pending: [],
      messageId: `<recruitment-browser-${branch}@test>`,
      timestamp: new Date().toISOString(),
    }
  }

  setRecruitmentRouteTestOverrides({
    dependencies: {
      verifyTurnstile: async () => ({ ok: true }),
    },
    processApplicationEmails: async (formsPrisma, applicationId, options) =>
      processJobApplicationEmails(formsPrisma, applicationId, {
        ...options,
        env: process.env,
        sendEmail,
      }),
  })

  const app = next({ dev: true, dir: process.cwd(), hostname: HOSTNAME, port: PORT })
  const handle = app.getRequestHandler()
  await app.prepare()

  const server = createServer((req, res) => handle(req, res))
  server.listen(PORT, HOSTNAME, () => {
    console.log(`RECRUITMENT_ETAP3_TEST_SERVER_READY http://${HOSTNAME}:${PORT}`)
    console.log(`RECRUITMENT_ETAP3_EVENT_LOG_PATH=${EVENT_LOG_PATH}`)
    console.log(`RECRUITMENT_ETAP3_STORAGE_ROOT=${process.env.RECRUITMENT_CV_STORAGE_PATH}`)
  })

  const shutdown = () => {
    clearRecruitmentRouteTestOverrides()
    server.close(() => {
      process.exit(0)
    })
  }

  process.on('SIGINT', shutdown)
  process.on('SIGTERM', shutdown)
}

main().catch((error) => {
  console.error(error)
  clearRecruitmentRouteTestOverrides()
  process.exit(1)
})