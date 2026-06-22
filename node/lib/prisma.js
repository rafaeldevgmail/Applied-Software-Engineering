// src/lib/prisma.js
import 'dotenv/config';
import pkg from '@prisma/client';
const { PrismaClient } = pkg;
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';

 // 1. Cria o pool de conexão tradicional do Postgres usando o .env
const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });

// 2. Transforma o pool em um adaptador que o Prisma entende
const adapter = new PrismaPg(pool);

// 3. Passa o adaptador para o construtor do Prisma Client
const prisma = new PrismaClient({ adapter });

export default prisma; 