import mongoose from "mongoose";

// Définir le schéma pour les Todos
const todoSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Créer le modèle basé sur le schéma
export const TodoModel = mongoose.model("Todo", todoSchema);
