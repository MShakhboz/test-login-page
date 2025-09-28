import { baseApi } from "@/api/config/baseApi";
import { AuthType } from "./type";
import * as z from "zod";
import { formSchema } from "@/app/page";

export const authService = baseApi.injectEndpoints({
  endpoints: (build) => ({
    logout: build.mutation<undefined, void>({
      query: () => ({
        url: `api/v1/authenticate/user/logout`,
        method: "POST",
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
        } finally {
          dispatch({ type: "auth/logout" });
          dispatch(baseApi.util.resetApiState());
        }
      },
    }),
    login: build.mutation<AuthType, z.infer<typeof formSchema>>({
      query: (body) => ({
        url: `login`,
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useLoginMutation, useLogoutMutation } = authService;
