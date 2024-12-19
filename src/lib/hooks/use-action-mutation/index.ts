import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { UseActionMutationOptions } from "./types";

export const useActionMutation = <TData, TVariables>({
  action,
  onSuccess,
  throwOnUndefined = false,
}: UseActionMutationOptions<TData, TVariables>) => {
  return useMutation({
    mutationFn: action,
    onSettled: async (result) => {
      if (!result) {
        if (!throwOnUndefined) {
          return;
        }

        toast.warning("Something went wrong! Please try again.");
        return;
      }

      if (result.success) {
        if (result.message) {
          toast.success(result.message);
        }
        await onSuccess?.(result.data);

        return;
      }

      let errorMessage = "";

      if (result.error instanceof Error) {
        errorMessage = result.error.message;
      } else {
        errorMessage = String(result.error);
      }
      toast.error(errorMessage);
    },
  });
};
