import { TransactionListData } from "@/models/transaction.model";
import { transactionListFilters } from "./consts";

export type TransactionListProps = {
  transactions?: TransactionListData[];
  isFetching?: boolean;
};

export type TransactionListFilter = (typeof transactionListFilters)[number];
