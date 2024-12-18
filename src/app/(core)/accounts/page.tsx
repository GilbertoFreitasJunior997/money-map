import { accountService } from "@/services/account";
import { AccountsCard } from "./_components/accounts-card";
import { Icon } from "@/components/icon";
import { Plus } from "lucide-react";
import { AccountsRegisterSheet } from "./_components/accounts-register-sheet";
import { Button } from "@/components/button";

export default async function Page() {
  const accounts = await accountService.getTableData();

  const trigger = (
    <Button className="space-x-2">
      <Icon src={Plus} />
      <p>New Account</p>
    </Button>
  );

  const content = accounts.map((value) => (
    <AccountsCard
      account={value}
      key={value.id}
    />
  ));

  return (
    <div className="h-full space-y-4">
      <div className="flex justify-between">
        <AccountsRegisterSheet trigger={trigger} />
      </div>
      <div className="grid grid-cols-4 place-content-between gap-y-8">
        {content}
      </div>
    </div>
  );
}
