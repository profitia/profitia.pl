import { ConfidentialClientApplication, PublicClientApplication } from '@azure/msal-node'

const GRAPH_SCOPE = 'https://graph.microsoft.com/.default'
const GRAPH_BASE_URL = 'https://graph.microsoft.com/v1.0'
const DEFAULT_DELEGATED_SCOPES = ['Mail.Send', 'User.Read']
const GRAPH_SEND_TIMEOUT_MS = 10000

if (typeof window !== 'undefined') {
  throw new Error('lib/email/office365 must only be imported on the server.')
}

export interface Office365EmailInput {
  to: string
  subject: string
  html: string
  replyTo?: string
}

export interface Office365EmailSuccess {
  success: true
  status: 202
  requestId: string | null
  timestamp: string
}

export interface Office365EmailFailure {
  success: false
  kind: 'CONFIG_ERROR' | 'AUTH_ERROR' | 'GRAPH_ERROR' | 'NETWORK_ERROR'
  code: string
  message: string
  status?: number
  requestId?: string | null
  timestamp: string
}

export type Office365EmailResult = Office365EmailSuccess | Office365EmailFailure

interface Office365Config {
  tenantId: string
  clientId: string
  mailFrom: string
  clientSecret?: string
  delegatedTokenCacheB64?: string
  delegatedScopes: string[]
  authType: 'delegated_token_cache' | 'client_credentials'
}

interface GraphEmailAddress {
  emailAddress: {
    address: string
  }
}

interface GraphSendMailPayload {
  message: {
    subject: string
    body: {
      contentType: 'HTML'
      content: string
    }
    toRecipients: GraphEmailAddress[]
    from: GraphEmailAddress
    replyTo?: GraphEmailAddress[]
  }
  saveToSentItems: true
}

function nowIso(): string {
  return new Date().toISOString()
}

function failure(
  kind: Office365EmailFailure['kind'],
  code: string,
  message: string,
  extras: Partial<Omit<Office365EmailFailure, 'success' | 'kind' | 'code' | 'message' | 'timestamp'>> = {}
): Office365EmailFailure {
  return {
    success: false,
    kind,
    code,
    message,
    timestamp: nowIso(),
    ...extras,
  }
}

function normalizeEmail(value: string): string {
  return value.trim().toLowerCase()
}

function normalizeOptionalEmail(value: string | undefined): string | undefined {
  if (!value) {
    return undefined
  }

  const normalized = normalizeEmail(value)
  return normalized || undefined
}

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

export function validateOffice365Config(env: NodeJS.ProcessEnv = process.env):
  | { ok: true; config: Office365Config }
  | { ok: false; error: Office365EmailFailure } {
  const tenantId = env.AZURE_TENANT_ID?.trim()
  const clientId = env.AZURE_CLIENT_ID?.trim()
  const clientSecret = env.AZURE_CLIENT_SECRET?.trim()
  const delegatedTokenCacheB64 = env.MSAL_TOKEN_CACHE_B64?.trim()
  const mailFrom = normalizeOptionalEmail(env.MAIL_FROM)
  const delegatedScopes = (env.MAIL_SCOPES ?? DEFAULT_DELEGATED_SCOPES.join(','))
    .split(',')
    .map((scope) => scope.trim())
    .filter(Boolean)

  if (!tenantId) {
    return { ok: false, error: failure('CONFIG_ERROR', 'MISSING_AZURE_TENANT_ID', 'Missing AZURE_TENANT_ID.') }
  }

  if (!clientId) {
    return { ok: false, error: failure('CONFIG_ERROR', 'MISSING_AZURE_CLIENT_ID', 'Missing AZURE_CLIENT_ID.') }
  }

  if (!mailFrom) {
    return { ok: false, error: failure('CONFIG_ERROR', 'MISSING_MAIL_FROM', 'Missing MAIL_FROM.') }
  }

  if (!isValidEmail(mailFrom)) {
    return { ok: false, error: failure('CONFIG_ERROR', 'INVALID_MAIL_FROM', 'MAIL_FROM must be a valid email address.') }
  }

  if (!delegatedTokenCacheB64 && !clientSecret) {
    return {
      ok: false,
      error: failure(
        'CONFIG_ERROR',
        'MISSING_OFFICE365_CREDENTIAL',
        'Missing Office 365 credential. Set MSAL_TOKEN_CACHE_B64 for delegated cache auth or AZURE_CLIENT_SECRET for client-credentials auth.'
      ),
    }
  }

  return {
    ok: true,
    config: {
      tenantId,
      clientId,
      mailFrom,
      clientSecret,
      delegatedTokenCacheB64,
      delegatedScopes,
      authType: delegatedTokenCacheB64 ? 'delegated_token_cache' : 'client_credentials',
    },
  }
}

function validateInput(input: Office365EmailInput): Office365EmailFailure | null {
  const to = normalizeOptionalEmail(input.to)
  if (!to || !isValidEmail(to)) {
    return failure('CONFIG_ERROR', 'INVALID_RECIPIENT', 'Recipient email address is invalid.')
  }

  if (!input.subject.trim()) {
    return failure('CONFIG_ERROR', 'INVALID_SUBJECT', 'Subject must not be empty.')
  }

  if (!input.html.trim()) {
    return failure('CONFIG_ERROR', 'INVALID_HTML', 'HTML body must not be empty.')
  }

  const replyTo = normalizeOptionalEmail(input.replyTo)
  if (input.replyTo && (!replyTo || !isValidEmail(replyTo))) {
    return failure('CONFIG_ERROR', 'INVALID_REPLY_TO', 'Reply-To email address is invalid.')
  }

  return null
}

function createMsalClient(config: Office365Config): ConfidentialClientApplication {
  return new ConfidentialClientApplication({
    auth: {
      authority: `https://login.microsoftonline.com/${config.tenantId}`,
      clientId: config.clientId,
      clientSecret: config.clientSecret,
    },
  })
}

function createDelegatedMsalClient(config: Office365Config): PublicClientApplication {
  return new PublicClientApplication({
    auth: {
      authority: `https://login.microsoftonline.com/${config.tenantId}`,
      clientId: config.clientId,
    },
  })
}

function sanitizeAuthError(error: unknown): { code: string; message: string } {
  const rawMessage = error instanceof Error ? error.message : 'Unknown authentication error.'

  if (/invalid_client/i.test(rawMessage)) {
    return {
      code: 'INVALID_CLIENT_CREDENTIALS',
      message: 'Microsoft Entra ID rejected the configured client credentials.',
    }
  }

  if (/unauthorized_client/i.test(rawMessage)) {
    return {
      code: 'UNAUTHORIZED_CLIENT',
      message: 'The Azure app registration is not authorized for the requested headless flow.',
    }
  }

  if (/invalid_scope/i.test(rawMessage)) {
    return {
      code: 'INVALID_GRAPH_SCOPE',
      message: 'Microsoft Entra ID rejected the configured Microsoft Graph scope.',
    }
  }

  if (/invalid_grant/i.test(rawMessage) || /bad_token/i.test(rawMessage) || /refresh token has expired/i.test(rawMessage)) {
    return {
      code: 'DELEGATED_TOKEN_CACHE_EXPIRED',
      message: 'The delegated MSAL token cache is no longer valid and must be refreshed in the source Office 365 integration.',
    }
  }

  return {
    code: 'TOKEN_ACQUISITION_FAILED',
    message: 'Headless Microsoft Entra token acquisition failed.',
  }
}

export async function acquireOffice365AccessToken(
  env: NodeJS.ProcessEnv = process.env
): Promise<
  | {
      success: true
      accessToken: string
      expiresOn: string | null
      authType: 'delegated_token_cache' | 'client_credentials'
      scopes: string[]
    }
  | Office365EmailFailure
> {
  const validated = validateOffice365Config(env)
  if (!validated.ok) {
    return validated.error
  }

  try {
    if (validated.config.authType === 'delegated_token_cache') {
      const client = createDelegatedMsalClient(validated.config)
      const cache = client.getTokenCache()

      try {
        cache.deserialize(validated.config.delegatedTokenCacheB64 ? Buffer.from(validated.config.delegatedTokenCacheB64, 'base64').toString('utf8') : '')
      } catch {
        return failure('CONFIG_ERROR', 'INVALID_MSAL_TOKEN_CACHE_B64', 'MSAL_TOKEN_CACHE_B64 could not be decoded into a valid MSAL token cache.')
      }

      const accounts = await client.getAllAccounts()
      if (!accounts.length) {
        return failure('AUTH_ERROR', 'TOKEN_CACHE_ACCOUNT_MISSING', 'The delegated MSAL token cache does not contain a usable account.')
      }

      const result = await client.acquireTokenSilent({
        account: accounts[0],
        scopes: validated.config.delegatedScopes,
      })

      if (!result?.accessToken) {
        return failure('AUTH_ERROR', 'TOKEN_ACQUISITION_FAILED', 'The delegated MSAL token cache could not silently provide an access token.')
      }

      return {
        success: true,
        accessToken: result.accessToken,
        expiresOn: result.expiresOn?.toISOString() ?? null,
        authType: 'delegated_token_cache',
        scopes: validated.config.delegatedScopes,
      }
    }

    const client = createMsalClient(validated.config)
    const result = await client.acquireTokenByClientCredential({ scopes: [GRAPH_SCOPE] })

    if (!result?.accessToken) {
      return failure('AUTH_ERROR', 'TOKEN_ACQUISITION_FAILED', 'Microsoft Entra ID did not return an access token.')
    }

    return {
      success: true,
      accessToken: result.accessToken,
      expiresOn: result.expiresOn?.toISOString() ?? null,
      authType: 'client_credentials',
      scopes: [GRAPH_SCOPE],
    }
  } catch (error) {
    const sanitized = sanitizeAuthError(error)
    return failure('AUTH_ERROR', sanitized.code, sanitized.message)
  }
}

export function buildOffice365GraphPayload(
  input: Office365EmailInput,
  mailFrom: string
): GraphSendMailPayload {
  const to = normalizeEmail(input.to)
  const replyTo = normalizeOptionalEmail(input.replyTo)

  return {
    message: {
      subject: input.subject.trim(),
      body: {
        contentType: 'HTML',
        content: input.html,
      },
      toRecipients: [{ emailAddress: { address: to } }],
      from: { emailAddress: { address: mailFrom } },
      ...(replyTo ? { replyTo: [{ emailAddress: { address: replyTo } }] } : {}),
    },
    saveToSentItems: true,
  }
}

export async function sendOffice365Email(
  input: Office365EmailInput,
  env: NodeJS.ProcessEnv = process.env
): Promise<Office365EmailResult> {
  const inputError = validateInput(input)
  if (inputError) {
    return inputError
  }

  const validated = validateOffice365Config(env)
  if (!validated.ok) {
    return validated.error
  }

  const tokenResult = await acquireOffice365AccessToken(env)
  if (!tokenResult.success) {
    return tokenResult
  }

  const payload = buildOffice365GraphPayload(input, validated.config.mailFrom)
  const endpoint = tokenResult.authType === 'delegated_token_cache'
    ? `${GRAPH_BASE_URL}/me/sendMail`
    : `${GRAPH_BASE_URL}/users/${encodeURIComponent(validated.config.mailFrom)}/sendMail`

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      signal: AbortSignal.timeout(GRAPH_SEND_TIMEOUT_MS),
      headers: {
        Authorization: `Bearer ${tokenResult.accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })

    const requestId = response.headers.get('request-id') || response.headers.get('x-ms-request-id')

    if (response.status === 202) {
      return {
        success: true,
        status: 202,
        requestId,
        timestamp: nowIso(),
      }
    }

    let providerCode = 'GRAPH_REQUEST_FAILED'
    let providerMessage = 'Microsoft Graph rejected the sendMail request.'
    try {
      const errorBody = (await response.json()) as { error?: { code?: string; message?: string } }
      providerCode = errorBody.error?.code || providerCode
      providerMessage = errorBody.error?.message || providerMessage
    } catch {
      // Ignore non-JSON error bodies.
    }

    return failure('GRAPH_ERROR', providerCode, providerMessage, {
      status: response.status,
      requestId,
    })
  } catch (error) {
    if (error instanceof Error && /AbortError|TimeoutError/i.test(error.name)) {
      return failure('NETWORK_ERROR', 'GRAPH_REQUEST_TIMEOUT', 'Microsoft Graph sendMail request timed out.')
    }

    const message = error instanceof Error ? error.message : 'Unknown network error.'
    return failure('NETWORK_ERROR', 'GRAPH_NETWORK_FAILURE', message)
  }
}