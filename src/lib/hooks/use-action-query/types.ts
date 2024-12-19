import { ActionResult } from "@/lib/types";

export type UseActionQueryOptions<TData> = {
  action: () => Promise<ActionResult<TData>>;
  queryKey: string[];
};
