import { DateRange } from "react-day-picker";
import { DashboardGraphProps } from "../types";
import { transactionsByDateGraphsOptions } from "./consts";

export type TransactionsByDateGraphProps = DashboardGraphProps & {
  period: DateRange;
};

export type TransactionsByDateGraphsOption =
  (typeof transactionsByDateGraphsOptions)[number];
