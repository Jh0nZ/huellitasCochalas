import { apiSlice } from "./apiSlice";

const breedApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getBreeds: builder.query({
			query: () => "breeds",
			providesTags: ["Breeds"],
		}),
	}),
});

export const { useGetBreedsQuery } = breedApi;
