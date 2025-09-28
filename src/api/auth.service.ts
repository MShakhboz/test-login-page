import { baseApi } from "@/api/config/baseApi";
import { AuthType } from "./type";
import * as z from "zod";
import { formSchema } from "@/app/login/page";

export const authService = baseApi.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<AuthType, z.infer<typeof formSchema>>({
      query: (body) => ({
        url: `login`,
        method: "POST",
        body,
      }),
    }),

    send2faCode: build.mutation<any, { code: string }>({
      query: (body) => ({
        url: "two-auth",
        method: "POST",
        body,
      }),
    }),

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
  }),
});

export const { useLoginMutation, useLogoutMutation, useSend2faCodeMutation } =
  authService;
