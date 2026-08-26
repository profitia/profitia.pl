import { z } from 'zod'

import type { PrismaClient } from '@/prisma/generated/forms-client'
import type {
  EnglishLevel,
  ExcelLevel,
  CvStorageStatus,
  JobApplication,
  JobPosition,
  WeeklyAvailability,
} from '@/prisma/generated/forms-client'
import {
  BOOLEAN_ANSWER_BY_VALUE,
  ENGLISH_LEVEL_BY_VALUE,
  EXCEL_LEVEL_BY_VALUE,
  JOB_POSITION_BY_ROLE_SLUG,
  normalizeInternalSourcePage,
  RECRUITMENT_FIELD_LIMITS,
  RECRUITMENT_SOURCE_PAGE_PATTERN,
  trimToNull,
  type RecruitmentLocale,
  type RecruitmentTransportInput,
  WEEKLY_AVAILABILITY_BY_VALUE,
} from '@/lib/recruitment/contract'
import {
  getRecruitmentConsentContent,
  RECRUITMENT_CONSENT_VERSION,
} from '@/lib/recruitment/consent'

export interface NormalizedJobApplicationInput {
  position: JobPosition
  fullName: string
  email: string
  phone: string
  availableFrom: string
  weeklyAvailability: WeeklyAvailability | null
  hybridAccepted: boolean
  businessTravelAccepted: boolean
  excelLevel: ExcelLevel
  englishLevel: EnglishLevel
  financialExpectations: string | null
  motivation: string
  currentRecruitmentConsent: true
  futureRecruitmentConsent: boolean
  locale: RecruitmentLocale
  sourcePage: string | null
}

export interface JobApplicationCvMetadata {
  originalFilename: string
  canonicalMimeType: string
  sizeBytes: number
  sha256: string
  storageKey: string
}

function buildValidationError(path: string, message: string): z.ZodError {
  return new z.ZodError([
    {
      code: z.ZodIssueCode.custom,
      message,
      path: [path],
    },
  ])
}

function trimRequired(value: string): string {
  return value.replace(/\r\n?/g, '\n').trim()
}

export function normalizeJobApplicationInput(input: RecruitmentTransportInput): NormalizedJobApplicationInput {
  const sourcePage = normalizeInternalSourcePage(input.sourcePage)
  if (sourcePage === '__invalid_external_source__' || (sourcePage && !RECRUITMENT_SOURCE_PAGE_PATTERN.test(sourcePage))) {
    throw buildValidationError('sourcePage', 'Source page must be an internal pathname.')
  }

  const fullName = trimRequired(input.fullName)
  if (fullName.length < 2 || fullName.length > RECRUITMENT_FIELD_LIMITS.fullName) {
    throw buildValidationError('fullName', `Full name must be between 2 and ${RECRUITMENT_FIELD_LIMITS.fullName} characters.`)
  }

  const email = trimRequired(input.email).toLowerCase()
  if (!email || email.length > RECRUITMENT_FIELD_LIMITS.email || !z.string().email().safeParse(email).success) {
    throw buildValidationError('email', 'Email must be a valid email address.')
  }

  const phone = trimRequired(input.phone)
  if (phone.length < 7 || phone.length > RECRUITMENT_FIELD_LIMITS.phone) {
    throw buildValidationError('phone', `Phone must be between 7 and ${RECRUITMENT_FIELD_LIMITS.phone} characters.`)
  }

  const availableFrom = trimRequired(input.availableFrom)
  if (!availableFrom || availableFrom.length > RECRUITMENT_FIELD_LIMITS.availableFrom) {
    throw buildValidationError('availableFrom', `Available from must be between 1 and ${RECRUITMENT_FIELD_LIMITS.availableFrom} characters.`)
  }

  const motivation = trimRequired(input.motivation)
  if (!motivation || motivation.length > RECRUITMENT_FIELD_LIMITS.motivation) {
    throw buildValidationError('motivation', `Motivation must be between 1 and ${RECRUITMENT_FIELD_LIMITS.motivation} characters.`)
  }

  const financialExpectations = trimToNull(input.financialExpectations)
  if (financialExpectations && financialExpectations.length > RECRUITMENT_FIELD_LIMITS.financialExpectations) {
    throw buildValidationError(
      'financialExpectations',
      `Financial expectations must not exceed ${RECRUITMENT_FIELD_LIMITS.financialExpectations} characters.`
    )
  }

  if (!input.consentCurrent) {
    throw buildValidationError('consentCurrent', 'Current recruitment consent is required.')
  }

  const position = JOB_POSITION_BY_ROLE_SLUG[input.roleSlug]
  const hybridAccepted = BOOLEAN_ANSWER_BY_VALUE[input.hybridAccepted]
  const businessTravelAccepted = BOOLEAN_ANSWER_BY_VALUE[input.businessTravel]
  const excelLevel = EXCEL_LEVEL_BY_VALUE[input.excelLevel] as ExcelLevel
  const englishLevel = ENGLISH_LEVEL_BY_VALUE[input.englishLevel] as EnglishLevel

  let weeklyAvailability: WeeklyAvailability | null = null
  if (input.roleSlug === 'junior-business-analyst') {
    if (!input.weeklyAvailability) {
      throw buildValidationError('weeklyAvailability', 'Weekly availability is required for this role.')
    }
    weeklyAvailability = WEEKLY_AVAILABILITY_BY_VALUE[input.weeklyAvailability] as WeeklyAvailability
  } else if (input.weeklyAvailability !== undefined) {
    throw buildValidationError('weeklyAvailability', 'Weekly availability is not allowed for this role.')
  }

  if (sourcePage && sourcePage.length > RECRUITMENT_FIELD_LIMITS.sourcePage) {
    throw buildValidationError('sourcePage', `Source page must not exceed ${RECRUITMENT_FIELD_LIMITS.sourcePage} characters.`)
  }

  return {
    position,
    fullName,
    email,
    phone,
    availableFrom,
    weeklyAvailability,
    hybridAccepted,
    businessTravelAccepted,
    excelLevel,
    englishLevel,
    financialExpectations,
    motivation,
    currentRecruitmentConsent: true,
    futureRecruitmentConsent: input.consentFuture,
    locale: input.locale,
    sourcePage,
  }
}

export async function createJobApplication(
  formsPrisma: PrismaClient,
  input: NormalizedJobApplicationInput,
  now = new Date()
): Promise<JobApplication> {
  const consentContent = getRecruitmentConsentContent(input.locale)

  return formsPrisma.jobApplication.create({
    data: {
      position: input.position,
      fullName: input.fullName,
      email: input.email,
      phone: input.phone,
      availableFrom: input.availableFrom,
      weeklyAvailability: input.weeklyAvailability,
      hybridAccepted: input.hybridAccepted,
      businessTravelAccepted: input.businessTravelAccepted,
      excelLevel: input.excelLevel,
      englishLevel: input.englishLevel,
      financialExpectations: input.financialExpectations,
      motivation: input.motivation,
      cvOriginalFilename: null,
      cvMimeType: null,
      cvSizeBytes: null,
      cvStorageKey: null,
      cvSha256: null,
      cvStorageStatus: null,
      currentRecruitmentConsent: true,
      currentRecruitmentConsentText: consentContent.current,
      currentRecruitmentConsentVersion: RECRUITMENT_CONSENT_VERSION,
      currentRecruitmentConsentAt: now,
      futureRecruitmentConsent: input.futureRecruitmentConsent,
      futureRecruitmentConsentText: input.futureRecruitmentConsent ? consentContent.future : null,
      futureRecruitmentConsentVersion: input.futureRecruitmentConsent ? RECRUITMENT_CONSENT_VERSION : null,
      futureRecruitmentConsentAt: input.futureRecruitmentConsent ? now : null,
      locale: input.locale,
      sourcePage: input.sourcePage,
      applicationStatus: 'RECEIVED',
      internalEmailStatus: null,
      internalEmailSentAt: null,
      internalEmailMessageId: null,
      internalEmailError: null,
      candidateEmailStatus: null,
      candidateEmailSentAt: null,
      candidateEmailMessageId: null,
      candidateEmailError: null,
    },
  })
}

export async function createPendingJobApplication(
  formsPrisma: PrismaClient,
  input: NormalizedJobApplicationInput,
  cvMetadata: JobApplicationCvMetadata,
  now = new Date()
): Promise<JobApplication> {
  const consentContent = getRecruitmentConsentContent(input.locale)

  return formsPrisma.jobApplication.create({
    data: {
      position: input.position,
      fullName: input.fullName,
      email: input.email,
      phone: input.phone,
      availableFrom: input.availableFrom,
      weeklyAvailability: input.weeklyAvailability,
      hybridAccepted: input.hybridAccepted,
      businessTravelAccepted: input.businessTravelAccepted,
      excelLevel: input.excelLevel,
      englishLevel: input.englishLevel,
      financialExpectations: input.financialExpectations,
      motivation: input.motivation,
      cvOriginalFilename: cvMetadata.originalFilename,
      cvMimeType: cvMetadata.canonicalMimeType,
      cvSizeBytes: cvMetadata.sizeBytes,
      cvStorageKey: cvMetadata.storageKey,
      cvSha256: cvMetadata.sha256,
      cvStorageStatus: 'PENDING',
      currentRecruitmentConsent: true,
      currentRecruitmentConsentText: consentContent.current,
      currentRecruitmentConsentVersion: RECRUITMENT_CONSENT_VERSION,
      currentRecruitmentConsentAt: now,
      futureRecruitmentConsent: input.futureRecruitmentConsent,
      futureRecruitmentConsentText: input.futureRecruitmentConsent ? consentContent.future : null,
      futureRecruitmentConsentVersion: input.futureRecruitmentConsent ? RECRUITMENT_CONSENT_VERSION : null,
      futureRecruitmentConsentAt: input.futureRecruitmentConsent ? now : null,
      locale: input.locale,
      sourcePage: input.sourcePage,
      applicationStatus: 'RECEIVED',
      internalEmailStatus: null,
      internalEmailSentAt: null,
      internalEmailMessageId: null,
      internalEmailError: null,
      candidateEmailStatus: null,
      candidateEmailSentAt: null,
      candidateEmailMessageId: null,
      candidateEmailError: null,
    },
  })
}

export async function updateJobApplicationCvStatus(
  formsPrisma: PrismaClient,
  applicationId: string,
  cvMetadata: JobApplicationCvMetadata,
  cvStorageStatus: CvStorageStatus
): Promise<JobApplication> {
  return formsPrisma.jobApplication.update({
    where: { id: applicationId },
    data: {
      cvOriginalFilename: cvMetadata.originalFilename,
      cvMimeType: cvMetadata.canonicalMimeType,
      cvSizeBytes: cvMetadata.sizeBytes,
      cvStorageKey: cvMetadata.storageKey,
      cvSha256: cvMetadata.sha256,
      cvStorageStatus,
    },
  })
}