import { TransactionListData } from "@/models/transaction.model";

export type TransactionItemProps = {
  transaction: TransactionListData;
  onRemoveClick: () => void;
  onEditClick: () => void;
  areButtonsDisabled?: boolean;
};
