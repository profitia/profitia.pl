import sharp from 'sharp'

export const MAX_MEDIA_BYTES = 8 * 1024 * 1024
const MAX_MEDIA_PIXELS = 40_000_000

export type ProcessedImage = {
  body: Buffer
  mimeType: 'image/jpeg' | 'image/png' | 'image/webp'
  extension: 'jpg' | 'png' | 'webp'
  width: number
  height: number
  byteSize: number
}

export class MediaValidationError extends Error {}

export async function processImageUpload(input: Buffer): Promise<ProcessedImage> {
  if (input.length === 0) throw new MediaValidationError('Choose an image to upload')
  if (input.length > MAX_MEDIA_BYTES) throw new MediaValidationError('Image must not exceed 8 MB')

  try {
    const image = sharp(input, {
      animated: false,
      failOn: 'error',
      limitInputPixels: MAX_MEDIA_PIXELS,
    })
    const metadata = await image.metadata()
    if (!metadata.width || !metadata.height) {
      throw new MediaValidationError('Could not read image dimensions')
    }
    if ((metadata.pages ?? 1) > 1) {
      throw new MediaValidationError('Animated images are not supported')
    }

    let body: Buffer
    let mimeType: ProcessedImage['mimeType']
    let extension: ProcessedImage['extension']
    if (metadata.format === 'jpeg') {
      body = await image.rotate().jpeg({ quality: 88, mozjpeg: true }).toBuffer()
      mimeType = 'image/jpeg'
      extension = 'jpg'
    } else if (metadata.format === 'png') {
      body = await image.rotate().png({ compressionLevel: 9 }).toBuffer()
      mimeType = 'image/png'
      extension = 'png'
    } else if (metadata.format === 'webp') {
      body = await image.rotate().webp({ quality: 88 }).toBuffer()
      mimeType = 'image/webp'
      extension = 'webp'
    } else {
      throw new MediaValidationError('Use a JPEG, PNG or WebP image')
    }

    if (body.length > MAX_MEDIA_BYTES) {
      throw new MediaValidationError('Processed image must not exceed 8 MB')
    }
    const normalized = await sharp(body).metadata()
    if (!normalized.width || !normalized.height) {
      throw new MediaValidationError('Could not read processed image dimensions')
    }

    return {
      body,
      mimeType,
      extension,
      width: normalized.width,
      height: normalized.height,
      byteSize: body.length,
    }
  } catch (error) {
    if (error instanceof MediaValidationError) throw error
    throw new MediaValidationError('The uploaded file is not a valid image')
  }
}