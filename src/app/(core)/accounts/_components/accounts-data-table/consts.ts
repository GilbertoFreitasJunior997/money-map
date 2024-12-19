import { DataTableColumn } from "@/components/data-table/types";
import { AccountListData } from "@/models/account.model";

export const accountsDataTableColumns: DataTableColumn<AccountListData>[] = [
  {
    key: "id",
    label: "#",
  },
  {
    key: "name",
  },
];
