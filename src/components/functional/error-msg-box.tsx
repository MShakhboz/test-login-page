import { cn } from "@/lib/utils";
import { TriangleAlert } from "lucide-react";

const ErrorMsgBox = ({
  message,
  className,
}: {
  message: string;
  className?: string;
}) => {
  return (
    <div className={cn("relative", className)}>
      <div
        className={cn(
          "w-full max-w-md rounded-xl border px-4 py-3 text-white shadow-lg",
          "border-destructive/30 bg-destructive/90"
        )}
      >
        <div className="flex items-center gap-2">
          <TriangleAlert size={16} />
          <span className="text-sm font-medium">{message}</span>
        </div>
      </div>
    </div>
  );
};

export default ErrorMsgBox;
