import { DateRange } from "react-day-picker";
import { DashboardGraphProps } from "../types";
import { transactionsByDateGraphsOptions } from "./consts";

export type TransactionByDateChartData = {
  label: string;
  date: string;
  total: number;
  income: number;
  expenses: number;
  transfers: number;
};

export type TransactionsByDateGraphProps = DashboardGraphProps & {
  period: DateRange;
};

export type TransactionsByDateGraphsOption =
  (typeof transactionsByDateGraphsOptions)[number];
