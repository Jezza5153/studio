// Runs as part of `npm run build`. Applies the committed migrations in
// prisma/migrations, but ONLY on Vercel production builds (main).
//
// Preview and Development share the production DATABASE_URL, so preview and
// local builds must never change the schema. See docs/database-migrations.md.
import { spawnSync } from "node:child_process";

const vercelEnv = process.env.VERCEL_ENV;

if (vercelEnv !== "production") {
  if (process.env.VERCEL && !vercelEnv) {
    console.error(
      "[db] VERCEL is set but VERCEL_ENV is missing, so this build can't tell whether it is production.\n" +
        "[db] Turn on 'Automatically expose System Environment Variables' in the Vercel project settings."
    );
    process.exit(1);
  }
  console.log(`[db] VERCEL_ENV=${vercelEnv ?? "unset"}: skipping migrations (only production builds change the database).`);
  process.exit(0);
}

const prisma = (args, opts = {}) =>
  spawnSync("npx", ["prisma", ...args], { stdio: "inherit", encoding: "utf8", ...opts });

// 1. Apply pending migrations. Never generates SQL itself: it only runs the
//    reviewed migration.sql files that are committed in the repo.
const deploy = prisma(["migrate", "deploy"]);
if (deploy.status !== 0) {
  console.error("[db] prisma migrate deploy failed; the build stops here and the current deployment stays live.");
  process.exit(deploy.status ?? 1);
}

// 2. The database must now match schema.prisma. If it doesn't, schema.prisma
//    was changed without a migration (or the database was changed by hand), and
//    shipping this code would break pages at runtime. Fail the build instead.
const drift = prisma(
  [
    "migrate", "diff",
    "--from-schema-datasource", "prisma/schema.prisma",
    "--to-schema-datamodel", "prisma/schema.prisma",
    "--exit-code",
  ],
  { stdio: ["ignore", "pipe", "inherit"] }
);
if (drift.status === 0) {
  console.log("[db] Database matches prisma/schema.prisma.");
  process.exit(0);
}
if (drift.status === 2) {
  console.error(
    "[db] The production database does not match prisma/schema.prisma after migrating.\n" +
      "[db] Most likely schema.prisma changed without a migration. Run `npm run db:migration -- <name>`,\n" +
      "[db] review the SQL and commit it. Difference (database -> schema.prisma):\n\n" +
      drift.stdout
  );
  process.exit(1);
}
process.exit(drift.status ?? 1);
