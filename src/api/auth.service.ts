import axios from "axios";
import { AuthResponse, AuthError } from "./type";
import * as z from "zod";
import { formSchema } from "@/app/login/page";

const extractErrorMessage = (err: unknown) => {
  if (axios.isAxiosError(err)) {
    return err.response?.data?.message || err.message || "Server error";
  }
  if (err instanceof Error) return err.message;
  return "Unknown error";
};

export const login = async (
  body: z.infer<typeof formSchema>
): Promise<AuthResponse> => {
  try {
    const { data } = await axios.post<AuthResponse>("/api/login", body);
    if (!data.success) throw { message: "Login failed" } as AuthError;
    return data;
  } catch (err) {
    throw { message: extractErrorMessage(err) } as AuthError;
  }
};

export const send2faCode = async (body: {
  code: string;
}): Promise<AuthResponse> => {
  try {
    const { data } = await axios.post<AuthResponse>("/api/two-auth", body);
    if (!data.success) throw { message: "2FA failed" } as AuthError;
    return data;
  } catch (err) {
    throw { message: extractErrorMessage(err) } as AuthError;
  }
};
