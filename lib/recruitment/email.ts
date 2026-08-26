import { createHash } from 'node:crypto'
import path from 'node:path'

import type {
  JobApplication,
  JobPosition,
  WeeklyAvailability,
  ExcelLevel,
  EnglishLevel,
} from '@/prisma/generated/forms-client'
import type { HomeplSmtpEmailInput, HomeplSmtpFailure } from '@/lib/email/homepl-smtp'
import { JOB_POSITION_LABELS } from '@/lib/recruitment/contract'

const DEFAULT_RECRUITMENT_NOTIFICATION_TO = 'monika.osiecka@profitia.pl'
const DEFAULT_RECRUITMENT_MAILBOX_REPLY_TO = 'kontakt@profitia.pl'
const MAX_RECRUITMENT_EMAIL_ERROR_LENGTH = 300

const WEEKLY_AVAILABILITY_LABELS: Record<WeeklyAvailability, string> = {
  HOURS_20_30: '20-30 h',
  HOURS_30_40: '30-40 h',
  HOURS_40: '40 h',
}

const EXCEL_LEVEL_LABELS: Record<ExcelLevel, string> = {
  BASIC: 'Podstawowy',
  INTERMEDIATE: 'Średniozaawansowany',
  ADVANCED: 'Zaawansowany',
}

const ENGLISH_LEVEL_LABELS: Record<EnglishLevel, string> = {
  BASIC: 'Podstawowy',
  INTERMEDIATE: 'Średniozaawansowany',
  ADVANCED: 'Zaawansowany',
  FLUENT: 'Biegły',
}

type RecruitmentEmailApplication = Pick<
  JobApplication,
  | 'id'
  | 'position'
  | 'fullName'
  | 'email'
  | 'phone'
  | 'availableFrom'
  | 'weeklyAvailability'
  | 'hybridAccepted'
  | 'businessTravelAccepted'
  | 'excelLevel'
  | 'englishLevel'
  | 'financialExpectations'
  | 'motivation'
  | 'cvOriginalFilename'
  | 'cvMimeType'
  | 'cvSizeBytes'
  | 'cvSha256'
  | 'currentRecruitmentConsentVersion'
  | 'currentRecruitmentConsentAt'
  | 'futureRecruitmentConsent'
  | 'futureRecruitmentConsentVersion'
  | 'futureRecruitmentConsentAt'
  | 'locale'
>

export interface RecruitmentStoredCvAttachment {
  filename: string
  content: Buffer
  contentType: string
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function formatNullable(value: string | null | undefined, fallback = 'Nie podano'): string {
  if (!value) {
    return fallback
  }

  return value
}

function formatBoolean(value: boolean): string {
  return value ? 'Tak' : 'Nie'
}

function formatPolishTimestamp(value: Date | null): string {
  if (!value) {
    return 'Nie dotyczy'
  }

  return new Intl.DateTimeFormat('pl-PL', {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone: 'Europe/Warsaw',
  }).format(value)
}

function formatHtmlMultiline(value: string): string {
  return escapeHtml(value).replace(/\r\n?|\n/g, '<br>')
}

function sanitizeVisibleFilename(value: string | null | undefined): string {
  const filename = path.basename((value ?? 'cv').replace(/\\/g, '/')).replace(/[\x00-\x1f\x7f]/g, '').trim()
  return filename || 'cv'
}

export function resolveRecruitmentNotificationRecipient(env: NodeJS.ProcessEnv = process.env): string {
  return env.RECRUITMENT_NOTIFICATION_TO?.trim().toLowerCase() || DEFAULT_RECRUITMENT_NOTIFICATION_TO
}

export function resolveRecruitmentMailboxReplyTo(env: NodeJS.ProcessEnv = process.env): string {
  return env.MAILBOX_LOGIN?.trim().toLowerCase() || DEFAULT_RECRUITMENT_MAILBOX_REPLY_TO
}

export function getRecruitmentPositionLabel(position: JobPosition, locale: 'pl' | 'en'): string {
  return JOB_POSITION_LABELS[position][locale]
}

function getWeeklyAvailabilityLabel(value: WeeklyAvailability | null): string {
  if (!value) {
    return 'Nie dotyczy'
  }

  return WEEKLY_AVAILABILITY_LABELS[value]
}

function getExcelLevelLabel(value: ExcelLevel): string {
  return EXCEL_LEVEL_LABELS[value]
}

function getEnglishLevelLabel(value: EnglishLevel): string {
  return ENGLISH_LEVEL_LABELS[value]
}

function buildRecruiterTextBody(application: RecruitmentEmailApplication): string {
  const futureConsentLines = application.futureRecruitmentConsent
    ? [
        'Zgoda na przyszłe procesy: Tak',
        `Wersja: ${application.futureRecruitmentConsentVersion ?? 'Nie dotyczy'}`,
        `Data zgody: ${formatPolishTimestamp(application.futureRecruitmentConsentAt)}`,
      ]
    : ['Zgoda na przyszłe procesy: Nie']

  return [
    'NOWA APLIKACJA',
    '',
    'Stanowisko:',
    getRecruitmentPositionLabel(application.position, 'pl'),
    '',
    'DANE KANDYDATA',
    '',
    'Imię i nazwisko:',
    application.fullName,
    '',
    'E-mail:',
    application.email,
    '',
    'Telefon:',
    application.phone,
    '',
    'DOSTĘPNOŚĆ',
    '',
    'Możliwy termin rozpoczęcia:',
    application.availableFrom,
    '',
    'Dostępność tygodniowa:',
    getWeeklyAvailabilityLabel(application.weeklyAvailability),
    '',
    'Model hybrydowy 3:2:',
    formatBoolean(application.hybridAccepted),
    '',
    'Gotowość do wyjazdów służbowych:',
    formatBoolean(application.businessTravelAccepted),
    '',
    'KOMPETENCJE',
    '',
    'Excel:',
    getExcelLevelLabel(application.excelLevel),
    '',
    'Język angielski:',
    getEnglishLevelLabel(application.englishLevel),
    '',
    'WARUNKI',
    '',
    'Oczekiwania finansowe:',
    formatNullable(application.financialExpectations),
    '',
    'MOTYWACJA',
    '',
    application.motivation,
    '',
    'ZGODY',
    '',
    'Zgoda na bieżący proces: Tak',
    `Wersja: ${application.currentRecruitmentConsentVersion}`,
    `Data zgody: ${formatPolishTimestamp(application.currentRecruitmentConsentAt)}`,
    ...futureConsentLines,
    '',
    'ZAŁĄCZNIK',
    '',
    `CV: ${sanitizeVisibleFilename(application.cvOriginalFilename)}`,
    '',
    `ID aplikacji: ${application.id}`,
  ].join('\n')
}

function buildRecruiterHtmlBody(application: RecruitmentEmailApplication): string {
  const futureConsentRows = application.futureRecruitmentConsent
    ? [
        `<tr><td style="padding:6px 0;font-weight:600;width:220px;vertical-align:top;">Zgoda na przyszłe procesy</td><td style="padding:6px 0;">Tak</td></tr>`,
        `<tr><td style="padding:6px 0;font-weight:600;width:220px;vertical-align:top;">Wersja zgody przyszłej</td><td style="padding:6px 0;">${escapeHtml(application.futureRecruitmentConsentVersion ?? 'Nie dotyczy')}</td></tr>`,
        `<tr><td style="padding:6px 0;font-weight:600;width:220px;vertical-align:top;">Data zgody przyszłej</td><td style="padding:6px 0;">${escapeHtml(formatPolishTimestamp(application.futureRecruitmentConsentAt))}</td></tr>`,
      ].join('\n')
    : `<tr><td style="padding:6px 0;font-weight:600;width:220px;vertical-align:top;">Zgoda na przyszłe procesy</td><td style="padding:6px 0;">Nie</td></tr>`

  return [
    '<div style="font-family:Arial,sans-serif;font-size:14px;line-height:1.6;color:#1f2937;">',
    '  <h2 style="margin:0 0 16px;font-size:20px;color:#111827;">Nowa aplikacja</h2>',
    '  <table style="border-collapse:collapse;width:100%;max-width:760px;">',
    `    <tr><td style="padding:6px 0;font-weight:600;width:220px;vertical-align:top;">Stanowisko</td><td style="padding:6px 0;">${escapeHtml(getRecruitmentPositionLabel(application.position, 'pl'))}</td></tr>`,
    `    <tr><td style="padding:6px 0;font-weight:600;width:220px;vertical-align:top;">Imię i nazwisko</td><td style="padding:6px 0;">${escapeHtml(application.fullName)}</td></tr>`,
    `    <tr><td style="padding:6px 0;font-weight:600;width:220px;vertical-align:top;">E-mail</td><td style="padding:6px 0;">${escapeHtml(application.email)}</td></tr>`,
    `    <tr><td style="padding:6px 0;font-weight:600;width:220px;vertical-align:top;">Telefon</td><td style="padding:6px 0;">${escapeHtml(application.phone)}</td></tr>`,
    `    <tr><td style="padding:6px 0;font-weight:600;width:220px;vertical-align:top;">Możliwy termin rozpoczęcia</td><td style="padding:6px 0;">${escapeHtml(application.availableFrom)}</td></tr>`,
    `    <tr><td style="padding:6px 0;font-weight:600;width:220px;vertical-align:top;">Dostępność tygodniowa</td><td style="padding:6px 0;">${escapeHtml(getWeeklyAvailabilityLabel(application.weeklyAvailability))}</td></tr>`,
    `    <tr><td style="padding:6px 0;font-weight:600;width:220px;vertical-align:top;">Model hybrydowy 3:2</td><td style="padding:6px 0;">${escapeHtml(formatBoolean(application.hybridAccepted))}</td></tr>`,
    `    <tr><td style="padding:6px 0;font-weight:600;width:220px;vertical-align:top;">Gotowość do wyjazdów służbowych</td><td style="padding:6px 0;">${escapeHtml(formatBoolean(application.businessTravelAccepted))}</td></tr>`,
    `    <tr><td style="padding:6px 0;font-weight:600;width:220px;vertical-align:top;">Excel</td><td style="padding:6px 0;">${escapeHtml(getExcelLevelLabel(application.excelLevel))}</td></tr>`,
    `    <tr><td style="padding:6px 0;font-weight:600;width:220px;vertical-align:top;">Język angielski</td><td style="padding:6px 0;">${escapeHtml(getEnglishLevelLabel(application.englishLevel))}</td></tr>`,
    `    <tr><td style="padding:6px 0;font-weight:600;width:220px;vertical-align:top;">Oczekiwania finansowe</td><td style="padding:6px 0;">${escapeHtml(formatNullable(application.financialExpectations))}</td></tr>`,
    `    <tr><td style="padding:6px 0;font-weight:600;width:220px;vertical-align:top;">Motywacja</td><td style="padding:6px 0;">${formatHtmlMultiline(application.motivation)}</td></tr>`,
    `    <tr><td style="padding:6px 0;font-weight:600;width:220px;vertical-align:top;">Zgoda na bieżący proces</td><td style="padding:6px 0;">Tak</td></tr>`,
    `    <tr><td style="padding:6px 0;font-weight:600;width:220px;vertical-align:top;">Wersja zgody bieżącej</td><td style="padding:6px 0;">${escapeHtml(application.currentRecruitmentConsentVersion)}</td></tr>`,
    `    <tr><td style="padding:6px 0;font-weight:600;width:220px;vertical-align:top;">Data zgody bieżącej</td><td style="padding:6px 0;">${escapeHtml(formatPolishTimestamp(application.currentRecruitmentConsentAt))}</td></tr>`,
    `    ${futureConsentRows}`,
    `    <tr><td style="padding:6px 0;font-weight:600;width:220px;vertical-align:top;">CV</td><td style="padding:6px 0;">${escapeHtml(sanitizeVisibleFilename(application.cvOriginalFilename))}</td></tr>`,
    '  </table>',
    `  <p style="margin:16px 0 0;color:#6b7280;font-size:12px;">ID aplikacji: ${escapeHtml(application.id)}</p>`,
    '</div>',
  ].join('\n')
}

export function buildRecruiterApplicationEmail(
  application: RecruitmentEmailApplication,
  attachment: RecruitmentStoredCvAttachment,
  env: NodeJS.ProcessEnv = process.env
): HomeplSmtpEmailInput {
  return {
    to: resolveRecruitmentNotificationRecipient(env),
    replyTo: application.email,
    subject: `Nowa aplikacja na: ${getRecruitmentPositionLabel(application.position, 'pl')}`,
    text: buildRecruiterTextBody(application),
    html: buildRecruiterHtmlBody(application),
    attachments: [
      {
        filename: sanitizeVisibleFilename(attachment.filename),
        content: attachment.content,
        contentType: attachment.contentType,
      },
    ],
  }
}

export function buildCandidateConfirmationEmail(
  application: RecruitmentEmailApplication,
  env: NodeJS.ProcessEnv = process.env
): HomeplSmtpEmailInput {
  const locale = application.locale === 'en' ? 'en' : 'pl'
  const positionLabel = getRecruitmentPositionLabel(application.position, locale)

  if (locale === 'en') {
    const text = [
      'Hello,',
      '',
      `Thank you for applying for the position of "${positionLabel}".`,
      '',
      'We confirm that we have received your application.',
      '',
      'After reviewing your application, we will contact you if we would like to invite you to the next stage of the recruitment process.',
      '',
      'Best regards,',
      'Profitia Team',
    ].join('\n')

    return {
      to: application.email,
      replyTo: resolveRecruitmentMailboxReplyTo(env),
      subject: 'Thank you for applying to Profitia',
      text,
      html: [
        '<div style="font-family:Arial,sans-serif;font-size:14px;line-height:1.6;color:#1f2937;">',
        '  <p style="margin:0 0 16px;">Hello,</p>',
        `  <p style="margin:0 0 16px;">Thank you for applying for the position of "${escapeHtml(positionLabel)}".</p>`,
        '  <p style="margin:0 0 16px;">We confirm that we have received your application.</p>',
        '  <p style="margin:0 0 16px;">After reviewing your application, we will contact you if we would like to invite you to the next stage of the recruitment process.</p>',
        '  <p style="margin:0;">Best regards,<br>Profitia Team</p>',
        '</div>',
      ].join('\n'),
    }
  }

  const text = [
    'Dzień dobry,',
    '',
    `dziękujemy za przesłanie aplikacji na stanowisko "${positionLabel}".`,
    '',
    'Potwierdzamy, że otrzymaliśmy Twoje zgłoszenie.',
    '',
    'Po zapoznaniu się z aplikacją skontaktujemy się z Tobą, jeżeli będziemy chcieli zaprosić Cię do kolejnego etapu procesu rekrutacyjnego.',
    '',
    'Pozdrawiamy,',
    'Zespół Profitia',
  ].join('\n')

  return {
    to: application.email,
    replyTo: resolveRecruitmentMailboxReplyTo(env),
    subject: 'Dziękujemy za przesłanie aplikacji do Profitia',
    text,
    html: [
      '<div style="font-family:Arial,sans-serif;font-size:14px;line-height:1.6;color:#1f2937;">',
      '  <p style="margin:0 0 16px;">Dzień dobry,</p>',
      `  <p style="margin:0 0 16px;">dziękujemy za przesłanie aplikacji na stanowisko "${escapeHtml(positionLabel)}".</p>`,
      '  <p style="margin:0 0 16px;">Potwierdzamy, że otrzymaliśmy Twoje zgłoszenie.</p>',
      '  <p style="margin:0 0 16px;">Po zapoznaniu się z aplikacją skontaktujemy się z Tobą, jeżeli będziemy chcieli zaprosić Cię do kolejnego etapu procesu rekrutacyjnego.</p>',
      '  <p style="margin:0;">Pozdrawiamy,<br>Zespół Profitia</p>',
      '</div>',
    ].join('\n'),
  }
}

export function summarizeRecruitmentEmailFailure(error: HomeplSmtpFailure): string {
  const summary = `${error.kind}: ${error.code}`
  return summary.length <= MAX_RECRUITMENT_EMAIL_ERROR_LENGTH
    ? summary
    : summary.slice(0, MAX_RECRUITMENT_EMAIL_ERROR_LENGTH)
}

export function summarizeMissingCvAttachmentError(reason: string): string {
  const safeReason = reason.replace(/[^A-Z0-9_: -]/gi, '').trim() || 'CV_ATTACHMENT_UNAVAILABLE'
  const summary = `CV_ATTACHMENT_UNAVAILABLE: ${safeReason}`
  return summary.length <= MAX_RECRUITMENT_EMAIL_ERROR_LENGTH
    ? summary
    : summary.slice(0, MAX_RECRUITMENT_EMAIL_ERROR_LENGTH)
}

export function doesStoredCvMatchMetadata(application: RecruitmentEmailApplication, content: Buffer): boolean {
  if (typeof application.cvSizeBytes === 'number' && application.cvSizeBytes !== content.byteLength) {
    return false
  }

  if (application.cvSha256) {
    const digest = createHash('sha256').update(content).digest('hex')
    return digest === application.cvSha256
  }

  return true
}