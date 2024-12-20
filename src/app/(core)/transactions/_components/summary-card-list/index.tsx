import {
  ArrowRightLeft,
  DollarSignIcon,
  TrendingDownIcon,
  TrendingUpIcon,
} from "lucide-react";
import { SummaryCard } from "../summary-card";
import { SummaryCardListProps } from "./types";

export const SummaryCardList = ({
  transactions,
  isLoading,
}: SummaryCardListProps) => {
  let total = 0;
  let income = 0;
  let expenses = 0;
  let transfers = 0;

  if (!isLoading && transactions) {
    for (const transaction of transactions) {
      const amount = Number.parseFloat(transaction.amount);

      switch (transaction.type) {
        case "income": {
          income += amount;
          total += amount;
          break;
        }
        case "expense": {
          expenses += amount;
          total -= amount;
          break;
        }
        case "transfer": {
          transfers += amount;
          break;
        }
        default: {
          break;
        }
      }
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <SummaryCard
        title="Total Balance"
        value={total}
        icon={DollarSignIcon}
        isLoading={isLoading}
      />
      <SummaryCard
        title="Income"
        value={income}
        icon={TrendingUpIcon}
        isLoading={isLoading}
      />
      <SummaryCard
        title="Expenses"
        value={expenses}
        icon={TrendingDownIcon}
        isLoading={isLoading}
      />
      <SummaryCard
        title="Transfers"
        value={transfers}
        icon={ArrowRightLeft}
        isLoading={isLoading}
      />
    </div>
  );
};
