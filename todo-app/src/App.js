import React, { useEffect, useState } from "react";
import { ApiProvider } from "./ApiProvider";
import { Trash2, Edit } from "lucide-react";
import TodoInput from "./TodoInput"; // Importer TodoInput

function App() {
  const [todos, setTodos] = useState([]); // État pour stocker les todos
  const [loading, setLoading] = useState(true); // État pour gérer le chargement
  const [error, setError] = useState(null); // État pour gérer les erreurs

  // Fonction pour récupérer les todos depuis l'API
  const fetchTodos = async () => {
    try {
      const data = await ApiProvider.getTodos();
      setTodos(data); // Mettre à jour l'état avec les todos
      setLoading(false); // Fin du chargement
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  // Ajouter un nouveau todo
  const handleAddTodo = async (content) => {
    try {
      const addedTodo = await ApiProvider.addTodo(content);
      setTodos([...todos, addedTodo]); // Ajouter le nouveau todo à la liste
    } catch (err) {
      setError(err.message);
    }
  };

  // Supprimer un todo
  const handleDeleteTodo = async (id) => {
    try {
      await ApiProvider.deleteTodo(id);
      setTodos(todos.filter((todo) => todo._id !== id)); // Supprimer le todo localement
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchTodos(); // Charger les todos au démarrage
  }, []);

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Erreur : {error}</p>;

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <span>Liste des Todos</span>
      </h1>
      <TodoInput onAddTodo={handleAddTodo} /> {/* Utilisation de TodoInput */}
      <ul style={{ listStyle: "none", padding: 0 }}>
        {todos.map((todo) => (
          <li
            key={todo._id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "10px",
              padding: "10px",
              border: "1px solid #ddd",
              borderRadius: "5px",
            }}
          >
            <span>{todo.content}</span>
            <div style={{ display: "flex", gap: "10px" }}>
              <button
                onClick={() => handleDeleteTodo(todo._id)}
                style={{
                  backgroundColor: "red",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  padding: "5px 10px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                }}
              >
                <Trash2 size={16} />
                Supprimer
              </button>
              <button
                style={{
                  backgroundColor: "green",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  padding: "5px 10px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                }}
              >
                <Edit size={16} />
                Modifier
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
