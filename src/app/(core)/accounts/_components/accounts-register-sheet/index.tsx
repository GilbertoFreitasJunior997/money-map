"use client";

import { Sheet } from "@/components/sheet";
import { AccountsForm } from "../accounts-form";
import { AccountsRegisterSheetProps } from "./types";

export const AccountsRegisterSheet = ({
  trigger,
  id,
}: AccountsRegisterSheetProps) => {
  return (
    <Sheet.Root>
      <Sheet.Trigger asChild>{trigger}</Sheet.Trigger>
      <Sheet.Content>
        <Sheet.Title>Create Account</Sheet.Title>

        <AccountsForm
          id={id}
          onClose={() => {}}
        />
      </Sheet.Content>
    </Sheet.Root>
  );
};
