import Database from "better-sqlite3";

const db = new Database("tasks.db");

db.prepare(`
  CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    completed INTEGER DEFAULT 0
  )
`).run();

console.log("Database connected successfully");

export default db;