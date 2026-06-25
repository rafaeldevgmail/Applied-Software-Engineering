import Redis from "ioredis";
import { env } from "./env.ts";

export const redisConfig = {
  host: env.REDIS_HOST,
  port: env.REDIS_PORT,
  maxRetriesPerRequest: null,
};
