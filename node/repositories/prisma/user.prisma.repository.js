// src/repositories/prisma/user.prisma.repository.js
import prisma from "../../lib/prisma.js";
import { IUserRepository } from "../user.repository.interface.js";

export class PrismaUserRepository {
  /**
   * Remove a senha e serializa datas para string.
   * Isso evita erros no Next.js ao passar dados do Servidor para o Cliente.
   */
  #sanitizeUser(user) {
    if (!user) return null;

    const { password, createdAt, updatedAt, ...userWithoutPassword } = user;

    return {
      ...userWithoutPassword,
      createdAt: createdAt ? createdAt.toISOString() : undefined,
      updatedAt: updatedAt ? updatedAt.toISOString() : undefined,
    };
  }

  // --- CREATE ---
  async create({ data }) {
    const user = await prisma.user.create({ data });
    return this.#sanitizeUser(user);
  }

  // --- FIND MANY ---
  async findAll(options = {}) {
    const users = await prisma.user.findMany();
    return users.map((user) => this.sanitizeUser(user));
  }

  // --- FIND BY ID ---
  async findById({ fields, where }) {
    const user = await prisma.user.findUnique({ where: { id } });
    return this.sanitizeUser(user);
  }

  // --- UPDATE ---
  async update({ id, data }) {
    const user = await prisma.user.update({
      where: { id },
      data,
    });
    return this.sanitizeUser(user);
  }

  // --- DELETE ---
  async delete({ where }) {
    const user = await prisma.user.delete({ where: { id } });
    return this.#sanitizeUser(user);
  }
}
