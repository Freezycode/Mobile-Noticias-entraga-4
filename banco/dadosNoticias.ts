import * as SQLite from 'expo-sqlite';
import { NoticiaLocal, NoticiaLocalSemId } from '../modelos/NoticiaLocal';

let banco: SQLite.SQLiteDatabase | null = null;

async function pegarBanco() {
  if (!banco) {
    banco = await SQLite.openDatabaseAsync('painel_noticias_local.db');
  }
  await banco.execAsync(`
    PRAGMA journal_mode = WAL;
    CREATE TABLE IF NOT EXISTS noticias_locais (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      titulo TEXT NOT NULL,
      resumo TEXT NOT NULL,
      conteudo TEXT NOT NULL,
      autor TEXT NOT NULL,
      data TEXT NOT NULL
    );
  `);
  return banco;
}

export async function adicionarNoticia(noticiaLocal: NoticiaLocalSemId) {
  const bd = await pegarBanco();
  const resultado = await bd.runAsync(
    'INSERT INTO noticias_locais (titulo, resumo, conteudo, autor, data) VALUES (?, ?, ?, ?, ?);',
    noticiaLocal.titulo,
    noticiaLocal.resumo,
    noticiaLocal.conteudo,
    noticiaLocal.autor,
    noticiaLocal.data
  );
  return Number(resultado.lastInsertRowId);
}

export async function listarNoticias() {
  const bd = await pegarBanco();
  const linhas = await bd.getAllAsync<NoticiaLocal>(
    'SELECT id, titulo, resumo, conteudo, autor, data FROM noticias_locais ORDER BY id DESC;'
  );
  return linhas;
}

export async function editarNoticia(noticiaLocal: NoticiaLocal) {
  const bd = await pegarBanco();
  await bd.runAsync(
    'UPDATE noticias_locais SET titulo = ?, resumo = ?, conteudo = ?, autor = ?, data = ? WHERE id = ?;',
    noticiaLocal.titulo,
    noticiaLocal.resumo,
    noticiaLocal.conteudo,
    noticiaLocal.autor,
    noticiaLocal.data,
    noticiaLocal.id
  );
}

export async function excluirNoticia(id: number) {
  const bd = await pegarBanco();
  await bd.runAsync('DELETE FROM noticias_locais WHERE id = ?;', id);
}

