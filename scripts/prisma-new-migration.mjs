// Writes prisma/migrations/<timestamp>_<name>/migration.sql for the changes you
// made to prisma/schema.prisma. Needs no database: it diffs schema.prisma as it
// is on origin/main (what production runs) against your working copy.
//
//   npm run db:migration -- add_reservation_note
//
// Don't use `prisma migrate dev` here: the only database we have is production,
// and migrate dev resets the database (and runs the seed) when it sees drift.
import { execFileSync, spawnSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { explain, unapprovedDataLoss } from "./migration-guard.mjs";

const name = process.argv[2];
if (!name || !/^[a-z0-9_]+$/.test(name)) {
  console.error("Usage: npm run db:migration -- <name>   (lowercase letters, digits and _ only)");
  process.exit(1);
}

const base = process.env.DB_MIGRATION_BASE ?? "origin/main";
const git = (...args) => execFileSync("git", args, { encoding: "utf8" }).trim();

if (base === "origin/main") {
  try { git("fetch", "--quiet", "origin", "main"); } catch { console.warn("[db] git fetch failed; using the origin/main you already have."); }
}

// One migration per branch: a second one would repeat the first one's SQL,
// because the diff always starts from the base branch.
const dir = "prisma/migrations";
let onBase = new Set();
try { onBase = new Set(git("ls-tree", "--name-only", `${base}:${dir}`).split("\n").filter(Boolean)); } catch { /* no migrations on base yet */ }
const local = fs.readdirSync(dir, { withFileTypes: true }).filter((d) => d.isDirectory()).map((d) => d.name);
const extra = local.filter((d) => !onBase.has(d));
if (extra.length) {
  console.error(
    `[db] This branch already has a migration that isn't on ${base}: ${extra.join(", ")}\n` +
      `[db] Delete it and run this again to get one migration covering all schema changes on the branch.`
  );
  process.exit(1);
}

const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "prisma-base-"));
const baseSchema = path.join(tmp, "schema.prisma");
fs.writeFileSync(baseSchema, git("show", `${base}:prisma/schema.prisma`) + "\n");

const diff = spawnSync(
  "npx",
  ["prisma", "migrate", "diff", "--from-schema-datamodel", baseSchema, "--to-schema-datamodel", "prisma/schema.prisma", "--script"],
  { encoding: "utf8", stdio: ["ignore", "pipe", "inherit"] }
);
fs.rmSync(tmp, { recursive: true, force: true });
if (diff.status !== 0) process.exit(diff.status ?? 1);

const sql = diff.stdout;
if (sql.includes("This is an empty migration")) {
  console.log(`[db] prisma/schema.prisma is the same as on ${base}; nothing to migrate.`);
  process.exit(0);
}

const stamp = new Date().toISOString().replace(/\D/g, "").slice(0, 14);
const out = path.join(dir, `${stamp}_${name}`, "migration.sql");
fs.mkdirSync(path.dirname(out), { recursive: true });
fs.writeFileSync(out, sql);
console.log(`[db] Wrote ${out}:\n\n${sql}`);

const risky = unapprovedDataLoss().filter((m) => m.name === path.basename(path.dirname(out)));
if (risky.length) {
  console.warn(explain(risky) + "\n[db] Until then every build of this branch fails on purpose.");
}
