import { ActionResult } from "@/lib/types";

export type UseActionMutationOptions<TData, TVariables> = {
  action: (variables: TVariables) => Promise<ActionResult<TData>>;
  throwOnUndefined?: boolean;
};
