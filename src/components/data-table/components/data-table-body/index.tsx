import { flexRender } from "@tanstack/react-table";
import { Table } from "../table";
import { DataTableBodyProps } from "./types";

export const DataTableBody = <TData, TValue>({
  table,
  columns,
}: DataTableBodyProps<TData, TValue>) => {
  return (
    <Table.Body>
      {table.getRowModel().rows?.length ? (
        table.getRowModel().rows.map((row) => (
          <Table.Row
            key={row.id}
            data-state={row.getIsSelected() && "selected"}
          >
            {row.getVisibleCells().map((cell) => (
              <Table.Cell key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </Table.Cell>
            ))}
          </Table.Row>
        ))
      ) : (
        <Table.Row>
          <Table.Cell
            colSpan={columns.length}
            className="h-24 text-center"
          >
            No results.
          </Table.Cell>
        </Table.Row>
      )}
    </Table.Body>
  );
};
