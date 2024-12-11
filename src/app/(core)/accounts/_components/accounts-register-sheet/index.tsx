"use client";
import { Button } from "@/components/button";
import { Sheet } from "@/components/sheet";
import { useState } from "react";
import { AccountsForm } from "../accounts-form";

export const AccountsRegisterSheet = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <Sheet.Root
      open={isOpen}
      onOpenChange={setIsOpen}
    >
      <Sheet.Trigger asChild>
        <Button variant="default">New Account</Button>
      </Sheet.Trigger>
      <Sheet.Content>
        <Sheet.Title>Create Account</Sheet.Title>
        <AccountsForm onClose={handleClose} />
      </Sheet.Content>
    </Sheet.Root>
  );
};
