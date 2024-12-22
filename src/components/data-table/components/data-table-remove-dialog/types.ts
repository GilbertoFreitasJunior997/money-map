import { SetState } from "@/lib/types";
import { DataTableRemove } from "../../types";

export type DataTableRemoveDialogProps<TData> = {
  entityName?: string;
  data?: TData;
  setData: SetState<TData | undefined>;
  remove: DataTableRemove<TData>;
};
