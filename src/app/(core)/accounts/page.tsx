import { accountService } from "@/services/account";
import { AccountsDataTable } from "./_components/accounts-data-table";

export default async function Page() {
  const accounts = await accountService.getTableData();

  return <AccountsDataTable data={accounts} />;
}
