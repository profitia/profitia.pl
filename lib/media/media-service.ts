import { randomUUID } from 'node:crypto'
import type { Media } from '@prisma/client'
import { prisma } from '@/lib/prisma'
import { processImageUpload } from './image'
import type { MediaStorage } from './storage'

export type CreateMediaRecord = (data: {
  storageKey: string
  publicUrl: string
  mimeType: string
  width: number
  height: number
  byteSize: number
  uploadedById: string
}) => Promise<Media>

export function defaultCreateMediaRecord(data: Parameters<CreateMediaRecord>[0]) {
  return prisma.media.create({ data })
}

export async function uploadMedia(input: {
  bytes: Buffer
  uploadedById: string
  storage: MediaStorage
  createRecord?: CreateMediaRecord
}): Promise<Media> {
  const image = await processImageUpload(input.bytes)
  const now = new Date()
  const key = `blog/${now.getUTCFullYear()}/${String(now.getUTCMonth() + 1).padStart(2, '0')}/${randomUUID()}.${image.extension}`
  const stored = await input.storage.put({
    key,
    body: image.body,
    contentType: image.mimeType,
  })

  try {
    return await (input.createRecord ?? defaultCreateMediaRecord)({
      storageKey: stored.key,
      publicUrl: stored.publicUrl,
      mimeType: image.mimeType,
      width: image.width,
      height: image.height,
      byteSize: image.byteSize,
      uploadedById: input.uploadedById,
    })
  } catch (error) {
    try {
      await input.storage.delete(stored.key)
    } catch (cleanupError) {
      console.error('[media] Failed to compensate object upload', cleanupError)
    }
    throw error
  }
}