"use client";

import {
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { Table } from "@/components/data-table/components/table";
import { useState } from "react";
import { DataTableBody } from "./components/data-table-body";
import { DataTableHeader } from "./components/data-table-header";
import { DataTablePagination } from "./components/data-table-pagination";
import { DataTableViewOptions } from "./components/data-table-view-options";
import { DataTableProps } from "./types";

export const DataTable = <TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
    },
  });

  return (
    <div className="space-y-2">
      <DataTableViewOptions table={table} />

      <div className="rounded-md border">
        <Table.Root>
          <DataTableHeader table={table} />

          <DataTableBody
            table={table}
            columns={columns}
          />
        </Table.Root>
      </div>

      <div className="p-2 rounded-md border">
        <DataTablePagination table={table} />
      </div>
    </div>
  );
};
