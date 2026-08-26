import assert from 'node:assert/strict'

import { buildContactConfirmationEmail } from '@/lib/forms/contact-confirmation'
import {
  buildInternalContactNotificationEmail,
  resolveContactNotificationBcc,
  resolveContactNotificationRecipient,
} from '@/lib/forms/contact-notification'
import type { ContactSubmission } from '@/prisma/generated/forms-client'

const env: NodeJS.ProcessEnv = {
  ...process.env,
  CONTACT_NOTIFICATION_EMAIL: 'kontakt@profitia.pl',
  CONTACT_NOTIFICATION_BCC: 'tomasz.uscinski@profitia.pl',
}

const submission = {
  id: 'contact-regression-1',
  fullName: 'Jan Kowalski',
  email: 'jan.kowalski@example.com',
  company: 'Profitia Test',
  topic: 'general',
  message: 'To jest wiadomość testowa.',
  locale: 'pl',
  sourcePage: '/contact',
  privacyConsent: true,
  marketingConsent: false,
  consentVersion: '2026-08-26',
  consentAt: new Date('2026-08-26T10:00:00.000Z'),
  lawfulBasis: 'consent',
  submissionStatus: 'NEW',
  internalEmailStatus: null,
  internalEmailSentAt: null,
  internalEmailMessageId: null,
  internalEmailError: null,
  candidateEmailStatus: null,
  candidateEmailSentAt: null,
  candidateEmailMessageId: null,
  candidateEmailError: null,
  submittedAt: new Date('2026-08-26T10:00:00.000Z'),
  createdAt: new Date('2026-08-26T10:00:00.000Z'),
  updatedAt: new Date('2026-08-26T10:00:00.000Z'),
} as unknown as ContactSubmission

const internalEmail = buildInternalContactNotificationEmail(submission, env)
assert.equal(resolveContactNotificationRecipient(env), 'kontakt@profitia.pl')
assert.equal(resolveContactNotificationBcc(env), 'tomasz.uscinski@profitia.pl')
assert.equal(internalEmail.to, 'kontakt@profitia.pl')
assert.equal(internalEmail.bcc, 'tomasz.uscinski@profitia.pl')
assert.equal(internalEmail.replyTo, submission.email)
assert.equal(internalEmail.attachments, undefined)
assert.equal(internalEmail.subject, 'Nowe zapytanie ze strony Profitia - Ogólne zapytanie')

const confirmationEmail = buildContactConfirmationEmail(submission, env)
assert.equal(confirmationEmail.to, submission.email)
assert.equal(confirmationEmail.replyTo, 'kontakt@profitia.pl')
assert.equal(confirmationEmail.subject, 'Dziękujemy za kontakt z Profitia')
assert.equal(confirmationEmail.attachments, undefined)

console.log('PASS contact email regression preserves routing and remains attachment-free')