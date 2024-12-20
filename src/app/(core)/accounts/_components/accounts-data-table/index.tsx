"use client";

import { DataTable } from "@/components/data-table";
import { useState } from "react";
import { toast } from "sonner";
import { removeAccount } from "../../actions";
import { AccountsSheet } from "../accounts-sheet";
import { accountsDataTableColumns } from "./consts";
import { AccountsDataTableProps } from "./types";

export const AccountsDataTable = ({ data }: AccountsDataTableProps) => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  return (
    <>
      <DataTable
        data={data}
        entityName="Account"
        create={{
          onClick: () => setIsSheetOpen(true),
        }}
        edit={{
          onClick: (data) => {
            toast.info(JSON.stringify(data));
          },
        }}
        remove={{
          action: removeAccount,
        }}
        columns={accountsDataTableColumns}
      />

      <AccountsSheet
        isOpen={isSheetOpen}
        setIsOpen={setIsSheetOpen}
      />
    </>
  );
};
