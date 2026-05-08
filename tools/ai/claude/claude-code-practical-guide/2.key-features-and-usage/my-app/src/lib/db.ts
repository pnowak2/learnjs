import { Database } from "bun:sqlite";
import { mkdirSync } from "node:fs";
import { join } from "node:path";

const DATA_DIR = join(process.cwd(), "data");
mkdirSync(DATA_DIR, { recursive: true });

const db = new Database(join(DATA_DIR, "app.db"), { create: true });

db.run("PRAGMA journal_mode = WAL;");
db.run("PRAGMA foreign_keys = ON;");

db.run(`
  CREATE TABLE IF NOT EXISTS notes (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL REFERENCES user(id),
    title TEXT NOT NULL,
    content_json TEXT NOT NULL,
    is_public INTEGER NOT NULL DEFAULT 0,
    public_slug TEXT UNIQUE,
    created_at TEXT NOT NULL DEFAULT (datetime('now')),
    updated_at TEXT NOT NULL DEFAULT (datetime('now'))
  )
`);

type Bindings = unknown[];

export function query<T>(sql: string, params?: Bindings) {
  return db.query<T, Bindings>(sql).all(params ?? []);
}

export function get<T>(sql: string, params?: Bindings) {
  return db.query<T, Bindings>(sql).get(params ?? []);
}

export function run(sql: string, params?: Bindings) {
  return db.query<never, Bindings>(sql).run(params ?? []);
}

export default db;
