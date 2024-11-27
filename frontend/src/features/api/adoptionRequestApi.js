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
    }),
});

export const {
    useGetAllAdoptionRequestsQuery,
    useSendAdoptionRequestMutation,
    useGetAdoptionRequestQuery,
} = adoptionRequestApi;
