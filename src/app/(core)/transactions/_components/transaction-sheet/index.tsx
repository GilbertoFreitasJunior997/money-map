import { Sheet } from "@/components/sheet";
import { TransactionsForm } from "../transactions-form";
import { TransactionSheetProps } from "./types";

export const TransactionSheet = ({
  isOpen,
  setIsOpen,
}: TransactionSheetProps) => {
  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <Sheet.Root
      open={isOpen}
      onOpenChange={setIsOpen}
    >
      <Sheet.Content>
        <Sheet.Title>Create Account</Sheet.Title>

        <TransactionsForm onClose={handleClose} />
      </Sheet.Content>
    </Sheet.Root>
  );
};
