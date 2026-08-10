import fs from 'node:fs'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { createServer } from 'node:http'

import next from 'next'

import { processNewsletterSubscription } from '@/lib/forms/newsletter-subscription'
import {
  clearNewsletterRouteTestOverrides,
  setNewsletterRouteTestOverrides,
} from '@/lib/forms/newsletter-route-test-overrides'
import type { HomeplSmtpEmailInput, HomeplSmtpSendResult } from '@/lib/email/homepl-smtp'
import type { MailchimpNewsletterSyncInput, MailchimpNewsletterSyncResult } from '@/lib/newsletter/mailchimp'

interface EventLog {
  smtp: Array<{ email: string; result: 'success' | 'failure' }>
  mailchimp: Array<{ email: string; result: 'success' | 'failure' }>
  process: Array<{ email: string; result: 'success' | 'failure' }>
}

const HOSTNAME = '127.0.0.1'
const PORT = Number(process.env.PORT || 3124)
const EVENT_LOG_PATH = process.env.NEWSLETTER_ETAP4_EVENT_LOG_PATH || path.join(tmpdir(), 'newsletter-etap4-event-log.json')

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

function writeEventLog(log: EventLog) {
  fs.writeFileSync(EVENT_LOG_PATH, JSON.stringify(log, null, 2))
}

function createInitialEventLog(): EventLog {
  return {
    smtp: [],
    mailchimp: [],
    process: [],
  }
}

function record(log: EventLog, key: keyof EventLog, entry: EventLog[keyof EventLog][number]) {
  ;(log[key] as Array<typeof entry>).push(entry)
  writeEventLog(log)
}

async function main() {
  loadEnvFile('.env')
  loadEnvFile('.env.local')
  process.env.NEWSLETTER_ROUTE_TEST_OVERRIDES = 'enabled'

  if (!process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY) {
    process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY = 'newsletter-etap4-local-test-site-key'
  }

  const eventLog = createInitialEventLog()
  writeEventLog(eventLog)

  const sendEmail = async (input: HomeplSmtpEmailInput): Promise<HomeplSmtpSendResult> => {
    const email = String(input.to).trim().toLowerCase()
    record(eventLog, 'smtp', {
      email,
      result: email.includes('smtp-fail') || email.includes('both-fail') ? 'failure' : 'success',
    })

    if (email.includes('smtp-fail') || email.includes('both-fail')) {
      return {
        success: false,
        kind: 'SMTP_CONNECTION_ERROR',
        code: 'ECONNREFUSED',
        message: 'SMTP connection failed.',
        timestamp: new Date().toISOString(),
      }
    }

    return {
      success: true,
      accepted: [email],
      rejected: [],
      pending: [],
      messageId: `<newsletter-etap4-${Buffer.from(email).toString('hex').slice(0, 12)}@test>`,
      timestamp: new Date().toISOString(),
    }
  }

  const syncMailchimp = async (input: MailchimpNewsletterSyncInput): Promise<MailchimpNewsletterSyncResult> => {
    const email = input.email.trim().toLowerCase()
    record(eventLog, 'mailchimp', {
      email,
      result: email.includes('mailchimp-fail') || email.includes('both-fail') ? 'failure' : 'success',
    })

    if (email.includes('mismatch')) {
      return {
        success: false,
        kind: 'MAILCHIMP_STATUS_MISMATCH',
        code: 'MAILCHIMP_STATUS_MISMATCH',
        message: 'Mailchimp member status is not compatible with the local subscription state.',
        subscriberHash: '55502f40dc8b7c769880b10874abc9d0',
        remoteStatus: 'unsubscribed',
        httpStatus: 200,
        timestamp: new Date().toISOString(),
      }
    }

    if (email.includes('mailchimp-fail') || email.includes('both-fail')) {
      return {
        success: false,
        kind: 'MAILCHIMP_API_ERROR',
        code: 'MAILCHIMP_API_ERROR',
        message: 'Mailchimp API request failed.',
        subscriberHash: '55502f40dc8b7c769880b10874abc9d0',
        httpStatus: 500,
        timestamp: new Date().toISOString(),
      }
    }

    return {
      success: true,
      subscriberHash: '55502f40dc8b7c769880b10874abc9d0',
      remoteStatus: 'subscribed',
      httpStatus: 200,
      timestamp: new Date().toISOString(),
    }
  }

  setNewsletterRouteTestOverrides({
    processSubscription: async (formsPrisma, data) => {
      const email = data.email.trim().toLowerCase()
      if (email.includes('browser-fail')) {
        record(eventLog, 'process', { email, result: 'failure' })
        throw new Error('Controlled newsletter browser failure.')
      }

      record(eventLog, 'process', { email, result: 'success' })
      return processNewsletterSubscription(formsPrisma, data, {
        env: process.env,
        sendEmail,
        syncMailchimp,
      })
    },
    dependencies: {
      verifyTurnstile: async () => ({ ok: true }),
    },
  })

  const app = next({ dev: true, dir: process.cwd(), hostname: HOSTNAME, port: PORT })
  const handle = app.getRequestHandler()
  await app.prepare()

  const server = createServer((req, res) => handle(req, res))
  server.listen(PORT, HOSTNAME, () => {
    console.log(`NEWSLETTER_ETAP4_TEST_SERVER_READY http://${HOSTNAME}:${PORT}`)
    console.log(`NEWSLETTER_ETAP4_EVENT_LOG_PATH=${EVENT_LOG_PATH}`)
  })

  const shutdown = () => {
    clearNewsletterRouteTestOverrides()
    server.close(() => {
      process.exit(0)
    })
  }

  process.on('SIGINT', shutdown)
  process.on('SIGTERM', shutdown)
}

void main()