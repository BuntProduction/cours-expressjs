//controller de l'user avec hashage bcrypt en terminal
import bcrypt from "bcrypt";
import { UserRepository } from "../repository/UserRepository.js";

export const registerUser = async (req, res) => {
  try {
    const { email, password, avatarURL } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email et mot de passe requis" });
    }

    const existingUser = await UserRepository.findByEmail(email);
    if (existingUser) {
      return res.status(401).json({ message: "Cet utilisateur existe déjà" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await UserRepository.create({
      email,
      password: hashedPassword,
      avatarURL,
    });

    res
      .status(201)
      .json({ message: "Utilisateur créé avec succès", user: newUser });
  } catch (err) {
    res.status(500).json({
      message: "Erreur lors de la création de l'utilisateur",
      error: err.message,
    });
  }
};
