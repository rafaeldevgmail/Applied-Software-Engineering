import { IClientRepository } from "@/client.repository.interface.ts";
import prisma from "@/lib/prisma.ts";
import { Prisma, Client } from "@prisma/client";

// 1. Definição centralizada dos campos públicos que o banco deve retornar
export const clientSelect = Prisma.validator<Prisma.ClientSelect>()({
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
});

export type ClientPublic = Prisma.ClientGetPayload<{
  select: typeof clientSelect;
}>;

export interface PaginationOptions {
  page?: number;
  limit?: number;
  role?: string;
}

export interface PaginatedResult<T> {
  data: T[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export class PrismaClientRepository implements IClientRepository {
  // --- CREATE ---
  async create(data: any): Promise<ClientPublic | null> {
    return prisma.client.create({
      data,
      select: clientSelect,
    });
  }

  // --- FIND BY ID ---
  async findById(id: number): Promise<ClientPublic | null> {
    return prisma.client.findUnique({
      where: { id },
      select: clientSelect,
    });
  }

  //--- FIND ONE ---
  async findByEmail(email: string): Promise<ClientPublic | null> {
    return prisma.client.findUnique({
      where: { email },
      select: clientSelect,
    });
  }

  // --- FIND MANY ---
  async findAll(
    options: PaginationOptions = {},
  ): Promise<PaginatedResult<ClientPublic>> {
    const page = Math.max(1, options.page ?? 1);
    const limit = Math.max(1, Math.min(options.limit ?? 10, 100)); // Limite máx. de 100 por segurança
    const skip = (page - 1) * limit;

    const where: Prisma.ClientWhereInput = {
      ...(options.role && { role: options.role }),
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
    return prisma.client.update({
      where: { id },
      data,
      select: clientSelect,
    });
  }

  // --- DELETE ---
  async delete(id: number): Promise<ClientPublic | null> {
    return prisma.client.delete({
      where: { id },
      select: clientSelect,
    });
  }
}
