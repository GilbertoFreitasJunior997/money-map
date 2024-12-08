import { Table } from "@tanstack/react-table";

export type DataTableFilterProps<TData> = {
  table: Table<TData>;
  column: string;
};
