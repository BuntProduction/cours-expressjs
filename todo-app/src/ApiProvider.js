const BASE_URL = "http://localhost:5000/api/todos";

export const ApiProvider = {
  // Récupérer tous les todos
  async getTodos() {
    const response = await fetch(BASE_URL);
    if (!response.ok) {
      throw new Error(
        `Erreur lors de la récupération des todos : ${response.status}`
      );
    }
    return response.json(); // Retourne les données sous forme de JSON
  },

  // Ajouter un nouveau todo
  async addTodo(content) {
    const response = await fetch(BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content }),
    });

    if (!response.ok) {
      throw new Error(`Erreur lors de l'ajout d'un todo : ${response.status}`);
    }
    return response.json(); // Retourne le todo ajouté
  },

  // Modifier un todo par ID
  async updateTodo(id, content) {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content }),
    });

    if (!response.ok) {
      throw new Error(
        `Erreur lors de la modification d'un todo : ${response.status}`
      );
    }
    return response.json(); // Retourne le todo mis à jour
  },

  // Supprimer un todo par ID
  async deleteTodo(id) {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(
        `Erreur lors de la suppression d'un todo : ${response.status}`
      );
    }
    return response.json(); // Retourne un message de succès
  },
};
