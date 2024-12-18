import { SetState } from "@/lib/types";
import { AccountType } from "@/models/account-type.model";

export type AccountTypesRegisterSheetProps = {
  isOpen: boolean;
  setIsOpen: SetState<boolean>;
  setAccountTypeUpdateData: SetState<AccountType | undefined>;

  updateData?: AccountType;
};
