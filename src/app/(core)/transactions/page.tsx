"use client";

import { useActionQuery } from "@/lib/hooks/use-action-query";
import { useState } from "react";
import { SummaryCardList } from "./_components/summary-card-list";
import { TransactionList } from "./_components/transaction-list";
import { TransactionListLoading } from "./_components/transaction-list-loading";
import { getTransactionListData } from "./actions";
import { DateRangeInput } from "@/components/date-range-input";
import { DateRange } from "react-day-picker";

export default function Page() {
  const [period, _setPeriod] = useState<DateRange>({
    from: new Date(new Date().setMonth(new Date().getMonth() - 1)),
    to: new Date(),
  });

  const {
    data: transactions,
    isLoading,
    isFetching,
  } = useActionQuery({
    action: () => getTransactionListData(period.from, period.to),
    queryKey: ["transactions", period.from, period.to],
  });

  return (
    <div className="space-y-6 py-2 px-1 sm:px-6 md:px-24">
      <DateRangeInput
        name=""
        value={period}
        onChange={_setPeriod}
      />
      <SummaryCardList
        transactions={transactions}
        isLoading={isLoading}
      />

      <div className="py-6">
        <h2 className="text-2xl font-semibold mb-4">Recent Transactions</h2>

        {isLoading ? (
          <TransactionListLoading />
        ) : (
          <TransactionList
            transactions={transactions}
            isFetching={isFetching}
          />
        )}
      </div>
    </div>
  );
}
