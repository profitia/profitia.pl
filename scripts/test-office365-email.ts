import {
  acquireOffice365AccessToken,
  buildOffice365GraphPayload,
  sendOffice365Email,
  validateOffice365Config,
} from '@/lib/email/office365'

function loadEnvFile(path: string) {
  const fs = require('node:fs') as typeof import('node:fs')
  if (!fs.existsSync(path)) {
    return
  }

  for (const line of fs.readFileSync(path, 'utf8').split(/\r?\n/)) {
    if (!line || line.trim().startsWith('#')) {
      continue
    }

    const idx = line.indexOf('=')
    if (idx === -1) {
      continue
    }

    const key = line.slice(0, idx).trim()
    let value = line.slice(idx + 1).trim()
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1)
    }

    if (!(key in process.env)) {
      process.env[key] = value
    }
  }
}

function getArg(name: string): string | undefined {
  const idx = process.argv.indexOf(name)
  if (idx === -1) {
    return undefined
  }

  return process.argv[idx + 1]
}

async function main() {
  loadEnvFile('.env')
  loadEnvFile('.env.local')

  const to = getArg('--to') ?? 'tomasz.uscinski@profitia.pl'
  const replyTo = getArg('--reply-to')
  const subject = getArg('--subject') ?? '[TEST] Profitia Office 365 Adapter - ETAP 3'
  const html = getArg('--html') ?? '<p>Technical Office 365 adapter test for Profitia ETAP 3.</p>'
  const dryRun = process.argv.includes('--dry-run')
  const tokenOnly = process.argv.includes('--token-only')

  const configCheck = validateOffice365Config(process.env)
  if (!configCheck.ok) {
    console.error(JSON.stringify(configCheck.error, null, 2))
    process.exit(1)
  }

  if (dryRun) {
    console.log(
      JSON.stringify(
        {
          mode: 'dry-run',
          payload: buildOffice365GraphPayload({ to, subject, html, replyTo }, configCheck.config.mailFrom),
        },
        null,
        2
      )
    )
    process.exit(0)
  }

  if (tokenOnly) {
    const result = await acquireOffice365AccessToken(process.env)
    const output = result.success
      ? {
          success: true,
          authType: result.authType,
          scopes: result.scopes,
          expiresOn: result.expiresOn,
        }
      : result
    console.log(JSON.stringify(output, null, 2))
    process.exit(result.success ? 0 : 1)
  }

  const result = await sendOffice365Email({ to, subject, html, replyTo }, process.env)
  console.log(JSON.stringify(result, null, 2))
  process.exit(result.success ? 0 : 1)
}

main().catch((error) => {
  console.error(
    JSON.stringify(
      {
        success: false,
        kind: 'NETWORK_ERROR',
        code: 'TEST_SCRIPT_FAILURE',
        message: error instanceof Error ? error.message : 'Unknown script failure.',
      },
      null,
      2
    )
  )
  process.exit(1)
})