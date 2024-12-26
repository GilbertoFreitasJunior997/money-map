"use client";

import { sumTransactionsValues } from "@/app/(core)/transactions/_components/summary-card-list/utils";
import { Chart } from "@/components/chart";
import { useCallback, useMemo, useState } from "react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { DashboardChartContainer } from "../dashboard-chart-container";
import { transactionsByDateGraphsOptions } from "./consts";
import {
  TransactionsByDateGraphProps,
  TransactionsByDateGraphsOption,
} from "./types";

type ChartBaseData = {
  date: string;
  total: number;
  income: number;
  expenses: number;
  transfers: number;
};

export const TransactionsByDateGraphs = ({
  transactions,
  isLoading,
  period,
}: TransactionsByDateGraphProps) => {
  const [selectedGraph, setSelectedGraph] =
    useState<TransactionsByDateGraphsOption>(
      transactionsByDateGraphsOptions[0],
    );

  const formatDate = useCallback(
    (date: Date) =>
      date.toLocaleDateString("en-US", {
        day: "numeric",
        month: "short",
      }),
    [],
  );

  const chartData = useMemo(() => {
    if (isLoading || !transactions || !period.from || !period.to) {
      return [];
    }

    const chartData: ChartBaseData[] = [];

    const currentDate = new Date(period.from);
    while (currentDate <= period.to) {
      const formattedDate = formatDate(currentDate);

      const { total, income, expenses, transfers } = sumTransactionsValues(
        transactions,
        (transaction) => {
          const transactionFormattedDate = formatDate(transaction.date);

          return transactionFormattedDate !== formattedDate;
        },
      );

      chartData.push({
        date: formattedDate,
        total,
        income,
        expenses: -expenses,
        transfers,
      });

      currentDate.setDate(currentDate.getDate() + 1);
    }

    return chartData;
  }, [transactions, isLoading, period, formatDate]);

  return (
    <DashboardChartContainer
      title="Transactions History"
      items={transactionsByDateGraphsOptions}
      selectedGraph={selectedGraph}
      setSelectedGraph={setSelectedGraph}
    >
      <AreaChart
        data={chartData}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
      >
        <XAxis dataKey="date" />
        <YAxis dataKey="total" />
        <CartesianGrid strokeDasharray="3 3" />

        <Chart.Tooltip
          content={
            <Chart.TooltipContent
              labelKey="name"
              valueFormatter={(value) => `$${value}`}
            />
          }
        />
        <Chart.Legend />

        <Area
          type="monotone"
          dataKey="total"
          stroke="hsl(var(--accent-foreground))"
          fillOpacity={1}
          fill="url(#colorUv)"
        />
        <Area
          type="monotone"
          dataKey="income"
          stroke="hsl(var(--primary))"
          fillOpacity={1}
          fill="url(#colorUv)"
        />
        <Area
          type="monotone"
          dataKey="expenses"
          stroke="hsl(var(--destructive))"
          fillOpacity={1}
          fill="url(#colorUv)"
        />
        <Area
          type="monotone"
          dataKey="transfers"
          stroke="hsl(var(--chart-1))"
          fillOpacity={1}
          fill="url(#colorUv)"
        />
        {/* <Area
          type="monotone"
          dataKey="pv"
          stroke="#82ca9d"
          fillOpacity={1}
          fill="url(#colorPv)"
        /> */}
      </AreaChart>
    </DashboardChartContainer>
  );
};
