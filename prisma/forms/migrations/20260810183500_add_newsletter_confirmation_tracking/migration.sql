-- AlterTable
ALTER TABLE "newsletter_subscriptions"
ADD COLUMN     "confirmationEmailStatus" "EmailDeliveryStatus",
ADD COLUMN     "confirmationEmailSentAt" TIMESTAMP(3),
ADD COLUMN     "confirmationEmailMessageId" TEXT,
ADD COLUMN     "confirmationEmailError" TEXT;