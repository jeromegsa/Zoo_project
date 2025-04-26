import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { annonceService } from "./AnnonceService"

// 📦 Requête pour récupérer toutes les annonces
export const fetchAnnonces = createAsyncThunk(
  "annonces/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await annonceService.getAllAnnonces()
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data || "Erreur inconnue")
    }
  }
)

// 🔨 Requête pour créer une annonce
export const createAnnonce = createAsyncThunk(
  "annonces/create",
  async (data, { rejectWithValue }) => {
    try {
      const response = await annonceService.createAnnonce(data)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data || "Erreur inconnue")
    }
  }
)

const initialState = {
  annonces: [],
  isLoading: false,
  error: null,
}

const annonceSlice = createSlice({
  name: "annonces",
  initialState,
  reducers: {
    clearAnnonces(state) {
      state.annonces = []
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAnnonces.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchAnnonces.fulfilled, (state, action) => {
        state.isLoading = false
        state.annonces = action.payload
      })
      .addCase(fetchAnnonces.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })

      .addCase(createAnnonce.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(createAnnonce.fulfilled, (state, action) => {
        state.isLoading = false
        state.annonces.push(action.payload)
      })
      .addCase(createAnnonce.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
  }
})

export const { clearAnnonces } = annonceSlice.actions
export default annonceSlice.reducer
