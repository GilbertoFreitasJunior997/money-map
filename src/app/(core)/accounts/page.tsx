import { accountService } from "@/services/account";
import { AccountsCard } from "./_components/accounts-card";

export default async function Page() {
  const accounts = await accountService.getTableData();

  const content = accounts.map((value) => (
    <AccountsCard
      account={value}
      key={value.id}
    />
  ));

  return (
    <div className="h-full">
      <div className="grid grid-cols-4 gap-y-8">{content}</div>
    </div>
  );
}
