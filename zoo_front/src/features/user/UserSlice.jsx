import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { registerService } from "./UserService"; 

const registerUser = createAsyncThunk(
    '/users',
    async (userData, { rejectWithValue }) => {
        try {
            const response = await registerService.register(userData);
            return response.data; // axios retourne directement `data` ici
        } catch (error) {
            return rejectWithValue({
                message: error.response?.data?.message || "Erreur lors de l'ajout depuis le slice"
            });
        }
    })
const initialState = {
    user: null,
    isLoading: false,
    error: null,
};

const registerSlice = createSlice({
    name: 'register',
    initialState,
    reducers: {
        register: (state, action) => {
            state.user = action.payload.user;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload?.message || action.error?.message || 'Erreur de connexion';
            });
    }
});

export { registerUser };
export default registerSlice.reducer;
