//route pour le register l'user
import express from "express";
import { registerUser } from "../controllers/userController.js";

const router = express.Router();

// Route pour save l'user
router.post("/register", registerUser);

export default router;
