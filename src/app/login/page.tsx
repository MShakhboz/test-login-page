"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useLoginMutation, useSend2faCodeMutation } from "@/api/auth.service";
import FormComponent from "@/components/functional/form-component";
import TwoFactorAuth from "@/components/functional/two-factor-auth";
import { Card } from "@/components/ui/card";
import { useState } from "react";

export const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(1, {
    message: "Password is required.",
  }),
});

export default function SignInPage() {
  const [code, setCode] = useState<string[]>(["", "", "", "", "", ""]);
  const [login, { data, error, isLoading, isSuccess, isError }] =
    useLoginMutation();
  const [
    sendCode,
    { data: twoAuthData, isSuccess: is2AuthSuccess, isError: is2AuthError },
  ] = useSend2faCodeMutation();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const {
    formState: { isDirty },
  } = form;

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    login(values);
  };

  const onLogin = () => {
    sendCode({ code: code?.join("") });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md border-none rounded-[8px] bg-white">
        {!isSuccess && (
          <FormComponent
            onSubmit={form.handleSubmit(onSubmit)}
            form={form}
            errMsg={error?.data?.message}
            isError={isError}
            isDirty={isDirty}
            isLoading={isLoading}
          />
        )}
        {isSuccess && (
          <TwoFactorAuth
            onLogin={onLogin}
            code={code}
            setCode={setCode}
            isSuccess={is2AuthSuccess}
            isError={is2AuthError}
            genCode={data?.data.code}
            msg={twoAuthData?.message}
          />
        )}
      </Card>
    </div>
  );
}
