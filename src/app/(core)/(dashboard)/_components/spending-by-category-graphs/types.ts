import { spendingByCategoryGraphsOptions } from "./consts";

export type SpendingByCategoryGraphData = {
  name: string;
  amount: number;
  fill?: string;
};

export type SpendingByCategoryGraphsOption =
  (typeof spendingByCategoryGraphsOptions)[number];
