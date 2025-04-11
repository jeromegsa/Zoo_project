import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { authService } from './services';

// Déclaration de l'action asynchrone
const loginUser = createAsyncThunk(
    '/login',
    async (credentials, { rejectWithValue }) => {
        try {
            const response = await authService.login(credentials);

            if (!response.access_token) {
                throw new Error('Token manquant dans la réponse');
            }
            console.log(response)
            return response; // Renvoie la réponse brute du backend

        } catch (error) {
            return rejectWithValue({
                message: error.response?.data?.message ||
                    'Nom d\'utilisateur ou mot de passe incorrect'
            });
        }
    }
);

const initialState = {
    user: null,
    token: null,
    isLoading: false,
    error: null
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        logout: (state) => {
            state.user = null;
            state.token = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.token = action.payload.access_token; // Modifié ici
                state.tokenType = action.payload.token_type;
                state.user = { username: action.meta.arg.username }; // Solution temporaire
                state.error = null;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload?.message || action.error?.message || 'Erreur de connexion';
            });
    }
});


// Export unique et correctement organisé
export const { login, logout } = authSlice.actions;
export { loginUser }; // Export nommé unique
export default authSlice.reducer;