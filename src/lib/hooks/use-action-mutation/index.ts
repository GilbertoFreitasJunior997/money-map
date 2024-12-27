import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { UseActionMutationOptions } from "./types";

export const useActionMutation = <TData, TVariables extends unknown[]>({
  action,
  onSuccess,
  onSettled,
  throwOnUndefined = false,
  mutationKey,
}: UseActionMutationOptions<TData, TVariables>) => {
  const mutation = useMutation({
    mutationFn: (variables: TVariables) => action(...variables),
    onSettled: async (result) => {
      await onSettled?.();

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

      if (
        result.error instanceof Error ||
        (result.error &&
          typeof result.error === "object" &&
          "message" in result.error)
      ) {
        errorMessage = String(result.error.message);
      } else {
        errorMessage = String(result.error);
      }
      toast.error(errorMessage);
    },
    mutationKey,
  });

  const wrappedMutate = (...variables: TVariables) =>
    mutation.mutate(variables);

  return {
    ...mutation,
    mutate: wrappedMutate,
  };
};
