import { ActionResult } from "@/lib/types";
import { QueryKey } from "../use-action-query/types";

export type UseActionMutationOptions<TData, TVariables extends unknown[]> = {
  action: (...variables: TVariables) => Promise<ActionResult<TData>>;
  onSuccess?: (data: TData) => void;
  onSettled?: () => void;
  throwOnUndefined?: boolean;
  mutationKey?: QueryKey[];
};
