import { Column } from "@tanstack/react-table";
import { HTMLAttributes } from "react";

export type DataTableColumnHeaderProps<TData, TValue> =
  HTMLAttributes<HTMLDivElement> & {
    column: Column<TData, TValue>;
    title: string;
  };
