import { NoticiaLocal } from '../modelos/NoticiaLocal';

export type RotasParam = {
  Inicio: undefined;
  NovaNoticia: undefined;
  VerNoticia: { noticiaLocal: NoticiaLocal };
  AtualizarNoticia: { noticiaLocal: NoticiaLocal };
};

