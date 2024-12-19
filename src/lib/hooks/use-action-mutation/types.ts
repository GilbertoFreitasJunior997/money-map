import { ActionResult } from "@/lib/types";

export type UseActionMutationOptions<TData, TVariables> = {
  action: (variables: TVariables) => Promise<ActionResult<TData>>;
  onSuccess?: (data: TData) => Promise<void> | void;
  throwOnUndefined?: boolean;
};
