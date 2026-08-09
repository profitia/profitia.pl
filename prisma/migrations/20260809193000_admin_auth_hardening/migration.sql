-- Phase 5A: persistent, pseudonymous admin login audit and throttling state.
CREATE TABLE "admin_login_audits" (
  "id" TEXT NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "adminUserId" TEXT,
  "emailKey" TEXT NOT NULL,
  "ipKey" TEXT NOT NULL,
  "outcome" TEXT NOT NULL,
  "userAgent" VARCHAR(512),

  CONSTRAINT "admin_login_audits_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "admin_login_audits_ipKey_createdAt_idx"
  ON "admin_login_audits"("ipKey", "createdAt");
CREATE INDEX "admin_login_audits_emailKey_createdAt_idx"
  ON "admin_login_audits"("emailKey", "createdAt");
CREATE INDEX "admin_login_audits_adminUserId_idx"
  ON "admin_login_audits"("adminUserId");

ALTER TABLE "admin_login_audits"
  ADD CONSTRAINT "admin_login_audits_adminUserId_fkey"
  FOREIGN KEY ("adminUserId") REFERENCES "admin_users"("id")
  ON DELETE SET NULL ON UPDATE CASCADE;