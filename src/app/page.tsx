"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { User, Lock } from "lucide-react";
import FormInput from "@/components/functional/form-input";
import { useLoginMutation } from "@/api/auth.service";
import { cn } from "@/lib/utils";

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
        <CardHeader className="text-center space-y-6 pb-3.5">
          <div className="flex items-center justify-center gap-3">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
              <div className="w-4 h-4 bg-white rounded-full"></div>
            </div>
            <span className="text-xl font-medium text-foreground">Company</span>
          </div>
          <h1 className="text-[26px] font-semibold text-foreground">
            Sign in to your account to continue
          </h1>
        </CardHeader>
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
              {/* <div className="relative">
                <div
                  className={cn(
                    "absolute left-1/2 -translate-x-1/2 w-full max-w-md rounded-xl border border-destructive/30 bg-destructive/90 px-4 py-3 text-white shadow-lg transition-all duration-300 ease-in-out transform -translate-y-20 opacity-0",
                    isError && "translate-y-4 opacity-100"
                  )}
                >
                  <div className="flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 flex-shrink-0 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.662 1.732-3L13.732 4c-.77-1.338-2.694-1.338-3.464 0L4.34 16c-.77 1.338.192 3 1.732 3z"
                      />
                    </svg>
                    <span className="text-sm font-medium">
                      {error?.data?.message}
                    </span>
                  </div>
                </div>
              </div> */}
              <Button
                type="submit"
                className="w-full h-10 mt-6 bg-primary hover:bg-primary/80 text-white font-medium cursor-pointer"
                variant="secondary"
                disabled={!isDirty}
              >
                Log in
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
