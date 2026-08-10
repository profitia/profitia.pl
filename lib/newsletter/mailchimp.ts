import { createHash } from 'node:crypto'

const MAILCHIMP_TIMEOUT_MS = 10_000
const COMPATIBLE_MAILCHIMP_STATUS = 'subscribed'

export type MailchimpSyncFailureKind =
  | 'MAILCHIMP_CONFIG_ERROR'
  | 'MAILCHIMP_TIMEOUT'
  | 'MAILCHIMP_AUTH_ERROR'
  | 'MAILCHIMP_RATE_LIMITED'
  | 'MAILCHIMP_API_ERROR'
  | 'MAILCHIMP_NETWORK_ERROR'
  | 'MAILCHIMP_STATUS_MISMATCH'

export interface MailchimpNewsletterSyncInput {
  email: string
}

export interface MailchimpNewsletterSyncSuccess {
  success: true
  subscriberHash: string
  remoteStatus: 'subscribed'
  httpStatus: number
  timestamp: string
}

export interface MailchimpNewsletterSyncFailure {
  success: false
  kind: MailchimpSyncFailureKind
  code: string
  message: string
  subscriberHash: string | null
  httpStatus?: number
  remoteStatus?: string
  timestamp: string
}

export type MailchimpNewsletterSyncResult = MailchimpNewsletterSyncSuccess | MailchimpNewsletterSyncFailure
export type MailchimpFetch = typeof fetch

interface MailchimpConfig {
  apiKey: string
  audienceId: string
  serverPrefix: string
}

function nowIso(): string {
  return new Date().toISOString()
}

function failure(
  kind: MailchimpSyncFailureKind,
  code: string,
  message: string,
  extras: Partial<Omit<MailchimpNewsletterSyncFailure, 'success' | 'kind' | 'code' | 'message' | 'timestamp'>> = {}
): MailchimpNewsletterSyncFailure {
  return {
    success: false,
    kind,
    code,
    message,
    subscriberHash: null,
    timestamp: nowIso(),
    ...extras,
  }
}

function normalizeEmail(value: string): string {
  return value.trim().toLowerCase()
}

function deriveServerPrefix(apiKey: string): string | null {
  const trimmed = apiKey.trim()
  const separatorIndex = trimmed.lastIndexOf('-')
  if (separatorIndex <= 0 || separatorIndex === trimmed.length - 1) {
    return null
  }

  const suffix = trimmed.slice(separatorIndex + 1).trim().toLowerCase()
  return /^[a-z]{2,}\d+$/i.test(suffix) ? suffix : null
}

function validateMailchimpConfig(env: NodeJS.ProcessEnv = process.env):
  | { ok: true; config: MailchimpConfig }
  | { ok: false; error: MailchimpNewsletterSyncFailure } {
  const apiKey = env.MAILCHIMP_API_KEY?.trim()
  const audienceId = env.MAILCHIMP_AUDIENCE_ID?.trim()

  if (!apiKey) {
    return { ok: false, error: failure('MAILCHIMP_CONFIG_ERROR', 'MISSING_MAILCHIMP_API_KEY', 'Missing MAILCHIMP_API_KEY.') }
  }

  if (!audienceId) {
    return { ok: false, error: failure('MAILCHIMP_CONFIG_ERROR', 'MISSING_MAILCHIMP_AUDIENCE_ID', 'Missing MAILCHIMP_AUDIENCE_ID.') }
  }

  const serverPrefix = deriveServerPrefix(apiKey)
  if (!serverPrefix) {
    return { ok: false, error: failure('MAILCHIMP_CONFIG_ERROR', 'INVALID_MAILCHIMP_API_KEY', 'MAILCHIMP_API_KEY does not contain a valid server prefix.') }
  }

  return {
    ok: true,
    config: {
      apiKey,
      audienceId,
      serverPrefix,
    },
  }
}

function buildAuthorizationHeader(apiKey: string): string {
  return `Basic ${Buffer.from(`anystring:${apiKey}`).toString('base64')}`
}

async function readJsonBody(response: Response): Promise<Record<string, unknown> | null> {
  try {
    const data = await response.json()
    return typeof data === 'object' && data !== null ? data as Record<string, unknown> : null
  } catch {
    return null
  }
}

export function createMailchimpSubscriberHash(email: string): string {
  return createHash('md5').update(normalizeEmail(email)).digest('hex')
}

export function summarizeMailchimpSyncFailure(result: MailchimpNewsletterSyncFailure): string {
  if (result.kind === 'MAILCHIMP_STATUS_MISMATCH' && result.remoteStatus) {
    return `${result.kind}: ${result.remoteStatus}`
  }

  if (typeof result.httpStatus === 'number') {
    return `${result.kind}: ${result.httpStatus}`
  }

  return `${result.kind}: ${result.code}`
}

export async function syncMailchimpNewsletterSubscriber(
  input: MailchimpNewsletterSyncInput,
  env: NodeJS.ProcessEnv = process.env,
  fetchImpl: MailchimpFetch = fetch
): Promise<MailchimpNewsletterSyncResult> {
  const normalizedEmail = normalizeEmail(input.email)
  const subscriberHash = createMailchimpSubscriberHash(normalizedEmail)
  const validated = validateMailchimpConfig(env)

  if (!validated.ok) {
    return {
      ...validated.error,
      subscriberHash,
    }
  }

  const { apiKey, audienceId, serverPrefix } = validated.config
  const endpoint = `https://${serverPrefix}.api.mailchimp.com/3.0/lists/${encodeURIComponent(audienceId)}/members/${subscriberHash}`

  try {
    const response = await fetchImpl(endpoint, {
      method: 'PUT',
      signal: AbortSignal.timeout(MAILCHIMP_TIMEOUT_MS),
      headers: {
        Authorization: buildAuthorizationHeader(apiKey),
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        email_address: normalizedEmail,
        status_if_new: COMPATIBLE_MAILCHIMP_STATUS,
      }),
    })

    const body = await readJsonBody(response)
    const remoteStatus = typeof body?.status === 'string' ? body.status : undefined

    if (response.ok) {
      if (remoteStatus === COMPATIBLE_MAILCHIMP_STATUS) {
        return {
          success: true,
          subscriberHash,
          remoteStatus: COMPATIBLE_MAILCHIMP_STATUS,
          httpStatus: response.status,
          timestamp: nowIso(),
        }
      }

      return failure(
        'MAILCHIMP_STATUS_MISMATCH',
        'MAILCHIMP_STATUS_MISMATCH',
        'Mailchimp member status is not compatible with the local subscription state.',
        {
          subscriberHash,
          httpStatus: response.status,
          remoteStatus,
        }
      )
    }

    if (response.status === 401 || response.status === 403) {
      return failure('MAILCHIMP_AUTH_ERROR', 'MAILCHIMP_AUTH_ERROR', 'Mailchimp authentication failed.', {
        subscriberHash,
        httpStatus: response.status,
      })
    }

    if (response.status === 429) {
      return failure('MAILCHIMP_RATE_LIMITED', 'MAILCHIMP_RATE_LIMITED', 'Mailchimp rate limit exceeded.', {
        subscriberHash,
        httpStatus: response.status,
      })
    }

    return failure('MAILCHIMP_API_ERROR', 'MAILCHIMP_API_ERROR', 'Mailchimp API request failed.', {
      subscriberHash,
      httpStatus: response.status,
      remoteStatus,
    })
  } catch (error) {
    if (error instanceof Error && /AbortError|TimeoutError/i.test(error.name)) {
      return failure('MAILCHIMP_TIMEOUT', 'MAILCHIMP_TIMEOUT', 'Mailchimp request timed out.', {
        subscriberHash,
      })
    }

    const message = error instanceof Error ? error.message : 'Unknown Mailchimp network error.'
    return failure('MAILCHIMP_NETWORK_ERROR', 'MAILCHIMP_NETWORK_ERROR', message, {
      subscriberHash,
    })
  }
}