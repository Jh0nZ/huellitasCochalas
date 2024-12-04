import { apiSlice } from "./apiSlice";

const petApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    registerPet: builder.mutation({
      query: (pet) => ({
        url: "pets",
        method: "POST",
        body: pet,
      }),
     
      invalidatesTags: ["Pets"],
    }),
    getPets: builder.query({
      query: () => "pets",
      providesTags: ["Pets"], 
    }),
    getPetById: builder.query({
      query: (id) => `pets/${id}`,
      providesTags: (result, error, id) => [{ type: "Pets", id }],
    }),
    getAllPets: builder.query({
      query: (filters = {}) => {
        const queryParams = new URLSearchParams(filters).toString();
        return `/pets?${queryParams}`;
      },
    }),
  }),
});

export const {
  useGetPetsQuery,
  useRegisterPetMutation,
  useGetAllPetsQuery,
  useGetPetByIdQuery,
} = petApi;
