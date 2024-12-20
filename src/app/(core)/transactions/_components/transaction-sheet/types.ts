export type TransactionSheetProps = {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  editTransactionId: number | undefined;
};
