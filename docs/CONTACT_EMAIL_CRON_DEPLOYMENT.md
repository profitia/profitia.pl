# Contact Email Cron Deployment

Target Render cron configuration:

- Workspace: PROFITIA WORKSPACE
- Workspace ID: tea-d7lps8rbc2fs73cn80dg
- Cron name: profitia-contact-email-dispatch
- Repository: https://github.com/profitia/profitia.pl
- Branch after rollout: main
- Runtime: Node
- Region: frankfurt
- Schedule: `* * * * *`
- Build command: `npm ci --include=dev && npm run db:forms:generate`
- Start command: `npm run contact:email:dispatch`
- Persistent disk: disabled
- Render Key Value: not used
- Auto deploy: enable only after solution acceptance on `main`

Environment variables required on the cron job:

- `DATABASE_FORMS_URL`
- `MAILBOX_LOGIN`
- `MAILBOX_PASSWORD`
- `MAILBOX_SMTP_HOST`
- `MAILBOX_SMTP_PORT`
- `MAILBOX_SMTP_SECURE`
- `MAILBOX_FROM_NAME`
- `CONTACT_NOTIFICATION_EMAIL`
- `CONTACT_NOTIFICATION_BCC`
- `NODE_ENV=production`
- `NODE_VERSION=20`

Deployment order:

1. Confirm a backup, checkpoint, or restore path for the Forms database.
2. Point `DATABASE_FORMS_URL` temporarily to the direct, non-pooled Neon URL for the migration shell only.
3. Run `npm run db:forms:status`.
4. Apply the additive migration with `npm run db:forms:migrate:deploy`.
5. Re-run `npm run db:forms:status` and verify the new table, enum types, unique key, and indexes.
6. Restore the normal pooled `DATABASE_FORMS_URL` for runtime.
7. Merge and deploy the updated web service.
8. Submit one contact form in production and confirm one `contact_submissions` row plus two `contact_email_outbox` rows.
9. Create and enable the Render cron job.
10. Confirm both emails are dispatched and the related submission statuses become `SENT`.
11. Monitor the first cron executions and backlog size.

Rollback order:

1. Disable the cron job first.
2. Roll the web service back to the previous working deployment.
3. Keep the outbox table and records for audit and recovery.
4. Do not run a destructive migration during rollback.

Notes:

- Run `npm run db:forms:migrate:deploy` only against the direct, non-pooled Neon URL.
- Use the pooled `DATABASE_FORMS_URL` for the normal web service and cron runtime.
- The direct URL is for migration only and should not remain configured as the runtime service URL.
- `render.yaml` remains intentionally untouched in this task because it does not match the live Render service configuration.