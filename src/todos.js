import express from "express";
import Todo from "../src/models/Todo.js";

export const todosRouteur = express.Router();

// GET: Récupérer tous les todos
todosRouteur.get("/", async (req, res) => {
  try {
    const todos = await Todo.find();
    res.status(200).json(todos);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Erreur lors de la récupération des todos" });
  }
});

// GET: Récupérer un todo par son id
todosRouteur.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await Todo.findById(id);

    if (!todo) {
      return res.status(404).json({ message: "Todo introuvable" });
    }

    res.status(200).json(todo);
  } catch (err) {
    res.status(500).json({ message: "Erreur lors de la récupération du todo" });
  }
});

// POST: Ajouter un nouveau todo
todosRouteur.post("/", async (req, res) => {
  try {
    const { content } = req.body;
    const newTodo = new Todo({ content });
    const savedTodo = await newTodo.save();
    res.status(201).json(savedTodo);
  } catch (err) {
    res.status(500).json({ message: "Erreur lors de l'ajout du todo" });
  }
});

// DELETE: Supprimer un todo
todosRouteur.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Todo.findByIdAndDelete(id);
    res.status(200).json({ message: "Todo supprimé" });
  } catch (err) {
    res.status(500).json({ message: "Erreur lors de la suppression du todo" });
  }
});

// PUT: Modifier un todo
todosRouteur.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { content } = req.body;
    const updatedTodo = await Todo.findByIdAndUpdate(
      id,
      { content },
      { new: true }
    );
    res.status(200).json(updatedTodo);
  } catch (err) {
    res.status(500).json({ message: "Erreur lors de la modification du todo" });
  }
});
