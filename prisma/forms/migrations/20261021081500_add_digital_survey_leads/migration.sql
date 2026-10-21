CREATE TABLE "digital_survey_leads" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "organization" TEXT NOT NULL,
    "jobTitle" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "privacyConsent" BOOLEAN NOT NULL,
    "privacyConsentText" TEXT NOT NULL,
    "privacyConsentVersion" TEXT NOT NULL,
    "marketingConsent" BOOLEAN NOT NULL,
    "marketingConsentText" TEXT NOT NULL,
    "marketingConsentVersion" TEXT NOT NULL,
    "locale" TEXT NOT NULL,
    "sourcePage" TEXT,
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

    CONSTRAINT "digital_survey_leads_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "digital_survey_leads_email_idx" ON "digital_survey_leads"("email");
CREATE INDEX "digital_survey_leads_submittedAt_idx" ON "digital_survey_leads"("submittedAt");
CREATE INDEX "digital_survey_leads_internalEmailStatus_idx" ON "digital_survey_leads"("internalEmailStatus");
CREATE INDEX "digital_survey_leads_confirmationEmailStatus_idx" ON "digital_survey_leads"("confirmationEmailStatus");
