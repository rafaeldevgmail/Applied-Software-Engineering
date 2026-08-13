import express from "express";
import { userController } from "@/factories/user-factory.ts";

const router = express.Router();

// router.post("/", userController.create);
router.get("/", userController.index);
router.get("/:id", userController.show);
router.put("/:id", userController.update);
router.delete("/:id", userController.delete);
router.get("/email/:email", (req, res, next) =>
  userController.getByEmail(req, res, next),
);

export default router;
