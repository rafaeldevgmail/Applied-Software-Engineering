This is a [React](https://react.dev) + [Vite](https://vite.dev) project, converted from Next.js (App Router) to a SPA using [TanStack Router](https://tanstack.com/router) with file-based routing.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:4000](http://localhost:4000) with your browser to see the result.

You can start editing the app by modifying `src/**`. The page auto-updates as you edit the file.

## Structure

- `src/routes/**` — rotas file-based do [TanStack Router](https://tanstack.com/router) (o route tree é gerado em `src/routeTree.gen.ts`).
- `src/components/**` — componentes React (layout, modais, UI).
- `src/services/**` — serviços de acesso ao backend (chamadas diretas via `fetch`).
- `src/schemas/**` — schemas de validação (zod).
- Backend/API URL é configurada em `.env` via `VITE_BACKEND_API_URL`.

## Learn More

To learn more:

- [Vite Documentation](https://vite.dev/guide/)
- [TanStack Router Documentation](https://tanstack.com/router/latest)
- [React Documentation](https://react.dev/learn)
