import { TransactionListData } from "@/models/transaction.model";

export type TransactionItemProps = {
  transaction: TransactionListData;
  onRemoveClick: (id: number) => void;
};
