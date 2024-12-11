import { DataTable } from "@/components/data-table";
import { accountService } from "@/services/account";
import { AccountsRegisterSheet } from "../accounts-register-sheet";

export const AccountsDataTable = async () => {
  const accounts = await accountService.getTableData();

  return (
    <DataTable
      data={accounts}
      toolbarItems={<AccountsRegisterSheet />}
      columns={[
        {
          header: "#",
          accessorKey: "id",
        },
        {
          header: "Name",
          accessorKey: "name",
        },
        {
          header: "Balance",
          accessorKey: "balance",
        },
        {
          header: "Type",
          accessorKey: "type",
        },
      ]}
    />
  );
};
