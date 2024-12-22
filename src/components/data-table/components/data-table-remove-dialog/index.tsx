"use client";

import { Button } from "@/components/button";
import { Dialog } from "@/components/dialog";
import { useActionMutation } from "@/lib/hooks/use-action-mutation";
import { DataTableRemoveDialogProps } from "./types";

export const DataTableRemoveDialog = <TData,>({
  entityName,
  data,
  setData,
  remove,
}: DataTableRemoveDialogProps<TData>) => {
  const { mutate, isPending } = useActionMutation({
    action: remove.action,
    onSuccess: () => setData(undefined),
    mutationKey: remove.mutationKey,
  });

  return (
    <Dialog.Root
      open={!!data}
      onOpenChange={() => setData(undefined)}
    >
      <Dialog.Content className="w-[350px]">
        <Dialog.Title>Are you sure?</Dialog.Title>
        <Dialog.Description>
          You are about to delete this {entityName ?? ""}
        </Dialog.Description>
        <Dialog.Footer>
          <Dialog.Close asChild>
            <Button
              variant="secondary"
              disabled={isPending}
            >
              Cancel
            </Button>
          </Dialog.Close>
          <Button
            variant="destructive"
            isLoading={isPending}
            onClick={() => {
              if (!data) {
                return;
              }

              mutate(data);
            }}
          >
            Remove
          </Button>
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog.Root>
  );
};
