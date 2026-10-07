import mongoose from "mongoose";
import { env } from "@/config/env.ts";

let connectionPromise: Promise<typeof mongoose> | null = null;

export async function connectMongo(): Promise<typeof mongoose> {
  if (!connectionPromise) {
    const uri = env.MONGO_URI;
    if (!uri) {
      throw new Error(
        "❌ Erro: A variável de ambiente MONGO_URI é obrigatória quando DATABASE_PROVIDER=mongo!",
      );
    }
    connectionPromise = mongoose.connect(uri).catch((error) => {
      connectionPromise = null;
      throw error;
    });
  }
  return connectionPromise;
}

const counterSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  seq: { type: Number, required: true },
});

const existingCounter = mongoose.models.Counter as
  | mongoose.Model<any>
  | undefined;

export const Counter =
  existingCounter ?? mongoose.model("Counter", counterSchema);

export async function nextId(collection: string): Promise<number> {
  try {
    const counter = await Counter.findOneAndUpdate(
      { _id: collection },
      { $inc: { seq: 1 } },
      { upsert: true, returnDocument: "after" },
    ).lean();
    return counter.seq;
  } catch {
    // Primeira criação concorrente da coleção: o documento já existe, tenta de novo
    const counter = await Counter.findOneAndUpdate(
      { _id: collection },
      { $inc: { seq: 1 } },
      { returnDocument: "after" },
    ).lean();
    return counter.seq;
  }
}
