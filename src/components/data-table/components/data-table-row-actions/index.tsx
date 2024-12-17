"use client";

import { DropdownMenu } from "@/components/dropdown-menu";
import { Icon } from "@/components/icon";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Edit2, Trash } from "lucide-react";
import { useState } from "react";
import { DataTableDeleteDialog } from "../data-table-remove-dialog";
import { DataTableRowActionsProps } from "./types";

export const DataTableRowActions = <TData,>({
  entityName,
  data,
  edit,
  remove,
}: DataTableRowActionsProps<TData>) => {
  const [removeDialogData, setRemoveDialogData] = useState<TData>();

  return (
    <>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild>
          <DotsHorizontalIcon className="mx-2" />
        </DropdownMenu.Trigger>

        <DropdownMenu.Portal>
          <DropdownMenu.Content>
            {edit && (
              <DropdownMenu.Item onSelect={() => edit.onClick?.(data)}>
                <Icon
                  src={Edit2}
                  size="text"
                  className="mr-2"
                />
                <span>Edit</span>
              </DropdownMenu.Item>
            )}

            {remove && (
              <DropdownMenu.Item onSelect={() => setRemoveDialogData(data)}>
                <Icon
                  src={Trash}
                  size="text"
                  className="mr-2"
                />
                <span>Delete</span>
              </DropdownMenu.Item>
            )}
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>

      {!!remove && (
        <DataTableDeleteDialog
          entityName={entityName}
          data={removeDialogData}
          setData={setRemoveDialogData}
          remove={remove}
        />
      )}
    </>
  );
};
