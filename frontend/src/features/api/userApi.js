import { apiSlice } from "./apiSlice";

const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (data) => ({
        url: "register",
        method: "POST",
        body: data,
      }),
    }),
    loginUser: builder.mutation({
      query: (data) => ({
        url: "login",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: data,
      }),
    }),
    logoutUser: builder.mutation({
      query: () => ({
        url: "logout",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
    checkUser: builder.query({
      query: () => "user",
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useLogoutUserMutation,
  useCheckUserQuery,
} = userApi;
