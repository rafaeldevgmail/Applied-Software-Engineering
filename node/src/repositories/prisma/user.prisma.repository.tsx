// src/repositories/prisma/user.prisma.repository.js
import { IUserRepository } from "../user.repository.interface.ts";
import prisma from "../../lib/prisma.ts";
import { User } from "@prisma/client";

export class PrismaUserRepository implements IUserRepository {
  /**
   * Remove a senha e serializa datas para string.
   * Isso evita erros no Next.js ao passar dados do Servidor para o Cliente.
   */
  private sanitizeUser(user: User | null): User | null {
    if (!user) return null;

    const { password, createdAt, updatedAt, ...userWithoutPassword } = user;

    return {
      ...userWithoutPassword,
      createdAt: createdAt ? createdAt.toISOString() : undefined,
      updatedAt: updatedAt ? updatedAt.toISOString() : undefined,
    };
  }

  // --- CREATE ---
  async create(data: any): Promise<User | null> {
    const { password_confirmation, ...prismaData } = data;
    const user: User = await prisma.user.create({ data: prismaData });
    return this.sanitizeUser(user);
  }

  // --- FIND BY ID ---
  async findById(id: number): Promise<User | null> {
    const user: User | null = await prisma.user.findUnique({ where: { id } });
    return this.sanitizeUser(user);
  }
  // --- FIND MANY ---
  async findAll(options?: {
    skip?: number;
    take?: number;
    role?: string;
  }): Promise<{ data: User[]; total: number }> {
    const { skip, take, role } = options || {};
    const users: User[] = await prisma.user.findMany({
      skip,
      take,
      where: {
        role,
      },
    });
    const total: number = await prisma.user.count({
      where: {
        role,
      },
    });
    return {
      data: users.map((user) => this.sanitizeUser(user)),
      total,
    };
  }

  // --- UPDATE ---
  async update(id: number, data: any): Promise<User | null> {
    const user: User | null = await prisma.user.update({
      where: { id },
      data,
    });
    return this.sanitizeUser(user);
  }

  // --- DELETE ---
  async delete(id: number): Promise<User | null> {
    const user: User | null = await prisma.user.delete({ where: { id } });
    return this.sanitizeUser(user);
  }
}
