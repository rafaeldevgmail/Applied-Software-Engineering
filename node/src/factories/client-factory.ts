import { env } from "@/config/env.ts";
import { PrismaClientRepository } from "@/modules/clients/repository/prisma/client.prisma.repository.ts";
import { MongoClientRepository } from "@/modules/clients/repository/mongo/client.mongo.repository.ts";
import { ClientController } from "@/modules/clients/client.controller.ts";

// 1. Estratégia de banco escolhida pela variável DATABASE_PROVIDER (postgres | mongo)
const clientRepository =
  env.DATABASE_PROVIDER === "mongo"
    ? new MongoClientRepository()
    : new PrismaClientRepository();

export const clientController = new ClientController(clientRepository);
