import { DataTableColumn } from "@/components/data-table/types";
import { AccountTableData } from "@/models/account.model";

export const accountsDataTableColumns: DataTableColumn<AccountTableData>[] = [
  {
    key: "id",
    label: "#",
  },
  {
    key: "name",
  },
  {
    key: "balance",
  },
  {
    key: "type",
  },
];
