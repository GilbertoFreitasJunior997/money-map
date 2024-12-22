"use client";

import { Sheet } from "@/components/sheet";
import { CategoriesForm } from "../categories-form";
import { CategorySheetProps } from "./types";

export const CategoriesSheet = ({
  isOpen,
  editCategoryId,
  onSuccess,
  onOpenChange,
}: CategorySheetProps) => {
  return (
    <Sheet.Root
      open={isOpen}
      onOpenChange={onOpenChange}
    >
      <Sheet.Content>
        <Sheet.Title>{editCategoryId ? "Edit" : "New"} Category </Sheet.Title>
        <Sheet.Description>
          Enter the category to organize your transactions
        </Sheet.Description>

        <CategoriesForm
          editCategoryId={editCategoryId}
          onSuccess={onSuccess}
        />
      </Sheet.Content>
    </Sheet.Root>
  );
};
