import { apiSlice } from "./apiSlice";

const sizeApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getSizes: builder.query({
			query: () => "sizes",
			providesTags: ["Sizes"],
		}),
	}),
});

export const { useGetSizesQuery } = sizeApi;
