import { CardHeader } from "@/components/ui/card";
import Icon from "./Icon";

const CardHeaderComp = () => (
  <CardHeader className="text-center space-y-6 pb-3.5">
    <Icon />
    <h1 className="text-[26px] font-semibold text-foreground">
      Sign in to your account to continue
    </h1>
  </CardHeader>
);

export default CardHeaderComp;
