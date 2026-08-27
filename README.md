

# 🧪 Applied Software Engineering Practices

## FullStack App

#### 1. Frontend application technologies: Next.js

![Next.js](https://img.shields.io/badge/Next.js-16-000000?logo=next.js&logoColor=white) ![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black) ![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white) ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white) ![Zod](https://img.shields.io/badge/Zod-4-3E619D?logo=zod&logoColor=white) ![Docker](https://img.shields.io/badge/Docker-2496ED?logo=docker&logoColor=white) ![License](https://img.shields.io/badge/license-ISC-blue)

#### 2. Backend application technologies: Node.js

![Node.js](https://img.shields.io/badge/Node.js-20.x-339933?logo=node.js&logoColor=white) ![Express](https://img.shields.io/badge/Express-5.x-000000?logo=express&logoColor=white) ![Prisma](https://img.shields.io/badge/Prisma-7.x-2D3748?logo=prisma&logoColor=white) ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-4169E1?logo=postgresql&logoColor=white) ![Redis](https://img.shields.io/badge/Redis-7-DC382D?logo=redis&logoColor=white) ![Docker](https://img.shields.io/badge/Docker-2496ED?logo=docker&logoColor=white) ![Vitest](https://img.shields.io/badge/Vitest-6E9F18?logo=vitest&logoColor=white) ![License](https://img.shields.io/badge/license-ISC-blue)

## 1. Frontend application: Next.js

Frontend dashboard built with **Next.js 16 (App Router)** as a showcase project for **software engineering best practices** on the client side. The application features a custom glassmorphism design system, URL-driven modal architecture, form validation with Zod + react-hook-form, Server Components for data fetching, and full integration with the [Backend Node.js API](https://github.com/rafaeldevgmail/Applied-Software-Engineering).

## Preview
<div align="center">
    
https://github.com/user-attachments/assets/0adbb569-9290-44cd-95b0-22ba62a8f370

https://github.com/user-attachments/assets/81948d76-7478-4aac-b013-612f024f3d23

https://github.com/user-attachments/assets/1595bb89-9e85-48af-9f38-b945076da257

<img width="300" alt="Home Mobile" src="https://github.com/user-attachments/assets/0864473f-4299-4256-85fa-479d151a7c07" />
<img width="300" alt="Login Mobile" src="https://github.com/user-attachments/assets/36b25e64-3721-4f6e-8a26-f4c0827ff3cd" />
<img width="300" alt="Dashboard Mobile" src="https://github.com/user-attachments/assets/9a363d20-bd06-410a-919f-fbd6a6204359" />
<img width="900" alt="Client New" src="https://github.com/user-attachments/assets/7c2adb3f-468d-441a-aad3-8df5b42e08f8" />
<img width="900" alt="Client Edit" src="https://github.com/user-attachments/assets/eb55785a-6075-429a-81e4-a0212b43f5bd" />
<img width="1920" alt="Client View" src="https://github.com/user-attachments/assets/77117676-0f74-4a81-983a-7ad28ca2dfaa" />
<img width="1920" alt="Client Delete" src="https://github.com/user-attachments/assets/7273b16f-6e8d-46d6-b10f-3cd8bb818cd3" />
<img width="1920" alt="Edit Client light" src="https://github.com/user-attachments/assets/89787eb3-fc21-45a3-8a49-732e8a4be77f" />

</div>
---

## Stack

| Category               | Technologies                                      |
| ---------------------- | ------------------------------------------------- |
| **Framework**          | Next.js 16 (App Router), React 19                 |
| **Language**           | TypeScript 5 (strict mode)                        |
| **Styling**            | Tailwind CSS v4 (CSS-first), Custom Glassmorphism |
| **Forms & Validation** | react-hook-form 7 + Zod 4 + @hookform/resolvers   |
| **Icons**              | FontAwesome 7, Lucide React                       |
| **Animations**         | Motion 12 (Framer successor, `motion/react`), CSS 3D Perspectives, `AnimatePresence` |
| **Notifications**      | react-hot-toast                                   |
| **Fonts**              | Geist, Geist Mono (next/font)                     |
| **Containers**         | Docker, Docker Compose                            |

---

**🏗️ Architecture & Best Practices:**

- **Server Components + Client Components**: Pages like `dashboard/page.tsx` are async Server Components that fetch data directly from the backend API. Interactive modals and forms are marked `"use client"` — clear separation of concerns.
- **URL-Driven Modals**: Modal state is encoded in URL search params (`?modal=true`, `?editId=1`, `?deleteId=1`, `?viewId=1`). This enables deep-linking, browser history support, and consistent state across refreshes.
- **Dual Environment URLs**: The service layer auto-detects whether code runs on the server (Docker network: `http://node:3000`) or in the browser (`http://localhost:3000`), ensuring seamless connectivity in both contexts.
- **Animated Modals with `motion/react`**: All modals use `AnimatePresence` + `motion.div` with 3D `rotateX`/`scale`/`blur` variants for entry/exit transitions. The `useModal` hook orchestrates the lifecycle: close → exit animation → `router.back()`. Overlay fades independently over 0.25s while the dialog animates over 0.4s.
- **Standalone Output**: `next.config.ts` sets `output: "standalone"` for optimized, self-contained Docker deployments.

---

## Pages & Routes

| Route                        | Description                                                   |
| ---------------------------- | ------------------------------------------------------------- |
| `/`                          | Server Component — fetches users, redirects to dashboard      |
| `/auth/login`                | Login modal with Zod validation, redirects to `/dashboard`    |
| `/auth/register`             | Registration modal with Zod validation, redirects to login    |
| `/dashboard`                 | Home — summary cards (Users, Clients) with avatar initials    |
| `/dashboard/users`           | Full CRUD table — list, create, edit, view, delete via modals |
| `/dashboard/clients`         | Full CRUD table — list, create, edit, view, delete via modals |
| `GET /api/register/activate` | API Route — proxies email activation token to the backend     |

---

## Design System: Glassmorphism

The entire UI is built on a **custom glassmorphism/liquid glass design system** defined in `globals.css` using Tailwind v4's CSS-first configuration:

- **Animated Background**: Three gradient orbs (`float1`, `float2`, `float3`) with infinite keyframe animations creating a "liquid" floating effect
- **Glass Containers**: `backdrop-blur`, translucent backgrounds, gradient borders, and inset shadows (`.glass-container`, `.glass-card`, `.glass-sidebar`)
- **3D Modal Animations**: Entry/exit using CSS `perspective(500px) rotateX()` transforms with blur effects
- **Dark Mode**: Automatic via `prefers-color-scheme: dark` media query
- **Custom Scrollbar**: WebKit-style thin rounded scrollbar
- **Color Palette**: 100+ named CSS variables (alice-blue, antique-white, etc.) defined in `@theme inline`

### CSS Component Classes

| Class                    | Purpose                                           |
| ------------------------ | ------------------------------------------------- |
| `.liquid-bg`             | Full-page animated gradient background            |
| `.glass-container`       | Frosted glass panel with backdrop-blur            |
| `.glass-card`            | Card variant with semi-transparent background     |
| `.glass-sidebar`         | Sidebar-specific glass styling                    |
| `.glass-input`           | Styled input fields                               |
| `.glass-btn-primary`     | Primary action button                             |
| `.glass-btn-secondary`   | Secondary action button                           |
| `.menu-link` / `-active` | Navigation links with active route highlight      |
| `.status-badge-*`        | Status indicators (active, pending, info, danger) |

---

## Components

### Layout (`src/components/layout/`)

| Component | Description                                                                                                                          |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| `Header`  | Displays Next.js logo, page title (h1), and optional subtitle                                                                        |
| `Sidebar` | Client component — navigation with active-route highlighting via `usePathname()`, app branding ("HDLG"), user profile, logout button |
| `Footer`  | Copyright "2026 HDTG Inc." with Termos, Privacidade, Suporte links                                                                   |

### UI (`src/components/ui/`)

| Component       | Description                                                                                                                                                             |
| --------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Badge`         | Reusable status badge — 4 variants: `default` (blue), `success` (green), `danger` (red), `warning` (amber)                                                              |
| `Modal`         | Generic modal via React Portal (`createPortal`) with `AnimatePresence` from `motion/react`. SSR-safe with `isMounted` guard. 3D animation: `rotateX`, `scale`, `blur`, `opacity` via `dialogVariants`. Props: `isOpen`, `handleClose`, `handleExitComplete`, `title`, `description`, `canClose` |
| `Input`         | Reusable input with `forwardRef` — `label`, `error`, `helperText`, `leftIcon`, `rightIcon`. Uses `React.useId()` for accessible `htmlFor`. Integrates with react-hook-form via `register()` |
| `Dropdown`      | Generic custom dropdown `<T extends string \| number>` — `options[]`, `searchable` with filter, `leftIcon`, `error`. Fully controlled via `value`/`onChange`, closing on click-outside and Escape |
| `PasswordField` | Password input with show/hide toggle (Eye/EyeOff from lucide-react). Integrates with react-hook-form |

### Features — Clients (`src/components/features/clients/`)

| Component            | Description                                                                                                                       |
| -------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| `ClientFormModal`    | Create/Edit form — name, email, phone, company, status (dropdown), user (searchable dropdown). Zod `CreateClientSchema`/`EditClientSchema`. Auto-detects edit mode via `clientToEdit` prop |
| `ClientViewModal`    | Read-only detail view — displays all fields plus associated user name fetched asynchronously                                      |
| `DeleteConfirmModal` | Confirmation dialog — shows client name, cancel/confirm buttons                                                                   |

### Features — Users (`src/components/features/users/`)

| Component            | Description                                                                                                        |
| -------------------- | ------------------------------------------------------------------------------------------------------------------ |
| `UserRegisterModal`  | Registration form — name, email, password, confirm password. Zod `CreateUserSchema`. Redirects to login on success |
| `UserLoginModal`     | Login form — email, password. Zod `LoginUserSchema`. Redirects to dashboard on success                             |
| `UserFormModal`      | Create/Edit form — name, email. Zod `EditUserSchema`. Auto-detects edit mode via `userToEdit` prop                 |
| `UserViewModal`      | Read-only detail view — displays name and email                                                                    |
| `DeleteConfirmModal` | Confirmation dialog — shows user name, cancel/confirm buttons                                                      |

---

## Forms & Validation

All forms use **react-hook-form** with **Zod** schemas via `@hookform/resolvers`.

| Schema             | Fields                                       | Validation Rules                                                                               |
| ------------------ | -------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| `CreateUserSchema` | name, email, password, password_confirmation | name: min 3; password: min 8, uppercase, lowercase, number, special char; passwords must match |
| `LoginUserSchema`  | email, password                              | email: valid format; password: required                                                        |
| `EditUserSchema`   | name, email                                  | name: min 3; email: valid format                                                               |
| `ClientBaseSchema` | name, email, userId, phone?, company?, status?, notes? | name: min 3; email: valid format; userId: required number                          |
| `CreateClientSchema` / `EditClientSchema` | Extends `ClientBaseSchema` (same shape for create and edit) | same as base                                                              |

Validation errors are displayed inline with red border styling on invalid fields.

---

## Custom Hook: useModal

`src/hooks/useModal.ts` — Manages modal lifecycle with animated transitions via `motion/react`:

- Uses `useState(true)` for `isOpen` — triggers `AnimatePresence` exit animation when set to `false`
- Supports `canClose` option (when `false`, close is a no-op — used for mandatory modals like login/register)
- Handles **Escape key** via `useEffect` with cleanup
- Returns: `{ isOpen, handleClose, handleExitComplete }` — consumed by `<Modal>`
- `handleExitComplete` fires after exit animation ends (via `AnimatePresence`), then calls `router.back()` to dismiss URL-based modal state

---

## Data Layer & Backend Integration

`src/services/userService.ts` — Functions for all backend API calls:

| Function        | Method | Endpoint         | Notes               |
| --------------- | ------ | ---------------- | ------------------- |
| `getUsers()`    | GET    | `/users`         | `cache: "no-store"` |
| `getUserById()` | GET    | `/users/:id`     | —                   |
| `createUser()`  | POST   | `/auth/register` | Creates account     |
| `loginUser()`   | POST   | `/auth/login`    | Authenticates user  |
| `updateUser()`  | PUT    | `/users/:id`     | Updates user        |
| `deleteUser()`  | DELETE | `/users/:id`     | Deletes user        |

`src/services/clientService.ts` — Functions for client API calls:

| Function          | Method | Endpoint       | Notes                           |
| ----------------- | ------ | -------------- | ------------------------------- |
| `getClients()`    | GET    | `/clients`     | `cache: "no-store"`             |
| `getClientById()` | GET    | `/clients/:id` | —                               |
| `createClient()`  | POST   | `/clients`     | Body: `Omit<Client, "id">`      |
| `updateClient()`  | PUT    | `/clients/:id` | Body: partial client data       |
| `deleteClient()`  | DELETE | `/clients/:id` | Deletes client                  |

**API Route** (`src/app/api/register/activate/route.ts`): Proxies email activation tokens to `POST ${BACKEND_API_URL}/auth/register-complete`, then redirects to `/auth/login?activated=true`.

---

## How to Run

### Prerequisites

- [Git](https://git-scm.com)
- [Node.js](https://nodejs.org/) (v20.x or higher) & **npm**
- [Docker](https://www.docker.com) and [Docker Compose](https://docs.docker.com/compose)
- The [Backend API](https://github.com/rafaeldevgmail/Applied-Software-Engineering) running on port 3000

### Step by Step

```bash
# 1. Clone the repository
git clone <this-repo-url>
cd <project-folder>

# 2. Create the external Docker network (if not already created)
docker network create app-network

# 3. Configure the .env file at the project root
# (see section below)

# 4. Start the container
docker-compose up -d --build
```

The frontend will be available at `http://localhost:4000`.

### Environment Variables (.env)

```env
# Usada pelo Next.js quando faz requisições pelo servidor (Server-side)
BACKEND_API_URL=http://node:3000

# Usada pelo navegador/modais (Client-side)
NEXT_PUBLIC_BACKEND_API_URL=http://localhost:3000
```

### Running Locally

```bash
npm install
npm run dev
```

## Frontend Project Structure

```
📁 root/
├── ⚙️ .env                          # Environment variables (backend URLs)
├── 🔒 .gitignore                    # Git exclusion rules
├── 🐳 .dockerignore                 # Docker build exclusions
├── 🐳 docker-compose.yml            # App service + external network
├── 🐳 dockerfile                    # Node 20 Alpine build
├── 📦 package.json                  # Project manifest & scripts
├── ⚙️ next.config.ts                # Next.js config (standalone output)
├── ⚙️ tsconfig.json                 # TypeScript configuration (strict)
├── ⚙️ postcss.config.mjs            # Tailwind CSS v4 PostCSS plugin
├── ⚙️ eslint.config.mjs             # ESLint 9 config
├── 📂 public/                       # Static assets (SVGs)
└── 📂 src/
    ├── 📂 app/
    │   ├── ⚙️ globals.css            # Glassmorphism design system + Tailwind v4 theme
    │   ├── 🏠 layout.tsx             # Root layout (Geist fonts, Toaster)
    │   ├── 🏠 page.tsx               # Root page → redirects to dashboard
    │   ├── 📂 api/
    │   │   └── 📂 register/
    │   │       └── 📂 activate/
    │   │           └── 🚀 route.ts   # API route: email activation proxy
    │   ├── 📂 auth/
    │   │   ├── 🏠 layout.tsx         # Auth layout (no sidebar)
    │   │   ├── 📂 login/
    │   │   │   └── 🏠 page.tsx       # Login page with modal
    │   │   └── 📂 register/
    │   │       └── 🏠 page.tsx       # Registration page with modal
    │   └── 📂 dashboard/
    │       ├── 🏠 layout.tsx         # Dashboard layout (sidebar + header + footer)
    │       ├── 🏠 page.tsx           # Dashboard home (user/client summary)
    │       ├── 📂 users/
    │       │   ├── 🏠 page.tsx       # Users CRUD table
    │       │   └── ⚠️ error.tsx      # Error boundary for users route
    │       └── 📂 clients/
    │           ├── 🏠 page.tsx       # Clients CRUD table (with modals via searchParams)
    │           └── ⚠️ error.tsx      # Error boundary for clients route
    ├── 📂 components/
    │   ├── 📂 features/
    │   │   ├── 📂 clients/
    │   │   │   ├── 🗑️ delete-confirm-modal.tsx
    │   │   │   ├── ✏️ client-form-modal.tsx
    │   │   │   └── 👁️ client-view-modal.tsx
    │   │   └── 📂 users/
    │   │       ├── 🗑️ delete-confirm-modal.tsx
    │   │       ├── ✏️ user-form-modal.tsx
    │   │       ├── 🔑 user-login-modal.tsx
    │   │       ├── 📝 user-register-modal.tsx
    │   │       └── 👁️ user-view-modal.tsx
    │   ├── 📂 layout/
    │   │   ├── 📋 footer.tsx
    │   │   ├── 📋 header.tsx
    │   │   └── 📋 sidebar.tsx
    │   └── 📂 ui/
    │       ├── 🏷️ badge.tsx
    │       ├── 🪟 modal.tsx
    │       ├── 📝 input.tsx
    │       ├── 📋 dropdown.tsx
    │       └── 🔒 password-field.tsx
    ├── 📂 hooks/
    │   └── 🪝 useModal.ts            # Modal lifecycle hook (animations, Escape key)
    ├── 📂 schemas/
    │   ├── 💎 userSchema.ts          # Zod schemas (Create, Login, Edit)
    │   └── 💎 clientSchema.ts        # Zod schemas (Base, Create, Edit)
    ├── 📂 services/
    │   ├── 🔗 userService.ts         # Backend API functions (CRUD + Auth)
    │   └── 🔗 clientService.ts       # Backend API functions (CRUD)
    ├── 📂 types/
    │   ├── 📐 user.ts                # User TypeScript interface
    │   └── 📐 client.ts              # Client TypeScript interface
    └── 📂 utils/
        └── 🛠️ utils.ts               # getInitials(), formatDate()
```

---

## 2. Backend application: Node.js

A REST API built with Node.js as a showcase project for **software engineering best practices**. The codebase follows a modular monolith architecture with a layered design (Routes → Controllers → Use Cases → Repository), employing established design patterns such as Dependency Injection and SOLID principles. Features include asynchronous queue processing with BullMQ and Redis, a relational database integrated via Prisma ORM, and a fully containerized environment using Docker Compose.

---

## Stack

| Category           | Technologies                                                      |
| ------------------ | ----------------------------------------------------------------- |
| **Runtime & Web**  | Node.js 20 (Alpine), Express 5, TypeScript 6                      |
| **Database & ORM** | PostgreSQL 15, Prisma 7 (adapter-pg, driver adapters, migrations) |
| **Queue & Cache**  | Redis 7, BullMQ 5, ioredis, Bull Board (dashboard)                |
| **DevOps**         | Docker, Docker Compose                                            |
| **Testing**        | Vitest 4, @faker-js/faker                                         |
| **Security**       | JWT (jsonwebtoken), bcrypt, CORS                                  |
| **Email**          | Nodemailer (Ethereal SMTP)                                        |

---

## 🏗️ Architecture & Best Practices

- **Modular Monolith**: Code organized by domain modules (`auth`, `users`, `clients`, `reports`) inside `src/modules/`, with shared infrastructure in `src/shared/`.
- **Repository Pattern + DI**: `UserController` and `AuthController` receive `IUserRepository` via constructor injection. By using factories (`src/factories/`) to wire the concrete Prisma implementation, the controllers remain fully decoupled from the database layer (Dependency Inversion). This architecture enables a seamless transition from PostgreSQL to any other database adapter simply by swapping the injected implementation.
- **Use Case Layer**: Business logic encapsulated in dedicated Use Cases (`LoginUseCase`, `RegisterStartUseCase`, `RegisterCompleteUseCase`) following the Single Responsibility Principle.
- **API / Worker Separation**: The report worker runs in an independent Node process (`npm run start:workers`), consuming jobs from the Redis queue while the API remains responsive.
- **Bull Board Dashboard**: Real-time queue monitoring at `/admin/queues` via Bull Board.
- **Prisma with Driver Adapters**: Native PostgreSQL connection pool (`pg`) adapted to Prisma via `@prisma/adapter-pg`, ensuring performance and typed migrations.

---

## Data Model

The schema includes the following relational entities:

| Entity      | Table      | Description                   | Key Fields                                                                                                                                 |
| ----------- | ---------- | ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| **User**    | `users`    | System user (JWT auth)        | `id`, `name`, `email` (unique), `password`, `emailVerifiedAt`                                                                              |
| **Client**  | `clients`  | Client registered by user     | `id`, `userId`, `name`, `email` (unique), `phone`, `company`, `status` (active/inactive/prospect), soft delete                             |
| **Task**    | `tasks`    | Task associated with a client | `id`, `userId`, `clientId?`, `title`, `status` (todo/in_progress/review/done), `priority` (low/medium/high/urgent), `dueDate`, soft delete |
| **Session** | `sessions` | User session (infrastructure) | `id`, `userId?`, `ipAddress`, `userAgent`, `payload`, `lastActivity`                                                                       |

**Relations:**

- User 1→N Client (cascade delete)
- User 1→N Task (cascade delete)
- Client 1→N Task (set null on delete)

---

## Features

- **Two-Step Registration**: Email verification flow — `POST /auth/register` sends a JWT confirmation link via email; `POST /auth/register-complete` activates the account.
- **Login with Email Verification**: Only verified accounts (`emailVerifiedAt`) can log in. Password comparison via bcrypt.
- **User CRUD**: List (paginated with `skip`/`take`), find by ID, update, delete — all via Repository Pattern with automatic password stripping.
- **Client & Task Modeling**: Full relational model with soft delete support, status enums, and priority levels.
- **Async Reports**: Background data generation — the API enqueues a job in BullMQ (202 Accepted), and the worker processes it independently (updates task status: `todo → in_progress → done`).
- **Bull Board Dashboard**: Admin UI at `/admin/queues` for real-time monitoring of queued jobs (Basic Auth credentials configured via env vars).
- **Automated Seed**: Realistic mock data with @faker-js/faker.
- **Global Error Handling**: Centralized middleware handling Prisma errors, `AppError` instances, and unexpected errors with proper HTTP status codes.

---

## API Routes

| Method   | Path                      | Description                                               | Auth       |
| -------- | ------------------------- | --------------------------------------------------------- | ---------- |
| `GET`    | `/`                       | Health check                                              | No         |
| `POST`   | `/auth/register`          | Start registration (sends verification email)             | No         |
| `POST`   | `/auth/register-complete` | Complete registration with token                          | No         |
| `POST`   | `/auth/login`             | Login (requires verified email)                           | No         |
| `GET`    | `/users/`                 | List users (supports `skip`, `take`, `role` query params) | No         |
| `GET`    | `/users/:id`              | Get user by ID                                            | No         |
| `PUT`    | `/users/:id`              | Update user                                               | No         |
| `DELETE` | `/users/:id`              | Delete user                                               | No         |
| `GET`    | `/clients/`               | List clients                                              | No         |
| `GET`    | `/clients/:id`            | Get client by ID                                          | No         |
| `POST`   | `/clients`                | Create client                                             | No         |
| `PUT`    | `/clients/:id`            | Update client                                             | No         |
| `DELETE` | `/clients/:id`            | Delete client                                             | No         |
| `POST`   | `/api/relatorio`          | Trigger async report generation                           | No         |
| `GET`    | `/admin/queues/*`         | Bull Board dashboard                                      | No         |

---

## Design Patterns & Principles

| Pattern                   | Where                                                                        | Benefit                                                                     |
| ------------------------- | ---------------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| **Repository**            | `IUserRepository` → `PrismaUserRepository`, `IClientRepository` → `PrismaClientRepository` | Isolates data access logic; swap ORM/database without impacting controllers |
| **Dependency Injection**  | `user-factory.ts`, `client-factory.ts` wire repositories into controllers    | Facilitates testing with in-memory mocks; adheres to SOLID DIP              |
| **Use Case**              | `LoginUseCase`, `RegisterStartUseCase`, `RegisterCompleteUseCase`            | Encapsulates business logic; each class handles one operation               |
| **Single Responsibility** | Controllers handle HTTP, Use Cases handle business, Repositories handle data | Cohesive and independently testable code                                    |
| **Modular Organization**  | `src/modules/{auth,users,clients,reports}/`                                  | Domain-driven structure; each module owns its routes, controllers, services |
| **Background Worker**     | ReportService → BullMQ Queue → ReportWorker                                  | Heavy processing doesn't block the API response                             |
| **Error Objects**         | `AppError` (custom class) + `PrismaErrorHandler` (static formatter)          | Semantic and centralized error handling with proper HTTP status mapping     |

---

## Async Report System

### Architecture

```
POST /api/relatorio
  → ReportController (src/modules/reports/report.controller.ts)
    → ReportService.triggerReportGeneration (src/modules/reports/report.service.ts)
      1. Creates PostgreSQL Task record (status: "todo")
      2. Adds job to queue: reportQueue.add("gerar-pdf-clientes", { taskId, userId })

[Redis] ──► reportWorker (src/modules/reports/report.worker.ts)
              → ReportService.processGeneratedData(taskId, userId, jobId)
                1. Updates task to "in_progress"
                2. Fetches clients from database
                3. Processes (simulated with 5s delay)
                4. Updates task to "done"
```

### Components

1. **Queue** (`src/modules/reports/report.queue.ts`): Defines the `"relatorios-queue"` connected to Redis via `redisConfig`. Exports a singleton BullMQ `Queue` instance.

2. **Worker** (`src/modules/reports/report.worker.ts`): Listens to the same queue. Extracts `taskId` and `userId` from `job.data` and calls `reportService.processGeneratedData()`. Has listeners for `completed` and `failed` events.

3. **Worker bootstrap** (`src/shared/infra/workers/index.ts`): Entry point that starts the worker. Run via `npm run start:workers`.

4. **Producer** (`src/modules/reports/report.service.ts`): `triggerReportGeneration` persists the task in Postgres and enqueues the job with `reportQueue.add("gerar-pdf-clientes", { taskId, userId })`.

5. **Dashboard**: Bull Board at `/admin/queues` provides real-time monitoring of the `relatorios-queue`.

### Complete Flow

1. Client sends `POST /api/relatorio`
2. Controller returns HTTP **202 Accepted** with the `taskId` (immediate response, non-blocking)
3. In background, the worker picks the job from Redis and processes it (updates status in Postgres: `todo → in_progress → done`)

### Characteristics

- **On-demand execution**: Jobs are created only via HTTP request (no cron scheduling)
- **Single queue**: `relatorios-queue` with one job type: `gerar-pdf-clientes`
- **Concurrency**: Default BullMQ concurrency (configurable via `concurrency` in worker constructor)
- **Retry**: Uses BullMQ defaults (automatic attempts with backoff)
- **Redis as backbone**: Queue and messages routed through Redis (`redis:7-alpine` in docker-compose)

### Running Locally

Two separate processes are required:

- **API**: `npm start` (or `npm run dev`)
- **Worker**: `npm run start:workers`

---

## How to Run

### Prerequisites

- [Git](https://git-scm.com)
- [Node.js](https://nodejs.org/) (v20.x or higher) & npm
- [Docker](https://www.docker.com) and [Docker Compose](https://docs.docker.com/compose)

### Step by Step

```bash
# 1. Clone the repository
git clone https://github.com/rafaeldevgmail/Applied-Software-Engineering.git
cd Applied-Software-Engineering/node

# 2. Create the external Docker network
docker network create app-network

# 3. Configure the .env file at the project root
# (see section below)

# 4. Start the containers
docker-compose up -d --build

# 5. Run migrations
docker exec -it node npx prisma migrate dev

# 6. Seed the database
docker exec -it node npm run db:seed
```

The API will be available at `http://localhost:3000`.

### Environment Variables (.env)

```env
PORT=3000
NODE_ENV=development

# PostgreSQL
DB_HOST=db
DB_USER=USER
DB_PASS=PASS
DB_NAME=DATABASENAME
DATABASE_URL="postgresql://USER:PASS@db:5432/DATABASENAME?schema=public"

# Redis
REDIS_HOST=redis
REDIS_PORT=6379

# JWT
JWT_SECRET=YOURJWTSECRET

# Frontend URL (used in email verification links)
FRONTEND_URL="http://localhost:4000"

# Bull Board Dashboard
BULL_BOARD_USER=USER
BULL_BOARD_PASSWORD=PASS

# SMTP (Nodemailer - Ethereal for development)
SMTP_HOST="SMTP.HOST.EMAIL"
SMTP_PORT=587
SMTP_USER=USER
SMTP_PASS=PASS
```

---

## Scripts

| Command                 | Description                                |
| ----------------------- | ------------------------------------------ |
| `npm run dev`           | Start API in development mode (tsx)        |
| `npm run debug`         | Start API with remote debugger (port 9229) |
| `npm run dev:watch`     | Start API with file watching               |
| `npm start`             | Start API in production-like mode          |
| `npm run start:workers` | Start the background report worker         |
| `npm test`              | Generate Prisma client and run Vitest      |
| `npm run test:watch`    | Run standalone queue test script           |
| `npm run db:seed`       | Generate Prisma client and seed database   |

---

## Tests

```bash
# Inside the container
docker exec -it node npm run test

# Watch mode (development)
docker exec -it node npm run test:watch

# Locally (with database and Redis running)
npm test
```

---

## Backend Project Structure

```
📁 root/
├── ⚙️ .env                          # Environment variables
├── 🔒 .gitignore                    # Git exclusion rules
├── 🐳 .dockerignore                 # Docker build exclusions
├── 🐳 docker-compose.yml            # 3 services: app, db, redis
├── 🐳 dockerfile                    # Node 20 Alpine build
├── 📦 package.json                  # Project manifest & scripts
├── 💎 prisma.config.ts              # Prisma ORM configuration
├── ⚙️ tsconfig.json                 # TypeScript configuration (path alias: @/*)
├── 📂 .vscode/
│   ├── 🔧 launch.json               # Docker debug attach config
│   └── ⚙️ settings.json             # Workspace settings
└── 📂 src/
    ├── 📂 config/
    │   ├── 📊 bullBoard.ts              # Bull Board UI setup (/admin/queues)
    │   ├── ⚙️ env.ts                    # Env var validation & export
    │   └── 🔗 redisConfig.ts            # Redis connection config
    ├── 📂 factories/
    │   ├── 🔧 user-factory.ts           # DI factory: wires PrismaUserRepository into controllers
    │   └── 🔧 client-factory.ts         # DI factory: wires PrismaClientRepository into controllers
    ├── 📂 lib/
    │   └── 🗄️ prisma.ts                 # PrismaClient singleton (driver adapter pattern)
    ├── 📂 modules/
    │   ├── 📂 auth/
    │   │   ├── 🔑 auth.controller.ts    # Login & registration handlers
    │   │   └── 🔑 auth.routes.ts        # POST /login, /register, /register-complete
    │   ├── 📂 reports/
    │   │   ├── 📋 report.controller.ts  # Triggers async report generation
    │   │   ├── 📤 report.queue.ts       # BullMQ queue definition (relatorios-queue)
    │   │   ├── 📋 report.routes.ts      # POST /api/relatorio
    │   │   ├── ⚙️ report.service.ts     # Business logic: create task + enqueue job
    │   │   └── ⚙️ report.worker.ts      # BullMQ worker: background report processing
    │   ├── 📂 clients/
    │   │   ├── 📂 repository/
    │   │   │   ├── 💎 prisma/
    │   │   │   │   └── 💾 client.prisma.repository.ts  # Concrete Prisma implementation
    │   │   │   └── 📄 client.repository.interface.ts   # IClientRepository interface
    │   │   ├── 📂 useCases/
    │   │   ├── 👤 client.controller.ts   # Client CRUD
    │   │   └── 👤 client.routes.ts       # CRUD routes
    │   └── 📂 users/
    │       ├── 📂 repository/
    │       │   ├── 💎 prisma/
    │       │   │   └── 💾 user.prisma.repository.ts    # Concrete Prisma implementation
    │       │   └── 📄 user.repository.interface.ts     # IUserRepository interface
    │       ├── 📂 useCases/
    │       │   ├── 🔑 LoginUseCase.ts              # Email verification + bcrypt comparison
    │       │   ├── 🔑 RegisterCompleteUseCase.ts   # JWT token verification + account activation
    │       │   └── 🔑 RegisterStartUseCase.ts      # Email validation, hashing, nodemailer
    │       ├── 👤 user.controller.ts     # User CRUD (with injected repository)
    │       └── 👤 user.routes.ts         # GET/PUT/DELETE /users, /users/:id
    ├── 💎 prisma/
    │   ├── 📊 schema.prisma              # User/Client/Task/Session
    │   ├── 🌱 seed.ts                    # Database seeder with faker
    │   └── 🗄️ migrations/                # Versioned Prisma migrations
    ├── 📂 shared/
    │   ├── 📂 errors/
    │   │   ├── ⚠️ AppError.ts            # Base error class (message + statusCode)
    │   │   └── 🗃️ prismaErrorHandler.ts  # Prisma error formatter (P2002, P2025, etc.)
    │   ├── 📂 infra/
    │   │   ├── 📂 http/
    │   │   │   ├── ⚙️ app.ts             # Express config (CORS, routes, error handler)
    │   │   │   └── 🚀 server.ts          # Entry point (server initialization)
    │   │   └── 🏃 workers/
    │   │       └── 🚀 index.ts                       # Worker entry point (imports report.worker.ts)
    │   └── 📂 middlewares/
    │       ├── 🪪 authMiddleware.ts       # JWT token verification middleware
    │       └── 🚨 errorMiddleware.ts      # Global Express error handler
    └── 🧪 tests/
        └── 🧪 integration/
            ├── ✅ report.spec.ts         # Vitest integration test for report queue
            └── 🧪 queue.test.ts          # Standalone script for manual queue testing
```

---

## License

Distributed under the ISC license. See `package.json` for more information.
