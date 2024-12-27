"use client";

import {
  ColumnDef,
  ColumnFiltersState,
  PaginationState,
  SortingState,
  VisibilityState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { Table } from "@/components/data-table/components/table";
import { uppercaseFirstLetter } from "@/lib/utils";
import { useMemo, useState } from "react";
import { DataTableBody } from "./components/data-table-body";
import { DataTableHeader } from "./components/data-table-header";
import { DataTablePagination } from "./components/data-table-pagination";
import { DataTableRowActions } from "./components/data-table-row-actions";
import { DATA_TABLE_ROW_ACTIONS_COLUMN_ID } from "./components/data-table-row-actions/consts";
import { dataTableSelectColumn } from "./components/data-table-select-column";
import { DataTableToolbar } from "./components/data-table-toolbar";
import { DataTableProps } from "./types";

export const DataTable = <TData, TValue>({
  data,
  columns: baseColumns,
  isLoading,
  areButtonsDisabled,
  entityName,
  entityNamePlural,
  edit,
  create,
  remove,
  bulkRemove,
}: DataTableProps<TData>) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 25,
  });

  const columns = useMemo(() => {
    const columns: ColumnDef<TData, TValue>[] = [
      dataTableSelectColumn as ColumnDef<TData, TValue>,
    ];

    for (const column of baseColumns) {
      const header = column.label ?? uppercaseFirstLetter(String(column.key));

      columns.push({
        header,
        accessorKey: column.key,
      });
    }

    if (edit || remove) {
      columns.push({
        id: DATA_TABLE_ROW_ACTIONS_COLUMN_ID,
        cell: ({ row }) => (
          <DataTableRowActions
            entityName={entityName}
            edit={edit}
            remove={remove}
            data={row.original}
            areButtonsDisabled={areButtonsDisabled}
          />
        ),
        enableGlobalFilter: false,
        enableColumnFilter: false,
        enableSorting: false,
        enableHiding: false,
      });
    }

    return columns;
  }, [baseColumns, edit, remove, entityName, areButtonsDisabled]);

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
    onRowSelectionChange: setRowSelection,
    onPaginationChange: setPagination,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      pagination,
    },
  });

  return (
    <div className="flex flex-col grow justify-between h-full gap-2">
      <div className="flex flex-col gap-2 grow">
        <DataTableToolbar
          table={table}
          create={create}
          entityName={entityName}
          entityNamePlural={entityNamePlural}
          areButtonsDisabled={areButtonsDisabled}
          bulkRemove={bulkRemove}
        />

        <div className="rounded-md border grow">
          <Table.Root>
            <DataTableHeader table={table} />

            <DataTableBody
              table={table}
              columns={columns}
              isLoading={isLoading}
            />
          </Table.Root>
        </div>
      </div>

      <div className="p-2 rounded-md border bg-background">
        <DataTablePagination table={table} />
      </div>
    </div>
  );
};
