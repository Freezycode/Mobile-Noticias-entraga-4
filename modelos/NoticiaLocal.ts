export type NoticiaLocal = {
  id: number;
  titulo: string;
  resumo: string;
  conteudo: string;
  autor: string;
  data: string;
};

export type NoticiaLocalSemId = Omit<NoticiaLocal, 'id'>;

