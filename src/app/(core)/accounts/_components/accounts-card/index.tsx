import { Button } from "@/components/button";
import { Icon } from "@/components/icon";
import { PencilLine } from "lucide-react";

export const AccountsCard = ({
  account,
}: {
  account: { id: number; name: string; balance: string; type: string };
}) => {
  const { id, balance, name, type } = account;

  return (
    <div className="rounded-sm border w-[350px] h-[180px] relative flex items-end justify-between p-4">
      <Button
        className="absolute top-4 right-4"
        size={"icon"}
        variant={"secondary"}
      >
        <Icon src={PencilLine} />
      </Button>
      <div>
        <h1 className="font-semibold">{name}</h1>
        <p className="font-light">{type}</p>
      </div>
      {balance}
    </div>
  );
};
