-- CreateEnum
CREATE TYPE "SubmissionStatus" AS ENUM ('NEW', 'READ', 'IN_PROGRESS', 'CLOSED');

-- CreateEnum
CREATE TYPE "EmailDeliveryStatus" AS ENUM ('PENDING', 'SENT', 'FAILED');

-- CreateTable
CREATE TABLE "contact_submissions" (
    "id" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "company" TEXT,
    "topic" TEXT,
    "message" TEXT NOT NULL,
    "privacyConsent" BOOLEAN NOT NULL,
    "privacyConsentText" TEXT NOT NULL,
    "privacyConsentVersion" TEXT NOT NULL,
    "marketingConsent" BOOLEAN NOT NULL,
    "marketingConsentText" TEXT NOT NULL,
    "marketingConsentVersion" TEXT NOT NULL,
    "privacyPolicyUrl" TEXT,
    "privacyPolicyVersion" TEXT,
    "locale" TEXT NOT NULL,
    "sourcePage" TEXT,
    "submissionStatus" "SubmissionStatus" NOT NULL DEFAULT 'NEW',
    "internalEmailStatus" "EmailDeliveryStatus" NOT NULL DEFAULT 'PENDING',
    "internalEmailSentAt" TIMESTAMP(3),
    "internalEmailMessageId" TEXT,
    "internalEmailError" TEXT,
    "confirmationEmailStatus" "EmailDeliveryStatus" NOT NULL DEFAULT 'PENDING',
    "confirmationEmailSentAt" TIMESTAMP(3),
    "confirmationEmailMessageId" TEXT,
    "confirmationEmailError" TEXT,
    "submittedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "contact_submissions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "contact_submissions_submittedAt_idx" ON "contact_submissions"("submittedAt");

-- CreateIndex
CREATE INDEX "contact_submissions_submissionStatus_idx" ON "contact_submissions"("submissionStatus");

-- CreateIndex
CREATE INDEX "contact_submissions_email_idx" ON "contact_submissions"("email");

-- CreateIndex
CREATE INDEX "contact_submissions_internalEmailStatus_idx" ON "contact_submissions"("internalEmailStatus");

-- CreateIndex
CREATE INDEX "contact_submissions_confirmationEmailStatus_idx" ON "contact_submissions"("confirmationEmailStatus");
