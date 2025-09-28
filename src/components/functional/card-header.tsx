import { CardHeader } from "@/components/ui/card";

const CardHeaderComp = () => (
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
);

export default CardHeaderComp;
