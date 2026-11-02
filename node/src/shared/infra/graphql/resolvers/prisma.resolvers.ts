import { Prisma } from "@prisma/client";
import prisma from "@/lib/prisma.ts";
import type { PaginatedResult } from "@/modules/users/repository/prisma/user.prisma.repository.ts";

// Campos públicos retornados pela camada GraphQL (espelha o userSelect)
const userSelect = {
  id: true,
  name: true,
  email: true,
  emailVerifiedAt: true,
  createdAt: true,
  updatedAt: true,
} as const;

// Espelho do clientSelect do repositório Prisma
const clientSelect = {
  id: true,
  userId: true,
  name: true,
  email: true,
  phone: true,
  company: true,
  status: true,
  notes: true,
  createdAt: true,
  updatedAt: true,
} satisfies Prisma.ClientSelect;

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

// Conjunto de resolvers (rootValue) da camada GraphQL para PostgreSQL/Prisma.
// Cada chave corresponde a um campo do schema SDL.
export const prismaResolvers = {
  user: async ({ id }: { id: number }) => {
    const user = await prisma.user.findUnique({
      where: { id },
      select: userSelect,
    });
    return mapUser(user);
  },

  userByEmail: async ({ email }: { email: string }) => {
    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
      select: userSelect,
    });
    return mapUser(user);
  },

  userCredentialsByEmail: async ({ email }: { email: string }) => {
    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
      select: {
        id: true,
        email: true,
        name: true,
        password: true,
        emailVerifiedAt: true,
      },
    });
    if (!user) return null;
    return {
      ...user,
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
  }): Promise<PaginatedResult<any>> => {
    const page = Math.max(1, rawPage ?? 1);
    const limit = Math.max(1, Math.min(rawLimit ?? 10, 100)); // Limite máx. de 100 por segurança
    const skip = (page - 1) * limit;

    const where: Prisma.UserWhereInput = {
      ...(role && { role }),
    };

    const [data, total] = await prisma.$transaction([
      prisma.user.findMany({
        where,
        select: userSelect,
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
      }),
      prisma.user.count({ where }),
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
    const { password_confirmation, ...prismaData } = data;
    if (prismaData.email) {
      prismaData.email = prismaData.email.toLowerCase();
    }
    const user = await prisma.user.create({
      data: prismaData,
      select: userSelect,
    });
    return mapUser(user);
  },

  userUpdate: async ({ id, data }: { id: number; data: any }) => {
    if (data.email) {
      data.email = data.email.toLowerCase();
    }
    const user = await prisma.user.update({
      where: { id },
      data,
      select: userSelect,
    });
    return mapUser(user);
  },

  userDelete: async ({ id }: { id: number }) => {
    const user = await prisma.user.delete({
      where: { id },
      select: userSelect,
    });
    return mapUser(user);
  },

  client: async ({ id }: { id: number }) => {
    const client = await prisma.client.findUnique({
      where: { id },
      select: clientSelect,
    });
    return mapClient(client);
  },

  clientByEmail: async ({ email }: { email: string }) => {
    const client = await prisma.client.findUnique({
      where: { email },
      select: clientSelect,
    });
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
  }): Promise<PaginatedResult<any>> => {
    const page = Math.max(1, rawPage ?? 1);
    const limit = Math.max(1, Math.min(rawLimit ?? 10, 100)); // Limite máx. de 100 por segurança
    const skip = (page - 1) * limit;

    const where: Prisma.ClientWhereInput = {
      ...(role && { role }),
    };

    const [data, total] = await prisma.$transaction([
      prisma.client.findMany({
        where,
        select: clientSelect,
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
      }),
      prisma.client.count({ where }),
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
    const client = await prisma.client.create({
      data,
      select: clientSelect,
    });
    return mapClient(client);
  },

  clientUpdate: async ({ id, data }: { id: number; data: any }) => {
    const client = await prisma.client.update({
      where: { id },
      data,
      select: clientSelect,
    });
    return mapClient(client);
  },

  clientDelete: async ({ id }: { id: number }) => {
    const client = await prisma.client.delete({
      where: { id },
      select: clientSelect,
    });
    return mapClient(client);
  },
};
