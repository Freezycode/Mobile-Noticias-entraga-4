export type NoticiaLocal = {
  id: number;
  titulo: string;
  descricao: string;
  data: string;
};

export type NoticiaLocalSemId = Omit<NoticiaLocal, 'id'>;

