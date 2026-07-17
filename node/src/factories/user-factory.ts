// Importar os repositórios aqui
// import { MongoUserRepository } from "@/repositories/mongo/user.mongo.repository.tsx";
import { PrismaUserRepository } from "@/modules/users/repository/prisma/user.prisma.repository.ts";
import { UserController } from "@/modules/users/user.controller.ts";
import { AuthController } from "@/modules/auth/auth.controller.ts";

// 1. Escolher a estratégia de banco aqui:
// const userRepository = new PrismaUserRepository();
// const userRepository = new MongoUserRepository();

const userRepository = new PrismaUserRepository();

export const userController = new UserController(userRepository);
export const authController = new AuthController(userRepository);
