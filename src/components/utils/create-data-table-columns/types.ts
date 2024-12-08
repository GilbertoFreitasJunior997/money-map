import { Column } from "@tanstack/react-table";
import { ReactNode } from "react";

export type DataTableColumnConfigCustomHeader<T> = {
  title?: never;
  customHeader: (column: Column<T>) => ReactNode;
};

export type DataTableColumnConfigTitle = {
  title?: string;
  customHeader?: never;
};

export type DataTableColumnConfig<T> = {
  key: keyof T;
} & (DataTableColumnConfigCustomHeader<T> | DataTableColumnConfigTitle);
