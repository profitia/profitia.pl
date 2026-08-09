import bcrypt from 'bcryptjs'

export const DUMMY_BCRYPT_HASH = '$2a$12$9fMr4Bi/jza1l0MOnrfydeY2NCUnEdS2BLvjoviLMxNimR52iy2Gm'

interface CredentialUser {
  active: boolean
  passwordHash: string
}

type ComparePassword = (password: string, hash: string) => Promise<boolean>

export type CredentialVerificationResult =
  | { authenticated: true }
  | { authenticated: false; outcome: 'INVALID_CREDENTIALS' | 'INACTIVE_ACCOUNT' }

export async function verifyAdminCredentials(
  user: CredentialUser | null,
  password: string,
  comparePassword: ComparePassword = bcrypt.compare,
): Promise<CredentialVerificationResult> {
  const validPassword = await comparePassword(password, user?.passwordHash ?? DUMMY_BCRYPT_HASH)

  if (!user || !validPassword) {
    return { authenticated: false, outcome: 'INVALID_CREDENTIALS' }
  }

  if (!user.active) {
    return { authenticated: false, outcome: 'INACTIVE_ACCOUNT' }
  }

  return { authenticated: true }
}