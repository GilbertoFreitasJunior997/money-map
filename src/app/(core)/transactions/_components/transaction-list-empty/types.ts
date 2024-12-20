import { TransactionListFilter } from "../transaction-list/types";

export type TransactionListEmptyProps = {
  selectedFilter: TransactionListFilter;
  hasTranasctions: boolean;
  onResetFilter: () => void;
  onAddTransactionClick: () => void;
};
