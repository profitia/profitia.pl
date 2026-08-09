export type UploadedMedia = {
  id: string
  publicUrl: string
  mimeType: string
  width: number
  height: number
  byteSize: number
}

export async function uploadMediaFile(file: File): Promise<UploadedMedia> {
  const formData = new FormData()
  formData.append('file', file)
  const response = await fetch('/api/media', { method: 'POST', body: formData })
  const result = await response.json() as { media?: UploadedMedia; message?: string }
  if (!response.ok || !result.media) {
    throw new Error(result.message ?? 'Could not upload the image')
  }
  return result.media
}