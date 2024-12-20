import { TransactionListData } from "@/models/transaction.model";

export type SummaryCardListProps = {
  transactions: TransactionListData[] | undefined;
  isLoading: boolean;
};
