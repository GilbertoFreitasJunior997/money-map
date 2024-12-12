import { ActionResult } from "@/lib/types";
import { ButtonProps } from "../button/types";
import { DropdownMenuItemProps } from "../dropdown-menu/types";

export type DataTableCreate = Partial<ButtonProps> & { text?: string };

export type DataTableRowAction<TData> = Omit<
  DropdownMenuItemProps,
  "onClick" | "onSelect"
> & {
  onClick?: (data: TData) => void;
};
export type DataTableEdit<TData> = DataTableRowAction<TData>;
export type DataTableRemove<TData> = {
  action: (data: TData) => Promise<ActionResult<unknown>>;
};

export type DataTableColumn<TData> = {
  label?: string;
  key: keyof TData;
};

export type DataTableProps<TData> = {
  columns: DataTableColumn<TData>[];
  data: TData[];

  entityName?: string;
  create?: DataTableCreate;
  edit?: DataTableEdit<TData>;
  remove?: DataTableRemove<TData>;
};
