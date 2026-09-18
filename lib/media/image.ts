import sharp from 'sharp'

export const MAX_MEDIA_BYTES = 8 * 1024 * 1024
export const MAX_MEDIA_DIMENSION = 1920
const MAX_MEDIA_PIXELS = 40_000_000

export type ProcessedImage = {
  body: Buffer
  mimeType: 'image/webp'
  extension: 'webp'
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

    if (!['jpeg', 'png', 'webp'].includes(metadata.format ?? '')) {
      throw new MediaValidationError('Use a JPEG, PNG or WebP image')
    }

    const body = await image
      .rotate()
      .resize({
        width: MAX_MEDIA_DIMENSION,
        height: MAX_MEDIA_DIMENSION,
        fit: 'inside',
        withoutEnlargement: true,
      })
      .webp({ quality: 82, effort: 4, smartSubsample: true })
      .toBuffer()

    if (body.length > MAX_MEDIA_BYTES) {
      throw new MediaValidationError('Processed image must not exceed 8 MB')
    }
    const normalized = await sharp(body).metadata()
    if (!normalized.width || !normalized.height) {
      throw new MediaValidationError('Could not read processed image dimensions')
    }

    return {
      body,
      mimeType: 'image/webp',
      extension: 'webp',
      width: normalized.width,
      height: normalized.height,
      byteSize: body.length,
    }
  } catch (error) {
    if (error instanceof MediaValidationError) throw error
    throw new MediaValidationError('The uploaded file is not a valid image')
  }
}
