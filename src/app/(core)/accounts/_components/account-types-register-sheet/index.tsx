"use client";

import { Sheet } from "@/components/sheet";
import { AccountTypesForm } from "../account-types-form";
import { AccountTypesRegisterSheetProps } from "./types";

export const AccountTypesRegisterSheet = ({
  isOpen,
  setIsOpen,
  setAccountTypeUpdateData,
  updateData,
}: AccountTypesRegisterSheetProps) => {
  const handleClose = () => {
    setAccountTypeUpdateData(undefined);
    setIsOpen(false);
  };

  const handleOpenChange = (newIsOpen: boolean) => {
    if (!newIsOpen) {
      handleClose();
    }

    setIsOpen(newIsOpen);
  };

  return (
    <Sheet.Root
      open={isOpen}
      onOpenChange={handleOpenChange}
    >
      <Sheet.Content>
        <Sheet.Title>
          {updateData ? "Update" : "Create"} Account Type{" "}
          {updateData?.description || null}
        </Sheet.Title>

        <AccountTypesForm
          updateData={updateData}
          onClose={handleClose}
        />
      </Sheet.Content>
    </Sheet.Root>
  );
};
