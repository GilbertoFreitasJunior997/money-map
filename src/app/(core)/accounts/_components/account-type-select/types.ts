import { SetState } from "@/lib/types";
import { AccountType } from "@/models/account-type.model";
import { UseFormReturn } from "react-hook-form";
import { AccountsFormSchemaData } from "../accounts-form";

export type AccountTypeSelectProps = {
  form: UseFormReturn<AccountsFormSchemaData>;
  setIsAccountTypeSheetOpen: SetState<boolean>;
  setAccountTypeUpdateData: SetState<AccountType | undefined>;
};
