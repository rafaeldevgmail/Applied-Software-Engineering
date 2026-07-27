import { IClientRepository } from "@/client.repository.interface.ts";
import prisma from "@/lib/prisma.ts";
import { Client } from "@prisma/client";

export class PrismaClientRepository implements IClientRepository {
  // --- CREATE ---
  async create(data: any): Promise<Client | null> {
    const client: Client = await prisma.client.create({
      data,
    });
    return client;
  }

  // --- FIND BY ID ---
  async findById(id: number): Promise<Client | null> {
    const client: Client | null = await prisma.client.findUnique({
      where: { id },
    });
    return client;
  }

  //--- FIND ONE ---
  async findByEmail(email: string): Promise<Client | null> {
    const client: Client | null = await prisma.client.findUnique({
      where: { email },
    });
    return client;
  }

  // --- FIND MANY ---
  async findAll(options?: {
    skip?: number;
    take?: number;
    role?: string;
  }): Promise<{ data: Client[]; total: number }> {
    const { skip, take, role } = options || {};
    const clients: Client[] = await prisma.client.findMany({
      skip,
      take,
      where: {
        role,
      },
    });
    const total: number = await prisma.client.count({
      where: {
        role,
      },
    });
    return {
      data: clients.map((client) => client),
      total,
    };
  }

  // --- UPDATE ---
  async update(id: number, data: any): Promise<Client | null> {
    const client: Client | null = await prisma.client.update({
      where: { id },
      data,
    });
    return client;
  }

  // --- DELETE ---
  async delete(id: number): Promise<Client | null> {
    const client: Client | null = await prisma.client.delete({ where: { id } });
    return client;
  }
}
