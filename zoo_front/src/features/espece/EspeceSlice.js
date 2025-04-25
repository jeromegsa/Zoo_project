import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { especeService } from "./EspeceService"

export const fetchEspeces = createAsyncThunk(
    'especes/fetchAll',
    async (_, { rejectWithValue }) => {
        try {
            const response = await especeService.getAllEspece();
            console.log(response)
            return response;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

const initialState = {
    espece: null,
    isLoading: false,
    error: null
}

const especeSlice = createSlice({
    name: "especes",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchEspeces.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchEspeces.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = null;
                state.espece = action.payload;
            })
            .addCase(fetchEspeces.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || 'Erreur inconnue';
            });
    }
})

export default especeSlice.reducer;
