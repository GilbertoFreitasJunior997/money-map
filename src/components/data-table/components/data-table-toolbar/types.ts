import { Table } from "@tanstack/react-table";
import { DataTableCreate } from "../../types";

export type DataTableToolbarProps<TData> = {
  table: Table<TData>;
  entityName?: string;
  create?: DataTableCreate;
  areButtonsDisabled?: boolean;
};
