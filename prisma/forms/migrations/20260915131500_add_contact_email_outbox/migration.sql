-- CreateEnum
CREATE TYPE "ContactEmailKind" AS ENUM ('INTERNAL_NOTIFICATION', 'USER_CONFIRMATION');

-- CreateEnum
CREATE TYPE "ContactEmailJobStatus" AS ENUM ('PENDING', 'PROCESSING', 'SENT', 'FAILED');

-- CreateTable
CREATE TABLE "contact_email_outbox" (
    "id" TEXT NOT NULL,
    "contactSubmissionId" TEXT NOT NULL,
    "kind" "ContactEmailKind" NOT NULL,
    "status" "ContactEmailJobStatus" NOT NULL DEFAULT 'PENDING',
    "attempts" INTEGER NOT NULL DEFAULT 0,
    "availableAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lockedAt" TIMESTAMP(3),
    "lastAttemptAt" TIMESTAMP(3),
    "sentAt" TIMESTAMP(3),
    "messageId" TEXT,
    "lastError" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "contact_email_outbox_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "contact_email_outbox_contactSubmissionId_kind_key" ON "contact_email_outbox"("contactSubmissionId", "kind");

-- CreateIndex
CREATE INDEX "contact_email_outbox_status_availableAt_idx" ON "contact_email_outbox"("status", "availableAt");

-- CreateIndex
CREATE INDEX "contact_email_outbox_lockedAt_idx" ON "contact_email_outbox"("lockedAt");

-- AddForeignKey
ALTER TABLE "contact_email_outbox" ADD CONSTRAINT "contact_email_outbox_contactSubmissionId_fkey" FOREIGN KEY ("contactSubmissionId") REFERENCES "contact_submissions"("id") ON DELETE CASCADE ON UPDATE CASCADE;