"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useLogin, useSend2faCode } from "@/api/hooks/useAuth";
import FormComponent from "@/components/functional/form-component";
import TwoFactorAuth from "@/components/functional/two-factor-auth";
import { Card } from "@/components/ui/card";
import { useState } from "react";
import { useRouter } from "next/navigation";

export const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z.string().min(1, { message: "Password is required." }),
});

export default function SignInPage() {
  const [code, setCode] = useState<string[]>(["", "", "", "", "", ""]);
  const [twoAuth, setTwoAuth] = useState(false);
  const router = useRouter();

  const {
    mutate: login,
    data: loginData,
    error: loginError,
    isPending: isLoginLoading,
    isError: isLoginError,
  } = useLogin();

  const {
    mutate: sendCode,
    data: twoFaData,
    error: twoFaError,
    isPending: is2faLoading,
  } = useSend2faCode();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: "", password: "" },
  });

  const {
    formState: { isDirty, isValid },
  } = form;

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    login(values, {
      onSuccess: (data) => setTwoAuth(data?.success),
    });
  };

  const onLogin = () => {
    sendCode(
      { code: code.join("") },
      {
        onSuccess: (data) => {
          if (data?.success) router.replace("/");
        },
      }
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md border-none rounded-[8px] bg-white">
        {!twoAuth && (
          <FormComponent
            onSubmit={form.handleSubmit(onSubmit)}
            form={form}
            errMsg={loginError?.response?.data?.message}
            isError={isLoginError}
            isDirty={isDirty}
            isValid={isValid}
            isLoading={isLoginLoading}
          />
        )}
        {twoAuth && (
          <TwoFactorAuth
            onLogin={onLogin}
            code={code}
            goBack={() => setTwoAuth(false)}
            setCode={setCode}
            genCode={loginData?.data?.code}
            errMsg={twoFaError?.response?.data?.message}
            isLoading={is2faLoading}
          />
        )}
      </Card>
    </div>
  );
}
