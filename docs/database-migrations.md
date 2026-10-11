# Database schema changes

There is one Neon Postgres database (Vercel → Storage → `neon-fuchsia-curtain`)
with all the live data: every `FeedItem` post and the `Settings` row with the
Google score. Since 11 Oct 2026 it has two logins:

| Login | Where | Can |
| --- | --- | --- |
| `neondb_owner` | **Production only** (the Neon integration's `DATABASE_URL`, `POSTGRES_*`, `PG*` variables) | everything, including migrations |
| `tafelaar_readonly` | **Preview and Development** (project variables `DATABASE_URL` and `DATABASE_URL_UNPOOLED`) | read only: `SELECT`, nothing else |

So preview deployments and local `npm run dev` (after `vercel env pull`) show
the live data but cannot change it. Admin saves on a preview URL or locally fail
with `permission denied` or `read-only transaction`. That is on purpose. To test
writes, make a branch of the database in the Neon console (Branches → New
branch) and put that branch's connection string in your local `.env`.

Until October 2026 every build ran `prisma db push --accept-data-loss` with the
owner login, on every branch, so any schema edit, even on a preview, went straight
to the live database and could silently drop columns or tables.

## Protection layers

1. **Builds never push the schema.** Only a production build changes it, and
   only by running reviewed migration files (`prisma migrate deploy`).
2. **Data-loss guard.** Every build (preview too) fails if a migration drops,
   empties, deletes, rewrites or retypes something without an explicit
   `-- data-loss-approved:` line.
3. **Drift check.** After migrating, the production build fails if the database
   doesn't match `schema.prisma` (for example a schema change without a migration).
4. **Read-only login** for Preview and Development: whatever code or command runs
   there, it can't change the schema or the data.
5. **Seed guard** (PR #19): `prisma/seed.ts` refuses to run against Neon.

A failed build never takes the site down: the current deployment stays live.

## How the build handles the database

`npm run build` runs `scripts/prisma-migrate-production.mjs`:

| Build | What happens |
| --- | --- |
| Production (push to `main`) | data-loss guard, then `prisma migrate deploy` (runs committed migrations that haven't run yet), then the drift check. |
| Preview (any other branch) | data-loss guard only. Doesn't touch the database schema. |
| Local `npm run build` | data-loss guard only. |

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
  add), changing a column type, `DELETE`, `UPDATE`, `TRUNCATE`. The data-loss guard
  blocks these in every build until you approve them. To approve:
  1. Do it in two PRs if code still uses the column: first ship code that no longer
     uses it, then drop it.
  2. Take a backup (below).
  3. Add a line to the top of the `migration.sql` that says what is lost and why
     that's OK, for example:
     ```sql
     -- data-loss-approved: Settings.googlePhotos unused since PR #12; backup 2026-11-02
     ```
     Placeholders (`TODO`, `<...>`) and very short reasons are rejected.
- For a rename, edit the SQL to `ALTER TABLE "X" RENAME COLUMN "old" TO "new";`
  so the data is kept (no approval needed).
- **New required column:** give it a `@default`, otherwise the migration fails on
  the existing rows.
- Never edit a migration that is already on `main`. Add a new one.

### If a migration fails in the production build

Postgres runs each `migration.sql` as one transaction, so a failed migration
leaves no half-done changes (tested). Prisma does mark it as failed, and every
following production build stops with `P3009` until you clear it:

1. Fix the SQL. The failed migration never applied, so you may edit that file.
2. Clear the failure:
   ```bash
   vercel env run -e production -- npx prisma migrate resolve --rolled-back <migration_folder_name>
   ```
3. Push the fix (or redeploy). The build applies the fixed migration.

## Working with the production login

Only use the owner login for the commands below, and only through
`vercel env run -e production -- ...` (the URL is never written to a file).
The repo must be linked once with `vercel link`. The notice `1 Secret value
cannot be pulled` is about `RATING_SYNC_SECRET` and doesn't matter.

- Backup (below).
- `vercel env run -e production -- npx prisma migrate status` (read only).
- `vercel env run -e production -- npm run db:deploy`: applies pending migrations
  by hand (data-loss guard included). Normally the production build does this.
- `prisma migrate resolve` when a migration failed (above).

Never run these with the production login: `prisma db push`, `prisma migrate dev`,
`prisma migrate reset` (resets the whole database), `npm run db:seed`.
With the read-only login they simply fail.

Since [PR #19](https://github.com/Jezza5153/studio/pull/19), `prisma/seed.ts`
refuses to run, and exits before it connects, when `DATABASE_URL` points at Neon
(a `*.neon.tech` host or the production endpoint `ep-icy-scene-abjt6uye`) or isn't
set. Seed a local Postgres instead. This does **not** make `prisma migrate reset`
safe: Prisma drops the database first and only then runs the seed. Only if you
really mean to wipe the database you're pointing at, add
`ALLOW_SEED_ON_PRODUCTION=yes-delete-everything`.

## Vercel and Neon settings that keep this safe

- **Storage → `neon-fuchsia-curtain` → Projects:** `studio` is connected to
  **Production only**. If it ever gets reconnected, pick Production only again.
  Connecting it to Preview or Development would give previews the owner login.
- **Never remove the store** (`Remove`, or `vercel integration-resource remove`):
  that deletes the database. Disconnecting a project only removes its variables.
- **Read-only login:** `tafelaar_readonly` has `SELECT` on all tables in `public`,
  also on tables created later (default privileges for `neondb_owner`), and
  `default_transaction_read_only = on`. To change its password: generate a new one,
  run `ALTER ROLE tafelaar_readonly PASSWORD '...'` as the owner, then update
  `DATABASE_URL` and `DATABASE_URL_UNPOOLED` (Preview + Development) in Vercel.
  Deployments only pick up new variables when they are rebuilt.

## Backups

`pg_dump` must be at least the server's major version (Postgres 17). The Homebrew
`postgresql@14` one refuses, so use `libpq`:

```bash
brew install libpq
```

Then, from the repo:

```bash
vercel env run -e production -- sh -c '/opt/homebrew/opt/libpq/bin/pg_dump "$DATABASE_URL_UNPOOLED" --no-owner --no-privileges -Fc -f tafelaar-$(date +%Y%m%d-%H%M).dump'
```

Restore into an empty database with
`/opt/homebrew/opt/libpq/bin/pg_restore --no-owner --no-privileges -d <url> <file>`.
Neon can also restore the branch to an earlier point in time from the Neon
console, within the history window of the plan.

## Switch-over log (11 Oct 2026)

1. Backups with `pg_dump` 18, checked by restoring them into a local Postgres.
2. Live schema compared with `schema.prisma` and `0_init`: no differences.
3. `0_init` marked as applied (`migrate resolve --applied 0_init`);
   `migrate status`: up to date. Don't edit `0_init/migration.sql` ever: its
   checksum is recorded.
4. Role `tafelaar_readonly` created and probed: reads work; insert, update,
   delete, truncate, create, alter, `SET ROLE` all refused.
5. Neon store connection changed to Production only; production variables
   verified byte-identical before and after. `DATABASE_URL` and
   `DATABASE_URL_UNPOOLED` for Preview + Development now use `tafelaar_readonly`.
6. Merge PR #17.

Older branches still have the old build script. Pushed again, their preview build
runs `db push --accept-data-loss`, but with the read-only login: it only succeeds
when there's nothing to change and otherwise fails without touching the database.
Preview deployments built before 11 Oct 2026 keep the owner login they were built
with until they're deleted.
