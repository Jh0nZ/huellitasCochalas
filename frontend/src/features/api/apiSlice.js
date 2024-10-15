// src/features/api/apiSlice.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }), // Asegúrate de que la base URL es correcta
  tagTypes: ['Pets', 'AdoptionRequests'], // Puedes agregar más tags aquí
  endpoints: (builder) => ({
    getPets: builder.query({
      query: () => '/pets',
      providesTags: ['Pets'],
    }),
    registerPet: builder.mutation({
      query: (pet) => ({
        url: '/pets',
        method: 'POST',
        body: pet,
      }),
      invalidatesTags: ['Pets'],
    }),
  }),
});

export const { useGetPetsQuery, useRegisterPetMutation } = apiSlice;
