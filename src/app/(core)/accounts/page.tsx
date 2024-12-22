"use client";

import { DataTable } from "@/components/data-table";
import { useActionQuery } from "@/lib/hooks/use-action-query";
import { AccountListData } from "@/models/account.model";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { AccountsSheet } from "./_components/accounts-sheet";
import {
  getAccountListData,
  removeAccount,
  removeAccountBulk,
} from "./actions";
import { accountsDataTableColumns } from "./consts";

export default function Page() {
  const queryClient = useQueryClient();
  const isMutating = queryClient.isMutating({
    mutationKey: ["accounts"],
    exact: false,
  });

  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [editAccountId, setEditAccountId] = useState<number>();

  const { data, isLoading, isFetching } = useActionQuery({
    action: getAccountListData,
    queryKey: ["accounts", "table"],
  });

  const handleRemove = async ({ id }: AccountListData) => {
    queryClient.setQueriesData(
      {
        queryKey: ["accounts", "list"],
      },
      (oldData: AccountListData[] | undefined) => {
        if (!oldData) {
          return oldData;
        }

        return oldData.filter((account) => account.id !== id);
      },
    );

    const result = await removeAccount(id);

    queryClient.invalidateQueries({
      queryKey: ["accounts"],
      exact: false,
    });

    return result;
  };

  const handleBulkRemove = async (selectedRows: AccountListData[]) => {
    const ids = selectedRows.map((row) => row.id);

    queryClient.setQueriesData(
      {
        queryKey: ["accounts", "table"],
      },
      (oldData: AccountListData[] | undefined) => {
        if (!oldData) {
          return oldData;
        }

        return oldData.filter((account) => !ids.includes(account.id));
      },
    );

    const result = await removeAccountBulk(ids);

    queryClient.invalidateQueries({
      queryKey: ["accounts"],
      exact: false,
    });

    return result;
  };

  const handleSheetOpenChange = (isOpen: boolean) => {
    setEditAccountId(undefined);
    setIsSheetOpen(isOpen);
  };

  const handleSheetSuccess = async () => {
    queryClient.invalidateQueries({
      queryKey: ["accounts"],
      exact: false,
    });

    handleSheetOpenChange(false);
  };

  const handleOpenEditSheet = (id: number) => {
    setEditAccountId(id);
    setIsSheetOpen(true);
  };

  const areButtonsDisabled = !!isMutating || isFetching;

  return (
    <>
      <DataTable
        data={data ?? []}
        isLoading={isLoading}
        areButtonsDisabled={areButtonsDisabled}
        entityName="Account"
        create={{
          onClick: () => setIsSheetOpen(true),
        }}
        edit={{
          onClick: ({ id }) => handleOpenEditSheet(id),
        }}
        bulkRemove={{
          action: handleBulkRemove,
          mutationKey: ["accounts"],
        }}
        remove={{
          action: handleRemove,
          mutationKey: ["accounts"],
        }}
        columns={accountsDataTableColumns}
      />

      <AccountsSheet
        isOpen={isSheetOpen}
        editAccountId={editAccountId}
        onSuccess={handleSheetSuccess}
        onOpenChange={handleSheetOpenChange}
      />
    </>
  );
}
