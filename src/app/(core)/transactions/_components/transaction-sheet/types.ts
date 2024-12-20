import { SetState } from "@/lib/types";

export type TransactionSheetProps = {
  isOpen: boolean;
  onOpenChange: SetState<boolean>;
};
