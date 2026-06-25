import dotenv from "dotenv";
dotenv.config(); // Carrega o .env imediatamente ao ser importado

// Opcional, mas muito profissional: validar se as variáveis essenciais existem
if (!process.env.REDIS_HOST) {
  throw new Error("❌ Erro: A variável de ambiente REDIS_HOST é obrigatória!");
}

export const env = {
  REDIS_HOST: process.env.REDIS_HOST,
  REDIS_PORT: Number(process.env.REDIS_PORT) || 6379,
  NODE_ENV: process.env.NODE_ENV || "development",
};
