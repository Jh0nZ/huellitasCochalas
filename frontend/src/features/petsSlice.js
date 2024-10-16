// src/features/petsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../api';

// Crear una acción asíncrona para obtener las mascotas
export const fetchPets = createAsyncThunk('pets/fetchPets', async () => {
  const response = await api.get('/pets');
  return response.data;
});
// Asegúrate de exportar registerPet
export const registerPet = createAsyncThunk('pets/registerPet', async (petData) => {
    const response = await apiSlice.endpoints.registerPet.initiate(petData); 
    return response.data;
  });
  

// Crear un Slice
const petsSlice = createSlice({
  name: 'pets',
  initialState: {
    pets: [],
    loading: false,
    error: null,
  },
  reducers: {
    // Puedes agregar otros reducers si es necesario
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPets.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPets.fulfilled, (state, action) => {
        state.loading = false;
        state.pets = action.payload;
      })
      .addCase(fetchPets.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
  
});

// Exportar el reducer
export default petsSlice.reducer;
