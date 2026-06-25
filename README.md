#  🧪 Applied Software Engineering Practices

## 1. Backend App: Node.js

![Node.js](https://img.shields.io/badge/Node.js-20.x-339933?logo=node.js&logoColor=white) ![Express](https://img.shields.io/badge/Express-5.x-000000?logo=express&logoColor=white) ![Prisma](https://img.shields.io/badge/Prisma-7.x-2D3748?logo=prisma&logoColor=white) ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-4169E1?logo=postgresql&logoColor=white) ![Redis](https://img.shields.io/badge/Redis-7-DC382D?logo=redis&logoColor=white) ![Docker](https://img.shields.io/badge/Docker-2496ED?logo=docker&logoColor=white) ![Vitest](https://img.shields.io/badge/Vitest-6E9F18?logo=vitest&logoColor=white) ![License](https://img.shields.io/badge/license-ISC-blue)

REST API built with Node.js as a showcase project for **software engineering best practices**. The code employs established design patterns (Repository Pattern, Dependency Injection, SOLID), asynchronous queue processing with BullMQ and Redis, relational database with Prisma ORM, and a fully containerized environment with Docker Compose.

---

## Stack

| Category          | Technologies                                    |
| ----------------- | ----------------------------------------------- |
| **Runtime & Web**  | Node.js 20 (Alpine), Express 5                  |
| **Database & ORM** | PostgreSQL 15, Prisma 7 (adapter-pg, migrations)|
| **Queue & Cache**  | Redis 7, BullMQ, ioredis                        |
| **DevOps**         | Docker, Docker Compose                          |
| **Testing**        | Vitest, @faker-js/faker                         |
| **Security**       | JWT (jsonwebtoken), bcrypt                      |

---

**🏗️ Architecture & Best Practices:**

- **Repository Pattern + DI**: `UserController` receives a repository via constructor, applying Dependency Injection. This enables Dependency Inversion, making the controller fully decoupled from the database. Simply swap the injection in routes to migrate from PostgreSQL to another database.
- **API / Worker Separation**: The report worker runs in an independent Node process (`npm run start:workers`), consuming jobs from the Redis queue while the API remains responsive.
- **Prisma with adapter-pg**: Native PostgreSQL connection pool adapted to Prisma, ensuring performance and support for typed migrations.

---

## Data Model

The current schema includes the following relational entities:

| Entity                | Description                           | Relationships           |
| --------------------- | ------------------------------------- | ----------------------- |
| **User**              | System user (JWT authentication)      | → Client, Task, Session |
| **Client**            | Client registered by the user         | → User, Task            |
| **Task**              | Task associated with a client         | → User, Client          |
| **Session**           | User session (infrastructure)         | → User                  |
| **PersonalAccessToken**| Personal access tokens (API)         | —                       |

---

## Features

- **Authentication**: Login and registration with JWT + bcrypt (password hashing with salt)
- **User CRUD**: Create, Read (list, find by ID), Update, Delete via Repository Pattern
- **Client and Task Modeling**: Full relational model (Prisma schema with migrations)
- **Async Reports**: Background data generation — the API enqueues the job in BullMQ and the worker processes it independently
- **Automated Seed**: Realistic mock data with @faker-js/faker for development

---

## Design Patterns & Principles

| Pattern                   | Where                                                                                  | Benefit                                                                                |
| ------------------------- | -------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| **Repository**            | `IUserRepository` (interface) → `PrismaUserRepository` (concrete)                      | Isolates data access logic; swap ORM/database without impacting controllers             |
| **Dependency Injection**  | `new UserController(userRepository)` in routes                                         | Facilitates testing with in-memory mocks; adheres to SOLID DIP                         |
| **Single Responsibility** | Controller handles HTTP; Repository handles data; Service handles business rules       | Cohesive and independently testable code                                               |
| **Background Worker**     | ReportService → BullMQ Queue → ReportWorker                                            | Heavy processing doesn't block the API response                                        |
| **Error Objects**         | `AppError` and `EmailInUseError` (custom classes)                                      | Semantic and centralized error handling                                                |

---

## Async Report System

### Architecture

```
POST /api/relatorio
  → ReportController (src/controllers/reportController.ts)
    → ReportService.triggerReportGeneration (src/services/reportService.ts)
      1. Creates PostgreSQL record (status: "todo")
      2. Adds job to queue: reportQueue.add("gerar-pdf-clientes", { taskId, userId })

[Redis] ──► reportWorker (src/workers/reportWorker.ts)
              → ReportService.processGeneratedData(taskId, userId, jobId)
                1. Updates task to "in_progress"
                2. Fetches clients from database
                3. Processes (simulated with 5s delay)
                4. Updates task to "done"
```

### Components

1. **Queue** (`src/queues/reportQueue.ts`): Defines the `"relatorios-queue"` connected to Redis. Exports a singleton instance.

2. **Worker** (`src/workers/reportWorker.ts`): Listens to the same queue. Extracts `taskId` and `userId` from `job.data` and calls `reportService.processGeneratedData()`. Has listeners for `completed` and `failed`.

3. **Worker bootstrap** (`src/workers/index.ts`): Starts the worker. Run via `npm run start:workers` (command: `tsx src/workers/index.ts`).

4. **Producer** (`src/services/reportService.ts`): `triggerReportGeneration` persists the task in Postgres and enqueues the job in Redis with `reportQueue.add("gerar-pdf-clientes", data)`.

### Complete Flow

1. Client sends `POST /api/relatorio`
2. Controller returns HTTP **202 Accepted** with the `taskId` (immediate response, non-blocking)
3. In background, the worker picks the job from Redis and processes it (updates status in Postgres: `todo → in_progress → done`)

### Characteristics

- **No scheduling (cron)**: Jobs are created on demand, only via HTTP request
- **Single active queue**: `relatorios-queue` with one job: `gerar-pdf-clientes`
- **Concurrency**: By default, BullMQ processes **5 simultaneous jobs** per worker (configurable via `concurrency: N` in the constructor)
- **Retry**: No explicit configuration — uses BullMQ defaults (automatic attempts with backoff)
- **Redis as backbone**: Both the queue and messages go through Redis (`redis:7-alpine` service in docker-compose)

### Running Locally

Two separate processes:

- **API**: `npm start` (or `npm run dev`)
- **Worker**: `npm run start:workers`

---

## How to Run

### Prerequisites
- [Git](https://git-scm.com)
- [Node.js](https://nodejs.org/) (v20.x or higher) & **npm**
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

# 5. Run migrations and seed
docker exec -it node npx prisma migrate dev
docker exec -it node npx prisma db seed
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
JWT_SECRET=YOURSECRETKEY
```

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

## Node.js Project Structure

```
📁 root/
├── ⚙️ .env                          # Environment variables
├── 🔒 .gitignore                    # Git exclusion rules
├── 🐳 .dockerignore                 # Docker build exclusions
├── 🐳 docker-compose.yml            # 3 services: app, db, redis
├── 🐳 dockerfile                    # Node 20 Alpine build
├── 📦 package.json                  # Project manifest & scripts
├── 💎 prisma.config.ts              # Prisma ORM configuration
├── ⚙️ tsconfig.json                 # TypeScript configuration
├── 📂 .vscode/
│   ├── 🔧 launch.json               # Docker debug attach config
│   └── ⚙️ settings.json             # Workspace settings
└── 📂 src/
    ├── ⚙️ app.ts                    # Express configuration (middlewares, routes)
    ├── 🚀 server.ts                 # Entry point (server initialization)
    ├── 📂 config/
    │   ├── ⚙️ env.ts                # Env var validation & export
    │   ├── 🔗 redisConfig.ts        # Redis connection config
    │   └── 📊 bullBoard.ts          # Bull Board UI setup
    ├── 📂 controllers/
    │   ├── 🔑 authController.ts     # Login and registration (JWT + bcrypt)
    │   ├── 📋 reportController.ts   # Endpoint to trigger async report
    │   └── 👤 userController.ts     # User CRUD (with injected repository)
    ├── 📂 errors/
    │   ├── ⚠️ AppError.ts           # Base error class
    │   ├── 📧 EmailInUseError.ts    # Semantic duplicate email error
    │   └── 🗃️ prismaErrorHandler.ts # Prisma error formatter
    ├── 📂 lib/
    │   └── 🗄️ prisma.ts             # PrismaClient singleton with adapter-pg
    ├── 📂 middlewares/
    │   ├── 🪪 authMiddleware.ts     # JWT token verification middleware
    │   └── 🚨 errorMiddleware.ts    # Global error handler
    ├── 💎 prisma/
    │   ├── 📊 schema.prisma         # User/Client/Task/Session models
    │   ├── 🌱 seed.ts               # Database seeder with faker
    │   └── 🗄️ migrations/           # Versioned Prisma migrations
    ├── 📂 queues/
    │   └── 📤 reportQueue.ts        # BullMQ queue definition (reports-queue)
    ├── 📂 repositories/
    │   ├── 📄 user.repository.interface.ts   # IUserRepository interface (contract)
    │   └── 💎 prisma/
    │       └── 💾 user.prisma.repository.tsx # Concrete Prisma implementation
    ├── 📂 routes/
    │   ├── 🔑 authRoutes.ts         # POST /login, /register
    │   ├── 📋 reportRoutes.ts       # POST /relatorio
    │   └── 👤 userRoutes.ts         # CRUD /users
    ├── 📂 services/
    │   └── ⚙️ reportService.ts      # Business logic: create task + enqueue job
    ├── 🧪 tests/integration/
    │   ├── ✅ report.spec.ts        # Integration test (Vitest) for report queue
    │   └── 🧪 queue.test.ts         # Sandbox script for manual queue testing
    ├── 📂 use-cases/                # Empty - future Use Cases
    ├── 📂 factories/                # Empty - future Factories for object creation
    └── 🏃 workers/
        ├── 🚀 index.ts              # Worker orchestration entry point
        └── ⚙️ reportWorker.ts       # BullMQ worker: background processes report generation 
```

---
## License

Distributed under the ISC license. See `package.json` for more information.
