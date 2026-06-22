import dotenv from 'dotenv';
dotenv.config();

// Importa todos os workers do sistema
import { reportWorker } from '../workers/reportWorker.js';
// import { emailWorker } from './emailWorker.js';

console.log('👷 [Workers] Todos os processos de segundo plano foram iniciados!');