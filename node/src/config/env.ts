import dotenv from "dotenv";
dotenv.config(); // Carrega o .env imediatamente ao ser importado

// Opcional, mas muito profissional: validar se as variáveis essenciais existem
if (!process.env.REDIS_HOST) {
  throw new Error("❌ Erro: A variável de ambiente REDIS_HOST é obrigatória!");
}

if (
  (process.env.DATABASE_PROVIDER || "postgres") === "mongo" &&
  !process.env.MONGO_URI
) {
  throw new Error(
    "❌ Erro: A variável de ambiente MONGO_URI é obrigatória quando DATABASE_PROVIDER=mongo!",
  );
}

// CRUD_MODE escolhe a camada usada por todos os métodos CRUD do projeto:
// "default" = repositórios originais (Prisma | Mongo) | "graphql" = camada GraphQL
const CRUD_MODE = (process.env.CRUD_MODE || "default").toLowerCase();

if (!["default", "graphql"].includes(CRUD_MODE)) {
  throw new Error(
    "❌ Erro: A variável de ambiente CRUD_MODE deve ser \"default\" ou \"graphql\"!",
  );
}

export const env = {
  REDIS_HOST: process.env.REDIS_HOST,
  REDIS_PORT: Number(process.env.REDIS_PORT) || 6379,
  NODE_ENV: process.env.NODE_ENV || "development",
  DATABASE_PROVIDER: process.env.DATABASE_PROVIDER || "postgres",
  MONGO_URI: process.env.MONGO_URI,
  CRUD_MODE,
};
