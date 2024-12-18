import { AccountType } from "@/models/account-type.model";

export type AccountTypesFormProps = {
  updateData?: AccountType;
  onClose: () => void;
};
