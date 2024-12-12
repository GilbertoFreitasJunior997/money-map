import { flexRender } from "@tanstack/react-table";
import { DataTableFilter } from "../data-table-filter";
import { Table } from "../table";
import { DataTableHeaderProps } from "./types";

export const DataTableHeader = <TData,>({
  table,
}: DataTableHeaderProps<TData>) => {
  return (
    <Table.Header>
      {table.getHeaderGroups().map((headerGroup) => (
        <Table.Row
          key={headerGroup.id}
          className="hover:bg-inherit"
        >
          {headerGroup.headers.map((header) => {
            const column = table.getColumn(header.id);
            const hasFilter = column?.id && !!column.getCanFilter();

            return (
              <Table.Head
                key={header.id}
                className="space-y-1"
              >
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}

                {hasFilter && (
                  <DataTableFilter
                    table={table}
                    column={header.id}
                  />
                )}
              </Table.Head>
            );
          })}
        </Table.Row>
      ))}
    </Table.Header>
  );
};
