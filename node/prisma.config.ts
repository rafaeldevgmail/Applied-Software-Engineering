import "dotenv/config";
import { defineConfig } from "@prisma/config"; // 👈 Importa a função oficial de definição

export default defineConfig({
  schema: "./src/prisma/schema.prisma",
  migrations: "./src/prisma/migrations",
  datasource: {
    url: process.env.DATABASE_URL,
  },
});
