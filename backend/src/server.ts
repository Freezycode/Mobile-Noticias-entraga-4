import cors from 'cors';
import express from 'express';
import { eq } from 'drizzle-orm';
import { db } from './db';
import { noticia } from './schema';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/noticias', async (_req, res) => {
  const itens = await db.select().from(noticia).orderBy(noticia.id);
  res.json(itens);
});

app.get('/noticias/:id', async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isFinite(id)) {
    res.status(400).json({ erro: 'Id inválido.' });
    return;
  }

  const [item] = await db.select().from(noticia).where(eq(noticia.id, id)).limit(1);
  if (!item) {
    res.status(404).json({ erro: 'Notícia não encontrada.' });
    return;
  }
  res.json(item);
});

app.post('/noticias', async (req, res) => {
  const { titulo, descricao, data } = (req.body ?? {}) as Record<string, unknown>;
  if (
    typeof titulo !== 'string' ||
    typeof descricao !== 'string' ||
    typeof data !== 'string' ||
    !titulo.trim() ||
    !descricao.trim() ||
    !data.trim()
  ) {
    res.status(400).json({ erro: 'Campos obrigatórios: titulo, descricao, data.' });
    return;
  }

  const resultado = await db
    .insert(noticia)
    .values({ titulo: titulo.trim(), descricao: descricao.trim(), data: data.trim() })
    .returning();

  res.status(201).json(resultado[0]);
});

app.put('/noticias/:id', async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isFinite(id)) {
    res.status(400).json({ erro: 'Id inválido.' });
    return;
  }

  const { titulo, descricao, data } = (req.body ?? {}) as Record<string, unknown>;
  if (
    typeof titulo !== 'string' ||
    typeof descricao !== 'string' ||
    typeof data !== 'string' ||
    !titulo.trim() ||
    !descricao.trim() ||
    !data.trim()
  ) {
    res.status(400).json({ erro: 'Campos obrigatórios: titulo, descricao, data.' });
    return;
  }

  const atualizado = await db
    .update(noticia)
    .set({ titulo: titulo.trim(), descricao: descricao.trim(), data: data.trim() })
    .where(eq(noticia.id, id))
    .returning();

  if (!atualizado[0]) {
    res.status(404).json({ erro: 'Notícia não encontrada.' });
    return;
  }

  res.json(atualizado[0]);
});

app.delete('/noticias/:id', async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isFinite(id)) {
    res.status(400).json({ erro: 'Id inválido.' });
    return;
  }

  const removido = await db.delete(noticia).where(eq(noticia.id, id)).returning();
  if (!removido[0]) {
    res.status(404).json({ erro: 'Notícia não encontrada.' });
    return;
  }

  res.status(204).send();
});

const porta = Number(process.env.PORT ?? 3333);
app.listen(porta, () => {
  console.log(`API rodando em http://localhost:${porta}`);
});

