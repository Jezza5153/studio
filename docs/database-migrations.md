# Database schema changes

There is one Neon Postgres database. In Vercel, `DATABASE_URL` and
`DATABASE_URL_UNPOOLED` are the same value for **Production, Preview and
Development**, so preview deployments and anything you run locally after
`vercel env pull` talk to the live database (all `FeedItem` posts, the
`Settings` row with the Google score, etc.).

Until October 2026 every build ran `prisma db push --accept-data-loss`, so any
schema edit on any branch, even a preview, was pushed straight to production and
could silently drop columns or tables. That is gone. Schema changes are now
migration files that you review in the PR.

## How the build handles the database

`npm run build` runs `scripts/prisma-migrate-production.mjs`:

| Build | What happens to the database |
| --- | --- |
| Production (push to `main`) | `prisma migrate deploy` runs the committed migrations that haven't run yet, then checks that the database matches `prisma/schema.prisma`. If either step fails, the build stops and the current site stays live. |
| Preview (any other branch) | Nothing. |
| Local `npm run build` | Nothing. |

`prisma migrate deploy` never invents SQL. It only runs the
`prisma/migrations/*/migration.sql` files in the repo, and records each one in
the `_prisma_migrations` table.

## Changing the schema

1. Edit `prisma/schema.prisma`.
2. Generate the migration:
   ```bash
   npm run db:migration -- add_reservation_note
   ```
   This writes `prisma/migrations/<timestamp>_add_reservation_note/migration.sql`
   by comparing your `schema.prisma` with the one on `origin/main`. It needs no
   database. Use one migration per branch: if you change the schema again, delete
   the branch's migration folder and run the command again.
3. Read the SQL. Commit it together with the schema change.
4. Open the PR. The preview does **not** get the migration, so preview pages that
   use a new column will error until it's merged. That's expected.
5. Merge. The production build applies the migration. In the Vercel build log you
   should see `Applying migration ...` and `[db] Database matches prisma/schema.prisma.`

If you change `schema.prisma` and forget step 2, the production build fails with
`The production database does not match prisma/schema.prisma` and lists the
difference. Nothing is deployed and nothing in the database changes.

### Safe and unsafe changes

- **Safe:** a new table, a new optional column, a new column with a `@default`,
  a new index. The old code keeps working while the new build rolls out.
- **Data loss:** dropping a column or table, renaming (Prisma writes this as drop +
  add), changing a column type, making a column required. `db:migration` prints a
  warning when the SQL contains `DROP` or `SET DATA TYPE`. For these:
  - Take a backup first (below).
  - Do it in two PRs: first ship code that no longer uses the column, then drop it.
  - For a rename, edit the SQL to `ALTER TABLE "X" RENAME COLUMN "old" TO "new";`
    so the data is kept.
- Never edit a migration that is already on `main`. Add a new one.

### Commands you must not run against this database

`vercel env pull` and `vercel env run` give you the production URL, also for
Development. With that URL, do **not** run:

- `prisma db push`: changes the schema without a migration, so the next
  production build fails its check or its migration.
- `prisma migrate dev` or `prisma migrate reset`: they can reset the whole
  database, and they run `prisma/seed.ts`, which deletes every `FeedItem` and the
  `Settings` row.
- `npm run db:seed`: same seed, same result.

These are fine: `npm run db:status` (read only), `npm run db:migration`
(no database), `npm run db:studio` (careful, it can edit rows).

## Backups

`pg_dump` must be at least the server's major version (Postgres 17). The Homebrew
`postgresql@14` one refuses, so use `libpq`:

```bash
brew install libpq
```

Then, from the repo (linked with `vercel link`), run it with the production URL
without writing it to a file:

```bash
vercel env run -e production -- sh -c '/opt/homebrew/opt/libpq/bin/pg_dump "$DATABASE_URL_UNPOOLED" --no-owner --no-privileges -Fc -f tafelaar-$(date +%Y%m%d-%H%M).dump'
```

Restore into an empty database with
`/opt/homebrew/opt/libpq/bin/pg_restore --no-owner --no-privileges -d <url> <file>`.
Neon can also restore the branch to an earlier point in time from the Neon
console, within the history window of the plan.

## One-time switch-over (October 2026)

The database already had its tables, so `prisma/migrations/0_init` is a
**baseline**: it describes the current production schema and must be marked as
already applied, not run. On 11 Oct 2026 the live schema was checked against
`schema.prisma` and `0_init` (no differences).

1. Take a backup (see above).
2. Mark the baseline as applied. This only creates the `_prisma_migrations`
   table and adds one row; it doesn't touch `FeedItem` or `Settings`.
   ```bash
   vercel env run -e production -- npx prisma migrate resolve --applied 0_init
   ```
   Then check:
   ```bash
   vercel env run -e production -- npx prisma migrate status
   ```
   It should say `Database schema is up to date!` (The `1 Secret value cannot be
   pulled` notice is about `RATING_SYNC_SECRET` and doesn't matter here.)
3. Merge the PR. The production build log should show
   `No pending migrations to apply.` and `[db] Database matches prisma/schema.prisma.`

If the PR gets merged before step 2, the production build stops with error
`P3005 The database schema is not empty`. The live site is not affected. Do
step 2 and redeploy.

Other branches created before this change still have the old build script. If you
push to one of them, its preview build runs `db push --accept-data-loss` against
the live database again. Merge `main` into the branch before pushing, or delete it.
