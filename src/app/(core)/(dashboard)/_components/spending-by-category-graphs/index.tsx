"use client";

import { Chart } from "@/components/chart";
import { chartColors } from "@/components/chart/consts";
import { ChartBaseData } from "@/components/chart/types";
import { useMemo, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Pie,
  PieChart,
  RadialBar,
  RadialBarChart,
  XAxis,
  YAxis,
} from "recharts";
import { DashboardChartContainer } from "../dashboard-chart-container";
import { DashboardGraphProps } from "../types";
import { spendingByCategoryGraphsOptions } from "./consts";
import { SpendingByCategoryGraphsOption } from "./types";

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

    const chartData: ChartBaseData[] = [];

    for (let index = 0; index < transactions.length; index++) {
      const transaction = transactions[index];

      const category = transaction.category ?? "Others";
      const amount = Number.parseFloat(transaction.amount);

      const existingCategory = chartData.find((data) => data.name === category);
      if (existingCategory) {
        existingCategory.amount += amount;
      } else {
        chartData.unshift({
          name: category,
          amount,
          fill: chartColors[index % chartColors.length],
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
    >
      {selectedGraph.label === "Bar Chart" ? (
        <BarChart
          accessibilityLayer
          data={chartData}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Chart.Tooltip
            content={
              <Chart.TooltipContent formatter={(value) => `$${value}`} />
            }
          />

          <Bar
            name="Amount"
            dataKey="amount"
            fill={chartColors[0]}
            legendType="circle"
            radius={6}
          />
        </BarChart>
      ) : selectedGraph.label === "Pie Chart" ? (
        <PieChart accessibilityLayer>
          <Pie
            name="Amount"
            dataKey="amount"
            data={chartData}
            labelLine={false}
            outerRadius={80}
            label
          />

          <Chart.Tooltip
            content={
              <Chart.TooltipContent
                labelKey="name"
                valueFormatter={(value) => `$${value}`}
              />
            }
          />
          <Chart.Legend />
        </PieChart>
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
              formatter: (value: number) => `$${value}`,
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
