import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { User, Lock } from "lucide-react";
import FormInput from "@/components/functional/form-input";
import ErrorMsgBox from "@/components/functional/error-msg-box";
import CardHeaderComp from "@/components/functional/card-header";
import { Form } from "../ui/form";

const FormComponent = ({
  onSubmit,
  form,
  isDirty,
  isError,
  errMsg,
  isLoading,
  isValid,
}: {
  form: any;
  onSubmit: () => void;
  isDirty: boolean;
  isError: boolean;
  errMsg: string;
  isLoading: boolean;
  isValid: boolean;
}) => {
  return (
    <>
      <CardHeaderComp />
      <CardContent>
        <Form {...form}>
          <form onSubmit={onSubmit} className="space-y-3">
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
              disabled={!isDirty || !isValid || isLoading}
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
