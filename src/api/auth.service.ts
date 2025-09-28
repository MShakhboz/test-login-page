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

    send2faCode: build.mutation<AuthType, { code: string }>({
      query: (body) => ({
        url: "two-auth",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useLoginMutation, useSend2faCodeMutation } = authService;
