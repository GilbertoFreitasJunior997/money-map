"use client";

import { DateRangeInput } from "@/components/date-range-input";
import { useActionQuery } from "@/lib/hooks/use-action-query";
import { useState } from "react";
import { DateRange } from "react-day-picker";
import { SummaryCardList } from "../transactions/_components/summary-card-list";
import { getTransactionListData } from "../transactions/actions";
import { SpendingByCategoryGraphs } from "./_components/spending-by-category-graphs";

export default function Page() {
  const [period, setPeriod] = useState<DateRange>({
    from: new Date(new Date().setMonth(new Date().getMonth() - 1)),
    to: new Date(),
  });

  const { data: transactions, isLoading } = useActionQuery({
    action: () => getTransactionListData(period),
    queryKey: ["transactions", period],
  });
  const graphsProps = { transactions, isLoading };

  return (
    <div className="space-y-4">
      <DateRangeInput
        name="period-filter"
        value={period}
        onChange={setPeriod}
      />
      <SummaryCardList {...graphsProps} />
      <div className="grid gap-4 grid-cols-1 lg:grid-cols-4">
        <SpendingByCategoryGraphs {...graphsProps} />
      </div>
    </div>
  );
}
