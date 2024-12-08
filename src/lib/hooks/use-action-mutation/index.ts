import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { UseActionMutationOptions } from "./types";

export const useActionMutation = <TData, TVariables>({
  action,
  throwOnUndefined = true,
}: UseActionMutationOptions<TData, TVariables>) => {
  return useMutation({
    mutationFn: action,
    onSettled: (data) => {
      if (!data) {
        if (!throwOnUndefined) {
          return;
        }

        toast.warning("Something went wrong! Please try again.");
        return;
      }

      if (data.success) {
        if (data.message) {
          toast.success(data.message);
        }

        return;
      }

      let errorMessage = "";

      if (data.error instanceof Error) {
        errorMessage = data.error.message;
      } else {
        errorMessage = String(data.error);
      }
      toast.error(errorMessage);
    },
  });
};
