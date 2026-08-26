import nodemailer from 'nodemailer'

const DEFAULT_SMTP_PORT = 465
const DEFAULT_SMTP_SECURE = true
const SMTP_CONNECTION_TIMEOUT_MS = 10_000
const SMTP_GREETING_TIMEOUT_MS = 10_000
const SMTP_SOCKET_TIMEOUT_MS = 20_000
const DEFAULT_FROM_NAME = 'Profitia'

export interface HomeplSmtpEmailInput {
  to: string | string[]
  cc?: string | string[]
  bcc?: string | string[]
  subject: string
  text?: string
  html: string
  replyTo?: string
  attachments?: Array<{
    filename: string
    content: Buffer
    contentType: string
  }>
}

export interface HomeplSmtpVerifySuccess {
  success: true
  timestamp: string
}

export interface HomeplSmtpSendSuccess {
  success: true
  accepted: string[]
  rejected: string[]
  pending: string[]
  messageId: string | null
  timestamp: string
}

export interface HomeplSmtpFailure {
  success: false
  kind:
    | 'SMTP_CONFIG_ERROR'
    | 'SMTP_AUTH_ERROR'
    | 'SMTP_CONNECTION_ERROR'
    | 'SMTP_TLS_ERROR'
    | 'SMTP_TIMEOUT'
    | 'SMTP_RECIPIENT_REJECTED'
    | 'SMTP_SEND_ERROR'
  code: string
  message: string
  rejected?: string[]
  timestamp: string
}

export type HomeplSmtpVerifyResult = HomeplSmtpVerifySuccess | HomeplSmtpFailure
export type HomeplSmtpSendResult = HomeplSmtpSendSuccess | HomeplSmtpFailure

interface HomeplSmtpConfig {
  host: string
  port: number
  secure: boolean
  login: string
  password: string
  fromName: string
}

function nowIso(): string {
  return new Date().toISOString()
}

function failure(
  kind: HomeplSmtpFailure['kind'],
  code: string,
  message: string,
  extras: Partial<Omit<HomeplSmtpFailure, 'success' | 'kind' | 'code' | 'message' | 'timestamp'>> = {}
): HomeplSmtpFailure {
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

function normalizeRecipientList(value: string | string[] | undefined): string[] {
  if (!value) {
    return []
  }

  const recipients = Array.isArray(value) ? value : [value]
  return recipients
    .flatMap((recipient) => recipient.split(','))
    .map((recipient) => normalizeOptionalEmail(recipient))
    .filter((recipient): recipient is string => Boolean(recipient))
}

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

function parseSecure(value: string | undefined): boolean {
  if (!value) {
    return DEFAULT_SMTP_SECURE
  }

  const normalized = value.trim().toLowerCase()
  if (normalized === 'true') {
    return true
  }

  if (normalized === 'false') {
    return false
  }

  return DEFAULT_SMTP_SECURE
}

function parsePort(value: string | undefined): number {
  const parsed = Number(value)

  if (!Number.isFinite(parsed) || !Number.isInteger(parsed) || parsed < 1 || parsed > 65535) {
    return DEFAULT_SMTP_PORT
  }

  return parsed
}

export function validateHomeplSmtpConfig(env: NodeJS.ProcessEnv = process.env):
  | { ok: true; config: HomeplSmtpConfig }
  | { ok: false; error: HomeplSmtpFailure } {
  const host = env.MAILBOX_SMTP_HOST?.trim()
  const login = normalizeOptionalEmail(env.MAILBOX_LOGIN)
  const password = env.MAILBOX_PASSWORD?.trim()
  const secure = parseSecure(env.MAILBOX_SMTP_SECURE)
  const port = parsePort(env.MAILBOX_SMTP_PORT)
  const fromName = env.MAILBOX_FROM_NAME?.trim() || DEFAULT_FROM_NAME

  if (!host) {
    return { ok: false, error: failure('SMTP_CONFIG_ERROR', 'MISSING_MAILBOX_SMTP_HOST', 'Missing MAILBOX_SMTP_HOST.') }
  }

  if (!login) {
    return { ok: false, error: failure('SMTP_CONFIG_ERROR', 'MISSING_MAILBOX_LOGIN', 'Missing MAILBOX_LOGIN.') }
  }

  if (!isValidEmail(login)) {
    return { ok: false, error: failure('SMTP_CONFIG_ERROR', 'INVALID_MAILBOX_LOGIN', 'MAILBOX_LOGIN must be a valid email address.') }
  }

  if (!password) {
    return { ok: false, error: failure('SMTP_CONFIG_ERROR', 'MISSING_MAILBOX_PASSWORD', 'Missing MAILBOX_PASSWORD.') }
  }

  return {
    ok: true,
    config: {
      host,
      port,
      secure,
      login,
      password,
      fromName,
    },
  }
}

function validateInput(input: HomeplSmtpEmailInput): HomeplSmtpFailure | null {
  const toRecipients = normalizeRecipientList(input.to)
  const ccRecipients = normalizeRecipientList(input.cc)
  const bccRecipients = normalizeRecipientList(input.bcc)

  if (!toRecipients.length || toRecipients.some((recipient) => !isValidEmail(recipient))) {
    return failure('SMTP_CONFIG_ERROR', 'INVALID_TO_RECIPIENT', 'One or more TO recipients are invalid.')
  }

  if (ccRecipients.some((recipient) => !isValidEmail(recipient))) {
    return failure('SMTP_CONFIG_ERROR', 'INVALID_CC_RECIPIENT', 'One or more CC recipients are invalid.')
  }

  if (bccRecipients.some((recipient) => !isValidEmail(recipient))) {
    return failure('SMTP_CONFIG_ERROR', 'INVALID_BCC_RECIPIENT', 'One or more BCC recipients are invalid.')
  }

  if (!input.subject.trim()) {
    return failure('SMTP_CONFIG_ERROR', 'INVALID_SUBJECT', 'Subject must not be empty.')
  }

  if (!input.html.trim()) {
    return failure('SMTP_CONFIG_ERROR', 'INVALID_HTML', 'HTML body must not be empty.')
  }

  if (input.text !== undefined && !input.text.trim()) {
    return failure('SMTP_CONFIG_ERROR', 'INVALID_TEXT', 'Text body must not be empty when provided.')
  }

  const replyTo = normalizeOptionalEmail(input.replyTo)
  if (input.replyTo && (!replyTo || !isValidEmail(replyTo))) {
    return failure('SMTP_CONFIG_ERROR', 'INVALID_REPLY_TO', 'Reply-To email address is invalid.')
  }

  if (input.attachments?.some((attachment) => !attachment.filename.trim())) {
    return failure('SMTP_CONFIG_ERROR', 'INVALID_ATTACHMENT_FILENAME', 'Attachment filename must not be empty.')
  }

  if (input.attachments?.some((attachment) => !Buffer.isBuffer(attachment.content) || attachment.content.byteLength < 1)) {
    return failure('SMTP_CONFIG_ERROR', 'INVALID_ATTACHMENT_CONTENT', 'Attachment content must be a non-empty Buffer.')
  }

  if (input.attachments?.some((attachment) => !attachment.contentType.trim())) {
    return failure('SMTP_CONFIG_ERROR', 'INVALID_ATTACHMENT_CONTENT_TYPE', 'Attachment content type must not be empty.')
  }

  return null
}

function createTransport(config: HomeplSmtpConfig) {
  return nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.secure,
    auth: {
      user: config.login,
      pass: config.password,
    },
    connectionTimeout: SMTP_CONNECTION_TIMEOUT_MS,
    greetingTimeout: SMTP_GREETING_TIMEOUT_MS,
    socketTimeout: SMTP_SOCKET_TIMEOUT_MS,
  })
}

function sanitizeSmtpError(error: unknown): HomeplSmtpFailure {
  const code = typeof error === 'object' && error !== null && 'code' in error
    ? String((error as { code?: unknown }).code ?? 'SMTP_SEND_ERROR')
    : 'SMTP_SEND_ERROR'
  const message = error instanceof Error ? error.message : 'Unknown SMTP error.'
  const response = typeof error === 'object' && error !== null && 'response' in error
    ? String((error as { response?: unknown }).response ?? '')
    : ''

  if (/EAUTH|auth|Invalid login|authentication/i.test(`${code} ${message} ${response}`)) {
    return failure('SMTP_AUTH_ERROR', code, 'SMTP authentication failed.')
  }

  if (/ESOCKET|ECONNECTION|ENOTFOUND|ECONNREFUSED|EHOSTUNREACH/i.test(`${code} ${message}`)) {
    return failure('SMTP_CONNECTION_ERROR', code, 'SMTP connection failed.')
  }

  if (/ETIMEDOUT|Timeout/i.test(`${code} ${message}`)) {
    return failure('SMTP_TIMEOUT', code, 'SMTP request timed out.')
  }

  if (/certificate|TLS|ssl/i.test(`${code} ${message} ${response}`)) {
    return failure('SMTP_TLS_ERROR', code, 'SMTP TLS negotiation failed.')
  }

  return failure('SMTP_SEND_ERROR', code, 'SMTP send failed.')
}

function formatFrom(config: HomeplSmtpConfig): string {
  return `${config.fromName} <${config.login}>`
}

export function summarizeHomeplSmtpFailure(error: HomeplSmtpFailure): string {
  return `${error.kind}: ${error.code}`
}

export async function verifyHomeplSmtp(env: NodeJS.ProcessEnv = process.env): Promise<HomeplSmtpVerifyResult> {
  const validated = validateHomeplSmtpConfig(env)
  if (!validated.ok) {
    return validated.error
  }

  try {
    const transport = createTransport(validated.config)
    await transport.verify()
    return {
      success: true,
      timestamp: nowIso(),
    }
  } catch (error) {
    return sanitizeSmtpError(error)
  }
}

export async function sendHomeplSmtpEmail(
  input: HomeplSmtpEmailInput,
  env: NodeJS.ProcessEnv = process.env
): Promise<HomeplSmtpSendResult> {
  const inputError = validateInput(input)
  if (inputError) {
    return inputError
  }

  const validated = validateHomeplSmtpConfig(env)
  if (!validated.ok) {
    return validated.error
  }

  const toRecipients = normalizeRecipientList(input.to)
  const ccRecipients = normalizeRecipientList(input.cc)
  const bccRecipients = normalizeRecipientList(input.bcc)
  const replyTo = normalizeOptionalEmail(input.replyTo)

  try {
    const transport = createTransport(validated.config)
    const result = await transport.sendMail({
      from: formatFrom(validated.config),
      to: toRecipients,
      ...(ccRecipients.length ? { cc: ccRecipients } : {}),
      ...(bccRecipients.length ? { bcc: bccRecipients } : {}),
      ...(replyTo ? { replyTo } : {}),
      subject: input.subject.trim(),
      ...(input.text ? { text: input.text } : {}),
      html: input.html,
      ...(input.attachments?.length
        ? {
            attachments: input.attachments.map((attachment) => ({
              filename: attachment.filename,
              content: attachment.content,
              contentType: attachment.contentType,
            })),
          }
        : {}),
    })

    const accepted = Array.isArray(result.accepted)
      ? result.accepted.map((recipient) => String(recipient).trim().toLowerCase()).filter(Boolean)
      : []
    const rejected = Array.isArray(result.rejected)
      ? result.rejected.map((recipient) => String(recipient).trim().toLowerCase()).filter(Boolean)
      : []
    const pending = Array.isArray(result.pending)
      ? result.pending.map((recipient) => String(recipient).trim().toLowerCase()).filter(Boolean)
      : []

    if (rejected.length > 0) {
      return failure('SMTP_RECIPIENT_REJECTED', 'SMTP_RECIPIENT_REJECTED', 'SMTP server rejected one or more recipients.', {
        rejected,
      })
    }

    return {
      success: true,
      accepted,
      rejected,
      pending,
      messageId: result.messageId ?? null,
      timestamp: nowIso(),
    }
  } catch (error) {
    return sanitizeSmtpError(error)
  }
}