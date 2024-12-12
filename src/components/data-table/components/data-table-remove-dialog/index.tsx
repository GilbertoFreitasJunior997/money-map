"use client";

import { Button } from "@/components/button";
import { Dialog } from "@/components/dialog";
import { useActionMutation } from "@/lib/hooks/use-action-mutation";
import { DataTableDeleteDialogProps } from "./types";

export const DataTableDeleteDialog = <TData,>({
  entityName,
  data,
  setData,
  remove,
}: DataTableDeleteDialogProps<TData>) => {
  const { mutate, isPending } = useActionMutation({
    action: remove.action,
    onSuccess: async () => {
      setData(undefined);
    },
  });

  return (
    <Dialog.Root
      open={!!data}
      onOpenChange={() => setData(undefined)}
    >
      <Dialog.Content className="w-[350px]">
        <Dialog.Title>Remove {entityName ?? ""}</Dialog.Title>
        <p className="pt-2 pb-4">This action cannot be undone!</p>
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
            disabled={isPending}
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
