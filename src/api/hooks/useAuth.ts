import { useMutation } from "@tanstack/react-query";
import { login, send2faCode } from "@/api/auth.service";
import { AuthResponse, AuthError } from "@/api/type";
import * as z from "zod";
import { formSchema } from "@/app/login/page";

export const useLogin = () =>
  useMutation<AuthResponse, AuthError, z.infer<typeof formSchema>>({
    mutationFn: (formData) => login(formData),
  });

export const useSend2faCode = () =>
  useMutation<AuthResponse, AuthError, { code: string }>({
    mutationFn: (body) => send2faCode(body),
  });
