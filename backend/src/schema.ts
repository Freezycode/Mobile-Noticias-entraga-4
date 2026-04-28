import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const noticia = sqliteTable('noticia', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  titulo: text('titulo').notNull(),
  descricao: text('descricao').notNull(),
  data: text('data').notNull(),
});

export type Noticia = typeof noticia.$inferSelect;
export type NoticiaNova = typeof noticia.$inferInsert;

