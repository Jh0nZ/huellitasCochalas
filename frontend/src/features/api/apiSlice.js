import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ 
    baseUrl: "http://localhost:8000/api/",
    credentials: "include" 
  }),
  tagTypes: ["Pets", "AdoptionRequests"],
  endpoints: (builder) => ({
    getPets: builder.query({
      query: () => "pets",
      providesTags: ["Pets"],
    }),
    getPetById: builder.query({
      query: (id) => `pets/${id}`,
    }),
    registerPet: builder.mutation({
      query: (pet) => ({
        url: "pets",
        method: "POST",
        body: pet,
      }),
      invalidatesTags: ["Pets"],
    }),
    getAllPets: builder.query({
      query: () => "pets",
      providesTags: ["Pets"],
    }),
  }),
});

export const {
  useGetPetsQuery,
  useRegisterPetMutation,
  useGetAllPetsQuery,
  useGetPetByIdQuery,
} = apiSlice;
