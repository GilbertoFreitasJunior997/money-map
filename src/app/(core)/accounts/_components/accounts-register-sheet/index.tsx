"use client";

import { Sheet } from "@/components/sheet";
import { AccountsForm } from "../accounts-form";
import { AccountsRegisterSheetProps } from "./types";

export const AccountsRegisterSheet = ({
  isOpen,
  setIsOpen,
}: AccountsRegisterSheetProps) => {
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
