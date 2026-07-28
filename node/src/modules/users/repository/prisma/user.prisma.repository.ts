import { IUserRepository } from "@/user.repository.interface.ts";
import prisma from "@/lib/prisma.ts";
import { Prisma, User } from "@prisma/client";

// 1. Definição centralizada dos campos públicos que o banco deve retornar
export const userSelect = Prisma.validator<Prisma.UserSelect>()({
  id: true,
  name: true,
  email: true,
  createdAt: true,
  updatedAt: true,
  // A senha (password) é omitida por padrão aqui!
});

export type UserPublic = Prisma.UserGetPayload<{ select: typeof userSelect }>;

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

export class PrismaUserRepository implements IUserRepository {
  // --- CREATE ---
  async create(data: any): Promise<UserPublic | null> {
    const { password_confirmation, ...prismaData } = data;
    return prisma.user.create({
      data: prismaData,
      select: userSelect,
    });
  }

  // --- FIND BY ID ---
  async findById(id: number): Promise<UserPublic | null> {
    return prisma.user.findUnique({ where: { id }, select: userSelect });
  }

  //--- FIND ONE ---
  async findByEmail(email: string): Promise<UserPublic | null> {
    return prisma.user.findUnique({
      where: { email },
      select: userSelect,
    });
  }

  // --- FIND MANY ---
  async findAll(
    options: PaginationOptions = {},
  ): Promise<PaginatedResult<UserPublic>> {
    const page = Math.max(1, options.page ?? 1);
    const limit = Math.max(1, Math.min(options.limit ?? 10, 100)); // Limite máx. de 100 por segurança
    const skip = (page - 1) * limit;

    const where: Prisma.UserWhereInput = {
      ...(options.role && { role: options.role }),
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
    return prisma.user.update({
      where: { id },
      data,
      select: userSelect,
    });
  }

  // --- DELETE ---
  async delete(id: number): Promise<UserPublic | null> {
    return prisma.user.delete({
      where: { id },
      select: userSelect,
    });
  }

  //--- GET PASSWORD ---
  async getPassByEmail(email: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: { email },
    });
  }
}
