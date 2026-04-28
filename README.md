# Painel de Notícias (API + App)

Projeto acadêmico simples com:

- **Backend** (Express + TypeScript + SQLite + Drizzle)
- **Frontend** (Expo/React Native) consumindo a API com **Axios**

## Tecnologias

- React Native
- Expo
- TypeScript
- Axios
- React Navigation
- Express
- SQLite
- Drizzle ORM

## Como rodar

### Backend

Abra um terminal em `backend/`:

```bash
npm install
npm run dev
```

A API sobe em `http://localhost:3333` e possui:

- `GET /noticias`
- `GET /noticias/:id`
- `POST /noticias`
- `PUT /noticias/:id`
- `DELETE /noticias/:id`

### Frontend

Na raiz do projeto:

```bash
npm install
npx expo start
```

O app consome a API pelo arquivo `services/api.ts`.

### Observação importante (Android)

No emulador Android, `localhost` aponta para o próprio emulador.
Por isso o `baseURL` já usa `http://10.0.2.2:3333` no Android.

Se você rodar no celular físico, troque o `baseURL` em `services/api.ts` para o IP do seu computador na rede (ex: `http://192.168.0.10:3333`).


