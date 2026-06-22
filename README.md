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
├── app.js                        # Express configuration (middlewares, routes)
├── server.js                     # Entry point (server initialization)
├── config/
│   └── redisConfig.js            # Redis connection config (ioredis)
├── controllers/
│   ├── authController.js         # Login and registration (JWT + bcrypt)
│   ├── reportController.js       # Endpoint to trigger async report
│   └── userController.js         # User CRUD (with injected repository)
├── errors/
│   ├── AppError.ts               # Custom error base class
│   └── EmailInUseError.ts        # Semantic duplicate email error
├── factories/                    # Factories for object creation (future)
├── lib/
│   └── prisma.js                 # PrismaClient singleton with adapter-pg
├── middlewares/
│   └── authMiddleware.js         # JWT token verification middleware
├── prisma/
│   ├── schema.prisma             # Full schema (User, Client, Task, Session, Token)
│   ├── seed.js                   # Seed with faker (5 clients + mock tasks)
│   └── migrations/               # Versioned Prisma migrations
├── queues/
│   └── reportQueue.js            # BullMQ queue definition (reports-queue)
├── repositories/
│   ├── user.repository.interface.js   # IUserRepository interface (contract)
│   └── prisma/
│       └── user.prisma.repository.js  # Concrete Prisma implementation
├── routes/
│   ├── authRoutes.js             # POST /login, POST /register
│   ├── reportRoutes.js           # POST /api/report
│   └── userRoutes.js             # CRUD /users
├── services/
│   └── reportService.js          # Business logic: create task + enqueue job
├── tests/
│   └── integration/
│       ├── report.spec.js        # Integration test (Vitest) for report queue
│       └── queue.test.js         # Sandbox script for manual queue testing
├── workers/
│   ├── index.js                  # Workers entry point
│   └── reportWorker.js           # BullMQ worker: processes report generation
├── dockerfile                    # Node 20 Alpine image
├── docker-compose.yml            # 3 services: app, db (PostgreSQL 15), redis (Redis 7)
├── prisma.config.ts              # TypeScript Prisma config
├── prisma.config.mjs             # ESM Prisma config
├── package.json
└── .env                          # Environment variables (not versioned)
```

---
## License

Distributed under the ISC license. See `package.json` for more information.
