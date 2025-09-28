import { FormControl, FormField, FormItem, FormMessage } from "../ui/form";
import { Input } from "../ui/input";

const FormInput = ({
  form,
  name,
  placeholder,
  icon,
  type,
}: {
  form: any;
  name: string;
  placeholder: string;
  icon: React.ReactNode;
  type:
    | "text"
    | "password"
    | "email"
    | "number"
    | "tel"
    | "url"
    | "search"
    | "date"
    | "time"
    | "datetime-local"
    | "month"
    | "week";
}) => (
  <FormField
    control={form.control}
    name={name}
    render={({ field }) => (
      <FormItem>
        <FormControl>
          <div className="relative">
            {icon}
            <Input
              placeholder={placeholder}
              type={type}
              className="pl-10 h-10 focus:border-blue-400 focus:ring-blue-400"
              {...field}
            />
          </div>
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
);

export default FormInput;
