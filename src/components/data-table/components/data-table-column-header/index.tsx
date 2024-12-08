import { Button } from "@/components/button";
import { DropdownMenu } from "@/components/dropdown-menu";
import { Icon } from "@/components/icon";
import { cn } from "@/lib/utils";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  CaretSortIcon,
  EyeNoneIcon,
} from "@radix-ui/react-icons";
import { DataTableColumnHeaderProps } from "./types";

export const DataTableColumnHeader = <TData, TValue>({
  column,
  title,
  className,
}: DataTableColumnHeaderProps<TData, TValue>) => {
  if (!column.getCanSort()) {
    return <div className={cn(className)}>{title}</div>;
  }

  const dropdownItemClassName = "mr-2 h-3.5 w-3.5 text-muted-foreground/70";

  const sortDirection = column.getIsSorted();
  const SortDirectionIcon =
    sortDirection === "desc"
      ? ArrowDownIcon
      : sortDirection === "asc"
        ? ArrowUpIcon
        : CaretSortIcon;

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 data-[state=open]:bg-accent"
        >
          <span>{title}</span>
          <SortDirectionIcon className="ml-2 h-4 w-4" />
        </Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content align="start">
        <DropdownMenu.Item onClick={() => column.toggleSorting(false)}>
          <Icon
            src={ArrowUpIcon}
            className={dropdownItemClassName}
          />
          Asc
        </DropdownMenu.Item>
        <DropdownMenu.Item onClick={() => column.toggleSorting(true)}>
          <Icon
            src={ArrowDownIcon}
            className={dropdownItemClassName}
          />
          Desc
        </DropdownMenu.Item>
        <DropdownMenu.Separator />
        <DropdownMenu.Item onClick={() => column.toggleVisibility(false)}>
          <Icon
            src={EyeNoneIcon}
            className={dropdownItemClassName}
          />
          Hide
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};
