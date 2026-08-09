import { DeleteObjectCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3'

export type StoredMedia = { key: string; publicUrl: string }

export interface MediaStorage {
  put(input: { key: string; body: Buffer; contentType: string }): Promise<StoredMedia>
  delete(key: string): Promise<void>
}

type R2Config = {
  accountId: string
  accessKeyId: string
  secretAccessKey: string
  bucketName: string
  publicBaseUrl: string
}

export class MediaConfigurationError extends Error {}

function getR2Config(): R2Config {
  const values = {
    accountId: process.env.R2_ACCOUNT_ID,
    accessKeyId: process.env.R2_ACCESS_KEY_ID,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
    bucketName: process.env.R2_BUCKET_NAME,
    publicBaseUrl: process.env.R2_PUBLIC_BASE_URL,
  }
  const missing = Object.entries(values).filter(([, value]) => !value).map(([key]) => key)
  if (missing.length > 0) throw new MediaConfigurationError('Media storage is not configured')

  let publicBaseUrl: string
  try {
    const url = new URL(values.publicBaseUrl!)
    if (url.protocol !== 'https:') throw new Error('HTTPS required')
    publicBaseUrl = url.toString().replace(/\/$/, '')
  } catch {
    throw new MediaConfigurationError('R2_PUBLIC_BASE_URL must be a valid HTTPS URL')
  }

  return {
    accountId: values.accountId!,
    accessKeyId: values.accessKeyId!,
    secretAccessKey: values.secretAccessKey!,
    bucketName: values.bucketName!,
    publicBaseUrl,
  }
}

export function createR2MediaStorage(): MediaStorage {
  const config = getR2Config()
  const client = new S3Client({
    region: 'auto',
    endpoint: `https://${config.accountId}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId: config.accessKeyId,
      secretAccessKey: config.secretAccessKey,
    },
  })

  return {
    async put({ key, body, contentType }) {
      await client.send(new PutObjectCommand({
        Bucket: config.bucketName,
        Key: key,
        Body: body,
        ContentType: contentType,
        CacheControl: 'public, max-age=31536000, immutable',
      }))
      return { key, publicUrl: `${config.publicBaseUrl}/${key}` }
    },
    async delete(key) {
      await client.send(new DeleteObjectCommand({ Bucket: config.bucketName, Key: key }))
    },
  }
}