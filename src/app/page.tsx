"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { User, Lock } from "lucide-react";
import FormInput from "@/components/functional/form-input";
import { useLoginMutation } from "@/api/auth.service";
import ErrorMsgBox from "@/components/functional/error-msg-box";
import CardHeaderComp from "@/components/functional/card-header";

export const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(1, {
    message: "Password is required.",
  }),
});

export default function SignInPage() {
  const [login, { error, isLoading, isSuccess, isError }] = useLoginMutation();

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

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    // Handle sign in logic here
    login(values);
  }

  console.log("error", error, "isLoading", isLoading, "isSuccess", isSuccess);
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md border-none rounded-[8px] bg-white">
        <CardHeaderComp />
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormInput
                form={form}
                name="email"
                placeholder="Email"
                icon={
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-foreground/45 h-4 w-4" />
                }
                type="email"
              />
              <FormInput
                form={form}
                name="password"
                placeholder="Password"
                icon={
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-foreground/45 h-4 w-4" />
                }
                type="password"
              />

              <Button
                type="submit"
                className="w-full h-10 mt-2 bg-primary hover:bg-primary/80 text-white font-medium cursor-pointer"
                variant="secondary"
                disabled={!isDirty}
              >
                Log in
              </Button>
            </form>
          </Form>
          {isError && (
            <ErrorMsgBox className="mt-2" message={error?.data?.message} />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
