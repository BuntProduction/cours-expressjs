import mongoose from "mongoose";

// Définir le schéma Todo
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

// Créer le modèle Todo
const Todo = mongoose.model("Todo", todoSchema);

export default Todo;
