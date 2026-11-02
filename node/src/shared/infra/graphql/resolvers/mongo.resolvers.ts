import { connectMongo, nextId } from "@/lib/mongo.ts";
import { UserModel } from "@/modules/users/repository/mongo/user.mongo.model.ts";
import { ClientModel } from "@/modules/clients/repository/mongo/client.mongo.model.ts";

// Campos públicos retornados pela camada GraphQL (espelha os selects dos repositórios originais)
const userSelect = "id name email emailVerifiedAt createdAt updatedAt -_id";
const clientSelect =
  "id userId name email phone company status notes createdAt updatedAt -_id";

function isoDate(value: unknown): string | null {
  if (!value) return null;
  return value instanceof Date ? value.toISOString() : String(value);
}

function mapUser(user: any) {
  if (!user) return null;
  return {
    ...user,
    emailVerifiedAt: isoDate(user.emailVerifiedAt),
    createdAt: isoDate(user.createdAt),
    updatedAt: isoDate(user.updatedAt),
  };
}

function mapClient(client: any) {
  if (!client) return null;
  return {
    ...client,
    createdAt: isoDate(client.createdAt),
    updatedAt: isoDate(client.updatedAt),
  };
}

// Conjunto de resolvers (rootValue) da camada GraphQL para MongoDB/Mongoose.
// Cada chave corresponde a um campo do schema SDL.
export const mongoResolvers = {
  user: async ({ id }: { id: number }) => {
    await connectMongo();
    const user = await UserModel.findOne({ id })
      .select(userSelect)
      .lean();
    return mapUser(user);
  },

  userByEmail: async ({ email }: { email: string }) => {
    await connectMongo();
    const user = await UserModel.findOne({ email: email.toLowerCase() })
      .select(userSelect)
      .lean();
    return mapUser(user);
  },

  userCredentialsByEmail: async ({ email }: { email: string }) => {
    await connectMongo();
    const user = await UserModel.findOne({ email: email.toLowerCase() })
      .select("-_id")
      .lean();
    if (!user) return null;
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      password: user.password,
      emailVerifiedAt: isoDate(user.emailVerifiedAt),
    };
  },

  users: async ({
    page: rawPage,
    limit: rawLimit,
    role,
  }: {
    page?: number;
    limit?: number;
    role?: string;
  }) => {
    await connectMongo();
    const page = Math.max(1, rawPage ?? 1);
    const limit = Math.max(1, Math.min(rawLimit ?? 10, 100)); // Limite máx. de 100 por segurança
    const skip = (page - 1) * limit;

    const where: any = {
      ...(role && { role }),
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
      data: data.map(mapUser),
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  },

  userCreate: async ({ data }: { data: any }) => {
    await connectMongo();
    const { password_confirmation, ...userData } = data;
    if (userData.email) {
      userData.email = userData.email.toLowerCase();
    }
    userData.id = await nextId("users");
    await UserModel.create(userData);
    const user = await UserModel.findOne({ id: userData.id })
      .select(userSelect)
      .lean();
    return mapUser(user);
  },

  userUpdate: async ({ id, data }: { id: number; data: any }) => {
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
    return mapUser(user);
  },

  userDelete: async ({ id }: { id: number }) => {
    await connectMongo();
    const user = await UserModel.findOneAndDelete({ id })
      .select(userSelect)
      .lean();
    return mapUser(user);
  },

  client: async ({ id }: { id: number }) => {
    await connectMongo();
    const client = await ClientModel.findOne({ id })
      .select(clientSelect)
      .lean();
    return mapClient(client);
  },

  clientByEmail: async ({ email }: { email: string }) => {
    await connectMongo();
    const client = await ClientModel.findOne({ email })
      .select(clientSelect)
      .lean();
    return mapClient(client);
  },

  clients: async ({
    page: rawPage,
    limit: rawLimit,
    role,
  }: {
    page?: number;
    limit?: number;
    role?: string;
  }) => {
    await connectMongo();
    const page = Math.max(1, rawPage ?? 1);
    const limit = Math.max(1, Math.min(rawLimit ?? 10, 100)); // Limite máx. de 100 por segurança
    const skip = (page - 1) * limit;

    const where: any = {
      ...(role && { role }),
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
      data: data.map(mapClient),
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  },

  clientCreate: async ({ data }: { data: any }) => {
    await connectMongo();
    const nextIdValue = await nextId("clients");
    const clientData = { ...data, id: nextIdValue };
    await ClientModel.create(clientData);
    const client = await ClientModel.findOne({ id: nextIdValue })
      .select(clientSelect)
      .lean();
    return mapClient(client);
  },

  clientUpdate: async ({ id, data }: { id: number; data: any }) => {
    await connectMongo();
    const client = await ClientModel.findOneAndUpdate(
      { id },
      { $set: data },
      { returnDocument: "after" },
    )
      .select(clientSelect)
      .lean();
    return mapClient(client);
  },

  clientDelete: async ({ id }: { id: number }) => {
    await connectMongo();
    const client = await ClientModel.findOneAndDelete({ id })
      .select(clientSelect)
      .lean();
    return mapClient(client);
  },
};
