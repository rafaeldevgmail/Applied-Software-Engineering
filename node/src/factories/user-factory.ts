import { env } from "@/config/env.ts";
import { PrismaUserRepository } from "@/modules/users/repository/prisma/user.prisma.repository.ts";
import { MongoUserRepository } from "@/modules/users/repository/mongo/user.mongo.repository.ts";
import { GraphQLUserRepository } from "@/modules/users/repository/graphql/user.graphql.repository.ts";
import { UserController } from "@/modules/users/user.controller.ts";
import { AuthController } from "@/modules/auth/auth.controller.ts";

// 1. Estratégia de banco escolhida pela variável DATABASE_PROVIDER (postgres | mongo)
// 2. Estratégia de camada CRUD escolhida pela variável CRUD_MODE (default | graphql)
const userRepository =
  env.CRUD_MODE === "graphql"
    ? new GraphQLUserRepository()
    : env.DATABASE_PROVIDER === "mongo"
      ? new MongoUserRepository()
      : new PrismaUserRepository();

export const userController = new UserController(userRepository);
export const authController = new AuthController(userRepository);
