import { config } from "@/config";
import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";

const baseQuery = retry(
  fetchBaseQuery({
    baseUrl: config.BASE_URL,
    credentials: "include",
  }),
  {
    maxRetries: 2,
    retryCondition(error: any, { method }: any) {
      return method === "GET" && [401, 403, 500].includes(error.status);
    },
  } as any // Sorry I had to use 'any' since for some reason, ts throws an error here to do with retryCondition
);

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery,
  tagTypes: [],
  endpoints: () => ({}),
});
