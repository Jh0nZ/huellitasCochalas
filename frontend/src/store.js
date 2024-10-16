// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './features/api/apiSlice';

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer, // Incluye el reducer de RTK Query
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware), // Incluye el middleware de RTK Query
});
