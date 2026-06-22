import express from "express";
import cors from "cors";
import reportRoutes from "./routes/reportRoutes.js";
import authRouter from "./routes/authRoutes.js";
import usersRouter from "./routes/userRoutes.js";

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

app.get("/", (req, res) => {
  res.json({ message: "App is running on docker container " });
});

app.get("/", (req, res) => {
  res.status(200).json({
    message: "API funcionando",
  });
});

app.use("/users", usersRouter);

// Injeta os blocos de rotas do sistema
app.use("/api", reportRoutes);

export default app;
