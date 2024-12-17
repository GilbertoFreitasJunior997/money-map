import { Checkbox } from "@/components/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { DATA_TABLE_SELECT_COLUMN_ID } from "./consts";

export const dataTableSelectColumn: ColumnDef<unknown> = {
  id: DATA_TABLE_SELECT_COLUMN_ID,
  header: ({ table }) => (
    <>
      <br />
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    </>
  ),
  cell: ({ row }) => (
    <Checkbox
      checked={row.getIsSelected()}
      onCheckedChange={(value) => row.toggleSelected(!!value)}
      aria-label="Select row"
    />
  ),
  enableGlobalFilter: false,
  enableColumnFilter: false,
  enableSorting: false,
  enableHiding: false,
};
