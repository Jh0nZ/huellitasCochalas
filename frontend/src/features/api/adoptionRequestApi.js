import { apiSlice } from "./apiSlice";

const adoptionRequestApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		sendAdoptionRequest: builder.mutation({
			query: (data) => ({
				url: "adoption-requests",
				method: "POST",
				body: data,
			}),
		}),
		getAllAdoptionRequests: builder.query({
			query: () => "adoption-requests",
		}),
		getAdoptionRequest: builder.query({
			query: (id) => "adoption-requests/" + id,
		}),
	}),
});

export const {
	useGetAllAdoptionRequestsQuery,
	useSendAdoptionRequestMutation,
	useGetAdoptionRequestQuery,
} = adoptionRequestApi;
