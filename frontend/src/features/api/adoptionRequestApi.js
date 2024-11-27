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
			query: (petId) => {
				const queryParams = petId ? `?pet_id=${petId}` : "";
				return `adoption-requests${queryParams}`;
			},
		}),
		getAdoptionRequest: builder.query({
			query: (id) => "adoption-requests/" + id,
		}),
		updateAdoptionRequest: builder.mutation({
			query: ({ id, data }) => ({
				url: `adoption-requests/${id}`,
				method: "PUT",
				body: data,
			}),
		}),
	}),
});

export const {
	useGetAllAdoptionRequestsQuery,
	useSendAdoptionRequestMutation,
	useGetAdoptionRequestQuery,
	useUpdateAdoptionRequestMutation,
} = adoptionRequestApi;
