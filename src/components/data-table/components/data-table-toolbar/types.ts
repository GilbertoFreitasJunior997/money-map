import { Table } from "@tanstack/react-table";
import { DataTableBulkRemove, DataTableCreate } from "../../types";

export type DataTableToolbarProps<TData> = {
  table: Table<TData>;
  entityName?: string;
  entityNamePlural?: string;
  create?: DataTableCreate;
  areButtonsDisabled?: boolean;
  bulkRemove?: DataTableBulkRemove<TData>;
};
