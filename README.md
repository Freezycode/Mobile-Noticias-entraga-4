# Painel de Notícias Local

Aplicativo simples feito no Expo com TypeScript para salvar notícias **localmente** no celular usando SQLite.

## Tecnologias

- React Native
- Expo
- TypeScript
- expo-sqlite
- React Navigation

## Como rodar

```bash
npm install
npx expo start
```

## CRUD (bem direto)

- **Listar**: na tela **Início** aparece tudo que já foi salvo
- **Criar**: em **Nova notícia** você adiciona uma notícia
- **Ver**: em **Notícia** você vê os detalhes
- **Editar**: em **Atualizar** você altera a notícia
- **Excluir**: na lista, o botão **Excluir** remove do banco

## Dados da notícia

- `id`
- `titulo`
- `resumo`
- `conteudo`
- `autor`
- `data`

O SQLite fica em `banco/dadosNoticias.ts` com:

- `adicionarNoticia()`
- `listarNoticias()`
- `editarNoticia()`
- `excluirNoticia()`

