-- CreateEnum
CREATE TYPE "SubscriptionStatus" AS ENUM ('ACTIVE', 'UNSUBSCRIBED');

-- CreateTable
CREATE TABLE "newsletter_subscriptions" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "privacyConsent" BOOLEAN NOT NULL,
    "privacyConsentText" TEXT NOT NULL,
    "privacyConsentVersion" TEXT NOT NULL,
    "lawfulBasis" TEXT,
    "locale" TEXT NOT NULL,
    "sourcePage" TEXT,
    "subscriptionStatus" "SubscriptionStatus" NOT NULL DEFAULT 'ACTIVE',
    "subscribedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "confirmedAt" TIMESTAMP(3),
    "unsubscribedAt" TIMESTAMP(3),
    "externalContactId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "newsletter_subscriptions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "newsletter_subscriptions_email_key" ON "newsletter_subscriptions"("email");

-- CreateIndex
CREATE INDEX "newsletter_subscriptions_subscribedAt_idx" ON "newsletter_subscriptions"("subscribedAt");

-- CreateIndex
CREATE INDEX "newsletter_subscriptions_subscriptionStatus_idx" ON "newsletter_subscriptions"("subscriptionStatus");

-- CreateIndex
CREATE INDEX "newsletter_subscriptions_locale_idx" ON "newsletter_subscriptions"("locale");
