import { DashboardIcon } from "@radix-ui/react-icons";
import { Coins, HandCoins, Wallet } from "lucide-react";
import { Icon } from "./components/icon";
import { Route } from "./lib/types";

const brandName = "Money Map";

export const appConfig = {
  redirectSignInURL: "/",
  brandName,
  logo: (
    <div className="w-10 h-10 bg-primary text-primary-foreground rounded-full grid place-content-center">
      <Icon
        src={Coins}
        className="size-full"
      />
    </div>
  ),
  appName: (
    <div
      className="font-bold overflow-hidden text-ellipsis whitespace-nowrap pr-4"
      title={brandName}
    >
      {brandName}
    </div>
  ),
  routes: [
    {
      name: "Dashboard",
      path: "/",
      icon: DashboardIcon,
    },
    {
      name: "Expenses",
      path: "/expenses",
      icon: HandCoins,
    },
    {
      name: "Budgets",
      path: "/budgets",
      icon: Wallet,
    },
  ] satisfies Route[],
};
