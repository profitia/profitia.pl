/**
 * Seed script - creates the first admin user.
 * Run once after db:push:  npx ts-node db/seed.ts
 *
 * Reads credentials from environment variables:
 *   SEED_ADMIN_EMAIL
 *   SEED_ADMIN_PASSWORD
 *   SEED_ADMIN_NAME
 */
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const email = process.env.SEED_ADMIN_EMAIL ?? 'admin@profitia.pl'
  const password = process.env.SEED_ADMIN_PASSWORD
  const name = process.env.SEED_ADMIN_NAME ?? 'Administrator'

  if (!password) {
    throw new Error('Set SEED_ADMIN_PASSWORD environment variable before running seed.')
  }

  const passwordHash = await bcrypt.hash(password, 12)

  const user = await prisma.adminUser.upsert({
    where: { email },
    update: { passwordHash, name },
    create: { email, name, passwordHash },
  })

  console.log(`Admin user ready: ${user.email} (id: ${user.id})`)
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
