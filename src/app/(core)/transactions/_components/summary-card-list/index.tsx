import { SummaryCard } from "../summary-card";
import { SummaryCardListProps } from "./types";
import { sumTransactionsValues } from "./utils";

export const SummaryCardList = ({
  transactions,
  isLoading,
}: SummaryCardListProps) => {
  const { total, income, expenses, transfers } = sumTransactionsValues(
    transactions?.length && !isLoading ? transactions : [],
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <SummaryCard
        type="all"
        value={total}
        isLoading={isLoading}
      />
      <SummaryCard
        type="income"
        value={income}
        isLoading={isLoading}
      />
      <SummaryCard
        type="expense"
        value={expenses}
        isLoading={isLoading}
      />
      <SummaryCard
        type="transfer"
        value={transfers}
        isLoading={isLoading}
      />
    </div>
  );
};
