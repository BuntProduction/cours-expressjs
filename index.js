import express from "express";
import { todosRouteur } from "./src/todos.js";
import userRouter from "./src/routes/userRoutes.js";
import connectDB from "./db.js";
import cors from "cors";

const PORT = 5000;
const app = express();

// bug cors sinon
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

// Connexion à MongoDB
connectDB();

app.use(express.static("public"));
app.use(express.json());

const loggerMiddleware = (req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
};
app.use(loggerMiddleware);

// Routes
app.use("/api/todos", todosRouteur);
app.use("/api/users", userRouter); //route pour register l'user

app.listen(PORT, () => {
  console.log(`Serveur lancé sur http://localhost:${PORT}`);
});
