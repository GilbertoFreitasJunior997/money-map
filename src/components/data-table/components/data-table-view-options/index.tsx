"use client";

import { Button } from "@/components/button";
import { DropdownMenu } from "@/components/dropdown-menu";
import { Icon } from "@/components/icon";
import { MixerHorizontalIcon } from "@radix-ui/react-icons";
import { DataTableViewOptionsProps } from "./types";

export const DataTableViewOptions = <TData,>({
  table,
}: DataTableViewOptionsProps<TData>) => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="h-8 flex"
        >
          <Icon
            src={MixerHorizontalIcon}
            className="mr-2"
          />
          View
        </Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content
        align="end"
        className="w-[150px]"
      >
        <DropdownMenu.Label>Toggle columns</DropdownMenu.Label>
        <DropdownMenu.Separator />
        {table
          .getAllColumns()
          .filter(
            (column) =>
              typeof column.accessorFn !== "undefined" && column.getCanHide(),
          )
          .map((column) => {
            return (
              <DropdownMenu.CheckboxItem
                key={column.id}
                className="capitalize"
                checked={column.getIsVisible()}
                onCheckedChange={(value) => column.toggleVisibility(!!value)}
              >
                {column.id}
              </DropdownMenu.CheckboxItem>
            );
          })}
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};
