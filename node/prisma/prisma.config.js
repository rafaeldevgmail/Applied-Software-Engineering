import 'dotenv/config';
import { defineConfig } from '@prisma/config'; // 👈 Importa a função oficial de definição

export default defineConfig({
  schema: {
    kind: 'single',
    path: './prisma/schema.prisma',
  },
  migrations: {
    path: './prisma/migrations',
    seed: 'node ./prisma/seed.js', // 👈 Agora o Prisma vai ler esse gatilho!
  },
  datasource: {
    url: process.env.DATABASE_URL,
  },
});