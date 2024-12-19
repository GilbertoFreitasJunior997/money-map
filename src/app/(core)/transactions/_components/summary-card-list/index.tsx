import {
  ArrowRightLeft,
  DollarSignIcon,
  TrendingDownIcon,
  TrendingUpIcon,
} from "lucide-react";
import { SummaryCard } from "../summary-card";

export const SummaryCardList = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <SummaryCard
        title="Total Balance"
        value="$3500"
        icon={DollarSignIcon}
        trend="up"
        trendValue="8% from last month"
      />
      <SummaryCard
        title="Income"
        value="$4500"
        icon={TrendingUpIcon}
        trend="up"
        trendValue="12% from last month"
      />
      <SummaryCard
        title="Expenses"
        value="$750"
        icon={TrendingDownIcon}
        trend="down"
        trendValue="3% from last month"
      />
      <SummaryCard
        title="Transfers"
        value="$250"
        icon={ArrowRightLeft}
        trend="neutral"
        trendValue="Same as last month"
      />
    </div>
  );
};
