import { Queue } from "bullmq";
import { redisConfig } from "../config/redisConfig.ts";

export const reportQueue = new Queue("relatorios-queue", {
  connection: redisConfig,
});
