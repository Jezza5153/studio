// Refuses any migration that can delete or rewrite production data unless its
// migration.sql approves that explicitly with a line like:
//
//   -- data-loss-approved: drop Settings.googlePhotos, unused since PR #12; backup 2026-11-02
//
// Runs at the start of every build (so the PR's preview build already fails)
// and before `npm run db:deploy`. See docs/database-migrations.md.
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const RISKY = [
  [/\bDROP\s+(TABLE|COLUMN|SCHEMA|TYPE)\b/i, "drops a table, column, schema or type"],
  [/\bTRUNCATE\b/i, "empties a table"],
  [/\bDELETE\s+FROM\b/i, "deletes rows"],
  [/\bUPDATE\s+\S+\s+SET\b/i, "rewrites rows"],
  [/\bALTER\s+COLUMN\s+\S+\s+(SET\s+DATA\s+)?TYPE\b/i, "changes a column type"],
];
const APPROVAL = /^--\s*data-loss-approved:(.*)$/im;

export function unapprovedDataLoss(dir = "prisma/migrations") {
  const found = [];
  for (const name of fs.readdirSync(dir).sort()) {
    const file = path.join(dir, name, "migration.sql");
    if (!fs.existsSync(file)) continue;
    const sql = fs.readFileSync(file, "utf8");
    const code = sql.replace(/\/\*[\s\S]*?\*\//g, "").replace(/--.*$/gm, "");
    const risks = RISKY.filter(([re]) => re.test(code)).map(([, what]) => what);
    if (!risks.length) continue;
    const reason = (sql.match(APPROVAL)?.[1] ?? "").trim();
    if (reason.length < 10 || /TODO|</i.test(reason)) found.push({ name, risks });
  }
  return found;
}

export function explain(found) {
  return (
    found.map(({ name, risks }) => `[db] ${name}: ${risks.join(", ")}`).join("\n") +
    "\n[db] These migrations can delete or rewrite production data. If that is really intended:\n" +
    "[db]   1. take a backup (docs/database-migrations.md, Backups)\n" +
    "[db]   2. add this line to the top of the migration.sql, with a real reason:\n" +
    "[db]      -- data-loss-approved: <what is lost and why that's OK>; backup <date>"
  );
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  const found = unapprovedDataLoss();
  if (found.length) {
    console.error(explain(found));
    process.exit(1);
  }
  console.log("[db] Migration guard: no unapproved data-loss migrations.");
}
