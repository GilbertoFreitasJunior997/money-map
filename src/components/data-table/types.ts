import { ColumnDef } from "@tanstack/react-table";
import { ReactNode } from "react";

export type DataTableProps<TData, TValue> = {
  columns: ColumnDef<TData, TValue>[];
  toolbarItems?: ReactNode;
  data: TData[];
};
