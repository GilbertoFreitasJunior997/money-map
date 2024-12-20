"use client";

import { useActionQuery } from "@/lib/hooks/use-action-query";
import { SummaryCardList } from "./_components/summary-card-list";
import { TransactionList } from "./_components/transaction-list";
import { TransactionListLoading } from "./_components/transaction-list-loading";
import { getTransactionListData } from "./actions";

export default function Page() {
  const { data: transactions, isLoading } = useActionQuery({
    action: getTransactionListData,
    queryKey: ["transactions"],
  });

  return (
    <div className="space-y-6 py-2 px-1 sm:px-6 md:px-24">
      <SummaryCardList
        transactions={transactions}
        isLoading={isLoading}
      />

      <div className="py-6">
        <h2 className="text-2xl font-semibold mb-4">Recent Transactions</h2>

        {isLoading ? (
          <TransactionListLoading />
        ) : (
          <TransactionList transactions={transactions} />
        )}
      </div>
    </div>
  );
}
