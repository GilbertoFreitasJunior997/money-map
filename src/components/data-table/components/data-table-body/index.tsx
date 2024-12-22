import { flexRender } from "@tanstack/react-table";
import { Table } from "../table";
import { DataTableBodyProps } from "./types";

type BodyFragmentProps = {
  colSpan: number;
};
const Loading = ({ colSpan }: BodyFragmentProps) => (
  <Table.Row>
    <Table.Cell
      colSpan={colSpan}
      className="text-center"
    >
      Loading...
    </Table.Cell>
  </Table.Row>
);

const NoResults = ({ colSpan }: BodyFragmentProps) => (
  <Table.Row>
    <Table.Cell
      colSpan={colSpan}
      className="text-center"
    >
      No results.
    </Table.Cell>
  </Table.Row>
);

export const DataTableBody = <TData, TValue>({
  table,
  columns,
  isLoading,
}: DataTableBodyProps<TData, TValue>) => {
  const hasData = !!table.getRowModel().rows?.length;

  return (
    <Table.Body>
      {isLoading ? (
        <Loading colSpan={columns.length} />
      ) : hasData ? (
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
        <NoResults colSpan={columns.length} />
      )}
    </Table.Body>
  );
};
