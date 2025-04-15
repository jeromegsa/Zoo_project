import api from "../../api/authConfig";

const token = localStorage.getItem('access_token');

export const registerService = {
  register: async (userData) => {
    const response = await api.post(
      '/users',
      userData,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data;
  }
};
