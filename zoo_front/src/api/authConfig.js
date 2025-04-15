import axios from 'axios';
import { authService } from '../features/auth/AuthService';
const api = axios.create({
  baseURL: 'http://localhost:8000/',
});

// Intercepteur pour injecter le token
api.interceptors.request.use((config) => {
  
  if (authService.isTokenExpired()) {
    localStorage.removeItem("access_token");
    localStorage.removeItem("token_expiration");
  }
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;