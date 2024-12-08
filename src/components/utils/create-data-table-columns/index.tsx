import { DataTableColumnHeader } from "@/components/data-table/components/data-table-column-header";
import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnConfig } from "./types";

export const createDataTableColumns = <T,>(
  configs: DataTableColumnConfig<T>[],
): ColumnDef<T>[] =>
  configs.map(({ key, title, customHeader }) => ({
    accessorKey: key,
    header: ({ column }) =>
      customHeader?.(column) ?? (
        <DataTableColumnHeader
          column={column}
          title={title ?? String(key)}
        />
      ),
  }));
