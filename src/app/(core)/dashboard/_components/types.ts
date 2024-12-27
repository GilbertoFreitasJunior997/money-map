import { TransactionListData } from "@/models/transaction.model";

export type DashboardGraphProps = {
  transactions: TransactionListData[] | undefined;
  isLoading: boolean;
};
