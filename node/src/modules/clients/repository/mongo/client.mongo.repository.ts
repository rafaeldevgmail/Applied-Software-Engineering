import { IClientRepository } from "@/modules/clients/repository/client.repository.interface.ts";
import type {
  PaginationOptions,
  PaginatedResult,
  ClientPublic,
} from "@/modules/clients/repository/prisma/client.prisma.repository.ts";
import { connectMongo, nextId } from "@/lib/mongo.ts";
import { ClientModel } from "@/modules/clients/repository/mongo/client.mongo.model.ts";

// 1. Definição centralizada dos campos públicos que o banco deve retornar
// (espelha o clientSelect do repositório Prisma)
const clientSelect =
  "id userId name email phone company status notes createdAt updatedAt -_id";

export class MongoClientRepository implements IClientRepository {
  constructor() {
    connectMongo().catch((error) => {
      console.error("Erro ao conectar no MongoDB:", error);
    });
  }

  // --- CREATE ---
  async create(data: any): Promise<ClientPublic | null> {
    await connectMongo();
    const nextIdValue = await nextId("clients");
    const clientData = { ...data, id: nextIdValue };
    await ClientModel.create(clientData);
    return this.findById(clientData.id);
  }

  // --- FIND BY ID ---
  async findById(id: number): Promise<ClientPublic | null> {
    await connectMongo();
    const client = await ClientModel.findOne({ id })
      .select(clientSelect)
      .lean();
    return client as ClientPublic | null;
  }

  //--- FIND ONE ---
  async findByEmail(email: string): Promise<ClientPublic | null> {
    await connectMongo();
    const client = await ClientModel.findOne({ email })
      .select(clientSelect)
      .lean();
    return client as ClientPublic | null;
  }

  // --- FIND MANY ---
  async findAll(
    options: PaginationOptions = {},
  ): Promise<PaginatedResult<ClientPublic>> {
    await connectMongo();
    const page = Math.max(1, options.page ?? 1);
    const limit = Math.max(1, Math.min(options.limit ?? 10, 100)); // Limite máx. de 100 por segurança
    const skip = (page - 1) * limit;

    const where: any = {
      ...(options.role && { role: options.role }),
    };

    const [data, total] = await Promise.all([
      ClientModel.find(where)
        .select(clientSelect)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      ClientModel.countDocuments(where),
    ]);

    return {
      data,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  // --- UPDATE ---
  async update(id: number, data: any): Promise<ClientPublic | null> {
    await connectMongo();
    const client = await ClientModel.findOneAndUpdate(
      { id },
      { $set: data },
      { returnDocument: "after" },
    )
      .select(clientSelect)
      .lean();
    return client as ClientPublic | null;
  }

  // --- DELETE ---
  async delete(id: number): Promise<ClientPublic | null> {
    await connectMongo();
    const client = await ClientModel.findOneAndDelete({ id })
      .select(clientSelect)
      .lean();
    return client as ClientPublic | null;
  }
}
