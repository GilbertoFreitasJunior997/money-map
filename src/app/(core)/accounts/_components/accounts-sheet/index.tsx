"use client";

import { Sheet } from "@/components/sheet";
import { AccountsForm } from "../accounts-form";
import { AccountsSheetProps } from "./types";

export const AccountsSheet = ({ isOpen, setIsOpen }: AccountsSheetProps) => {
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

        <AccountsForm onClose={handleClose} />
      </Sheet.Content>
    </Sheet.Root>
  );
};
