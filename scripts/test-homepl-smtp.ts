import {
  sendHomeplSmtpEmail,
  validateHomeplSmtpConfig,
  verifyHomeplSmtp,
} from '@/lib/email/homepl-smtp'

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

  const verifyOnly = process.argv.includes('--verify')
  const to = getArg('--to')
  const cc = getArg('--cc')
  const bcc = getArg('--bcc')
  const replyTo = getArg('--reply-to')
  const subject = getArg('--subject') ?? '[ETAP 8C] Profitia SMTP test'
  const html = getArg('--html') ?? '<p>Technical SMTP transport test.</p>'

  const configCheck = validateHomeplSmtpConfig(process.env)
  if (!configCheck.ok) {
    console.error(JSON.stringify(configCheck.error, null, 2))
    process.exit(1)
  }

  if (verifyOnly) {
    const result = await verifyHomeplSmtp(process.env)
    console.log(JSON.stringify(result, null, 2))
    process.exit(result.success ? 0 : 1)
  }

  if (!to) {
    console.error(JSON.stringify({
      success: false,
      kind: 'SMTP_CONFIG_ERROR',
      code: 'MISSING_TO',
      message: 'Provide --to for a real SMTP send test.',
    }, null, 2))
    process.exit(1)
  }

  const result = await sendHomeplSmtpEmail(
    {
      to,
      ...(cc ? { cc } : {}),
      ...(bcc ? { bcc } : {}),
      ...(replyTo ? { replyTo } : {}),
      subject,
      html,
    },
    process.env
  )

  console.log(JSON.stringify(result, null, 2))
  process.exit(result.success ? 0 : 1)
}

main().catch((error) => {
  console.error(JSON.stringify({
    success: false,
    kind: 'SMTP_SEND_ERROR',
    code: 'TEST_SCRIPT_FAILURE',
    message: error instanceof Error ? error.message : 'Unknown script failure.',
  }, null, 2))
  process.exit(1)
})