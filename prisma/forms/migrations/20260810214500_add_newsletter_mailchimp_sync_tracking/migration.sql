-- CreateEnum
CREATE TYPE "ExternalSyncStatus" AS ENUM ('PENDING', 'SYNCED', 'FAILED');

-- AlterTable
ALTER TABLE "newsletter_subscriptions"
ADD COLUMN     "mailchimpSyncStatus" "ExternalSyncStatus",
ADD COLUMN     "mailchimpSyncedAt" TIMESTAMP(3),
ADD COLUMN     "mailchimpSubscriberHash" TEXT,
ADD COLUMN     "mailchimpError" TEXT;

-- CreateIndex
CREATE INDEX "newsletter_subscriptions_mailchimpSyncStatus_idx" ON "newsletter_subscriptions"("mailchimpSyncStatus");