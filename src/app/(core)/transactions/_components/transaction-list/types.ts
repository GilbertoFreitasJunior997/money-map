import { TransactionListData } from "@/models/transaction.model";
import { transactionListFilters } from "./consts";

export type TransactionListProps = {
  transactions?: TransactionListData[];
};

export type TransactionListFilter = (typeof transactionListFilters)[number];
