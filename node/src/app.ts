import express, { Request, Response } from "express";
import cors from "cors";
import reportRoutes from "./routes/reportRoutes.ts";
import authRouter from "./routes/authRoutes.ts";
import usersRouter from "./routes/userRoutes.ts";
import { errorMiddleware } from "./middlewares/errorMiddleware.ts";
//BullMQ Board
import { serverAdapter } from "./config/bullBoard.ts";

const app = express();

// 2. Libera o CORS para o Frontend
/*app.use(cors({
  origin: 'http://localhost:5173', // Porta do Frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));*/

app.use(cors({ origin: "*" }));

//Middleware para processar JSON (importante para registros)
//Ativa o parser de JSON
app.use(express.json());

app.use("/auth", authRouter);

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ message: "App is running on docker container " });
});

app.use("/admin/queues", serverAdapter.getRouter());

app.use("/users", usersRouter);

// Injeta os blocos de rotas do sistema
app.use("/api", reportRoutes);

app.use(errorMiddleware);
export default app;
