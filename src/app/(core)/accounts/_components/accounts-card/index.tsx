import { Button } from "@/components/button";
import { Icon } from "@/components/icon";
import { formatter } from "@/lib/formatter";
import { PencilLine } from "lucide-react";
import { AccountsRegisterSheet } from "../accounts-register-sheet";

export const AccountsCard = ({
  account,
}: {
  account: { id: number; name: string; balance: string; type: string };
}) => {
  const { id, balance, name, type } = account;

  const formattedBalance = formatter.format(Number(balance));

  const trigger = (
    <Button
      className="absolute top-4 right-4"
      size={"icon"}
      variant={"secondary"}
    >
      <Icon src={PencilLine} />
    </Button>
  );

  return (
    <div className="rounded-sm border w-[350px] h-[180px] relative flex items-end justify-between p-4">
      <AccountsRegisterSheet
        trigger={trigger}
        id={id}
      />
      <div>
        <h1 className="font-semibold">{name}</h1>
        <p className="font-light">{type}</p>
      </div>
      {formattedBalance}
    </div>
  );
};
