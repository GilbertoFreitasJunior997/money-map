"use client";

import { Sheet } from "@/components/sheet";
import { AccountsForm } from "../accounts-form";
import { AccountsSheetProps } from "./types";

export const AccountsSheet = ({
  isOpen,
  editAccountId,
  onSuccess,
  onOpenChange,
}: AccountsSheetProps) => {
  return (
    <Sheet.Root
      open={isOpen}
      onOpenChange={onOpenChange}
    >
      <Sheet.Content>
        <Sheet.Title>{editAccountId ? "Edit" : "New"} Account </Sheet.Title>
        <Sheet.Description>
          Enter the account you'd like to track your finances
        </Sheet.Description>

        <AccountsForm
          editAccountId={editAccountId}
          onSuccess={onSuccess}
        />
      </Sheet.Content>
    </Sheet.Root>
  );
};
