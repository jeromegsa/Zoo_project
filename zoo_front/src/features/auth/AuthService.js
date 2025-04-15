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
        const expirationTime = new Date().getTime() + 2 * 60 * 60 * 1000
        localStorage.setItem("access_token", response.data.access_token)
        localStorage.setItem('token_expiration', expirationTime.toString())
        return response.data;
    },
    getCurrentUser: async () => {
        const response = await api.get('/users/auth');
        console.log(response)
        return response.data; // Doit retourner { id, username, email, etc. }
    },

    register: async (userData) => {
        const response = await api.post('/auth/register', userData);
        return response.data;
    },
    isTokenExpired: () => {
        const expiration = localStorage.getItem("token_expiration");
        if (!expiration) return true;

        const now = new Date().getTime();
        return now > parseInt(expiration, 10)
    },
    logout: () => {
        localStorage.removeItem('authToken');
    },

};