-- CreateEnum
CREATE TYPE "JobPosition" AS ENUM ('PROCUREMENT_CONSULTANT', 'JUNIOR_BUSINESS_ANALYST');

-- CreateEnum
CREATE TYPE "WeeklyAvailability" AS ENUM ('HOURS_20_30', 'HOURS_30_40', 'HOURS_40');

-- CreateEnum
CREATE TYPE "ExcelLevel" AS ENUM ('BASIC', 'INTERMEDIATE', 'ADVANCED');

-- CreateEnum
CREATE TYPE "EnglishLevel" AS ENUM ('BASIC', 'INTERMEDIATE', 'ADVANCED', 'FLUENT');

-- CreateEnum
CREATE TYPE "CvStorageStatus" AS ENUM ('PENDING', 'STORED', 'FAILED');

-- CreateEnum
CREATE TYPE "JobApplicationStatus" AS ENUM ('RECEIVED', 'IN_REVIEW', 'REJECTED', 'HIRED', 'WITHDRAWN');

-- CreateTable
CREATE TABLE "job_applications" (
    "id" TEXT NOT NULL,
    "position" "JobPosition" NOT NULL,
    "fullName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "availableFrom" TEXT NOT NULL,
    "weeklyAvailability" "WeeklyAvailability",
    "hybridAccepted" BOOLEAN NOT NULL,
    "businessTravelAccepted" BOOLEAN NOT NULL,
    "excelLevel" "ExcelLevel" NOT NULL,
    "englishLevel" "EnglishLevel" NOT NULL,
    "financialExpectations" TEXT,
    "motivation" TEXT NOT NULL,
    "cvOriginalFilename" TEXT,
    "cvMimeType" TEXT,
    "cvSizeBytes" INTEGER,
    "cvStorageKey" TEXT,
    "cvSha256" TEXT,
    "cvStorageStatus" "CvStorageStatus",
    "currentRecruitmentConsent" BOOLEAN NOT NULL,
    "currentRecruitmentConsentText" TEXT NOT NULL,
    "currentRecruitmentConsentVersion" TEXT NOT NULL,
    "currentRecruitmentConsentAt" TIMESTAMP(3) NOT NULL,
    "futureRecruitmentConsent" BOOLEAN NOT NULL,
    "futureRecruitmentConsentText" TEXT,
    "futureRecruitmentConsentVersion" TEXT,
    "futureRecruitmentConsentAt" TIMESTAMP(3),
    "locale" TEXT NOT NULL,
    "sourcePage" TEXT,
    "applicationStatus" "JobApplicationStatus" NOT NULL DEFAULT 'RECEIVED',
    "internalEmailStatus" "EmailDeliveryStatus",
    "internalEmailSentAt" TIMESTAMP(3),
    "internalEmailMessageId" TEXT,
    "internalEmailError" TEXT,
    "candidateEmailStatus" "EmailDeliveryStatus",
    "candidateEmailSentAt" TIMESTAMP(3),
    "candidateEmailMessageId" TEXT,
    "candidateEmailError" TEXT,
    "submittedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "job_applications_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "job_applications_position_idx" ON "job_applications"("position");

-- CreateIndex
CREATE INDEX "job_applications_email_idx" ON "job_applications"("email");

-- CreateIndex
CREATE INDEX "job_applications_applicationStatus_idx" ON "job_applications"("applicationStatus");

-- CreateIndex
CREATE INDEX "job_applications_submittedAt_idx" ON "job_applications"("submittedAt");
