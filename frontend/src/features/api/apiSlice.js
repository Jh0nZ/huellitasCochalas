import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { backendUrl } from "../../constants";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ 
    baseUrl: `${backendUrl}/api/`,
    credentials: "include" 
  }),
  tagTypes: ["Pets", "AdoptionRequests"],
  endpoints: (builder) => ({}),
});
