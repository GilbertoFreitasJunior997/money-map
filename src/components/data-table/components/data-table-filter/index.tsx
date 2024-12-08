import { Input } from "@/components/input";
import { DataTableFilterProps } from "./types";

export const DataTableFilter = <TData,>({
  table,
  column,
}: DataTableFilterProps<TData>) => {
  return (
    <Input
      name={`data_table_filter__${column}`}
      value={(table.getColumn(column)?.getFilterValue() as string) ?? ""}
      onChange={(event) => {
        table.getColumn(column)?.setFilterValue(event.target.value);
      }}
      className="max-w-sm h-[28px] my-1"
    />
  );
};
