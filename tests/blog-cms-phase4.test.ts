import { randomUUID } from 'node:crypto'
import { PrismaClient, type Media } from '@prisma/client'
import { NextRequest } from 'next/server'
import sharp from 'sharp'
import { getSchema } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { TableKit } from '@tiptap/extension-table'
import { articleContentExtensions } from '../components/admin/RichTextEditor'
import { sanitizeArticleHtml } from '../lib/articles/article-content'
import { publishableArticleSchema } from '../lib/articles/article-validation'
import { MAX_MEDIA_BYTES, MediaValidationError, processImageUpload } from '../lib/media/image'
import { uploadMedia, type CreateMediaRecord } from '../lib/media/media-service'
import { createMediaPostHandler } from '../lib/media/route-handler'
import type { MediaStorage } from '../lib/media/storage'
import { signAdminToken } from '../lib/auth'

let failures = 0
const prisma = new PrismaClient()
const testAdminId = `phase-4-admin-${randomUUID()}`

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) throw new Error(message)
}

async function test(name: string, run: () => Promise<void> | void) {
  try {
    await run()
    console.log(`PASS ${name}`)
  } catch (error) {
    failures += 1
    console.error(`FAIL ${name}`)
    console.error(error)
  }
}

function authCookie() {
  process.env.JWT_SECRET = 'phase-4-test-secret'
  return `admin_token=${signAdminToken(testAdminId)}`
}

function createFakeStorage() {
  const puts: Array<{ key: string; body: Buffer; contentType: string }> = []
  const deletes: string[] = []
  const storage: MediaStorage = {
    async put(input) {
      puts.push(input)
      return { key: input.key, publicUrl: `https://media.example.com/${input.key}` }
    },
    async delete(key) {
      deletes.push(key)
    },
  }
  return { storage, puts, deletes }
}

function fakeRecord(data: Parameters<CreateMediaRecord>[0]): Media {
  return { id: randomUUID(), createdAt: new Date(), ...data }
}

async function image(format: 'jpeg' | 'png' | 'webp') {
  const source = sharp({
    create: { width: 24, height: 16, channels: 3, background: '#176B87' },
  }).withMetadata({ exif: { IFD0: { Artist: 'Phase 4 secret metadata' } } })
  return source[format]().toBuffer()
}

function uploadRequest(bytes: Buffer, options: { authorized?: boolean; origin?: string } = {}) {
  const form = new FormData()
  form.append('file', new Blob([Uint8Array.from(bytes)], { type: 'application/octet-stream' }), 'misleading.txt')
  return new NextRequest('http://localhost/api/media', {
    method: 'POST',
    headers: {
      ...(options.authorized && { cookie: authCookie() }),
      ...(options.origin && { origin: options.origin }),
    },
    body: form,
  })
}

async function expectValidationError(run: () => Promise<unknown>) {
  try {
    await run()
  } catch (error) {
    assert(error instanceof MediaValidationError, 'Expected MediaValidationError')
    return
  }
  throw new Error('Expected image validation to fail')
}

async function main() {
  await prisma.adminUser.create({
    data: {
      id: testAdminId,
      email: `${testAdminId}@example.invalid`,
      name: 'Phase 4 Admin',
      passwordHash: 'test-only',
      active: true,
    },
  })

  try {
  await test('JPEG PNG and WebP are detected from bytes and normalized', async () => {
    for (const format of ['jpeg', 'png', 'webp'] as const) {
      const processed = await processImageUpload(await image(format))
      assert(processed.mimeType === `image/${format}`, `Unexpected ${format} MIME type`)
      assert(processed.width === 24 && processed.height === 16, `${format} dimensions changed`)
      const metadata = await sharp(processed.body).metadata()
      assert(!metadata.exif, `${format} EXIF metadata survived normalization`)
    }
  })

  await test('extension MIME spoofing and unsupported content are irrelevant', async () => {
    await expectValidationError(() => processImageUpload(Buffer.from('<svg><script>x()</script></svg>')))
    await expectValidationError(() => processImageUpload(Buffer.from('not an image')))
  })

  await test('empty and oversized uploads are rejected before storage', async () => {
    await expectValidationError(() => processImageUpload(Buffer.alloc(0)))
    await expectValidationError(() => processImageUpload(Buffer.alloc(MAX_MEDIA_BYTES + 1)))
  })

  await test('media endpoint requires authentication and same origin', async () => {
    const handler = createMediaPostHandler()
    const unauthorized = await handler(uploadRequest(await image('jpeg'), { origin: 'http://localhost' }))
    assert(unauthorized.status === 401, `Expected 401, received ${unauthorized.status}`)
    const crossOrigin = await handler(uploadRequest(await image('jpeg'), {
      authorized: true,
      origin: 'https://attacker.example',
    }))
    assert(crossOrigin.status === 403, `Expected 403, received ${crossOrigin.status}`)
  })

  await test('authorized multipart upload stores normalized bytes and a Media row', async () => {
    const fake = createFakeStorage()
    const records: Media[] = []
    const handler = createMediaPostHandler({
      storage: fake.storage,
      createRecord: async (data) => {
        const record = fakeRecord(data)
        records.push(record)
        return record
      },
    })
    const response = await handler(uploadRequest(await image('png'), {
      authorized: true,
      origin: 'http://localhost',
    }))
    assert(response.status === 201, `Expected 201, received ${response.status}`)
    assert(fake.puts.length === 1, 'Object storage did not receive exactly one object')
    assert(fake.puts[0].contentType === 'image/png', 'Detected MIME type was not stored')
    assert(records.length === 1 && records[0].uploadedById === testAdminId, 'Media ownership was not stored')
    assert(records[0].publicUrl.startsWith('https://media.example.com/blog/'), 'Public URL is unexpected')
  })

  await test('database failure deletes the uploaded object', async () => {
    const fake = createFakeStorage()
    try {
      await uploadMedia({
        bytes: await image('webp'),
        uploadedById: 'phase-4-admin',
        storage: fake.storage,
        createRecord: async () => { throw new Error('database unavailable') },
      })
      throw new Error('Expected uploadMedia to fail')
    } catch (error) {
      assert(error instanceof Error && error.message === 'database unavailable', 'Original database error was not retained')
    }
    assert(fake.puts.length === 1, 'Object was not uploaded before record failure')
    assert(fake.deletes[0] === fake.puts[0].key, 'Uploaded object was not compensated')
  })

  await test('sanitizer retains legacy paths and only the configured media origin', () => {
    process.env.R2_PUBLIC_BASE_URL = 'https://media.example.com/assets'
    const clean = sanitizeArticleHtml([
      '<img src="/images/blog/legacy/image.jpg" alt="Legacy">',
      '<img src="https://media.example.com/blog/new.webp" alt="New">',
      '<img src="https://attacker.example/tracker.png" alt="Tracker">',
    ].join(''))
    assert(clean.includes('/images/blog/legacy/image.jpg'), 'Legacy relative image was removed')
    assert(clean.includes('https://media.example.com/blog/new.webp'), 'Configured media image was removed')
    assert(!clean.includes('attacker.example'), 'Unconfigured absolute image survived')
  })

  await test('publication requires cover alt only when a cover exists', () => {
    const article = {
      locale: 'PL',
      translationGroupId: randomUUID(),
      title: 'Phase 4 publication',
      slug: 'phase-4-publication',
      content: '<p>Content</p>',
      coverImage: null,
      coverImageAlt: null,
    }
    assert(publishableArticleSchema.safeParse(article).success, 'Coverless article was rejected')
    assert(!publishableArticleSchema.safeParse({ ...article, coverImage: 'https://media.example.com/a.jpg' }).success, 'Cover without alt was accepted')
    assert(publishableArticleSchema.safeParse({ ...article, coverImage: 'https://media.example.com/a.jpg', coverImageAlt: 'Negotiation team at work' }).success, 'Cover with alt was rejected')
  })

  await test('Tiptap figure schema preserves uploaded image metadata and caption', () => {
    const extensions = [
      StarterKit.configure({ heading: { levels: [2, 3] } }),
      TableKit.configure({ table: { resizable: false } }),
      ...articleContentExtensions,
    ]
    const schema = getSchema(extensions)
    const document = schema.nodeFromJSON({
      type: 'doc',
      content: [{
        type: 'figure',
        content: [
          { type: 'image', attrs: { src: 'https://media.example.com/blog/a.webp', alt: 'Cost chart', width: 800, height: 500, loading: 'lazy' } },
          { type: 'figcaption', content: [{ type: 'text', text: 'Cost movement by quarter' }] },
        ],
      }],
    })
    const figure = document.child(0)
    const imageNode = figure.child(0)
    assert(imageNode.attrs.alt === 'Cost chart', 'Image alt was not retained')
    assert(imageNode.attrs.width === 800, 'Image width was not retained')
    assert(figure.child(1).textContent === 'Cost movement by quarter', 'Caption was not retained')
  })

  } finally {
    await prisma.adminUser.delete({ where: { id: testAdminId } })
    await prisma.$disconnect()
  }

  if (failures > 0) process.exitCode = 1
  else console.log('Phase 4 Blog CMS backend checks passed')
}

void main()