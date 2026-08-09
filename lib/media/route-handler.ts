import { NextRequest, NextResponse } from 'next/server'
import { isSameOriginRequest, verifyActiveAdminToken } from '@/lib/auth'
import { MAX_MEDIA_BYTES, MediaValidationError } from './image'
import { uploadMedia, type CreateMediaRecord } from './media-service'
import { createR2MediaStorage, MediaConfigurationError, type MediaStorage } from './storage'

type MediaRouteDependencies = {
  storage?: MediaStorage
  createRecord?: CreateMediaRecord
}

export function createMediaPostHandler(dependencies: MediaRouteDependencies = {}) {
  return async function POST(request: NextRequest) {
    const admin = await verifyActiveAdminToken(request)
    if (!admin) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 })
    }
    if (!isSameOriginRequest(request)) {
      return NextResponse.json({ success: false, message: 'Invalid request origin' }, { status: 403 })
    }

    const contentLength = Number(request.headers.get('content-length'))
    if (Number.isFinite(contentLength) && contentLength > MAX_MEDIA_BYTES + 128 * 1024) {
      return NextResponse.json({ success: false, message: 'Image must not exceed 8 MB' }, { status: 413 })
    }

    try {
      const formData = await request.formData()
      const file = formData.get('file')
      if (!file || typeof file === 'string') {
        return NextResponse.json({ success: false, message: 'Image file is required' }, { status: 422 })
      }
      if (file.size > MAX_MEDIA_BYTES) {
        return NextResponse.json({ success: false, message: 'Image must not exceed 8 MB' }, { status: 413 })
      }

      const media = await uploadMedia({
        bytes: Buffer.from(await file.arrayBuffer()),
        uploadedById: admin.sub,
        storage: dependencies.storage ?? createR2MediaStorage(),
        createRecord: dependencies.createRecord,
      })
      return NextResponse.json({ success: true, media }, { status: 201 })
    } catch (error) {
      if (error instanceof MediaValidationError) {
        return NextResponse.json({ success: false, message: error.message }, { status: 422 })
      }
      if (error instanceof MediaConfigurationError) {
        return NextResponse.json({ success: false, message: error.message }, { status: 503 })
      }
      console.error('[API /media]', error)
      return NextResponse.json({ success: false, message: 'Media upload failed' }, { status: 500 })
    }
  }
}