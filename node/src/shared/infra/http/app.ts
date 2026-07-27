import express, { Request, Response } from "express";
import cors from "cors";
import reportRoutes from "@/modules/reports/report.routes.ts";
import authRouter from "@/modules/auth/auth.routes.ts";
import usersRouter from "@/modules/users/user.routes.ts";
import clientsRouter from "@/modules/clients/client.routes.ts";
//BullMQ Board
import { serverAdapter } from "@/config/bullBoard.ts";
import { errorMiddleware } from "@/shared/middlewares/errorMiddleware.ts";

// CAPTURA DE ERROS GLOBAIS
process.on("uncaughtException", (error: Error) => {
  console.error("❌ [Uncaught Exception]:", error.message);
  // Mostra exatamente a linha do erro no terminal
  console.error(error.stack);
});
process.on("unhandledRejection", (reason: unknown) => {
  console.error("❌ [Unhandled Rejection]:", reason);
});

const app = express();

//Middleware para processar JSON
app.use(express.json());

//  Configuração do Cors
const allowedOrigins = [process.env.FRONTEND_URL || "http://localhost:5173"];
app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    //Cookies e sessões podem ser enviados com as requisições
    credentials: true,
  }),
);

// Rotas
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ message: "App is running on docker container " });
});

app.use("/admin/queues", serverAdapter.getRouter());
app.use("/auth", authRouter);
app.use("/users", usersRouter);
app.use("/clients", clientsRouter);
app.use("/api", reportRoutes);

//Middleware de erro do express
app.use(errorMiddleware);
export default app;
