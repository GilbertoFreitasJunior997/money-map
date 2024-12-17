import { SetState } from "@/lib/types";
import { DataTableRemove } from "../../types";

export type DataTableDeleteDialogProps<TData> = {
  entityName?: string;
  data?: TData;
  setData: SetState<TData | undefined>;
  remove: DataTableRemove<TData>;
};
