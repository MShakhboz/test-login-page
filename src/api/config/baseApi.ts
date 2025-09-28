import { config } from "@/config";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: config.BASE_URL,
});
export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery,
  tagTypes: [],
  endpoints: () => ({}),
});
