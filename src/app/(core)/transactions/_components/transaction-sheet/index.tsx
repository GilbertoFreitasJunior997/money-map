import { Sheet } from "@/components/sheet";
import { TransactionsForm } from "../transactions-form";
import { TransactionSheetProps } from "./types";

export const TransactionSheet = ({
  isOpen,
  onOpenChange,
  editTransactionId,
}: TransactionSheetProps) => {
  const handleClose = () => {
    onOpenChange(false);
  };

  return (
    <Sheet.Root
      open={isOpen}
      onOpenChange={onOpenChange}
    >
      <Sheet.Content>
        <Sheet.Title>
          {editTransactionId ? "Edit" : "New"} Transaction
        </Sheet.Title>

        <TransactionsForm
          editTransactionId={editTransactionId}
          onClose={handleClose}
        />
      </Sheet.Content>
    </Sheet.Root>
  );
};
