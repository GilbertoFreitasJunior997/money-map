import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { UseActionQueryOptions } from "./types";

export const useActionQuery = <TData>({
  action,
  queryKey,
  enabled,
}: UseActionQueryOptions<TData>) => {
  return useQuery({
    queryFn: async () => {
      const result = await action();

      if (result.success) {
        if (result.message) {
          toast.success(result.message);
        }

        return result.data;
      }

      let errorMessage = "";

      if (result.error instanceof Error) {
        errorMessage = result.error.message;
      } else {
        errorMessage = String(result.error);
      }
      toast.error(errorMessage);

      return;
    },
    queryKey,
    enabled,
  });
};
