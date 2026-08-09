import { TURNSTILE_ACTION, TURNSTILE_TOKEN_MAX_LENGTH } from '@/lib/forms/constants'

const SITEVERIFY_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify'
const SITEVERIFY_TIMEOUT_MS = 4000

type TurnstileFailureCode =
  | 'BOT_VERIFICATION_REQUIRED'
  | 'BOT_VERIFICATION_FAILED'
  | 'BOT_VERIFICATION_UNAVAILABLE'

type TurnstileVerificationResult =
  | { ok: true }
  | { ok: false; errorCode: TurnstileFailureCode }

type NormalizedTurnstileToken =
  | { ok: true; token: string }
  | { ok: false; errorCode: TurnstileFailureCode }

interface TurnstileSiteverifyResponse {
  success?: boolean
  hostname?: string
  action?: string
  'error-codes'?: string[]
}

function parseAllowedHostnames(value: string | undefined): Set<string> {
  return new Set(
    (value ?? '')
      .split(',')
      .map((entry) => entry.trim().toLowerCase())
      .filter(Boolean)
  )
}

function normalizeToken(token: unknown): NormalizedTurnstileToken {
  if (typeof token !== 'string') {
    return { ok: false, errorCode: 'BOT_VERIFICATION_REQUIRED' }
  }

  const normalized = token.trim()
  if (!normalized) {
    return { ok: false, errorCode: 'BOT_VERIFICATION_REQUIRED' }
  }

  if (normalized.length > TURNSTILE_TOKEN_MAX_LENGTH) {
    return { ok: false, errorCode: 'BOT_VERIFICATION_FAILED' }
  }

  return { ok: true, token: normalized }
}

function readConfig(env: NodeJS.ProcessEnv, expectedActionOverride?: string) {
  const secretKey = env.TURNSTILE_SECRET_KEY?.trim()
  const allowedHostnames = parseAllowedHostnames(env.TURNSTILE_ALLOWED_HOSTNAMES)
  const expectedAction = expectedActionOverride?.trim()
    || env.TURNSTILE_EXPECTED_ACTION?.trim()
    || TURNSTILE_ACTION

  if (!secretKey || !allowedHostnames.size || !expectedAction) {
    return null
  }

  return {
    secretKey,
    allowedHostnames,
    expectedAction,
  }
}

export async function verifyTurnstileToken(
  token: unknown,
  env: NodeJS.ProcessEnv = process.env,
  fetchImpl: typeof fetch = fetch,
  expectedAction?: string
): Promise<TurnstileVerificationResult> {
  const normalizedToken = normalizeToken(token)
  if (!normalizedToken.ok) {
    return normalizedToken
  }

  const config = readConfig(env, expectedAction)
  if (!config) {
    return { ok: false, errorCode: 'BOT_VERIFICATION_UNAVAILABLE' }
  }

  let response: Response
  try {
    response = await fetchImpl(SITEVERIFY_URL, {
      method: 'POST',
      signal: AbortSignal.timeout(SITEVERIFY_TIMEOUT_MS),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        secret: config.secretKey,
        response: normalizedToken.token,
      }),
    })
  } catch {
    return { ok: false, errorCode: 'BOT_VERIFICATION_UNAVAILABLE' }
  }

  if (!response.ok) {
    return { ok: false, errorCode: 'BOT_VERIFICATION_UNAVAILABLE' }
  }

  let body: TurnstileSiteverifyResponse
  try {
    body = (await response.json()) as TurnstileSiteverifyResponse
  } catch {
    return { ok: false, errorCode: 'BOT_VERIFICATION_UNAVAILABLE' }
  }

  if (typeof body.success !== 'boolean') {
    return { ok: false, errorCode: 'BOT_VERIFICATION_UNAVAILABLE' }
  }

  if (!body.success) {
    return { ok: false, errorCode: 'BOT_VERIFICATION_FAILED' }
  }

  const hostname = typeof body.hostname === 'string' ? body.hostname.trim().toLowerCase() : ''
  const action = typeof body.action === 'string' ? body.action.trim() : ''

  if (!hostname || !action) {
    return { ok: false, errorCode: 'BOT_VERIFICATION_UNAVAILABLE' }
  }

  if (!config.allowedHostnames.has(hostname)) {
    return { ok: false, errorCode: 'BOT_VERIFICATION_FAILED' }
  }

  if (action !== config.expectedAction) {
    return { ok: false, errorCode: 'BOT_VERIFICATION_FAILED' }
  }

  return { ok: true }
}