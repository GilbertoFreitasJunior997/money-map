"use client";

import { Chart } from "@/components/chart";
import { chartColors, chartMargin } from "@/components/chart/consts";
import { useMemo, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  RadialBar,
  RadialBarChart,
  XAxis,
  YAxis,
} from "recharts";
import { dashboardChartCurrencyFormatter } from "../consts";
import { DashboardChartContainer } from "../dashboard-chart-container";
import { DashboardGraphProps } from "../types";
import { spendingByCategoryGraphsOptions } from "./consts";
import {
  SpendingByCategoryGraphData,
  SpendingByCategoryGraphsOption,
} from "./types";

export const SpendingByCategoryGraphs = ({
  transactions,
  isLoading,
}: DashboardGraphProps) => {
  const [selectedGraph, setSelectedGraph] =
    useState<SpendingByCategoryGraphsOption>(
      spendingByCategoryGraphsOptions[0],
    );

  const chartData = useMemo(() => {
    if (isLoading || !transactions) {
      return [];
    }

    const chartData: SpendingByCategoryGraphData[] = [];

    for (let index = 0; index < transactions.length; index++) {
      const transaction = transactions[index];
      if (transaction.type !== "expense" && transaction.type !== "transfer") {
        continue;
      }

      const category = transaction.category ?? "Others";
      const amount = Number.parseFloat(transaction.amount);

      const existingCategory = chartData.find((data) => data.name === category);
      if (existingCategory) {
        existingCategory.amount += amount;
      } else {
        chartData.unshift({
          name: category,
          amount,
          fill: chartColors[(index + 1) % chartColors.length],
        });
      }
    }

    return chartData;
  }, [transactions, isLoading]);

  return (
    <DashboardChartContainer
      title="Spending by Category"
      items={spendingByCategoryGraphsOptions}
      selectedGraph={selectedGraph}
      setSelectedGraph={setSelectedGraph}
      isLoading={isLoading}
      transactions={transactions}
    >
      {selectedGraph.label === "Bar Chart" ? (
        <BarChart
          accessibilityLayer
          data={chartData}
          margin={chartMargin}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Chart.Tooltip
            content={
              <Chart.TooltipContent
                formatter={dashboardChartCurrencyFormatter}
              />
            }
          />

          <Bar
            name="Amount"
            dataKey="amount"
            legendType="circle"
            radius={6}
          />
        </BarChart>
      ) : (
        <RadialBarChart
          innerRadius="10%"
          outerRadius="80%"
          barSize={10}
          data={chartData}
        >
          <RadialBar
            label={{
              position: "outside",
              fill: "#fff",
              formatter: dashboardChartCurrencyFormatter,
            }}
            name="Amount"
            dataKey="amount"
          />

          <Legend
            iconSize={10}
            layout="vertical"
            verticalAlign="middle"
            wrapperStyle={{
              right: 0,
              lineHeight: "1.5rem",
            }}
          />
        </RadialBarChart>
      )}
    </DashboardChartContainer>
  );
};
