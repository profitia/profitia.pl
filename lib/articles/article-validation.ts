import { ArticleLocale } from '@prisma/client'
import { z } from 'zod'
import { hasMeaningfulArticleContent } from './article-content'

const emptyStringToNull = (value: unknown) => value === '' ? null : value

export const articleSlugSchema = z.string()
  .min(1, 'Slug is required')
  .max(200, 'Slug is too long')
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Use lowercase letters, numbers and hyphens only')

const optionalText = (max: number) => z.preprocess(
  emptyStringToNull,
  z.string().max(max).nullable().optional(),
)

const optionalDate = z.preprocess(
  emptyStringToNull,
  z.coerce.date().nullable().optional(),
)

export const articleDraftFieldsSchema = z.object({
  title: z.string().trim().min(1, 'Title is required').max(200),
  slug: articleSlugSchema,
  excerpt: optionalText(1000),
  content: z.string().max(1_000_000).default(''),
  publishedAt: optionalDate,
  metaTitle: optionalText(200),
  metaDescription: optionalText(500),
  category: optionalText(100),
  readingTime: z.preprocess(
    emptyStringToNull,
    z.coerce.number().int().min(1).max(999).nullable().optional(),
  ),
  coverImage: optionalText(2048),
  coverImageAlt: optionalText(500),
  coverMediaId: z.preprocess(emptyStringToNull, z.string().cuid().nullable().optional()),
  featured: z.boolean().default(false),
})

export const createArticleDraftSchema = articleDraftFieldsSchema.extend({
  locale: z.nativeEnum(ArticleLocale),
  translationGroupId: z.string().uuid().optional(),
})

export const updateArticleDraftSchema = articleDraftFieldsSchema

export const createTranslationSchema = z.object({
  locale: z.nativeEnum(ArticleLocale),
})

export const publishableArticleSchema = z.object({
  locale: z.nativeEnum(ArticleLocale),
  translationGroupId: z.string().uuid(),
  title: z.string().trim().min(1),
  slug: articleSlugSchema,
  coverImage: z.string().nullable(),
  coverImageAlt: z.string().nullable(),
  content: z.string().refine(
    hasMeaningfulArticleContent,
    'Content is required before publishing',
  ),
}).superRefine((article, context) => {
  if (article.coverImage && !article.coverImageAlt?.trim()) {
    context.addIssue({
      code: z.ZodIssueCode.custom,
      path: ['coverImageAlt'],
      message: 'Cover image alt text is required before publishing',
    })
  }
})

export type CreateArticleDraftInput = z.infer<typeof createArticleDraftSchema>
export type UpdateArticleDraftInput = z.infer<typeof updateArticleDraftSchema>