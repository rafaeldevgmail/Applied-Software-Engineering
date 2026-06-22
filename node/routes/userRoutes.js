import express from "express";
const router = express.Router();
import { UserController } from "../controllers/userController.js";
import { PrismaUserRepository } from "../repositories/prisma/user.prisma.repository.js";

// 1. Escolher a estratégia de banco aqui:
const userRepository = new PrismaUserRepository();
// const userRepository = new MongoUserRepository();

// 2. Escolher o controller aqui:
const userController = new UserController(userRepository);

router.post("/", userController.createUser);
router.get("/", userController.getUsers);
router.get("/:id", userController.getUserById);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);

export default router;
