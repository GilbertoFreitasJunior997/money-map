import { ActionResult } from "@/lib/types";

export type QueryKey = string | number | object;

export type UseActionQueryOptions<TData> = {
  action: () => Promise<ActionResult<TData>>;
  queryKey: QueryKey[];
  enabled?: boolean;
};
