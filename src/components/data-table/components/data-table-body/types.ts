import { ColumnDef, Table } from "@tanstack/react-table";

export type DataTableBodyProps<TData, TValue> = {
  table: Table<TData>;
  columns: ColumnDef<TData, TValue>[];
  isLoading?: boolean;
};
