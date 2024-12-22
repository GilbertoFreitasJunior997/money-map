"use client";

import { DataTable } from "@/components/data-table";
import { useActionQuery } from "@/lib/hooks/use-action-query";
import { TransactionCategoryListData } from "@/models/transaction-category.model";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { CategoriesSheet } from "./_components/categories-sheet";
import {
  getCategoryListData,
  removeCategory,
  removeCategoryBulk,
} from "./actions";
import { categoriesDataTableColumns } from "./consts";

export default function Page() {
  const queryClient = useQueryClient();
  const isMutating = queryClient.isMutating({
    mutationKey: ["categories"],
    exact: false,
  });

  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [editCategoryId, setEditCategoryId] = useState<number>();

  const { data, isLoading, isFetching } = useActionQuery({
    action: getCategoryListData,
    queryKey: ["categories", "table"],
  });

  const handleRemove = async ({ id }: TransactionCategoryListData) => {
    queryClient.setQueriesData(
      {
        queryKey: ["categories", "list"],
      },
      (oldData: TransactionCategoryListData[] | undefined) => {
        if (!oldData) {
          return oldData;
        }

        return oldData.filter((cateogy) => cateogy.id !== id);
      },
    );

    const result = await removeCategory(id);

    queryClient.invalidateQueries({
      queryKey: ["categories"],
      exact: false,
    });

    return result;
  };

  const handleBulkRemove = async (
    selectedRows: TransactionCategoryListData[],
  ) => {
    const ids = selectedRows.map((row) => row.id);

    queryClient.setQueriesData(
      {
        queryKey: ["categories", "table"],
      },
      (oldData: TransactionCategoryListData[] | undefined) => {
        if (!oldData) {
          return oldData;
        }

        return oldData.filter((cateogy) => !ids.includes(cateogy.id));
      },
    );

    const result = await removeCategoryBulk(ids);

    queryClient.invalidateQueries({
      queryKey: ["categories"],
      exact: false,
    });

    return result;
  };

  const handleSheetOpenChange = (isOpen: boolean) => {
    setEditCategoryId(undefined);
    setIsSheetOpen(isOpen);
  };

  const handleSheetSuccess = async () => {
    queryClient.invalidateQueries({
      queryKey: ["categories"],
      exact: false,
    });

    handleSheetOpenChange(false);
  };

  const handleOpenEditSheet = (id: number) => {
    setEditCategoryId(id);
    setIsSheetOpen(true);
  };

  const areButtonsDisabled = !!isMutating || isFetching;

  return (
    <>
      <DataTable
        data={data ?? []}
        isLoading={isLoading}
        areButtonsDisabled={areButtonsDisabled}
        entityName="Category"
        entityNamePlural="Categories"
        create={{
          onClick: () => setIsSheetOpen(true),
        }}
        edit={{
          onClick: ({ id }) => handleOpenEditSheet(id),
        }}
        bulkRemove={{
          action: handleBulkRemove,
          mutationKey: ["categories"],
        }}
        remove={{
          action: handleRemove,
          mutationKey: ["categories"],
        }}
        columns={categoriesDataTableColumns}
      />

      <CategoriesSheet
        isOpen={isSheetOpen}
        editCategoryId={editCategoryId}
        onSuccess={handleSheetSuccess}
        onOpenChange={handleSheetOpenChange}
      />
    </>
  );
}
