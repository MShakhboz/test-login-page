import { config } from "@/config";
import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: config.BASE_URL,
}) as BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError & { data?: { message?: string } }
>;
export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery,
  tagTypes: [],
  endpoints: () => ({}),
});
