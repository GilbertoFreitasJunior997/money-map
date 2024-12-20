import { Sheet } from "@/components/sheet";
import { TransactionsForm } from "../transactions-form";
import { TransactionSheetProps } from "./types";

export const TransactionSheet = ({
  isOpen,
  onOpenChange,
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
        <Sheet.Title>Create Account</Sheet.Title>

        <TransactionsForm onClose={handleClose} />
      </Sheet.Content>
    </Sheet.Root>
  );
};
