# SPA React + Vite

This is NOT a Next.js project anymore. It is a React 19 SPA built with Vite and TanStack Router.

- File-based routes live in `src/routes/` and the route tree is auto-generated in `src/routeTree.gen.ts` (do not edit it manually).
- Backend/API access is direct from the browser via `fetch`; the base URL comes from `.env` (`VITE_BACKEND_API_URL`).
- Auth is handled client-side in `src/components/auth-provider.tsx` (session stored in `localStorage` under the `app.session` key).
- Read the relevant docs in `node_modules/` (Vite, TanStack Router) before writing routing code.
