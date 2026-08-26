import { createHash, randomUUID } from 'node:crypto'
import path from 'node:path'

import { CV_ALLOWED_TYPES, CV_MAX_BYTES } from '@/lib/careers/application'

const PDF_SIGNATURE = Buffer.from('%PDF-')
const DOC_SIGNATURE = Buffer.from([0xd0, 0xcf, 0x11, 0xe0, 0xa1, 0xb1, 0x1a, 0xe1])
const ZIP_LOCAL_SIGNATURE = 0x04034b50
const ZIP_CENTRAL_SIGNATURE = 0x02014b50
const ZIP_EOCD_SIGNATURE = 0x06054b50
const MAX_ORIGINAL_FILENAME_LENGTH = 255
const MAX_DOCX_ENTRIES = 4096

type SupportedCvExtension = '.pdf' | '.doc' | '.docx'

interface UploadedCvFile {
  name: string
  type: string
  arrayBuffer(): Promise<ArrayBuffer>
}

export interface ValidatedCvUpload {
  bytes: Buffer
  originalFilename: string
  extension: SupportedCvExtension
  canonicalMimeType: (typeof CV_ALLOWED_TYPES)[number]
  sizeBytes: number
  sha256: string
}

export class RecruitmentUploadError extends Error {
  status: number
  errorCode: string
  fields?: Record<string, string>

  constructor(status: number, errorCode: string, message: string, fields?: Record<string, string>) {
    super(message)
    this.name = 'RecruitmentUploadError'
    this.status = status
    this.errorCode = errorCode
    this.fields = fields
  }
}

const MIME_BY_EXTENSION: Record<SupportedCvExtension, (typeof CV_ALLOWED_TYPES)[number]> = {
  '.pdf': 'application/pdf',
  '.doc': 'application/msword',
  '.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
}

function invalidFile(message: string, errorCode = 'INVALID_FILE', status = 422) {
  return new RecruitmentUploadError(status, errorCode, message, { cv: message })
}

function normalizeFilename(name: string, extension: SupportedCvExtension): string {
  const basename = path.basename(name.replace(/\\/g, '/'))
  const stripped = basename.replace(/[\x00-\x1f\x7f]/g, '').trim()
  const withoutExtension = stripped.toLowerCase().endsWith(extension)
    ? stripped.slice(0, -extension.length)
    : stripped.replace(/\.[^.]*$/, '')
  const safeStem = withoutExtension.replace(/\s+/g, ' ').replace(/[. ]+$/g, '').trim() || 'cv'
  const truncatedStem = safeStem.slice(0, Math.max(1, MAX_ORIGINAL_FILENAME_LENGTH - extension.length))
  return `${truncatedStem}${extension}`
}

function getNormalizedExtension(filename: string): SupportedCvExtension | null {
  const extension = path.extname(filename).toLowerCase()
  if (extension === '.pdf' || extension === '.doc' || extension === '.docx') {
    return extension
  }

  return null
}

function hasPdfSignature(bytes: Buffer): boolean {
  return bytes.length >= PDF_SIGNATURE.length && bytes.subarray(0, PDF_SIGNATURE.length).equals(PDF_SIGNATURE)
}

function hasDocSignature(bytes: Buffer): boolean {
  return bytes.length >= DOC_SIGNATURE.length && bytes.subarray(0, DOC_SIGNATURE.length).equals(DOC_SIGNATURE)
}

function findEndOfCentralDirectory(bytes: Buffer): number {
  const minOffset = Math.max(0, bytes.length - 65_557)

  for (let offset = bytes.length - 22; offset >= minOffset; offset -= 1) {
    if (bytes.readUInt32LE(offset) === ZIP_EOCD_SIGNATURE) {
      return offset
    }
  }

  return -1
}

function getDocxEntryNames(bytes: Buffer): string[] {
  const eocdOffset = findEndOfCentralDirectory(bytes)
  if (eocdOffset < 0 || eocdOffset + 22 > bytes.length) {
    return []
  }

  const totalEntries = bytes.readUInt16LE(eocdOffset + 10)
  const centralDirectoryOffset = bytes.readUInt32LE(eocdOffset + 16)
  if (totalEntries < 1 || totalEntries > MAX_DOCX_ENTRIES || centralDirectoryOffset >= bytes.length) {
    return []
  }

  const names: string[] = []
  let offset = centralDirectoryOffset

  for (let index = 0; index < totalEntries; index += 1) {
    if (offset + 46 > bytes.length) {
      return []
    }

    if (bytes.readUInt32LE(offset) !== ZIP_CENTRAL_SIGNATURE) {
      return []
    }

    const filenameLength = bytes.readUInt16LE(offset + 28)
    const extraLength = bytes.readUInt16LE(offset + 30)
    const commentLength = bytes.readUInt16LE(offset + 32)
    const filenameStart = offset + 46
    const filenameEnd = filenameStart + filenameLength

    if (filenameEnd > bytes.length) {
      return []
    }

    names.push(bytes.toString('utf8', filenameStart, filenameEnd).replace(/\\/g, '/'))
    offset = filenameEnd + extraLength + commentLength
  }

  return names
}

function hasDocxStructure(bytes: Buffer): boolean {
  if (bytes.length < 4 || bytes.readUInt32LE(0) !== ZIP_LOCAL_SIGNATURE) {
    return false
  }

  const entryNames = getDocxEntryNames(bytes)
  return entryNames.includes('[Content_Types].xml') && entryNames.some((name) => name === 'word/' || name.startsWith('word/'))
}

function computeSha256(bytes: Buffer): string {
  return createHash('sha256').update(bytes).digest('hex')
}

function assertFileConsistency(extension: SupportedCvExtension, declaredMimeType: string, bytes: Buffer) {
  const canonicalMimeType = MIME_BY_EXTENSION[extension]
  if (declaredMimeType !== canonicalMimeType) {
    throw invalidFile('CV file type does not match the selected format.', 'UNSUPPORTED_FILE_TYPE')
  }

  if (extension === '.pdf' && !hasPdfSignature(bytes)) {
    throw invalidFile('The uploaded PDF file is invalid.')
  }

  if (extension === '.doc' && !hasDocSignature(bytes)) {
    throw invalidFile('The uploaded DOC file is invalid.')
  }

  if (extension === '.docx' && !hasDocxStructure(bytes)) {
    throw invalidFile('The uploaded DOCX file is invalid.')
  }

  return canonicalMimeType
}

export async function validateUploadedCv(file: UploadedCvFile | null | undefined): Promise<ValidatedCvUpload> {
  if (!file || typeof file.name !== 'string' || typeof file.type !== 'string' || typeof file.arrayBuffer !== 'function') {
    throw invalidFile('Please attach your CV (PDF, DOC or DOCX).')
  }

  const extension = getNormalizedExtension(file.name)
  if (!extension) {
    throw invalidFile('Only PDF, DOC and DOCX files are accepted.', 'UNSUPPORTED_FILE_TYPE')
  }

  const bytes = Buffer.from(await file.arrayBuffer())
  const sizeBytes = bytes.byteLength
  if (sizeBytes < 1) {
    throw invalidFile('The uploaded file is empty.')
  }

  if (sizeBytes > CV_MAX_BYTES) {
    throw invalidFile('File exceeds 10 MB limit.', 'PAYLOAD_TOO_LARGE', 413)
  }

  const declaredMimeType = file.type.trim().toLowerCase()
  const canonicalMimeType = assertFileConsistency(extension, declaredMimeType, bytes)

  return {
    bytes,
    originalFilename: normalizeFilename(file.name, extension),
    extension,
    canonicalMimeType,
    sizeBytes,
    sha256: computeSha256(bytes),
  }
}

export function buildCvStorageKey(now: Date, extension: SupportedCvExtension, id = randomUUID()): string {
  const year = String(now.getUTCFullYear())
  const month = String(now.getUTCMonth() + 1).padStart(2, '0')
  const safeId = id.replace(/[^a-zA-Z0-9]/g, '') || randomUUID().replace(/[^a-zA-Z0-9]/g, '')
  return `${year}/${month}/${safeId.toLowerCase()}${extension}`
}