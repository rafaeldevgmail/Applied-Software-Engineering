import express from "express";
import { clientController } from "@/factories/client-factory.ts";

const router = express.Router();

router.get("/", clientController.index);
router.get("/:id", clientController.show);
router.post("/", clientController.create);
router.put("/:id", clientController.update);
router.delete("/:id", clientController.delete);

export default router;
