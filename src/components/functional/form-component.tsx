import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { User, Lock } from "lucide-react";
import FormInput from "@/components/functional/form-input";
import ErrorMsgBox from "@/components/functional/error-msg-box";
import CardHeaderComp from "@/components/functional/card-header";

const FormComponent = ({
  onSubmit,
  form,
  isDirty,
  isError,
  errMsg,
}: {
  form: any;
  onSubmit: () => void;
  isDirty: boolean;
  isError: boolean;
  errMsg: string;
}) => {
  return (
    <>
      <CardHeaderComp />
      <CardContent>
        <Form {...form}>
          <form onSubmit={onSubmit} className="space-y-4">
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
        {isError && <ErrorMsgBox className="mt-2" message={errMsg} />}
      </CardContent>
    </>
  );
};

export default FormComponent;
