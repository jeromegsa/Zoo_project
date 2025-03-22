import api from "./axios"

const API_URL=  import.meta.env.VITE_API_URL || "http://127.0.0.1:8000"

export const login = async (username, password) => {
    try {
      const formData = new URLSearchParams();
      formData.append("username", username);
      formData.append("password", password);
  
      const response = await api.post(API_URL+"/login", formData, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });
  
      if (response.data.access_token) {
        console.log(response.data.access_token);
        
        return { success: true, token: response.data.access_token };
      } else {
        return { success: false, message: "Token non reçu" };
      }
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "Erreur de connexion",
      };
    }
  };