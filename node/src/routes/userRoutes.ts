import express from "express";
const router = express.Router();
import { UserController } from "../controllers/userController.ts";
import { PrismaUserRepository } from "../repositories/prisma/user.prisma.repository.tsx";

// 1. Escolher a estratégia de banco aqui:
const userRepository = new PrismaUserRepository();
// const userRepository = new MongoUserRepository();

// 2. Escolher o controller aqui:
const userController = new UserController(userRepository);

router.post("/", userController.create);
router.get("/", userController.index);
router.get("/:id", userController.show);
router.put("/:id", userController.update);
router.delete("/:id", userController.delete);

export default router;
