import { IUserRepository } from "@/modules/users/repository/user.repository.interface.ts";
import type {
  PaginationOptions,
  PaginatedResult,
  UserPublic,
} from "@/modules/users/repository/prisma/user.prisma.repository.ts";
import { connectMongo, nextId } from "@/lib/mongo.ts";
import { UserModel } from "@/modules/users/repository/mongo/user.mongo.model.ts";

// 1. Definição centralizada dos campos públicos que o banco deve retornar
// (espelha o userSelect do repositório Prisma)
const userSelect = "id name email emailVerifiedAt createdAt updatedAt -_id";

export class MongoUserRepository implements IUserRepository {
  constructor() {
    connectMongo().catch((error) => {
      console.error("Erro ao conectar no MongoDB:", error);
    });
  }

  // --- CREATE ---
  async create(data: any): Promise<UserPublic | null> {
    await connectMongo();
    const { password_confirmation, ...userData } = data;
    if (userData.email) {
      userData.email = userData.email.toLowerCase();
    }
    userData.id = await nextId("users");
    await UserModel.create(userData);
    return this.findById(userData.id);
  }

  // --- FIND BY ID ---
  async findById(id: number): Promise<UserPublic | null> {
    await connectMongo();
    const user = await UserModel.findOne({ id }).select(userSelect).lean();
    return user as UserPublic | null;
  }

  //--- FIND ONE ---
  async findByEmail(email: string): Promise<UserPublic | null> {
    await connectMongo();
    const user = await UserModel.findOne({ email: email.toLowerCase() })
      .select(userSelect)
      .lean();
    return user as UserPublic | null;
  }

  // --- FIND MANY ---
  async findAll(
    options: PaginationOptions = {},
  ): Promise<PaginatedResult<UserPublic>> {
    await connectMongo();
    const page = Math.max(1, options.page ?? 1);
    const limit = Math.max(1, Math.min(options.limit ?? 10, 100)); // Limite máx. de 100 por segurança
    const skip = (page - 1) * limit;

    const where: any = {
      ...(options.role && { role: options.role }),
    };

    const [data, total] = await Promise.all([
      UserModel.find(where)
        .select(userSelect)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      UserModel.countDocuments(where),
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
  async update(id: number, data: any): Promise<UserPublic | null> {
    await connectMongo();
    if (data.email) {
      data.email = data.email.toLowerCase();
    }
    const user = await UserModel.findOneAndUpdate(
      { id },
      { $set: data },
      { returnDocument: "after" },
    )
      .select(userSelect)
      .lean();
    return user as UserPublic | null;
  }

  // --- DELETE ---
  async delete(id: number): Promise<UserPublic | null> {
    await connectMongo();
    const user = await UserModel.findOneAndDelete({ id })
      .select(userSelect)
      .lean();
    return user as UserPublic | null;
  }

  //--- GET PASSWORD ---
  async getPassByEmail(email: string): Promise<any> {
    await connectMongo();
    const user = await UserModel.findOne({ email: email.toLowerCase() })
      .select("-_id")
      .lean();
    return user as UserPublic | null;
  }
}
