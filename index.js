import express from "express";
import { todosRouteur } from "./src/todos.js";
import connectDB from "./db.js";
import cors from "cors";

const PORT = 5000;
const app = express();
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
connectDB();

app.use(express.static("public"));
app.use(express.json());

const loggerMiddleware = (req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
};
app.use(loggerMiddleware);

app.use("/api/todos", todosRouteur);

app.listen(PORT, () => {
  console.log(`Serveur lancé sur http://localhost:${PORT}`);
});
