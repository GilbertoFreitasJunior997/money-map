import { DashboardIcon } from "@radix-ui/react-icons";
import { BarChart, BoxIcon, CreditCard, HandCoins } from "lucide-react";
import { Icon } from "./components/icon";
import { Route } from "./lib/types";

const brandName = "Money Map";

export const appConfig = {
  redirectSignInURL: "/dashboard",
  brandName,
  logo: (
    <div className="w-10 h-8 text-green-600 dark:text-green-400">
      <Icon
        src={BarChart}
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
      path: "/dashboard",
      icon: DashboardIcon,
    },
    {
      name: "Transactions",
      path: "/transactions",
      icon: HandCoins,
    },
    {
      name: "Accounts",
      path: "/accounts",
      icon: CreditCard,
    },
    {
      name: "Categories",
      path: "/categories",
      icon: BoxIcon,
    },
  ] satisfies Route[],
};
