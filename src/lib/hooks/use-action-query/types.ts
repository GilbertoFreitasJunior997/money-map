import { ActionResult } from "@/lib/types";

export type QueryKey = string | number;

export type UseActionQueryOptions<TData> = {
  action: () => Promise<ActionResult<TData>>;
  queryKey: QueryKey[];
  enabled?: boolean;
};
