import { TransactionListFilter } from "../transaction-list/types";

export type SummaryCardProps = {
  value: number;
  type: TransactionListFilter;
  isLoading: boolean;
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
};
