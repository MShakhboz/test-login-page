"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useLoginMutation, useSend2faCodeMutation } from "@/api/auth.service";
import FormComponent from "@/components/functional/form-component";
import TwoFactorAuth from "@/components/functional/two-factor-auth";
import { Card } from "@/components/ui/card";
import { useState } from "react";
import { useRouter } from "next/navigation";

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
  const [twoAuth, setTwoAuth] = useState<Boolean>(false);
  const router = useRouter();
  const [login, { data, error = {}, isLoading, isError }] = useLoginMutation();
  const [sendCode, { error: twoAuthError = {}, isLoading: is2faLoading }] =
    useSend2faCodeMutation();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const {
    formState: { isDirty, isValid },
  } = form;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const { data } = await login(values);
    setTwoAuth(data?.success ?? false);
  };

  const onLogin = async () => {
    const { data } = await sendCode({ code: code?.join("") });
    if (data?.success) {
      router.replace("/");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md border-none rounded-[8px] bg-white">
        {!twoAuth && (
          <FormComponent
            onSubmit={form.handleSubmit(onSubmit)}
            form={form}
            errMsg={"data" in error ? error?.data?.message : ""}
            isError={isError}
            isDirty={isDirty}
            isValid={isValid}
            isLoading={isLoading}
          />
        )}
        {twoAuth && (
          <TwoFactorAuth
            onLogin={onLogin}
            code={code}
            goBack={() => setTwoAuth(false)}
            setCode={setCode}
            genCode={data?.data?.code}
            errMsg={"data" in twoAuthError ? twoAuthError?.data?.message : ""}
            isLoading={is2faLoading}
          />
        )}
      </Card>
    </div>
  );
}
