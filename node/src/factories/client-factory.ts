import { env } from "@/config/env.ts";
import { PrismaClientRepository } from "@/modules/clients/repository/prisma/client.prisma.repository.ts";
import { MongoClientRepository } from "@/modules/clients/repository/mongo/client.mongo.repository.ts";
import { GraphQLClientRepository } from "@/modules/clients/repository/graphql/client.graphql.repository.ts";
import { ClientController } from "@/modules/clients/client.controller.ts";

// 1. Estratégia de banco escolhida pela variável DATABASE_PROVIDER (postgres | mongo)
// 2. Estratégia de camada CRUD escolhida pela variável CRUD_MODE (default | graphql)
const clientRepository =
  env.CRUD_MODE === "graphql"
    ? new GraphQLClientRepository()
    : env.DATABASE_PROVIDER === "mongo"
      ? new MongoClientRepository()
      : new PrismaClientRepository();

export const clientController = new ClientController(clientRepository);
