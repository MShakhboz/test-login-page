"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { User, Lock } from "lucide-react";
import FormInput from "@/components/functional/form-input";

const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(1, {
    message: "Password is required.",
  }),
});

export default function SignInPage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    // Handle sign in logic here
  }

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
              <Button
                type="submit"
                className="w-full h-12 mt-6 bg-gray-200 hover:bg-gray-300 text-gray-600 font-medium"
                variant="secondary"
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
