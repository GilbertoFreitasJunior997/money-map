"use client";

import { Button } from "@/components/button";
import { Icon } from "@/components/icon";
import { Plus, Trash } from "lucide-react";
import { useState } from "react";
import { DataTableRemoveBulkDialog } from "../data-table-remove-bulk-dialog";
import { DataTableViewOptions } from "../data-table-view-options";
import { DataTableToolbarProps } from "./types";

export const DataTableToolbar = <TData,>({
  table,
  create,
  entityName,
  entityNamePlural,
  areButtonsDisabled,
  bulkRemove,
}: DataTableToolbarProps<TData>) => {
  const selectedRows =
    table.getIsSomeRowsSelected() || table.getIsAllRowsSelected()
      ? table.getSelectedRowModel().rows.map((row) => row.original)
      : [];

  const [isBulkRemoveDialogOpen, setIsBulkRemoveDialogOpen] = useState(false);

  const handleCloseBulkRemoveDialog = () => {
    setIsBulkRemoveDialogOpen(false);
  };
  const handleSuccessBulkRemove = () => {
    table.toggleAllPageRowsSelected(false);
    handleCloseBulkRemoveDialog();
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          {!!create && (
            <Button
              variant="default"
              disabled={areButtonsDisabled}
              {...create}
            >
              <Icon src={Plus} />
              {create?.text ?? (entityName ? `New ${entityName}` : null)}
            </Button>
          )}
          {!!bulkRemove && !!selectedRows.length && (
            <Button
              onClick={() => setIsBulkRemoveDialogOpen(true)}
              variant="outline"
            >
              <Icon src={Trash} />
              Remove selected
            </Button>
          )}
        </div>
        <DataTableViewOptions table={table} />
      </div>

      {!!bulkRemove && (
        <DataTableRemoveBulkDialog
          isOpen={isBulkRemoveDialogOpen && !!selectedRows.length}
          selectedRows={selectedRows}
          bulkRemove={bulkRemove}
          entityName={entityName ?? "item"}
          entityNamePlural={entityNamePlural ?? "items"}
          onClose={handleCloseBulkRemoveDialog}
          onSuccess={handleSuccessBulkRemove}
        />
      )}
    </>
  );
};
