import Database from 'better-sqlite3';
import { drizzle } from 'drizzle-orm/better-sqlite3';

const sqlite = new Database('dev.sqlite');

sqlite.pragma('journal_mode = WAL');
sqlite.exec(`
  CREATE TABLE IF NOT EXISTS noticia (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    titulo TEXT NOT NULL,
    descricao TEXT NOT NULL,
    data TEXT NOT NULL
  );
`);

export const db = drizzle(sqlite);

