import { chmod, mkdir, open, readFile, rename, rm } from 'node:fs/promises'
import { randomUUID } from 'node:crypto'
import path from 'node:path'

export class RecruitmentStorageUnavailableError extends Error {
  constructor(message = 'Recruitment CV storage is not configured.') {
    super(message)
    this.name = 'RecruitmentStorageUnavailableError'
  }
}

function assertInsideRoot(root: string, candidatePath: string): string {
  const resolvedRoot = path.resolve(root)
  const resolvedCandidate = path.resolve(resolvedRoot, candidatePath)
  const relative = path.relative(resolvedRoot, resolvedCandidate)

  if (path.isAbsolute(relative) || relative.startsWith('..') || relative.includes(`..${path.sep}`)) {
    throw new RecruitmentStorageUnavailableError('Recruitment CV storage path is invalid.')
  }

  return resolvedCandidate
}

export function resolveRecruitmentStoragePath(
  storageKey: string,
  env: NodeJS.ProcessEnv = process.env
): string {
  const storageRoot = resolveRecruitmentStorageRoot(env)
  return assertInsideRoot(storageRoot, storageKey)
}

export function resolveRecruitmentStorageRoot(env: NodeJS.ProcessEnv = process.env): string {
  const configured = env.RECRUITMENT_CV_STORAGE_PATH?.trim()
  if (!configured) {
    throw new RecruitmentStorageUnavailableError()
  }

  return path.resolve(configured)
}

export async function storeRecruitmentCvFile(
  storageKey: string,
  bytes: Buffer,
  env: NodeJS.ProcessEnv = process.env
): Promise<void> {
  const storageRoot = resolveRecruitmentStorageRoot(env)
  const targetPath = resolveRecruitmentStoragePath(storageKey, env)
  const targetDirectory = path.dirname(targetPath)
  const temporaryPath = assertInsideRoot(storageRoot, `${storageKey}.${randomUUID()}.tmp`)

  await mkdir(targetDirectory, { recursive: true, mode: 0o700 })

  let handle: Awaited<ReturnType<typeof open>> | null = null
  try {
    handle = await open(temporaryPath, 'wx', 0o600)
    await handle.writeFile(bytes)
    await handle.sync()
    await handle.close()
    handle = null
    await chmod(temporaryPath, 0o600)
    await rename(temporaryPath, targetPath)
    await chmod(targetPath, 0o600)
  } catch (error) {
    if (handle) {
      await handle.close().catch(() => undefined)
    }
    await rm(temporaryPath, { force: true }).catch(() => undefined)
    throw error
  }
}

export async function deleteRecruitmentCvFile(
  storageKey: string,
  env: NodeJS.ProcessEnv = process.env
): Promise<void> {
  const targetPath = resolveRecruitmentStoragePath(storageKey, env)
  await rm(targetPath, { force: true })
}

export async function readRecruitmentCvFile(
  storageKey: string,
  env: NodeJS.ProcessEnv = process.env
): Promise<Buffer> {
  const targetPath = resolveRecruitmentStoragePath(storageKey, env)
  return readFile(targetPath)
}