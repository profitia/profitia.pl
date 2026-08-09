-- Phase 1: nullable localization foundation for new CMS articles.
-- Existing rows remain unchanged with NULL locale and translationGroupId.
CREATE TYPE "ArticleLocale" AS ENUM ('PL', 'EN');

ALTER TABLE "articles"
  ADD COLUMN "locale" "ArticleLocale",
  ADD COLUMN "translationGroupId" TEXT;

DROP INDEX "articles_slug_key";

CREATE UNIQUE INDEX "articles_locale_slug_key"
  ON "articles"("locale", "slug");

CREATE UNIQUE INDEX "articles_translationGroupId_locale_key"
  ON "articles"("translationGroupId", "locale");
