import api from "../../api/authConfig"

export const annonceService = {
  // 🔍 Récupérer toutes les annonces
  getAllAnnonces: async () => {
    return await api.get("/annonces")
  },

  // ➕ Créer une nouvelle annonce
  createAnnonce: async (data) => {
    return await api.post("/annonces", data)
  },

  // 🔄 Mettre à jour une annonce
  updateAnnonce: async (id, data) => {
    return await api.put(`/annonces/${id}`, data)
  },

  // ❌ Supprimer une annonce
  deleteAnnonce: async (id) => {
    return await api.delete(`/annonces/${id}`)
  },

  // 🔎 Récupérer une seule annonce par ID
  getAnnonceById: async (id) => {
    return await api.get(`/annonces/${id}`)
  }
}
