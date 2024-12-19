import { accountService } from "@/services/account";
import { AccountsDataTable } from "./_components/accounts-data-table";

export default async function Page() {
  const accounts = await accountService.getListData();

  return <AccountsDataTable data={accounts} />;
}
