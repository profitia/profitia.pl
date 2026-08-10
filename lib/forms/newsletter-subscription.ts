import { Prisma } from '@/prisma/generated/forms-client'

import type {
  NewsletterSubscription,
  PrismaClient,
} from '@/prisma/generated/forms-client'
import type { HomeplSmtpSendResult } from '@/lib/email/homepl-smtp'
import { sendHomeplSmtpEmail, summarizeHomeplSmtpFailure } from '@/lib/email/homepl-smtp'
import { buildNewsletterConfirmationEmail } from '@/lib/forms/newsletter-confirmation'
import {
  createMailchimpSubscriberHash,
  summarizeMailchimpSyncFailure,
  syncMailchimpNewsletterSubscriber,
} from '@/lib/newsletter/mailchimp'
import {
  NEWSLETTER_CONSENT_VERSION,
  NEWSLETTER_LAWFUL_BASIS,
  getNewsletterConsentContent,
} from '@/lib/newsletter/consent'

export interface NormalizedNewsletterSubscriptionInput {
  email: string
  locale: 'pl' | 'en'
  sourcePage: string | null
}

export interface NewsletterSubscriptionProcessResult {
  publicSuccess: true
  subscriptionCreated: boolean
  smtpAttempted: boolean
  smtpAccepted: boolean
  smtpPersistedStatus: 'SENT' | 'FAILED' | 'PENDING' | null
  mailchimpAttempted: boolean
  mailchimpSynced: boolean
  mailchimpPersistedStatus: 'PENDING' | 'SYNCED' | 'FAILED' | null
  existingStatus: NewsletterSubscription['subscriptionStatus'] | null
}

type SendNewsletterConfirmationEmail = typeof sendHomeplSmtpEmail
type SyncMailchimpNewsletterSubscriber = typeof syncMailchimpNewsletterSubscriber
type Logger = Pick<Console, 'error'>

export interface NewsletterSubscriptionProcessOptions {
  env?: NodeJS.ProcessEnv
  sendEmail?: SendNewsletterConfirmationEmail
  syncMailchimp?: SyncMailchimpNewsletterSubscriber
  logger?: Logger
}

function isUniqueConstraintError(error: unknown): boolean {
  return error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002'
}

function hasAcceptedRecipient(result: { accepted: string[] }, email: string): boolean {
  return result.accepted.includes(email.trim().toLowerCase())
}

function logNewsletterTrackingFailure(
  logger: Logger,
  error: unknown,
  subscriptionId: string,
  integration: 'confirmation' | 'mailchimp',
  stage: 'success' | 'failure'
) {
  const safeMessage = error instanceof Error ? error.message : 'Unknown tracking persistence failure.'
  logger.error(`[newsletter ${integration} tracking/${stage}] subscription=${subscriptionId} ${safeMessage}`)
}

async function resolveExistingSubscriptionStatus(
  formsPrisma: PrismaClient,
  email: string
): Promise<NewsletterSubscription['subscriptionStatus'] | null> {
  const existing = await formsPrisma.newsletterSubscription.findUnique({
    where: { email },
    select: { subscriptionStatus: true },
  })

  return existing?.subscriptionStatus ?? null
}

export async function processNewsletterSubscription(
  formsPrisma: PrismaClient,
  data: NormalizedNewsletterSubscriptionInput,
  options: NewsletterSubscriptionProcessOptions = {}
): Promise<NewsletterSubscriptionProcessResult> {
  const {
    env = process.env,
    sendEmail = sendHomeplSmtpEmail,
    syncMailchimp = syncMailchimpNewsletterSubscriber,
    logger = console,
  } = options

  const existing = await formsPrisma.newsletterSubscription.findUnique({
    where: { email: data.email },
  })

  if (existing) {
    return {
      publicSuccess: true,
      subscriptionCreated: false,
      smtpAttempted: false,
      smtpAccepted: false,
      smtpPersistedStatus: null,
      mailchimpAttempted: false,
      mailchimpSynced: false,
      mailchimpPersistedStatus: null,
      existingStatus: existing.subscriptionStatus,
    }
  }

  const consentContent = getNewsletterConsentContent(data.locale)
  const subscribedAt = new Date()
  const mailchimpSubscriberHash = createMailchimpSubscriberHash(data.email)
  let created: NewsletterSubscription

  try {
    created = await formsPrisma.newsletterSubscription.create({
      data: {
        email: data.email,
        locale: data.locale,
        sourcePage: data.sourcePage,
        privacyConsent: true,
        privacyConsentText: consentContent.fullText,
        privacyConsentVersion: NEWSLETTER_CONSENT_VERSION,
        lawfulBasis: NEWSLETTER_LAWFUL_BASIS,
        subscriptionStatus: 'ACTIVE',
        subscribedAt,
        confirmedAt: null,
        unsubscribedAt: null,
        externalContactId: null,
        confirmationEmailStatus: 'PENDING',
        confirmationEmailSentAt: null,
        confirmationEmailMessageId: null,
        confirmationEmailError: null,
        mailchimpSyncStatus: 'PENDING',
        mailchimpSyncedAt: null,
        mailchimpSubscriberHash,
        mailchimpError: null,
      },
    })
  } catch (error) {
    if (isUniqueConstraintError(error)) {
      const existingStatus = await resolveExistingSubscriptionStatus(formsPrisma, data.email)

      return {
        publicSuccess: true,
        subscriptionCreated: false,
        smtpAttempted: false,
        smtpAccepted: false,
        smtpPersistedStatus: null,
        mailchimpAttempted: false,
        mailchimpSynced: false,
        mailchimpPersistedStatus: null,
        existingStatus: existingStatus ?? 'ACTIVE',
      }
    }

    throw error
  }

  const emailMessage = buildNewsletterConfirmationEmail(created, env)
  let smtpAccepted = false
  let smtpPersistedStatus: NewsletterSubscriptionProcessResult['smtpPersistedStatus'] = 'PENDING'

  try {
    const emailResult = await sendEmail(emailMessage, env)

    if (emailResult.success && hasAcceptedRecipient(emailResult, created.email)) {
      smtpAccepted = true

      try {
        await formsPrisma.newsletterSubscription.update({
          where: { id: created.id },
          data: {
            confirmationEmailStatus: 'SENT',
            confirmationEmailSentAt: new Date(),
            confirmationEmailMessageId: emailResult.messageId,
            confirmationEmailError: null,
          },
        })
        smtpPersistedStatus = 'SENT'
      } catch (error) {
        logNewsletterTrackingFailure(logger, error, created.id, 'confirmation', 'success')
        smtpPersistedStatus = 'PENDING'
      }
    } else {
      const failureSummary = emailResult.success
        ? 'SMTP_RECIPIENT_REJECTED: SMTP_RECIPIENT_REJECTED'
        : summarizeHomeplSmtpFailure(emailResult as Exclude<HomeplSmtpSendResult, { success: true }>)

      try {
        await formsPrisma.newsletterSubscription.update({
          where: { id: created.id },
          data: {
            confirmationEmailStatus: 'FAILED',
            confirmationEmailSentAt: null,
            confirmationEmailMessageId: null,
            confirmationEmailError: failureSummary,
          },
        })
        smtpPersistedStatus = 'FAILED'
      } catch (error) {
        logNewsletterTrackingFailure(logger, error, created.id, 'confirmation', 'failure')
        smtpPersistedStatus = 'PENDING'
      }
    }
  }
  catch {
    try {
      await formsPrisma.newsletterSubscription.update({
        where: { id: created.id },
        data: {
          confirmationEmailStatus: 'FAILED',
          confirmationEmailSentAt: null,
          confirmationEmailMessageId: null,
          confirmationEmailError: 'SMTP_SEND_ERROR: SMTP_UNEXPECTED_ERROR',
        },
      })
      smtpPersistedStatus = 'FAILED'
    } catch (error) {
      logNewsletterTrackingFailure(logger, error, created.id, 'confirmation', 'failure')
      smtpPersistedStatus = 'PENDING'
    }
  }

  let mailchimpSynced = false
  let mailchimpPersistedStatus: NewsletterSubscriptionProcessResult['mailchimpPersistedStatus'] = 'PENDING'

  try {
    const mailchimpResult = await syncMailchimp({ email: created.email }, env)

    if (mailchimpResult.success) {
      mailchimpSynced = true

      try {
        await formsPrisma.newsletterSubscription.update({
          where: { id: created.id },
          data: {
            mailchimpSyncStatus: 'SYNCED',
            mailchimpSyncedAt: new Date(),
            mailchimpSubscriberHash: mailchimpResult.subscriberHash,
            mailchimpError: null,
          },
        })
        mailchimpPersistedStatus = 'SYNCED'
      } catch (error) {
        logNewsletterTrackingFailure(logger, error, created.id, 'mailchimp', 'success')
        mailchimpPersistedStatus = 'PENDING'
      }
    } else {
      try {
        await formsPrisma.newsletterSubscription.update({
          where: { id: created.id },
          data: {
            mailchimpSyncStatus: 'FAILED',
            mailchimpSyncedAt: null,
            mailchimpSubscriberHash: mailchimpResult.subscriberHash ?? mailchimpSubscriberHash,
            mailchimpError: summarizeMailchimpSyncFailure(mailchimpResult),
          },
        })
        mailchimpPersistedStatus = 'FAILED'
      } catch (error) {
        logNewsletterTrackingFailure(logger, error, created.id, 'mailchimp', 'failure')
        mailchimpPersistedStatus = 'PENDING'
      }
    }
  } catch {
    try {
      await formsPrisma.newsletterSubscription.update({
        where: { id: created.id },
        data: {
          mailchimpSyncStatus: 'FAILED',
          mailchimpSyncedAt: null,
          mailchimpSubscriberHash,
          mailchimpError: 'MAILCHIMP_API_ERROR: MAILCHIMP_UNEXPECTED_ERROR',
        },
      })
      mailchimpPersistedStatus = 'FAILED'
    } catch (error) {
      logNewsletterTrackingFailure(logger, error, created.id, 'mailchimp', 'failure')
      mailchimpPersistedStatus = 'PENDING'
    }
  }

  return {
    publicSuccess: true,
    subscriptionCreated: true,
    smtpAttempted: true,
    smtpAccepted,
    smtpPersistedStatus,
    mailchimpAttempted: true,
    mailchimpSynced,
    mailchimpPersistedStatus,
    existingStatus: null,
  }
}