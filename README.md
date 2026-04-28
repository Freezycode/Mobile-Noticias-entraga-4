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




