import api from '../../api/authConfig';

import qs from 'qs';
export const authService = {
    login: async (credentials) => {
        const response = await api.post(
            '/login',
            qs.stringify(credentials), // Transforme l'objet en string encodé
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }
        );
        return response.data; 
    },
    register: async (userData) => {
        const response = await api.post('/auth/register', userData);
        return response.data;
    },
    logout: () => {
        localStorage.removeItem('authToken');
    },
    getCurrentUser: async () => {
        const response = await api.get('/auth/me');
        return response.data;
    }
};