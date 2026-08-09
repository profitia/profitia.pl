-- Phase 4: durable object-storage media for new CMS uploads.
-- Existing coverImage values and inline HTML remain unchanged.
CREATE TABLE "media" (
  "id" TEXT NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "storageKey" TEXT NOT NULL,
  "publicUrl" TEXT NOT NULL,
  "mimeType" TEXT NOT NULL,
  "width" INTEGER NOT NULL,
  "height" INTEGER NOT NULL,
  "byteSize" INTEGER NOT NULL,
  "uploadedById" TEXT NOT NULL,

  CONSTRAINT "media_pkey" PRIMARY KEY ("id")
);

ALTER TABLE "articles"
  ADD COLUMN "coverImageAlt" TEXT,
  ADD COLUMN "coverMediaId" TEXT;

CREATE UNIQUE INDEX "media_storageKey_key" ON "media"("storageKey");
CREATE UNIQUE INDEX "media_publicUrl_key" ON "media"("publicUrl");
CREATE INDEX "media_uploadedById_idx" ON "media"("uploadedById");
CREATE INDEX "articles_coverMediaId_idx" ON "articles"("coverMediaId");

ALTER TABLE "media"
  ADD CONSTRAINT "media_uploadedById_fkey"
  FOREIGN KEY ("uploadedById") REFERENCES "admin_users"("id")
  ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE "articles"
  ADD CONSTRAINT "articles_coverMediaId_fkey"
  FOREIGN KEY ("coverMediaId") REFERENCES "media"("id")
  ON DELETE SET NULL ON UPDATE CASCADE;