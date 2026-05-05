# db/

This directory holds database seed scripts and migration helpers.

## Seed admin user

Run after `npm run db:push` to create the first admin account:

```bash
npx ts-node db/seed.ts
```
