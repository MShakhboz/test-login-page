import axios from "axios";
import { AuthResponse, AuthError } from "./type";
import * as z from "zod";
import { formSchema } from "@/app/login/page";

export const login = async (
  body: z.infer<typeof formSchema>
): Promise<AuthResponse> => {
  const { data } = await axios.post<AuthResponse>("/api/login", body);
  if (!data.success)
    throw { response: { data: { message: "Login failed" } } } as AuthError;
  return data;
};

export const send2faCode = async (body: {
  code: string;
}): Promise<AuthResponse> => {
  const { data } = await axios.post<AuthResponse>("/api/two-auth", body);
  if (!data.success)
    throw { response: { data: { message: "2FA failed" } } } as AuthError;
  return data;
};
