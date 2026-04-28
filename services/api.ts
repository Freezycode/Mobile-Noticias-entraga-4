import axios from 'axios';
import { Platform } from 'react-native';

function baseURLPadrao() {
  if (Platform.OS === 'android') return 'http://10.0.2.2:3333';
  return 'http://localhost:3333';
}

export const api = axios.create({
  baseURL: baseURLPadrao(),
  timeout: 15000,
});

export type NoticiaApi = {
  id: number;
  titulo: string;
  descricao: string;
  data: string;
};

export async function listarNoticias() {
  const { data } = await api.get<NoticiaApi[]>('/noticias');
  return data.slice().sort((a, b) => b.id - a.id);
}

export async function pegarNoticia(id: number) {
  const { data } = await api.get<NoticiaApi>(`/noticias/${id}`);
  return data;
}

export async function adicionarNoticia(noticia: Omit<NoticiaApi, 'id'>) {
  const { data } = await api.post<NoticiaApi>('/noticias', noticia);
  return data;
}

export async function editarNoticia(noticia: NoticiaApi) {
  const { data } = await api.put<NoticiaApi>(`/noticias/${noticia.id}`, {
    titulo: noticia.titulo,
    descricao: noticia.descricao,
    data: noticia.data,
  });
  return data;
}

export async function excluirNoticia(id: number) {
  await api.delete(`/noticias/${id}`);
}

