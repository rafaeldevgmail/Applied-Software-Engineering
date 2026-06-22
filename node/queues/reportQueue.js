import { Queue } from 'bullmq';
import { redisConfig } from '../config/redisConfig.js';

export const reportQueue = new Queue('relatorios-queue', { 
  connection: redisConfig 
});