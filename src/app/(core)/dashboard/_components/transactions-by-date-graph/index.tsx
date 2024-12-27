"use client";

import { sumTransactionsValues } from "@/app/(core)/transactions/_components/summary-card-list/utils";
import { Chart } from "@/components/chart";
import { chartMargin } from "@/components/chart/consts";
import { useCallback, useMemo, useState } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  XAxis,
  YAxis,
} from "recharts";
import { dashboardChartCurrencyFormatter } from "../consts";
import { DashboardChartContainer } from "../dashboard-chart-container";
import { transactionsByDateGraphsOptions } from "./consts";
import {
  TransactionByDateChartData,
  TransactionsByDateGraphProps,
  TransactionsByDateGraphsOption,
} from "./types";

const chartItems = [
  {
    dataKey: "total",
    name: "Total",
    stroke: "hsl(var(--accent-foreground))",
  },
  {
    dataKey: "income",
    name: "Income",
    stroke: "hsl(var(--primary))",
  },
  {
    dataKey: "expenses",
    name: "Expenses",
    stroke: "hsl(var(--destructive))",
  },
  {
    dataKey: "transfers",
    name: "Transfers",
    stroke: "hsl(var(--chart-1))",
  },
];

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

  const formatDateToLabel = useCallback(
    (date: Date) =>
      date.toLocaleDateString("en-US", {
        day: "numeric",
        month: "short",
        year: "2-digit",
      }),
    [],
  );

  const chartData = useMemo(() => {
    if (isLoading || !transactions || !period.from || !period.to) {
      return [];
    }

    const chartData: TransactionByDateChartData[] = [];

    const currentDate = new Date(period.from);
    while (currentDate <= period.to) {
      const formattedDate = formatDate(currentDate);

      const { total, income, expenses, transfers } = sumTransactionsValues(
        transactions,
        (transaction) => {
          const transactionFormattedDate = formatDate(transaction.date);

          return transactionFormattedDate === formattedDate;
        },
      );

      const label = formatDateToLabel(currentDate);

      chartData.push({
        label,
        date: formattedDate,
        total,
        income,
        expenses: -expenses,
        transfers,
      });

      currentDate.setDate(currentDate.getDate() + 1);
    }

    return chartData;
  }, [transactions, isLoading, period, formatDate, formatDateToLabel]);

  return (
    <DashboardChartContainer
      title="Transactions History"
      items={transactionsByDateGraphsOptions}
      selectedGraph={selectedGraph}
      setSelectedGraph={setSelectedGraph}
      isLoading={isLoading}
    >
      {selectedGraph.label === "Area Chart" ? (
        <AreaChart
          data={chartData}
          margin={chartMargin}
        >
          <XAxis dataKey="date" />
          <YAxis dataKey="total" />
          <CartesianGrid strokeDasharray="3 3" />

          <Chart.Tooltip
            content={
              <Chart.TooltipContent
                labelFormatter={(label, payload) =>
                  payload?.[0]?.payload?.label ?? label
                }
                valueFormatter={dashboardChartCurrencyFormatter}
              />
            }
          />
          <Chart.Legend />

          {chartItems.map((item) => (
            <Area
              key={item.dataKey}
              {...item}
              type="monotone"
              fillOpacity={1}
              fill="url(#colorUv)"
            />
          ))}
        </AreaChart>
      ) : selectedGraph.label === "Bar Chart" ? (
        <BarChart
          accessibilityLayer
          data={chartData}
          margin={chartMargin}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis dataKey="total" />

          <Chart.Tooltip
            content={
              <Chart.TooltipContent
                labelFormatter={(label, payload) =>
                  payload?.[0]?.payload?.label ?? label
                }
                valueFormatter={dashboardChartCurrencyFormatter}
              />
            }
          />
          <Chart.Legend />

          {chartItems.map((item) => (
            <Bar
              key={item.dataKey}
              {...item}
              legendType="circle"
              fill={item.stroke}
            />
          ))}
        </BarChart>
      ) : (
        <LineChart
          data={chartData}
          margin={chartMargin}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Chart.Tooltip
            content={
              <Chart.TooltipContent
                labelFormatter={(label, payload) =>
                  payload?.[0]?.payload?.label ?? label
                }
                valueFormatter={dashboardChartCurrencyFormatter}
              />
            }
          />
          <Chart.Legend />

          {chartItems.map((item) => (
            <Line
              type="monotone"
              key={item.dataKey}
              {...item}
              legendType="circle"
              fill={item.stroke}
            />
          ))}
        </LineChart>
      )}
    </DashboardChartContainer>
  );
};
