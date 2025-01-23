import React, { useState } from "react";
import { Plus } from "lucide-react";

const TodoInput = ({ onAddTodo }) => {
  const [inputValue, setInputValue] = useState(""); // État local pour l'input
  const [error, setError] = useState(null); // État local pour afficher une erreur

  const handleAddClick = () => {
    if (!inputValue.trim()) {
      setError("Le champ ne peut pas être vide !");
      return;
    }

    onAddTodo(inputValue); // Appeler la fonction parent
    setInputValue(""); // Réinitialiser l'input
    setError(null); // Réinitialiser l'erreur
  };

  return (
    <div style={{ marginBottom: "20px" }}>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Ajouter une tâche"
        style={{
          padding: "10px",
          fontSize: "16px",
          marginRight: "10px",
          width: "300px",
        }}
      />
      <button
        onClick={handleAddClick}
        style={{
          padding: "10px",
          fontSize: "16px",
          cursor: "pointer",
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          borderRadius: "5px",
          display: "flex",
          alignItems: "center",
          gap: "5px",
        }}
      >
        <Plus size={16} />
        Ajouter
      </button>
      {error && (
        <p style={{ color: "red", marginTop: "10px" }}>{error}</p> // Affichage d'une erreur
      )}
    </div>
  );
};

export default TodoInput;
